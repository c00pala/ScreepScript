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
    	        if (creep.memory.upgrading == false)
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
        	            var containerStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    	                filter: (s) =>
    	                s.structureType == STRUCTURE_CONTAINER
    	                && s.store[RESOURCE_ENERGY] < s.storeCapacity
        	            });

        	            if (containerStructure != undefined)
        	            {
        	                if (creep.transfer(containerStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        	                {
        	                    creep.moveTo(containerStructure);
        	                }
        	            }
        	            else
        	            {
        	                creep.memory.upgrading = true;
        	            }
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
        var newSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        var h = creep.harvest(newSource);

        if (h != ERR_NOT_ENOUGH_RESOURCES && h != ERR_INVALID_TARGET)
        {
          if (h == ERR_NOT_IN_RANGE)
          {
              var m = creep.moveTo(newSource);
          }
        }
    }
  }
};
