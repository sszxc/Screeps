var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () { 
    // 清理垃圾
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }    

    // creeps 数量控制
    var harvesters_num = 2;
    var upgraders_num = 4;
    var builders_num = 2;
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');    
    // console.log('Harvesters: ' + harvesters.length + '/' + harvesters_num
    //     + '  Upgraders: ' + upgraders.length + '/' + upgraders_num
    //     + '  Builders: ' + builders.length + '/' + builders_num);
    
    if (!Game.spawns['Spawn1'].spawning) {
        // harvesters 补充
        if (harvesters.length < harvesters_num) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'harvester', task: 'harvest' } });
        }
        // upgraders 补充
        if (upgraders.length < upgraders_num) { 
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'upgrader', task: 'harvest' } });
        }
        // builders 补充
        if (builders.length < builders_num) { 
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'builder', task: 'harvest' } });
        }
    }
    
    // 执行任务
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}