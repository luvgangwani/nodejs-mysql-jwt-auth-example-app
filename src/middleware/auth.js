const { verify } = require("jsonwebtoken");

module.exports = {
    validateToken: (req, res, next) => {
        let token = req.get('authorization');
        if (token) {
           token = token.slice(7);
           verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(500).json({
                    success: 0,
                    message: "Invalid token."
                });
            } else {
                next();
            }
           }); 
        } else {
            res.status(401).json({
                success: 0,
                message: 'Not Authorized!'
            });
        }
    }
}