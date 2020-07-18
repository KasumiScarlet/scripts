script.import("utils/ChatUtils.js");

var EntityLivingBase = Java.type("net.minecraft.entity.EntityLivingBase");
var EntityPlayer = Java.type('net.minecraft.entity.player.EntityPlayer');
var S02PacketChat = Java.type('net.minecraft.network.play.server.S02PacketChat');

var AutoL = registerScript({
    name: "AutoL",
    version: "3.0",
    authors: ["Kasumi Scarlet"]
});

/**
 * @type {EntityLivingBase?}
 */
var target = null;

AutoL.registerModule({
    name: "AutoL",
    description: "Automatically ridicule the player you killed.",
    category: "Player",
    settings: {
        delay: Setting.integer({
            name: "Delay",
            default: 1000,
            min: 0,
            max: 5000
        }),
        mode: Setting.list({
            name: "Mode",
            values: ["TargetHealth", "PacketChat"],
            default: "TargetHealth"
        }),
        onlyPlayer: Setting.boolean({
            name: "OnlyPlayer",
            default: true
        }),
        prefix: Setting.text({
            name: "Prefix",
            default: "@[Sakura]"
        }),
        suffix: Setting.text({
            name: "Suffix",
            default: "AutoL by Kasumi Scarlet on LB forums"
        }),
        abuseSuffix: Setting.boolean({
            name: "AbuseSuffix",
            default: false
        })
    },
}, function(module) {

    /**
     * @param {String} name
     */
    function sendMessage(name) {
        mc.thePlayer.sendChatMessage([module.settings.prefix.get(), name, "L", module.settings.suffix.get(), module.settings.abuseSuffix.get() && getAbuse()].filter(function(s) { return s; }).join(" "));
        CHAT_TIMER.reset();
    }

    module.on("disable", function() {
        target = null;
    });
    module.on("attack", function(event) {
        var entity = event.getTargetEntity();
        if (module.settings.onlyPlayer.get() ? entity instanceof EntityPlayer : entity instanceof EntityLivingBase)
            target = entity;
    });
    module.on("update", function() {
        module.tag = module.settings.mode.get();
        if (module.settings.mode.get() == "TargetHealth" && CHAT_TIMER.hasTimePassed(module.settings.delay.get()) && target && !target.isEntityAlive()) {
            sendMessage(target.getName());
            target = null;
        }
    });
    module.on("packet", function(event) {
        var packet = event.getPacket();
        if (module.settings.mode.get() == "PacketChat" && packet instanceof S02PacketChat && CHAT_TIMER.hasTimePassed(module.settings.delay.get())) {
            var message = packet.getChatComponent().getFormattedText();

            if (message.match(mc.thePlayer.getName())) {
                for (var index in mc.theWorld.playerEntities) {
                    var name = mc.theWorld.playerEntities[index].getName()
                    if (message.match(name) && name != mc.thePlayer.getName()) {
                        sendMessage(name);
                        return;
                    }
                }
            }
        }
    });
});

/**AutoL Update logs
 * v2.11 change parts settings check from 'if...else' to '? :'
 *       start to write change logs XD
 * v2.12 add more modes
 * v2.13 share abusing text with AutoAbuse module by importing AbuseUtils
 * v2.14 add Entity instanceof EntityPlayer check
 * v2.15 remake Huayuting mode, uses S02PacketChat 
 * v2.16 add English abuse text 
 * v2.17 change Huayuting check from find in last targets to find in the world's players 
 * v2.18 replace 'Mode' (HYT, Hypixel, Normal; to 3 kinds of prefixes) 
 *         with 'CheckMode' (TargetHealth, PacketChat; to 2 kinds of check modes);
 *       add delay setting by using namespace MSTimer from LiquidBounce
 *       change description
 * v2.19 recode, uses more simple code
 * v3.0 update to new ScriptAPI
**/