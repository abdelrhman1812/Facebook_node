import { Sequelize } from "sequelize";

const uri = 'mysql://uowib9tgp4wl8yv5:kr1zHamtchvdFHzn1Pxp@bfo1pn4tkfjgtmksdfoa-mysql.services.clever-cloud.com:3306/bfo1pn4tkfjgtmksdfoa';

const sequelize = new Sequelize(uri);
// const sequelize = new Sequelize("facebook", "root", "", {
//     host: 'localhost',
//     dialect: 'mysql',
// });

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;

