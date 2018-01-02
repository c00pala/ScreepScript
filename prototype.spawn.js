module.exports = function() {

    StructureSpawn.prototype.customCreep =
        function(energy, roleName)
        {
            if (roleName == "harvester")
            {
                var noOfWork = Math.floor((energy * 0.30) / 100) + 1;
                var noOfCarry = Math.floor((energy * 0.20) / 50);
                var noOfMove = Math.floor((energy * 0.4) / 50);
                var body = [];

                for (let i = 0; i < noOfWork; i++)
                {
                    body.push(WORK);
                }
                for (let i = 0; i < noOfCarry; i++)
                {
                    body.push(CARRY);
                }
                for (let i = 0; i < noOfMove; i++)
                {
                    body.push(MOVE);
                }

                var rnd = Math.floor((Math.random() * 10));
                var newName;

                if (rnd >= 5)
                {
                    newName = this.createCreep(body, "Worker #" + Memory.harvesterCount + " - mk" + body.length, {role: roleName, gathering: false, ungrading: false, canBuild: false});
                }
                else
                {
                    newName = this.createCreep(body, "Worker #" + Memory.harvesterCount + " - mk" + body.length, {role: roleName, gathering: false, ungrading: false, canBuild: true});
                }

                if (newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY)
                {
                  console.log("Created new harvester creep: " + newName);
                    Memory.harvesterCount++;
                }

                return newName;
            }
            else if (roleName == "repairer")
            {
                var noOfWork = Math.floor((energy * 0.25) / 100);
                var noOfCarry = Math.floor((energy * 0.25) / 50);
                var noOfMove = Math.floor((energy * 0.5) / 50);
                var body = [];

                for (let i = 0; i < noOfWork; i++)
                {
                    body.push(WORK);
                }
                for (let i = 0; i < noOfCarry; i++)
                {
                    body.push(CARRY);
                }
                for (let i = 0; i < noOfMove; i++)
                {
                    body.push(MOVE);
                }

                var newName = this.createCreep(body, "Repairer #" + Memory.repairerCount + " - mk" + body.length, {role: roleName, gathering: false});
                if (newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY)
                {
                  console.log("Created new repairer creep: " + newName);
                    Memory.repairerCount++;
                }

                return newName;
            }
            else if (roleName == "rangedleader")
            {
                var noOfRangedAttack = Math.floor((energy * 0.35) / 150);
                var noOfTough = Math.floor((energy * 0.05) / 10);
                var noOfMove = Math.floor((energy * 0.6) / 50);
                var body = [];

                for (let i = 0; i < noOfRangedAttack; i++)
                {
                    body.push(RANGED_ATTACK);
                }
                for (let i = 0; i < noOfTough; i++)
                {
                    body.push(TOUGH);
                }
                for (let i = 0; i < noOfMove; i++)
                {
                    body.push(MOVE);
                }

                var newName = this.createCreep(body, "RangedLeader #" + Memory.leaderCount + " - mk" + body.length, {role: roleName, movePos: undefined});
                if (newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY)
                {
                  console.log("Created new rangedleader creep: " + newName);
                    Memory.leaderCount++;
                }

                return newName;
            }
            else if (roleName == "leader")
            {
              var noOfAttack = Math.floor((energy * 0.35) / 150);
              var noOfTough = Math.floor((energy * 0.05) / 10);
              var noOfMove = Math.floor((energy * 0.45) / 50);
              var body = [];

              for (let i = 0; i < noOfAttack; i++)
              {
                  body.push(ATTACK);
              }
              for (let i = 0; i < noOfTough; i++)
              {
                  body.push(TOUGH);
              }
              for (let i = 0; i < noOfMove; i++)
              {
                  body.push(MOVE);
              }

              body.push(HEAL);

              var newName = this.createCreep(body, "RangedLeader #" + Memory.leaderCount + " - mk" + body.length, {role: roleName, movePos: undefined});

              if (newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY)
              {
                console.log("Created new rangedleader creep: " + newName);
                  Memory.leaderCount++;
              }

              return newName;
            }
            else if (roleName == "rangedsoldier")
            {
              var noOfRangedAttack = Math.floor((energy * 0.35) / 150);
              var noOfTough = Math.floor((energy * 0.05) / 10);
              var noOfMove = Math.floor((energy * 0.45) / 50);
              var body = [];

              for (let i = 0; i < noOfRangedAttack; i++)
              {
                  body.push(RANGED_ATTACK);
              }
              for (let i = 0; i < noOfTough; i++)
              {
                  body.push(TOUGH);
              }
              for (let i = 0; i < noOfMove; i++)
              {
                  body.push(MOVE);
              }

              body.push(HEAL);

              var newName = this.createCreep(body, "RangedSoldier #" + Memory.soldierCount + " - mk" + body.length, {role: roleName});
              if (newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY)
              {
                console.log("Created new rangedsoldier creep: " + newName);
                  Memory.soldierCount++;
              }

              return newName;
            }
        };
};
