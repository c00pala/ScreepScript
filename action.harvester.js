module.exports = {

    Gathering: function (creep) {
        if (creep.memory.gathering == false && creep.carry.energy == 0) {
            creep.memory.gathering = true;
        }
        else if (creep.memory.gathering == true && creep.carry.energy == creep.carryCapacity) {
            creep.memory.gathering = false;
        }

        let isGathering = creep.memory.gathering;
        return isGathering;
    },

    GetSource: function (creep) {
        let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        return source;
    },

    Harvest: function (creep, source) {
        if (creep.harvest(source) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(source);
        }
    },

    GetES: function (creep) {
        let energyStructure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (e) =>
                (e.structureType == STRUCTURE_SPAWN || e.structureType == STRUCTURE_EXTENSION || e.structureType == STRUCTURE_TOWER)
                && e.energy < e.energyCapacity
        });
        return energyStructure;
    },

    GetContainer: function (creep) {
        let cont = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (c) => (c.structureType == STRUCTURE_CONTAINER) && c.store[RESOURCE_ENERGY] < c.storeCapacity
        });
        return cont;
    },

    GetFullContainer: function (creep) {
        let cont = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (c) => (c.structureType == STRUCTURE_CONTAINER) && c.store[RESOURCE_ENERGY] > 0
        });
        return cont;
    },

    Withdraw: function (creep, container) {
        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(container);
        }
    },

    Transfer: function (creep, es) {
        if (creep.transfer(es, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(es);
        }
    },

    Upgrade: function (creep) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(creep.room.controller);
        }
    },

    CountTick: function (creep) {
        let count = creep.memory.tickCount;
        let max = 7;
        if (count == max)
        {
            count = 0;
            creep.memory.tickCount = count;
            return true;
        }
        else if (count == (max - 1))
        {
            count++;
            creep.memory.tickCount = count;
            return true;
        }
        else
        {
            count++;
            creep.memory.tickCount = count;
            return false;
        }
    }
};


