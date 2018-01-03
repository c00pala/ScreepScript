module.exports = {
    run: function(creep)
    {
      var name = creep.name;
      var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

      if (creep.hits < creep.hitsMax)
      {
        creep.heal(creep);
      }

      if (enemy != undefined)
      {
        var ra = creep.attack(enemy);
        if (ra  == ERR_NOT_IN_RANGE)
        {
          creep.moveTo(enemy.pos);
        }
      }
      else
      {
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
          if (creep.room.name == creep.memory.home)
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
                    creep.memory.upgrading = true;
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
          else
          {
            var exit = creep.room.findExitTo(creep.memory.home);
            creep.moveTo(creep.pos.findClosestByRange(exit));
          }

        }
        else
        {
          if (creep.room.name == creep.memory.sourceRoom)
          {
            var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);

            if (creep.harvest(source) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(source);
            }
          }
          else
          {
              var exit = creep.room.findExitTo(creep.memory.sourceRoom);
              creep.moveTo(creep.pos.findClosestByRange(exit));
          }
        }
      }
    }
};
