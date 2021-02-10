var roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) { // 定点采集
        if (creep.memory.task=='1') {
            if (creep.harvest(Game.getObjectById('5bbcacd69099fc012e6364c4')) == ERR_NOT_IN_RANGE) {
                creep.moveTo(31, 15, { visualizePathStyle: { stroke: '#88dd00' } });
            }

        }
        else {
            if (creep.harvest(Game.getObjectById('5bbcacd69099fc012e6364c5')) == ERR_NOT_IN_RANGE) {
                creep.moveTo(45, 28, { visualizePathStyle: { stroke: '#88dd00' } });
            }
        }
    }
};



module.exports = roleHarvester;