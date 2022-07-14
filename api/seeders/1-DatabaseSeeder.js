"use strict";

// Faker dokumentáció, API referencia: https://fakerjs.dev/guide/#node-js
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

            console.log(chalk.green("A DatabaseSeeder lefutott"));
        } catch (e) {
            // Ha a seederben valamilyen hiba van, akkor alapértelmezés szerint elég szegényesen írja
            // ki azokat a rendszer a seeder futtatásakor. Ezért ez Neked egy segítség, hogy láthasd a
            // hiba részletes kiírását.
            // Így ha valamit elrontasz a seederben, azt könnyebben tudod debug-olni.
            console.log(chalk.red("A DatabaseSeeder nem futott le teljesen, mivel az alábbi hiba történt:"));
            console.log(chalk.gray(e));
        }
    },

    // Erre alapvetően nincs szükséged, mivel a parancsok úgy vannak felépítve,
    // hogy tiszta adatbázist generálnak, vagyis a korábbi adatok enélkül is elvesznek
    down: async (queryInterface, Sequelize) => {},
};
