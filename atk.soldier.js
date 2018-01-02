module.exports = {

    run: function(creep)
    {
        if (creep.memory.role == "rangedsoldier")
        {
          var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

          if (enemy == undefined)
          {
            for (let name in Game.creeps)
            {
                var lCreep = Game.creeps[name];

                if (lCreep.memory.role == "rangedleader" || lCreep.memory.role == "leader")
                {
                  creep.memory.leaderCreep = lCreep;
                }
            }

            if (creep.memory.leaderCreep != undefined)
            {
              if (creep.hits < creep.hitsMax)
              {
                creep.heal(creep);
              }

              var distToLeader = creep.pos.getRangeTo(creep.memory.leaderCreep.pos.x, creep.memory.leaderCreep.pos.y);

              if (distToLeader > 5)
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
                  var movePos = new RoomPosition(lPos.x + x, lPos.y + y, creep.memory.leaderCreep.room.name);
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
            var ra = creep.rangedAttack(enemy);
            if (ra  == ERR_NOT_IN_RANGE)
            {
              creep.moveTo(enemy.pos);
            }
          }
        }
        else
        {
          var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

          if (enemy == undefined)
          {
            for (let name in Game.creeps)
            {
                var lCreep = Game.creeps[name];

                if (lCreep.memory.role == "rangedleader" || lCreep.memory.role == "leader")
                {
                  creep.memory.leaderCreep = lCreep;
                }
            }

            if (creep.memory.leaderCreep != undefined) {

              if (creep.hits < creep.hitsMax)
              {
                creep.heal(creep);
              }

              var distToLeader = creep.pos.getRangeTo(creep.memory.leaderCreep.pos.x, creep.memory.leaderCreep.pos.y);

              if (distToLeader > 5)
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
                  var movePos = new RoomPosition(lPos.x + x, lPos.y + y, creep.memory.leaderCreep.room.name);
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
            var a = creep.attack(enemy);
            if (a  == ERR_NOT_IN_RANGE)
            {
              creep.moveTo(enemy.pos);
            }
          }
        }
      }


};
