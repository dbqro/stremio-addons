const {serveHTTP} = require("stremio-addon-sdk");
const addonInit = require("./addon");

addonInit().then((addonInterface) => {
    serveHTTP(addonInterface, {port: 58362});
});