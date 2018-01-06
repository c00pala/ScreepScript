module.exports = {
    run: function(creep)
    {
        var name = creep.name;
        if (creep.memory.gathering == false && creep.carry.energy == 0)
    	{
    	    creep.memory.gathering = true;
    	    creep.memory.upgrading = false;
    	}
    	else if (creep.memory.gathering == true && creep.carry.energy == creep.carryCapacity)
    	{
    	    creep.memory.gathering = false;
    	}

    	if (creep.memory.gathering == false)
    	{
    	    var closestConstSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

    	    if ((closestConstSite != undefined) && creep.room.energyAvailable >= creep.room.energyCapacityAvailable && creep.memory.canBuild == true)
    	    {
    	        if (creep.build(closestConstSite) == ERR_NOT_IN_RANGE)
    	        {
    	            creep.moveTo(closestConstSite);
    	        }
    	    }
    	    else
    	    {
            var energyStructure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (e) =>
                (e.structureType == STRUCTURE_SPAWN || e.structureType == STRUCTURE_EXTENSION || e.structureType == STRUCTURE_TOWER)
                && e.energy < e.energyCapacity
            });

            if (energyStructure != undefined)
            {
                if (creep.transfer(energyStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(energyStructure);
                }
            }
            else
            {
              if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
              {
                  creep.moveTo(creep.room.controller);
              }
            }
    	    }
    	}
    	else
    	{
        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

        if (source == undefined)
        {
          var containerStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (c) =>
          (c.structureType == STRUCTURE_CONTAINER || c.structureType == STRUCTURE_STORAGE)
          && c.store[RESOURCE_ENERGY] > 0
          });

          if (containerStructure != undefined)
          {
              if (creep.withdraw(containerStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
              {
                  creep.moveTo(containerStructure);
              }
          }
        }
        else
        {
          if (creep.harvest(source) == ERR_NOT_IN_RANGE)
          {
              creep.moveTo(source);
          }
        }
    }
  }
};
