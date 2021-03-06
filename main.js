var roleHarvester = require('role.harvester');
var roleCarrier = require('role.carrier');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleDefender = require('role.defender');

module.exports.loop = function () { 
    // 战时状态
    var enemy = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS, {
        filter: function (object) {
            return object.getActiveBodyparts(ATTACK) + object.getActiveBodyparts(RANGED_ATTACK) != 0;
        }
    });
    var war_state = enemy.length; // 非零即有敌人
    // 增加 denfender
    // 调整不同角色执行任务
    // upgrader、builder、repairer 都只刷墙
    
    // 清理垃圾
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Tower 控制
    var tower = Game.getObjectById('6023a0bfc66e4d3f9ad557d8');
    if (tower) {
        var closestHostiles = tower.room.find(FIND_HOSTILE_CREEPS, { // 寻找最近的有进攻能力的
            filter: function (object) {
                return object.getActiveBodyparts(ATTACK) + object.getActiveBodyparts(RANGED_ATTACK) > 0;
            }
        });
        if (closestHostiles) { // 进攻
            closestHostiles.sort((a, b) => a.pos.getRangeTo(tower) - b.pos.getRangeTo(tower));
            tower.attack(closestHostiles[0]);
            console.log('Tower attack aggressive hostile creeps!')
        }
        else {
            var s = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS); // 仅距离最近
            if (s) { // 清理其他的
                tower.attack(s);
                console.log('Tower attack hostile creeps!')
            }
            else { // 治疗
                var target = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function (object) {
                        return object.hits < object.hitsMax;
                    }
                });
                if (target) {
                    tower.heal(target);
                }
                else { // 维修 但是不刷墙
                    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax &&
                            structure.structureType != STRUCTURE_WALL
                    });
                    if (closestDamagedStructure) {
                        tower.repair(closestDamagedStructure);
                    }
                }
            }
        }
    }

    // creeps 数量控制
    var harvesters_num = 2; // 定点采集
    var carriers_num = 2; // 搬运工
    var upgraders_num = 1; // 升级
    var builders_num = 0;//4; // 建造
    var repairers_num = 0;//3; // 维修
    var defenders_num = 2; // 防守
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');    
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');    
    // console.log('Harvesters: ' + harvesters.length + '/' + harvesters_num
    //     + '  Upgraders: ' + upgraders.length + '/' + upgraders_num
    //     + '  Builders: ' + builders.length + '/' + builders_num);
    
    if (!Game.spawns['Spawn1'].spawning) {
        // harvesters 补充
        if (harvesters.length < harvesters_num) {
            var newName = 'Harvester' + Game.time;
            var newtask = '1'; // 分配矿点 memory.task=12 分别针对两个矿
            if (harvesters[0]) {
                if (harvesters[0].memory.task == '1') {
                    newtask = '2';
                }
            }                
            if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                { memory: { role: 'harvester', task: newtask } })
                == OK) {
                console.log('Spawning new harvester: ' + newName);
            }
        }
        // carriers 补充
        if (carriers.length < carriers_num) {
            var newName = 'Carrier' + Game.time;
            if (Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'carrier', task: 'harvest' } })
                == OK) {
                console.log('Spawning new carrier: ' + newName);
            }
        }
        // upgraders 补充
        if (upgraders.length < upgraders_num) {
            var newName = 'Upgrader' + Game.time;
            if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'upgrader', task: 'harvest' } })
                == OK) {
                console.log('Spawning new upgrader: ' + newName);
            }
        }
        // builders 补充
        if (builders.length < builders_num) {
            var newName = 'Builder' + Game.time;
            if (Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
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
        // defenders 补充
        if (defenders.length < defenders_num) {
            var newName = 'Defender' + Game.time;
            if (Game.spawns['Spawn1'].spawnCreep([ATTACK, ATTACK, HEAL, HEAL, MOVE, MOVE], newName,
                { memory: { role: 'defender' } })
                == OK) {
                console.log('Spawning new defender: ' + newName);
            }
        }
    }

    // 分配任务
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