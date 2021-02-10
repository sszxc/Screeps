var roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.task=='1') {
        //     creep.moveTo(31, 15);
        //     creep.harvest(Game.getObjectById('5bbcacd69099fc012e6364c4'));

            if (creep.harvest(Game.getObjectById('5bbcacd69099fc012e6364c4')) == ERR_NOT_IN_RANGE) {
                creep.moveTo(31, 15, { visualizePathStyle: { stroke: '#ffaa00' } });
            }

        }
        else {
            // creep.moveTo(45, 28);
            // creep.harvest(Game.getObjectById('5bbcacd69099fc012e6364c5'));

            if (creep.harvest(Game.getObjectById('5bbcacd69099fc012e6364c5')) == ERR_NOT_IN_RANGE) {
                creep.moveTo(45, 28, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }

        // // 状态切换
        // if (creep.memory.task == "transfer" && creep.store[RESOURCE_ENERGY] == 0) {
        //     creep.memory.task = "harvest";
        //     // creep.say('🔄 harvest');
        // }
        // else if (creep.memory.task == "harvest" && creep.store.getFreeCapacity() == 0) {
        //     creep.memory.task = "transfer";
        //     // creep.say('🚚 transfer');
        // }
        
        // if (creep.memory.task == "harvest") {
        //     var sources = creep.room.find(FIND_SOURCES);
        //     if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
        //     }
        //     // creep.say('🔄 harvest');
        // }
        // else {
        //     var targets = creep.room.find(FIND_STRUCTURES, {
        //         filter: (structure) => {
        //             return (structure.structureType == STRUCTURE_EXTENSION ||
        //                 structure.structureType == STRUCTURE_SPAWN ||
        //                 structure.structureType == STRUCTURE_TOWER) &&
        //                 structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        //         }
        //     });
        //     if (targets.length > 0) {
        //         if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        //         }
        //     }
        //     // creep.say('🚚 transfer');
        // }
    }
};



module.exports = roleHarvester;