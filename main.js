var roleHarvester = require('role.harvester');
var roleRepairer = require('role.repairer');
var conTower = require('atk.tower');
var atkLeader = require('atk.leader');
var atkSoldier = require('atk.soldier');

require('prototype.spawn')();

module.exports.loop = function()
{
    var minHarvesters = 5;
    var minRepairers = 1;
    var minLeaders = 1;
    var minSoldiers = 5;

    var rnd = Math.floor((Math.random() * 10));

    if (rnd <= 1)
    {
      spawnEnergy = (Game.spawns.Home1.room.energyCapacityAvailable * 0.3);
    }
    else if (rnd <= 3) {
      spawnEnergy = (Game.spawns.Home1.room.energyCapacityAvailable * 0.6);
    }
    else if (rnd <= 5) {
      spawnEnergy = (Game.spawns.Home1.room.energyCapacityAvailable * 0.8);
    }
    else {
      spawnEnergy = (Game.spawns.Home1.room.energyCapacityAvailable);
    }

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

	    if (creep.ticksToLive == 5)
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
}
