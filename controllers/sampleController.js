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
exports.userData = (req, res, next)=>{

    // Define a model for the table
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING
    });

    // Sync the model with the database
    sequelize.sync()
    .then(() => {
        console.log('Database and tables created!');
        const usersData = [
            { name: 'John Doe', email: 'johndoe@example.com' },
            { name: 'Jane Smith', email: 'janesmith@example.com' },
            { name: 'Bob Johnson', email: 'bobjohnson@example.com' }
        ];
        // Insert a new user
        User.bulkCreate(usersData)
        .then(userCreate => {
            console.log('Created user:', userCreate.map(user => user.toJSON()));
            res.status(201).json(userCreate);
            // Query all users
            User.findAll()
            .then(users => {
                console.log('All users:', users.map(user => user.toJSON()));
                
                // Update a user
                User.update({ name: 'Jane Smith' }, { where: {} })
                .then(numAffected =>{
                    console.log('Updated user:', numAffected[0]);
                    
                    // Delete a user
                    // User.destroy({ where: {} })
                    // .then(numAffected => {
                    //     console.log('Deleted user:', numAffected);
                    // })
                    // .catch(err => {
                    //     console.error('Error deleting user:', err);
                    // });
                })
                .catch(err => {
                    console.error('Error updating user:', err);
                });
            })
            .catch(err => {
                console.error('Error querying users:', err);
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