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
    }
};



module.exports = roleHarvester;