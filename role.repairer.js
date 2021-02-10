var roleRepairer = {
    /** @param {Creep} creep **/
    run: function (creep) {
        // 状态切换
        if (creep.memory.task == "transfer" && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.task = "harvest";
            creep.say('🔄 harvest');
        }
        else if (creep.memory.task == "harvest" && creep.store.getFreeCapacity() == 0) {
            creep.memory.task = "transfer";
            creep.say('🛠 repair');
        }

        if (creep.memory.task == "harvest") {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER &&
                        structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
            // creep.say('🔄 harvest');
        }
        else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.sort((a, b) => a.hits - b.hits); // 排序

            if (targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            // creep.say('🛠 repair');
        }
    }
};

module.exports = roleRepairer;