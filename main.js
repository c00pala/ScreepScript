var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');

require('manager.spawner')();

module.exports.loop = function ()
{
    SpawnCheck();

    for (let c in Memory.creeps)
    {
        if (Game.creeps[c] == undefined)
        {
            delete Memory.creeps[c];
        }
    }

    for (let name in Game.creeps)
    {
        let creep = Game.creeps[name];

        if (creep.memory.role == "harvester")
        {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == "builder")
        {
            roleBuilder.run(creep);
        }

        if (creep.ticksToLive == 1) {
            console.log(name + " is dying.");
        }
    }
}

function SpawnCheck()
{
    let spawn = Game.spawns['Spawn1'];
    let minHarvesters = 5;
    let minBuilders = 2;

    let harvesterPop = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
    let builderPop = _.sum(Game.creeps, (c) => c.memory.role == "builder");

    let spawnEnergy = spawn.room.energyCapacityAvailable;

    if (harvesterPop == 0)
    {
        spawn.customCreep(spawn.energyCapacity, "harvester");
    }
    else if (harvesterPop < minHarvesters)
    {
        spawn.customCreep(spawnEnergy, "harvester");
    }
    else if (builderPop < minBuilders)
    {
        spawn.customCreep(spawnEnergy, "builder");
    }
}