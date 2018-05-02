module.exports = function () {
    StructureSpawn.prototype.customCreep = 
    function (energy, type)
    {
        if (type == "harvester") {
            let noOfWork = Math.floor((energy * 0.35) / 100);
            let tempEnergy = (energy - (noOfWork * 100));
            let noOfCarry = Math.floor((tempEnergy * 0.5) / 50);
            let noOfMove = Math.floor((tempEnergy * 0.5) / 50);
            let body = [];

            for (let i = 0; i < noOfWork; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < noOfCarry; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < noOfMove; i++) {
                body.push(MOVE);
            }

            let name = 'H' + Memory.harvesterCount + '-L' + body.length;
            let newName = this.spawnCreep(body, name, {memory: { role: type, gathering: true, tickCount: 0 }});
            if (newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY)
            {
                console.log("Creep spawned: " + name);
                console.log("Cost: " + ((noOfWork * 100) + (noOfCarry * 50) + (noOfMove * 50)) + " energy.");
                Memory.harvesterCount++;
            }
        }
        else if (type == "builder")
        {
            let noOfWork = Math.floor((energy * 0.35) / 100);
            let tempEnergy = (energy - (noOfWork * 100));
            let noOfCarry = Math.floor((tempEnergy * 0.5) / 50);
            let noOfMove = Math.floor((tempEnergy * 0.5) / 50);
            let body = [];

            for (let i = 0; i < noOfWork; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < noOfCarry; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < noOfMove; i++) {
                body.push(MOVE);
            }

            let name = 'B' + Memory.builderCount + '-L' + body.length;
            let newName = this.spawnCreep(body, name, { memory: { role: type, gathering: true, tickCount: 0 } });
            if (newName != ERR_NOT_ENOUGH_ENERGY && newName != ERR_BUSY) {
                console.log("Creep spawned: " + name);
                console.log("Cost: " + ((noOfWork * 100) + (noOfCarry * 50) + (noOfMove * 50)) + " energy.");
                Memory.builderCount++;
            }
        }
    }
};