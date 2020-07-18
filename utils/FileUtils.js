var File = Java.type("java.io.File");
var FileReader = Java.type("java.io.FileReader");
var FileInputStream = Java.type("java.io.FileInputStream");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var BufferedReader = Java.type("java.io.BufferedReader");
var PrintWriter = Java.type("java.io.PrintWriter");
var Collectors = Java.type("java.util.stream.Collectors");

var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");

/**
 * @constant
 * @static
 * @type {File}
 */
var scriptsDir = LiquidBounce.scriptManager.scriptsFolder;

//CHAT
var chatJson = new File(scriptsDir, "chat.json");

/**
 * @type {JSON}
 */
var chats = parseJson(chatJson);

/**
 * @type {Array<String>} 
 */
var abuse = chats["Abuse"];
var filter = chats["Filter"];

//CHAT END

/**
 * @static
 * @param {File} file file to be read
 * @return {JSON} jsonObject
 */
function parseJson(file) {
    return JSON.parse(new BufferedReader(new InputStreamReader(new FileInputStream(file), "utf-8")).lines().reduce(function(s1, s2) { return s1 + s2; }).orElse("{}"));
}

function saveChat() {
    chatJson.exists() || chatJson.createNewFile();
    var pw = new PrintWriter(chatJson, "utf-8");
    pw.write(JSON.stringify({"Abuse": abuse, "Filter": filter}));
    pw.close();
}