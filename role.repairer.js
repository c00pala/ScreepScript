module.exports = {

    run: function(creep)
    {
        if (creep.memory.gathering == false && creep.carry.energy == 0)
    	{
    	    creep.memory.gathering = true;
    	}
    	else if (creep.memory.gathering == true && creep.carry.energy == creep.carryCapacity)
    	{
    	    creep.memory.gathering = false;
    	}

        if (creep.memory.gathering == true)
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
            else
            {
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
          	    if (creep.harvest(source) == ERR_NOT_IN_RANGE)
          	    {
          	        creep.moveTo(source);
          	    }
            }
        }
        else
        {
            var repSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    	        filter: (rep) => (rep.hits < rep.hitsMax) && rep.structureType != STRUCTURE_WALL
    	    });

    	    if (repSite != undefined)
    	    {
    	        if (creep.repair(repSite) == ERR_NOT_IN_RANGE)
    	        {
    	            creep.moveTo(repSite);
    	        }
    	    }
    	    else
    	    {
    	        repSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    	           filter: (rep) => rep.structureType == STRUCTURE_WALL && (rep.hits < (rep.hitsMax * 0.0005))
                });

                if (repSite != undefined)
                {
                    if (creep.repair(repSite) == ERR_NOT_IN_RANGE)
        	        {
        	            creep.moveTo(repSite);
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
    }

};
