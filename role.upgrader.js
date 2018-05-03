var action = require('action.harvester');

module.exports = {
    run: function (creep) {
        let canSay = action.CountTick(creep);

        if (action.Gathering(creep) == true) {
            let container = action.GetFullContainer(creep);
            if (container != undefined) {
                if (canSay) creep.say("⚡");
                action.Withdraw(creep, container);
            }
            else {
                let source = action.GetSource(creep);
                if (source != undefined) {
                    if (canSay) creep.say("⚡");
                    action.Harvest(creep, source);
                }
                else {
                    if (canSay) creep.say("⚡ ✖️ 👀");
                }
            }
        }
        else {
            if (canSay) creep.say("☢︎");
            action.Upgrade(creep);
        }
    }
};