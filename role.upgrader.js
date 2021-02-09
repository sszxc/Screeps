var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function (creep) {
        // 状态切换
        if (creep.memory.task == "upgrade" && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.task = "harvest";
            // creep.say('🔄 harvest');
        }
        else if (creep.memory.task == "harvest" && creep.store.getFreeCapacity() == 0) {
            creep.memory.task = "upgrade";
            // creep.say('⚡ upgrade');
        }

        if (creep.memory.task == "upgrade") {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            // creep.say('⚡ upgrade');
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
            // creep.say('🔄 harvest');
        }
    }
};

module.exports = roleUpgrader;