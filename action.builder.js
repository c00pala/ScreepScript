module.exports = {

    GetCS: function (creep) {
        let cs = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        return cs;
    },

    Build: function (creep, cs)
    {
        if (creep.build(cs) == ERR_NOT_IN_RANGE)
        {
            cree.moveTo(cs);
        }
    },

    GetRS: function (creep) {
        let rs = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (r) => (r.hits < r.hitsMax)
        });

        return rs;
    },

    Repair: function (creep, rs) {
        if (creep.repair(rs) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(rs);
        }
    },

    CountTick: function (creep) {
        let count = creep.memory.tickCount;
        let max = 7;
        if (count == max) {
            count = 0;
            creep.memory.tickCount = count;
            return true;
        }
        else if (count == (max - 1)) {
            count++;
            creep.memory.tickCount = count;
            return true;
        }
        else {
            count++;
            creep.memory.tickCount = count;
            return false;
        }
    }
};