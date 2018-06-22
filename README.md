# Stock Report v2

### Example 
```js
var time = new Date,
    datetime2 = moment(time).format("DDMM_HHmmss"),
    filename = "./output/stock_pdf_" + datetime2 + ".pdf"
    ;

var params_default = {
    filePath: filename,     // or tmp path in firebase
    data: {request_data}    // see detail in libs\stock_pdf\README.md
}

function build() {

    new reportV2.stockReport(params_default, function (filePath) {
        console.log("Gen file pdf complete : " + filePath)
    })


}

build()
```