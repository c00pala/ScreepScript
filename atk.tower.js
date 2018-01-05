module.exports = {

    run: function(s)
    {
        var enemy = s.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        s.attack(enemy);
    }

};
