module.exports = {
    run: function(creep)
    {
      var home = creep.memory.home;
      var exits = [FIND_EXIT_TOP, FIND_EXIT_BOTTOM, FIND_EXIT_LEFT, FIND_EXIT_RIGHT];

      HealMe(creep);
      AttackNow(creep);

      if (GatheringCheck(creep) == true)
      {
        if (creep.room.name != home)
        {
          BuildRoad(creep);
        }

        if (SourceCheck(creep) == false)
        {
          var exit = exits[Math.floor(Math.random() * exits.length)];
          FindExit(creep, exit, false);
        }
      }
      else
      {
        if (creep.room.name == home)
        {
          if (EnergyStructCheck(creep) == false)
          {
            if (ContainerCheck(creep) == false)
            {
              if (ConstructionCheck(creep) == false)
              {
                UpgradeRoom(creep);
              }
            }
          }
        }
        else
        {
          if (RepairRoadCheck(creep) == false)
          {
            if (ConstructionCheck(creep) == false)
            {
              BuildRoad(creep);

              var exit = exits[Math.floor(Math.random() * exits.length)];
              FindExit(creep, exit, true);
            }
          }
        }
      }
    }
};

function BuildRoad(creep)
{
  creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
};

function RepairRoadCheck(creep)
{
  var repFound = false;

  var repSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: (rep) => (rep.hits < rep.hitsMax) && rep.structureType == STRUCTURE_ROAD
  });

  if (repSite != undefined)
  {
    if (creep.pos.getRangeTo(repSite) <= 0)
    {
      repFound = true;
      creep.memory.currentExit = undefined;

      if (creep.repair(repSite) == ERR_NOT_IN_RANGE)
      {
          creep.moveTo(repSite);
      }
    }
  }

  return repFound;
};

function ContainerCheck(creep)
{
  var contFound = false;
  var containerStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
  filter: (s) =>
  (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE)
  && s.store[RESOURCE_ENERGY] < s.storeCapacity
  });

  if (containerStructure != undefined)
  {
    contFound = true;
    creep.memory.currentExit = undefined;

    if (creep.transfer(containerStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
    {
        creep.moveTo(containerStructure);
    }
  }

  return contFound;
};

function EnergyStructCheck(creep)
{
  var structFound = false;
  var energyStructure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
      filter: (e) =>
      (e.structureType == STRUCTURE_SPAWN || e.structureType == STRUCTURE_EXTENSION || e.structureType == STRUCTURE_TOWER)
      && e.energy < e.energyCapacity
  });

  if (energyStructure != undefined)
  {
    structFound = true;
    creep.memory.currentExit = undefined;

    if (creep.transfer(energyStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
    {
        creep.moveTo(energyStructure);
    }
  }

  return structFound;
};

function ConstructionCheck(creep)
{
  var constructionFound = false;

  var closestConstSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

  if (closestConstSite != undefined)
  {
    constructionFound = true;
    creep.memory.currentExit = undefined;
    if (creep.build(closestConstSite) == ERR_NOT_IN_RANGE)
    {
      creep.moveTo(closestConstSite);
    }
  }

  return constructionFound;
};

function UpgradeRoom(creep)
{
  if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
  {
      creep.moveTo(creep.room.controller);
  }
};

function FindExit(creep, exit, goingHome)
{
  if (goingHome == true)
  {
    var home = creep.memory.home;
    var newExit = creep.room.findExitTo(home);
    creep.moveTo(creep.pos.findClosestByPath(newExit));
  }
  else
  {
    if (creep.memory.currentExit == undefined)
    {
      creep.memory.currentExit = exit;
    }

    var newExit = creep.pos.findClosestByPath(creep.memory.currentExit);
    if (newExit == ERR_NO_PATH || newExit == undefined)
    {
      creep.memory.currentExit = undefined;
    }
    else
    {
      creep.moveTo(newExit);
    }
  }
};

function SourceCheck(creep)
{
  var foundSource = false;
  var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

  if (source != undefined)
  {
    foundSource = true;
    creep.memory.currentExit = undefined;

    if (creep.harvest(source) == ERR_NOT_IN_RANGE)
    {
      creep.moveTo(source);
    }
  }

  return foundSource;
};

function AttackNow(creep)
{
  var enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

  if (enemy != undefined)
  {
    if (creep.attack(enemy) == ERR_NOT_IN_RANGE)
    {
      creep.moveTo(enemy.pos);
    }
  }
};

function GatheringCheck(creep)
{
  // Start checks - is gathering?
  if (creep.memory.gathering == false && creep.carry.energy == 0)
  {
      creep.memory.gathering = true;
      creep.memory.upgrading = false;
  }
  else if (creep.memory.gathering == true && creep.carry.energy == creep.carryCapacity)
  {
      creep.memory.gathering = false;
  }

  var isGathering = creep.memory.gathering;
  return isGathering;
};

function HealMe(creep)
{
  if (creep.hits < creep.hitsMax)
  {
    creep.heal(creep);
  }
};
