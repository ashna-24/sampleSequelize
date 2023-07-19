const Sequelize = require('sequelize');
const sequelize = new Sequelize('master', 'sa', 'tech@123', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
        options: {
        encrypt: true // For Azure users
        }
    }
});
const {User, Command} = require('../utils/test-data');

exports.userData = (req, res, next)=>{

    // Sync the model with the database
    sequelize.sync()
    .then(() => {
        console.log('Database and tables created!');
        const usersData = [
            { name: 'John Doe', email: 'johndoe@example.com' },
            { name: 'Albert John', email: 'janesmith@example.com' },
            { name: 'Bob Johnson', email: 'bobjohnson@example.com' }
        ];

        const comdData = [
            {command: 'Hi,How are you?', userId: 139},
            {command: 'Hello, everyone!!', userId: 140},
            {command: 'Have a nice day!!', userId: 141}
        ]

        // Insert data on users table
        User.bulkCreate(usersData)
        .then(userCreate => {
            console.log('Created user:', userCreate.map(user => user.toJSON()));

            //Insert data on commands table
            Command.bulkCreate(comdData)
            .then(userCommand =>{
                console.log('Commands:', userCommand.map(command => command.toJSON()));
            })
            .catch(err =>{
                console.log('Error to creating database and table', err);
            });
        })
        .catch(err => {
            console.error('Error creating user:', err);
        });
    })
    .catch(err => {
        console.error('Error creating database and tables:', err);
    });
}

exports.userCommand = (req,res, next) =>{
    User.findAll({
        attributes: ['id','name', 'email'],
        include:[
            {
                model: Command,
                attributes:['command']
            }
        ]
    })
    .then(users=>{
        users.forEach(user => {
            console.log('Id:', user.id);
            console.log('Name:',user.name);
            console.log('Email:', user.email);
            if (user.commands && user.commands.length > 0) {
                console.log('Command:', user.commands[0].command);
            }
        });
        res.status(201).json(users);
    })
    .catch(err =>{
        console.log('Error on fetching data',err);
    })
}