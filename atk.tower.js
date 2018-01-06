module.exports = {
    run: function(tower)
    {
        var enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if (enemy != undefined && tower.energy > 10)
        {
            tower.attack(enemy);
        }
    }
};
