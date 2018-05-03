var roleHarvester = require('role.harvester');
var roleAltHarvester = require('role.altharvester');
var roleBuilder = require('role.builder');
var roleTower = require('role.tower');
var roleUpgrader = require('role.upgrader');

require('manager.spawner')();

module.exports.loop = function ()
{
    SpawnCheck();
    TowerCheck();

    for (let c in Memory.creeps)
    {
        if (Game.creeps[c] == undefined)
        {
            delete Memory.creeps[c];
        }
    }

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        if (creep.memory.role == "harvester") {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == "altharvester") {
            roleAltHarvester.run(creep);
        }
        else if (creep.memory.role == "builder") {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == "upgrader")
        {
            roleUpgrader.run(creep);
        }

        if (creep.ticksToLive == 1) {
            console.log(name + " is dying.");
        }
    }
}

function TowerCheck()
{
    let spawn = Game.spawns['Spawn1'];
    let enemy = spawn.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    let rs = spawn.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (r) => (r.hits < r.hitsMax)
    });

    var towers = spawn.room.find(FIND_STRUCTURES, {
        filter: (t) => t.structureType == STRUCTURE_TOWER
    });

    for (let tower of towers) {
        if (tower.energy >= 10)
        {
            if (enemy != undefined) roleTower.Attack(tower, enemy);
            else if (rs != undefined) roleTower.Repair(tower, rs);
        }
    }
}

function SpawnCheck()
{
    let spawn = Game.spawns['Spawn1'];
    let minHarvesters = 6;
    let minBuilders = 1;
    let minUpgraders = 1;

    let harvesterPop = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
    let builderPop = _.sum(Game.creeps, (c) => c.memory.role == "builder");
    let upgraderPop = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");

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
    else if (upgraderPop < minUpgraders)
    {
        spawn.customCreep(spawnEnergy, "upgrader");
    }
}