const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

//Pass and object using the parameter 'UserData' to the function 'generateToken' to create token for the user
//When collecting login data, put it into an object in order to destructure and use the information in this function

//  * Create table in db that has usernames that have the role 'Admin', usernames cannot be repeated in this table, all other users have role of 'user'
//  1. When creating user add them to db into table including; unique ID, userName, password, role
//  2. 

const generateToken = (userData) => {
    
    const payload = {
        id: userData.id,
        userName: userData.userName,
        password: userData.passWord,
        role: userData.role,
    };

    const options = {
        expiresIn: '30d',
        notBefore: '0s',

        issuer: 'recipe-wizard',
        audience: 'recipe-enthusiasts',
        
        noTimestamp: 'false',
    };

    return jwt.sign(payload, SECRET_KEY, options)
};

const handleTokenError = (error) => {
    switch (error.name) {
      case 'TokenExpiredError':
        throw new Error('Token has expired');
      case 'JsonWebTokenError':
        throw new Error('Invalid token');
    }
  };

export { generateToken, handleTokenError };