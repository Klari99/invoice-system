const express = require("express");
const router = express.Router();

const models = require("../models");
const { Item, Invoice } = models;

const soap = require('soap');
const parseString  = require('xml2js').parseString;

router.get("/", async (req, res) => {
    const invoices = await Invoice.findAll();
    let response = [];
    const EUR = await getEUR();

    for (const invoice of invoices) {
        const EURPrice = parseFloat(invoice.invoiceTotal / EUR).toFixed(2);
        response.push({
            invoice,
            EURPrice,
        })
    }
    res.send({
        response,
        EUR
    });
});

router.get("/:id", async (req, res) => {
    const invoice = await Invoice.findByPk(req.params.id, {
        include: [
            { model: Item },
        ],
    });
    if (!invoice) return res.sendStatus(404);

    const EUR = await getEUR();
    const EURPrice = parseFloat(invoice.invoiceTotal / EUR).toFixed(2);

    return res.send({
        invoice,
        EURPrice,
        EUR
    });
});

router.post("/", async (req, res) => {

    try {

        const invoice = await Invoice.create(req.body.invoice);
        for (let item of req.body.items) {
            await invoice.createItem(item);
        }

        return res.status(200).send(invoice);

    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;

const getEUR = async() => {
    let EUR = 1;
    const url = 'http://www.mnb.hu/arfolyamok.asmx?wsdl';
    let client = await soap.createClientAsync(url);
    let dataResponse = await client.GetCurrentExchangeRatesAsync();
    const xml = dataResponse[0].GetCurrentExchangeRatesResult;

    parseString(xml, function (err, result) {
        for(const rate of result.MNBCurrentExchangeRates.Day[0].Rate) {
            if(rate['$'].curr === 'EUR') {
                EUR = parseFloat(rate['_']);
                break;
            }
        }
    });
    return EUR;
}
