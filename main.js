var roleHarvester = require('role.harvester');
var roleRepairer = require('role.repairer');
var conTower = require('atk.tower');
var atkLeader = require('atk.leader');
var atkSoldier = require('atk.soldier');
var roleLongHarvester = require('role.longharvester');

require('prototype.spawn')();

module.exports.loop = function()
{
    var minHarvesters = 6;
    var minRepairers = 2;
    var minLeaders = 0;
    var minSoldiers = 0;
    var minLongHarvesters = 20;

    var rnd = Math.floor((Math.random() * 50) + 1);
    var xplier = (50 + rnd) / 100;
    spawnEnergy = (Game.spawns.Home1.room.energyCapacityAvailable);

    // Clear creeps from memory.
    for (let c in Memory.creeps)
    {
        if (Game.creeps[c] == undefined)
        {
            delete Memory.creeps[c];
        }
    }

    var harvesterPop = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
    var repairerPop = _.sum(Game.creeps, (c) => c.memory.role == "repairer");
    var leaderPop = _.sum(Game.creeps, (c) => c.memory.role == "rangedleader" || c.memory.role == "leader");
    var soldierPop = _.sum(Game.creeps, (c) => c.memory.role == "rangedsoldier" || c.memory.role == "soldier");
    var longPop = _.sum(Game.creeps, (c) => c.memory.role == "longharvester");

    var towers = Game.spawns.Home1.room.find(FIND_STRUCTURES, {
        filter: (t) => t.structureType == STRUCTURE_TOWER
    });

    for (let tower of towers)
    {
        conTower.run(tower);
    }

	for (let name in Game.creeps)
	{
	    var creep = Game.creeps[name];

	    if (creep.memory.role == "harvester")
	    {
	        roleHarvester.run(creep);
          //creep.memory.canBuild = true;
          //creep.memory.upgrading = false;
          //creep.memory.currentSource = undefined;
	    }
	    else if (creep.memory.role == "repairer")
	    {
	        roleRepairer.run(creep);
	    }
      else if (creep.memory.role == "rangedleader" || creep.memory.role == "leader")
      {
          atkLeader.run(creep);
      }
      else if (creep.memory.role == "rangedsoldier" || creep.memory.role == "soldier")
      {
        atkSoldier.run(creep);
      }
      else if (creep.memory.role == "longharvester")
      {
        roleLongHarvester.run(creep);
      }

	    if (creep.ticksToLive == 1)
	    {
	        console.log(name + " is dying.");
	    }
	}

	if (harvesterPop < minHarvesters)
    {
        var newName = Game.spawns.Home1.customCreep(spawnEnergy, "harvester");

        if (harvesterPop == 0)
        {
            newName = Game.spawns.Home1.customCreep(Game.spawns.Home1.room.energyAvailable, "harvester");
        }

        //console.log("Harvester Spawn" + newName);
    }
    else if (leaderPop < minLeaders)
    {
      var newName = Game.spawns.Home1.customCreep(spawnEnergy, "rangedleader");
      //console.log("RangedLeader Spawn" + newName);
    }
    else if (soldierPop < minSoldiers)
    {
      var newName = Game.spawns.Home1.customCreep(spawnEnergy, "rangedsoldier");
      //console.log("RangedSoldier Spawn" + newName);
    }
    else if (repairerPop < minRepairers)
    {
        var newName = Game.spawns.Home1.customCreep(spawnEnergy, "repairer");
        //console.log("Repairer Spawn" + newName);
    }
    else if (longPop < minLongHarvesters)
    {
        var newName = Game.spawns.Home1.customCreep(spawnEnergy, "longharvester");
    }
}
