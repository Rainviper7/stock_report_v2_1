const _ = require('lodash'),
    moment = require('moment'),
    reportV2 = require('./index'),
    _data = require('./libs/stock_pdf/mock_data').data
    ;

var time = new Date,
    datetime2 = moment(time).format("DDMM_HHmmss"),
    filename = "./output/stock_pdf_" + datetime2 + ".pdf"
    ;

var params_default = {
    filePath: filename,
    data: _data
}

function build() {

    new reportV2.stockReport(params_default, function (filePath) {
        console.log("Gen file pdf complete : " + filePath)
    })


}

build()