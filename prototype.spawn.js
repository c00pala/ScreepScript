module.exports = function() {
    
    StructureSpawn.prototype.customCreep = 
        function(energy, roleName)
        {
            if (roleName == "harvester")
            {
                var numOfParts = Math.floor(energy / 200)
                var body = [];
                
                for (let i = 0; i < numOfParts; i++)
                {
                    body.push(WORK);
                }
                for (let i = 0; i < numOfParts; i++)
                {
                    body.push(CARRY);
                }
                for (let i = 0; i < numOfParts; i++)
                {
                    body.push(MOVE);
                }
                
                var rnd = Math.floor((Math.random() * 10));
                
                if (rnd >= 5)
                {
                    var newName = this.createCreep(body, "Worker #" + Memory.harvesterCount + " - mk" + body.length, {role: roleName, gathering: false, ungrading: false, canBuild: false});
                }
                else
                {
                    var newName = this.createCreep(body, "Worker #" + Memory.harvesterCount + " - mk" + body.length, {role: roleName, gathering: false, ungrading: false, canBuild: true});
                }
                
                console.log("Created new harvester creep: " + newName);
                if (newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY)
                {
                    Memory.harvesterCount++;
                }
                return newName;
            }
            else if (roleName == "repairer")
            {
                var numOfParts = Math.floor(energy / 200)
                var body = [];
                
                for (let i = 0; i < numOfParts; i++)
                {
                    body.push(WORK);
                }
                for (let i = 0; i < numOfParts; i++)
                {
                    body.push(CARRY);
                }
                for (let i = 0; i < numOfParts; i++)
                {
                    body.push(MOVE);
                }
                
                var newName = this.createCreep(body, "Repairer #" + Memory.repairerCount + " - mk" + body.length, {role: roleName, gathering: false});
                console.log("Created new repairer creep: " + newName);
                if (newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY)
                {
                    Memory.repairerCount++;
                }
                
                return newName;
            }
        };
};