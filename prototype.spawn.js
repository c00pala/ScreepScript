module.exports = function() {

    StructureSpawn.prototype.customCreep =
        function(energy, roleName)
        {
            if (roleName == "harvester")
            {
                var noOfWork = Math.floor((energy * 0.35) / 100);
                var tempEnergy = (energy - (noOfWork * 100));
                var noOfCarry = Math.floor((tempEnergy * 0.5) / 50);
                var noOfMove = Math.floor((tempEnergy * 0.5) / 50);
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

                var rnd = Math.floor((Math.random() * 10) + 1);
                var newName;

                if (rnd > 5)
                {
                    newName = this.createCreep(body, "Worker #" + Memory.harvesterCount + " - mk" + body.length, {role: roleName, gathering: false, ungrading: false, canBuild: false});
                }
                else
                {
                    newName = this.createCreep(body, "Builder #" + Memory.harvesterCount + " - mk" + body.length, {role: roleName, gathering: false, ungrading: false, canBuild: true});
                }

                if (newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY)
                {
                  console.log("Creep spawned: " + newName);
                  console.log("Cost: " + ((noOfWork * 100) + (noOfCarry * 50) + (noOfMove * 50)) + " energy.");
                    Memory.harvesterCount++;
                }

                return newName;
            }
            else if (roleName == "longharvester")
            {
              var noOfWork = Math.floor((energy * 0.3) / 100);
              energy -= (noOfWork * 100);
              var noOfCarry = Math.floor((energy * 0.25) / 50);
              var noOfMove = Math.floor((energy * 0.50) / 50);
              energy -= ((noOfCarry * 50) + (noOfMove * 50));

              var noOfAttack = 0;
              var noOfHeal = 0;

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

              if (energy >= 150)
              {
                body.push(ATTACK);
                energy - 150;
                noOfAttack++;
              }
              if (energy >= 250)
              {
                body.push(HEAL);
                noOfHeal++;
              }

              var newName;
              var rnd = Math.floor((Math.random() * 4));
              if (rnd == 0)
              {
                newName = this.createCreep(body, "W8N2-Worker #" + Memory.longHarvesterCount + " - mk" + body.length, {role: roleName, gathering: false, ungrading: false, home: 'W8N3', sourceRoom: 'W8N2'});
              }
              else if (rnd == 1)
              {
                newName = this.createCreep(body, "W7N3-Worker #" + Memory.longHarvesterCount + " - mk" + body.length, {role: roleName, gathering: false, ungrading: false, home: 'W8N3', sourceRoom: 'W7N3'});
              }
              else if (rnd == 2)
              {
                newName = this.createCreep(body, "W7N2-Worker #" + Memory.longHarvesterCount + " - mk" + body.length, {role: roleName, gathering: false, ungrading: false, home: 'W8N3', sourceRoom: 'W7N2'});
              }
              else
              {
                newName = this.createCreep(body, "W7N2-Worker #" + Memory.longHarvesterCount + " - mk" + body.length, {role: roleName, gathering: false, ungrading: false, home: 'W8N3', sourceRoom: 'W7N4'});
              }

              if (newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY)
              {
                console.log("Creep spawned: " + newName);
                console.log("Cost: " + ((noOfWork * 100) + (noOfCarry * 50) + (noOfMove * 50)) + (noOfAttack * 150) + (noOfHeal * 250) + " energy.");
                  Memory.longHarvesterCount++;
              }

              return newName;
            }
            else if (roleName == "repairer")
            {
                var noOfWork = Math.floor((energy * 0.35) / 100);
                energy -= noOfWork * 100;
                var noOfCarry = Math.floor((energy * 0.5) / 50);
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
                  console.log("Creep spawned: " + newName);
                  console.log("Cost: " + ((noOfWork * 100) + (noOfCarry * 50) + (noOfMove * 50)) + " energy.");
                    Memory.repairerCount++;
                }

                return newName;
            }
            else if (roleName == "rangedleader")
            {
                var noOfRangedAttack = Math.floor((energy * 0.5) / 150);
                energy -= noOfRangedAttack * 150;
                var noOfTough = Math.floor((energy * 0.2) / 10);
                var noOfMove = Math.floor((energy * 0.8) / 50);
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
                  console.log("Creep spawned: " + newName);
                  console.log("Cost: " + ((noOfRangedAttack * 150) + (noOfTough * 10) + (noOfMove * 50)) + " energy.");
                    Memory.leaderCount++;
                }

                return newName;
            }
            else if (roleName == "leader")
            {
              var noOfAttack = Math.floor((energy * 0.5) / 150);
              energy -= noOfAttack * 150;
              var noOfTough = Math.floor((energy * 0.2) / 10);
              var noOfMove = Math.floor((energy * 0.8) / 50);
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

              var newName = this.createCreep(body, "RangedLeader #" + Memory.leaderCount + " - mk" + body.length, {role: roleName, movePos: undefined});

              if (newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY)
              {
                console.log("Creep spawned: " + newName);
                console.log("Cost: " + ((noOfAttack * 150) + (noOfTough * 10) + (noOfMove * 50)) + " energy.");
                  Memory.leaderCount++;
              }

              return newName;
            }
            else if (roleName == "rangedsoldier")
            {
              var noOfRangedAttack = Math.floor((energy * 0.5) / 150);
              energy -= noOfRangedAttack * 150;
              var noOfTough = Math.floor((energy * 0.05) / 10);
              var noOfMove = Math.floor((energy * 0.5) / 50);
              energy -= ((noOfTough * 10) + (noOfMove * 50));

              var noOfHeal = 0;

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

              if (energy >= 250)
              {
                body.push(HEAL);
                noOfHeal++;
              }

              var newName = this.createCreep(body, "RangedSoldier #" + Memory.soldierCount + " - mk" + body.length, {role: roleName});
              if (newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY)
              {
                console.log("Creep spawned: " + newName);
                console.log("Cost: " + ((noOfRangedAttack * 150) + (noOfTough * 10) + (noOfMove * 50) + (noOfHeal * 250)) + " energy.");
                  Memory.soldierCount++;
              }

              return newName;
            }
        }
};
