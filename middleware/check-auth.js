const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
   try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token,"contactmgr")
    req.userData = decode
    return res.json(decode);
    next();
    } catch(error){
        res.json({success:false, message: "Auth failed"})
    }
}