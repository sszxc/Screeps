var roleHarvester = require('role.harvester');
var roleCarrier = require('role.carrier');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () { 
    // 清理垃圾
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }    

    // creeps 数量控制
    var harvesters_num = 2; // 定点采集，memory.task=12 分别针对两个矿
    var carriers_num = 2; // 搬运工
    var upgraders_num = 2; // 升级
    var builders_num = 1; // 建造
    var repairers_num = 3; // 维修
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');    
    // console.log('Harvesters: ' + harvesters.length + '/' + harvesters_num
    //     + '  Upgraders: ' + upgraders.length + '/' + upgraders_num
    //     + '  Builders: ' + builders.length + '/' + builders_num);
    
    if (!Game.spawns['Spawn1'].spawning) {
        // harvesters 补充
        if (harvesters.length < harvesters_num) {
            var newName = 'Harvester' + Game.time;
            var newtask = '1'; // 分配矿点
            if (harvesters[0]) {
                if (harvesters[0].memory.task == '1') {
                    newtask = '2';
                }
            }                
            if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, MOVE], newName,
                { memory: { role: 'harvester', task: newtask } })
                == OK) {
                console.log('Spawning new harvester: ' + newName);
            }
        }
        // carriers 补充
        if (carriers.length < carriers_num) {
            var newName = 'Carrier' + Game.time;
            if (Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'carrier', task: 'harvest' } })
                == OK) {
                console.log('Spawning new carrier: ' + newName);
            }
        }
        // upgraders 补充
        if (upgraders.length < upgraders_num) {
            var newName = 'Upgrader' + Game.time;
            if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'upgrader', task: 'harvest' } })
                == OK) {
                console.log('Spawning new upgrader: ' + newName);
            }
        }
        // builders 补充
        if (builders.length < builders_num) {
            var newName = 'Builder' + Game.time;
            if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'builder', task: 'harvest' } })
                == OK) {
                console.log('Spawning new builder: ' + newName);
            }
        }
        // repairers 补充
        if (repairers.length < repairers_num) {
            var newName = 'Repairer' + Game.time;
            if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'repairer', task: 'harvest' } })
                == OK) {
                console.log('Spawning new repairer: ' + newName);
            }
        }
    }
    
    // 执行任务
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
}