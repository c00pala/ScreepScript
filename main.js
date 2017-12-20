var roleHarvester = require('role.harvester');
var roleRepairer = require('role.repairer');

require('prototype.spawn')();

module.exports.loop = function()
{
    var minHarvesters = 10;
    var minRepairers = 5;
    
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
	
	if (harvesterPop < minHarvesters && Game.spawns.Home1.energy >= 300)
    {
        var newName = Game.spawns.Home1.customCreep(spawnEnergy, "harvester");
        
        if (newName == ERR_NOT_ENOUGH_ENERGY && harvesterPop == 0)
        {
            newName = Game.spawns.Home1.customCreep(Game.spawns.Home1.energyAvailable, "harvester");
        }
    }
    else if (repairerPop < minRepairers && Game.spawns.Home1.energy >= 300)
    {
        var newName = Game.spawns.Home1.customCreep(spawnEnergy, "repairer");
    }
}