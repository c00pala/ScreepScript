var roleHarvester = require('role.harvester');
var roleRepairer = require('role.repairer');
var conTower = require('atk.tower');

require('prototype.spawn')();

module.exports.loop = function()
{
    var minHarvesters = 5;
    var minRepairers = 3;
    
    var spawnEnergy = Game.spawns.Home1.room.energyCapacityAvailable;
    
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
    
    var towers = Game.rooms.W22N41.find(FIND_STRUCTURES, {
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
    }
    else if (repairerPop < minRepairers)
    {
        var newName = Game.spawns.Home1.customCreep(spawnEnergy, "repairer");
    }
}