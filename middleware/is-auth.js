const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.query);
    const token = req.query.token;
    if(!token) {
        const error = new Error('Not authenticated!');
        error.status = 401;
        throw error;
    };

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'pokesneverdie');
    } catch (err) {
        console.log(err);
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
      }
    console.log(decodedToken);

    req.userId = decodedToken.userId;
    next();
};