var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function (creep) {
        // 状态切换
        if (creep.memory.task == "upgrade" && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.task = "harvest";
            creep.say('🔄 harvest');
        }
        else if (creep.memory.task == "harvest" && creep.store.getFreeCapacity() == 0) {
            creep.memory.task = "upgrade";
            creep.say('⚡ upgrade');
        }

        if (creep.memory.task == "upgrade") { // 升级控制器
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            // creep.say('⚡ upgrade');
        }
        else { // 收集能量
            const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES); // 先找掉在地上的能量
            if (target) {
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            else { // 然后找 container
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER &&
                            structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
                targets.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]); // 排序
                if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            // creep.say('🔄 harvest');
        }
    }
};

module.exports = roleUpgrader;