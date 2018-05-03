var harvestAction = require('action.harvester');
var action = require('action.builder');

module.exports = {
    run: function (creep) {

        let canSay = action.CountTick(creep);

        if (harvestAction.Gathering(creep) == true) {
            let container = harvestAction.GetFullContainer(creep);
            if (container != undefined)
            {
                if (canSay) creep.say("⚡");
                harvestAction.Withdraw(creep, container);
            }
            else
            {
                let source = harvestAction.GetSource(creep);
                if (source != undefined) {
                    if (canSay) creep.say("⚡");
                    harvestAction.Harvest(creep, source);
                }
                else {
                    if (canSay) creep.say("⚡ ✖️ 👀");
                }
            }
        }
        else
        {
            let cs = action.GetCS(creep);
            if (cs != undefined)
            {
                if (canSay) creep.say("🔨");
                action.Build(creep, cs);
            }
            else
            {
                let rs = action.GetRS(creep);
                if (rs != undefined)
                {
                    if (canSay) creep.say("🔧");
                    action.Repair(creep, rs);
                }
                else
                {
                    if (canSay) creep.say("☕");
                }
            }
        }
    }
};