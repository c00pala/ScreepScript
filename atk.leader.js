module.exports = {
    run: function(creep)
    {
      var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

      if (enemy == undefined)
      {
        if (creep.hits < creep.hitsMax)
        {
          creep.heal(creep);
        }

        var x = Math.floor((Math.random() * 49) + 1);
        var y = Math.floor((Math.random() * 49) + 1);

        /*if (Math.floor((Math.random() * 10) + 1) > 5)
        {
          x = -x;
        }

        if (Math.floor((Math.random() * 10) + 1) > 5)
        {
          y = -y;
        }*/

        //creep.memory.movePos = undefined;
        if (creep.memory.movePos == undefined)
        {
          var moveToNewRoom = true;
          var posRoom = creep.room.name;

          if (moveToNewRoom)
          {
            rnd = Math.floor((Math.random() * 100) + 1);

            if (rnd <= 10)
            {
              console.log(creep.name + " is returning home.");
              posRoom = "W2N2";
            }
            else if (rnd <= 30)
            {
              var curRoom = posRoom;

              var l1 = curRoom.substring(0,1);
              var n1 = curRoom.substring(1,2);
              var l2 = curRoom.substring(2,3);
              var n2 = curRoom.substring(3);

              var n1Int = parseInt(n1);
              var n2Int = parseInt(n2);

              var r1 = Math.floor((Math.random() * 1) + 1);
              var r2 = Math.floor((Math.random() * 1) + 1);

              if (Math.floor((Math.random() * 10) + 1) > 5)
              {
                r1 = -r1;
              }

              if (Math.floor((Math.random() * 10) + 1) > 5)
              {
                r2 = -r2;
              }

              var newRoom = l1 + (n1Int + r1) + l2 + (n2Int + r2);
              posRoom = newRoom;
              console.log(creep.name + " currently in " + creep.room.name + " is moving to new room " + posRoom);
            }
          }

          const newPos = new RoomPosition((x), (y), posRoom);
          creep.memory.movePos = newPos;
        }
        else
        {
          var dist = creep.pos.getRangeTo(creep.memory.movePos.x, creep.memory.movePos.y);

          if (dist <= 1)
          {
            console.log(creep.name + " has reached move target in room " + creep.room.name);
              creep.memory.movePos = undefined;
          }
          else
          {
            const np = new RoomPosition((creep.memory.movePos.x), (creep.memory.movePos.y), creep.memory.movePos.roomName);

            if (creep.room.name == creep.memory.movePos.roomName)
            {
              var m = creep.moveTo(np);

              if (m == ERR_NO_PATH)
              {
                creep.memory.movePos = undefined;
              }
            }
            else
            {
                var exit = creep.room.findExitTo(creep.memory.movePos.roomName);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
          }
        }
      }
      else
      {
        creep.memory.movePos = undefined;

        if (creep.memory.role == "rangedleader")
        {
          var a = creep.rangedAttack(enemy);
          if (a  == ERR_NOT_IN_RANGE)
          {
            creep.moveTo(enemy.pos);
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
