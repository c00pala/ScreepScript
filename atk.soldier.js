module.exports = {

  run: function(creep)
  {
    var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if (enemy == undefined)
    {
      if (creep.memory.leaderInt == -1 || creep.memory.leaderInt == undefined)
      {
          creep.memory.leaderInt = Math.floor((Math.random() * _.sum(Game.creeps, (c) => c.memory.role == "rangedleader" || c.memory.role == "leader")));
          console.log(creep.memory.leaderInt);
      }

      var allLeads = [];

      for (let name in Game.creeps)
      {
          var lCreep = Game.creeps[name];

          if (lCreep.memory.role == "rangedleader" || lCreep.memory.role == "leader")
          {
            allLeads.push(lCreep);
          }
      }

      creep.memory.leaderCreep = allLeads[creep.memory.leaderInt];

      if (creep.memory.leaderCreep == undefined)
      {
        console.log(creep.name + " cannot find leader. Searching for new.");
        creep.memory.leaderInt = -1;
      }
      else
      {
        if (creep.hits < creep.hitsMax)
        {
          creep.heal(creep);
        }

        var distToLeader = creep.pos.getRangeTo(creep.memory.leaderCreep.pos.x, creep.memory.leaderCreep.pos.y);

        if (distToLeader > 2)
        {
          var x = Math.floor((Math.random() * 1) + 1);
          var y = Math.floor((Math.random() * 1) + 1);

          if (Math.floor((Math.random() * 10) + 1) > 5)
          {
            x = -x;
          }

          if (Math.floor((Math.random() * 10) + 1) > 5)
          {
            y = -y;
          }
          var lPos = creep.memory.leaderCreep.pos;
          if (lPos != undefined)
          {
            var movePos = new RoomPosition(lPos.x, lPos.y, creep.memory.leaderCreep.room.name);
            var newMove = creep.moveTo(movePos);
          }
        }
        else {
          if (creep.memory.leaderCreep.hits < creep.memory.leaderCreep.hitsMax)
          {
            creep.heal(creep.memory.leaderCreep);
          }
        }
      }
    }
    else
    {
      if (creep.memory.role == "rangedsoldier")
      {
        var ra = creep.rangedAttack(enemy);
        if (ra  == ERR_NOT_IN_RANGE)
        {
          creep.moveTo(enemy.pos);
        }
      }
      else
      {
        var ra = creep.attack(enemy);
        if (ra  == ERR_NOT_IN_RANGE)
        {
          creep.moveTo(enemy.pos);
        }
      }
    }
  }
};
