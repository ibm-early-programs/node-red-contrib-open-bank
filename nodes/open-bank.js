module.exports = function(RED) {
    "use strict";
   var request = require("request");

    function OpenBankNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var url  = "https://bluebank.azure-api.net/api/v0.7/accounts/";

        var id   = config.id;
        var key  = config.key;
        var auth = config.auth;

        this.on("input", function(msg) {
            var options = {
                method: "GET",
                url: url + id,
                headers: {
                    "Ocp-Apim-Subscription-Key": key,
                    "Authorization": auth
                }
            };

            var r = request(options, function(error, response, body) {
                if (error) {
                    node.error(error, msg);
                    node.status({fill:"red", shape:"ring", text:"Request failed"});
                } else {
                    var response = JSON.parse(body);
                    node.status({});
                    msg.account = body;
                    node.send(msg);
                }
            });
        });
    }
    RED.nodes.registerType("open-bank",OpenBankNode);
}
