const crypto = require("crypto")

exports.get6RandomStrings = () => {
    var id = crypto.randomBytes(6).toString('hex');
    return id;
}