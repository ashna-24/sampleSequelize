const Sequelize = require('sequelize');
const sequelize = new Sequelize('master', 'sa', 'tech@123', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
        options: {
        encrypt: true
        }
    }
});

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
});

const Command = sequelize.define('command',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    command: Sequelize.STRING
});

Command.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Command);

module.exports={User,Command};