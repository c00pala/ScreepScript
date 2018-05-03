module.exports = {
    Attack: function (tower, enemy) {
        tower.attack(enemy);
    },

    Repair: function (tower, site) {
        tower.repair(site);
    }
};