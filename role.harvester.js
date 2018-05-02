var action = require('action.harvester');

module.exports = {
    run: function (creep)
    {
        let canSay = action.CountTick(creep);

        if (action.Gathering(creep) == true)
        {
            let source = action.GetSource(creep);
            if (source != undefined) {
                if (canSay) creep.say("⚡");
                action.Harvest(creep, source);
            }
            else {
                if (canSay) creep.say("⚡ ✖️ 👀");
            }
        }
        else
        {
            let es = action.GetES(creep);
            
            if (es != undefined) {
                if (canSay) creep.say("🔌");
                action.Transfer(creep, es);
            }
            else {
                if (canSay) creep.say("☢︎");
                action.Upgrade(creep);
            }
        }
    }
}