"use strict";

const { faker } = require('@faker-js/faker');
const chalk = require("chalk");
const models = require("../models");
const { Item, Invoice } = models;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {

            const invoiceCount = faker.datatype.number({ min: 10, max: 20 });

            for (let i = 0; i < invoiceCount; i++) {

                let invoiceTotalPrice = 0;
                const invoice = await Invoice.create({
                    customer: faker.unique(faker.name.findName),
                    issueDate: faker.date.recent(),
                    dueDate: faker.date.soon(),
                    comment: faker.datatype.boolean() ? faker.lorem.sentence() : null
                });

                const itemCount = faker.datatype.number({ min: 5, max: 15 });

                for (let j = 0; j < itemCount; j++) {
                    const item = await invoice.createItem({
                            name: faker.commerce.productName(),
                            price: faker.commerce.price(100, 10000, 0),
                            quantity: faker.datatype.number({ min: 1, max: 10 }),
                    });

                    await item.update({
                        totalPrice: item.price * item.quantity
                    });
                    invoiceTotalPrice += item.totalPrice;
                }

                await invoice.update({
                    invoiceTotal: invoiceTotalPrice
                })
            }

            console.log(chalk.green("The DatabaseSeeder terminated successfully."));
        } catch (e) {
            console.log(chalk.red("Some error occured:"));
            console.log(chalk.gray(e));
        }
    },
    down: async (queryInterface, Sequelize) => {},
};
