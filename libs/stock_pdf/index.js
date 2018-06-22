const path = require('path'),
    _ = require('lodash'),
    moment = require('moment'),

    PdfPrinter = require('../../node_modules/pdfmake/src/printer'),
    C = require('./constant'),
    utils = require("../../utils")
    ;

var fonts = {
    Roboto: {
        normal: './libs/stock_pdf/fonts/droidsansth.ttf',
        bold: './libs/stock_pdf/fonts/arialbd.ttf',
        italics: './libs/stock_pdf/fonts/Roboto-Italic.ttf',
        bolditalics: './libs/stock_pdf/fonts/Roboto-MediumItalic.ttf'
    },
    Customs: {
        normal: './libs/stock_pdf/fonts/Roboto-Regular.ttf',
        bold: './libs/stock_pdf/fonts/Roboto-Medium.ttf'
    }
};

module.exports = function (options, callback) {
    var printer = new PdfPrinter(fonts);
    var fs = require('fs')
        ;

    var filename = options.filePath;

    var data = options.data,
        startDate = moment(data.startDate).format("DD/MM/YYYY"),
        endDate = moment(data.endDate).format("DD/MM/YYYY")
        ;

    //-------หน้ารายงาน
    var docDefinition = {
        content: drawDocDefinition(data),
        // pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
        //     return followingNodesOnPage.length == 250;
        // },
        // pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
        //     if (previousNodesOnPage.length == 150 || previousNodesOnPage.length == 200) {
        //         return true
        //     }

        // },
        pageSize: 'A4',
        pageOrientation: 'portrait',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [50, 50, 50, 50],

    }

    //----------main
    buildReport(docDefinition);

    function buildReport(dd) {

        //-------------------------operate
        var pdfDoc = printer.createPdfKitDocument(dd);
        pdfDoc.pipe(fs.createWriteStream(filename));
        console.log("--stock completed")
        pdfDoc.end();

        setTimeout(function () {
            callback(filename);
        }, 1500);
    }

    function drawDocDefinition(data) {
        return [
            drawHeader(),
            NewLine(2),
            //------------------itemList
            drawStockDetail(data.group)

        ]
    }

    function drawStockDetail(stock) {
        var res = []
        _.forEach(stock, function (groubName, index) {
            res.push(drawHeaderItem(groubName.name))

            res.push({
                style: [C.TABLE_STYLES.TABLE_EXAMPLE, C.FONT_STYLES.NORMAL],
                table: {
                    heights: C.FONT_STYLES.NORMAL + 3,
                    widths: [150, 40, 40, 30, 30, 30, 45, 40],
                    body: drawDetail(groubName.items, index)
                },
                layout: C.TABLE_STYLES.LAYOUT.THIN_GRAY
            }),
                res.push({ text: NewLine(2) })
            // res.push(addNewPage())
        })

        // var res2 = _.reduce(res, function (acc, val, index) {
        //     acc.push(val)
        //     return acc
        // }, [])

        return res
    }

    function drawHeader() {
        return [
            [
                {
                    text: 'Stock Inventory Overview',
                    style: C.FONT_STYLES.HEADER
                }
            ],
            [
                {
                    text: "วันที่ " + startDate + " ถึง " + endDate,
                    style: C.FONT_STYLES.SUBHEADER
                }
            ],
            [
                {
                    text: 'Generated at : ' + utils.addGennerateDateFormat(),
                    style: C.FONT_STYLES.SMALL
                }
            ]

        ]
    }
    function drawHeaderItem(name) {
        return {
            text: name,
            style: C.FONT_STYLES.SUBHEADER
        }

    }

    function drawDetail(list) {

        var data = []
        _.forEach(list, (line) => {
            data.push([
                {
                    text: line.name,
                    style: C.FONT_STYLES.NORMAL
                },
                {
                    text: line.balance,
                    style: C.FONT_STYLES.NORMAL
                },
                {
                    text: line.unit,
                    style: C.FONT_STYLES.NORMAL
                },
                {
                    text: (line.begin || ''),
                    style: C.FONT_STYLES.NORMAL
                },
                {
                    text: (line.add || ''),
                    style: C.FONT_STYLES.NORMAL
                },
                {
                    text: (line.used || ''),
                    style: C.FONT_STYLES.NORMAL
                },
                {
                    text: (line.withdraw || ''),
                    style: C.FONT_STYLES.NORMAL
                },
                {
                    text: (line.adjust || ''),
                    style: C.FONT_STYLES.NORMAL
                }

            ])

        })

        let tableList = [
            [
                { text: 'Item', bold: true },
                { text: 'Balance', bold: true },
                { text: 'Unit', bold: true },
                { text: 'Begin', bold: true },
                { text: 'Add', bold: true },
                { text: 'Used', bold: true },
                { text: 'Withdraw', bold: true },
                { text: 'Adjust', bold: true },

            ],
            ...data

        ]
        return tableList
    }

    function addNewPage() {
        return {
            text: ' ',
            pageOrientation: 'portrait',
            pageBreak: 'after'
        }
    }

    function NewLine(count) {
        for (i = 0; i < count; i++) {
            return '\n'
        }

    }

    function blankCell() {
        return {
            text: ' ',
            style: C.FONT_STYLES.NORMAL
        }
    }

    function numberWithComma(n) {
        return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }
}