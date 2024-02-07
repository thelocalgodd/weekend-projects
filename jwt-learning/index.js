const jwt = require('jsonwebtoken');

// 
const privatekey = 'tlgg'
const payload =  {
    username: 'thelocalgodd',
    email: 'splashvincentk@icloud.com'
};

// create token
const token = jwt.sign(payload, privatekey, { expiresIn: '7s' });
console.log(token);

// authenticate token
setTimeout(() => {
    const data = jwt.verify(token, privatekey);
    console.log(data);
}, 6000);

