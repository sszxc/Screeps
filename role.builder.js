var roleBuilder = {
    /** @param {Creep} creep **/
    run: function (creep) {
        // 状态切换
        if (creep.memory.task == "build" && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.task = "harvest";
            // creep.say('🔄 harvest');
        }
        else if (creep.memory.task == "harvest" && creep.store.getFreeCapacity() == 0) {
            creep.memory.task = "build";
            // creep.say('🚧 build');
        }

        if (creep.memory.task == "build") {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            creep.say('🚧 build');
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
            creep.say('🔄 harvest');
        }
    }
};

module.exports = roleBuilder;