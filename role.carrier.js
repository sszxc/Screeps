var roleCarrier = {
    /** @param {Creep} creep **/
    run: function (creep) {
        // 状态切换
        if (creep.memory.task == "transfer" && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.task = "harvest";
            creep.say('🔄 harvest');
        }
        else if (creep.memory.task == "harvest" && creep.store.getFreeCapacity() == 0) {
            creep.memory.task = "transfer";
            creep.say('🚚 transfer');
        }

        if (creep.memory.task == "harvest") { // 收集能量
            var targets = creep.room.find(FIND_DROPPED_RESOURCES);// 先找掉在地上的能量
            if (0 && targets) {
                targets.sort((a, b) => b.amount - a.amount); // 排序 carrier 先解决最大块的
                if (creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } });
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
        else { // 传递到 extension、spawn、tower
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                targets.sort((a, b) => a.pos.getRangeTo(creep) - b.pos.getRangeTo(creep)); // 排序 最近的
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            // creep.say('🚚 transfer');
        }
    }
};

module.exports = roleCarrier;