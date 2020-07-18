script.import("utils/ChatUtils.js");

var AutoAbuse = registerScript({
    name: "AutoAbuse",
    version: "4.0",
    authors: ["Kasumi Scarlet"]
});

AutoAbuse.registerModule({
    name: "AutoAbuse",
    description: "Automatically send abuse message.",
    category: "Misc",
    settings: {
        delay: Setting.integer({
            name: "Delay",
            default: 1000,
            min: 0,
            max: 5000
        }),
        prefix: Setting.text({
            name: "Prefix",
            default: "@[Sakura]"
        }),
        lengthLimit: Setting.boolean({
            name: "LengthLimit",
            default: false
        }),
        lengthValue: Setting.integer({
            name: "Length",
            default: 20,
            min: 1,
            max: 127
        }),
    },
}, function(module) {
    module.on("update", function() {
        if (CHAT_TIMER.hasTimePassed(module.settings.delay.get())) {
            var abuse = module.settings.lengthLimit.get() ? getAbuse(module.settings.lengthValue.get()) : getAbuse();
            mc.thePlayer.sendChatMessage(module.settings.prefix.get() ? module.settings.prefix.get() + " " + abuse : abuse);
            CHAT_TIMER.reset();
        }
    });
});