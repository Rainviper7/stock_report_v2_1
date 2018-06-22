const moment = require("moment")

//--number

exports.addGennerateDateFormat = function () {
    return moment().format("DD MMMM YYYY, HH:mm:ss")
}

exports.numberWithCommas = function (number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}