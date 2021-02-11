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

        if (creep.memory.task == "harvest") { //收集能量
            var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES); // 先找掉在地上的能量
            if (0 && target) { // repairer 不捡地上的
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
        else { // 按照生命值检索建筑 不修路
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax &&
                    (object.structureType == STRUCTURE_WALL ||
                        object.structureType == STRUCTURE_RAMPART)
            });
            targets.sort((a, b) => a.hits - b.hits); // 排序
            if (targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            // creep.say('🛠 repair');
        }
    }
};

module.exports = roleRepairer;