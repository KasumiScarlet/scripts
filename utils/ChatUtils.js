script.import("utils/MSTimer.js");
script.import("utils/FileUtils.js");

var Random = Java.type("java.util.Random");

/**
 * @static
 * @constant
 * @type {MSTimer}
 * for AutoAbuse, AutoL
 */
var CHAT_TIMER = new MSTimer();

/**
 * @param {Number?} maxLength limit length
 * @returns {String} a random abuse string
 */
function getAbuse(maxLength) {
    if (maxLength) {
        var buffer = abuse.filter(function (s) { return s.length <= maxLength; });
        return buffer.length ? buffer[new Random().nextInt(buffer.length)] : "";
    } else {
        return abuse[new Random().nextInt(abuse.length)];
    }
}