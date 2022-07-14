require("dotenv").config();
require("express-async-errors");

const express = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const fs = require("fs").promises;
const date = require("date-and-time");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const invoiceRouter = require("./routers/invoice");

app.use("/invoices", invoiceRouter);

app.use(async (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    await fs.appendFile(
        "error.log",
        [
            `[${date.format(new Date(), "YYYY. MM. DD. HH:mm:ss")}]`,
            "Name: " + err.name,
            "Message: " + err.message,
            "Stack:\n" + err.stack,
        ].join("\n") + "\n\n"
    );
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        httpStatus: ReasonPhrases.INTERNAL_SERVER_ERROR,
        errorDetails: {
            name: err.name,
            message: err.message,
            stack: [...err.stack.split("\n")],
        },
    });
});

(async () => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Application is running on port: ${port}`);
    });
})();
