const jwt = require('jsonwebtoken');

const privatekey = 'tlgg'
const payload =  {
    username: 'thelocalgodd',
    email: 'splashvincentk@icloud.com'
};

const token = jwt.sign(payload, privatekey, { expiresIn: '7s' });
console.log(token);

setTimeout(() => {
    const data = jwt.verify(token, privatekey);
    console.log(data);
}, 6000);

