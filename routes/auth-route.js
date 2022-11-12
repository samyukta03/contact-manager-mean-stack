const router = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const checkAuth = require('../middleware/check-auth')
router.post('/contacts/signup',(req, res)=>{
    bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if(err) {
            return res.json({success: false, message: "Hashing issue"})
        }
        else{
            const user = new User({
                displayName: req.body.displayName,
                email: req.body.email,
                password : hash ,
                phno : req.body.phno ,
            })
            user.save()
                .then((_)=>{
                    return  res.json({success: true, message: "account has been created"})
                })
                .catch((err)=>{
                    if(err.code == 11000) {
                        return  res.json({success: false, message: "Email already exists"})
                    }
                })
        }
    })
    // res.json("hi world");
   /* const user = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password : req.body.password ,
        phno : req.body.phno ,
    })
    user.save()
        .then((_)=>{
            res.json({success: true, message: "account has been created"})
        })
        .catch((err)=>{
            // res.json({success: false, message: "account creation failed"})
            // console.log(err);
            // res.json({success: false, message: err})
            if(err.code == 11000) {
                res.json({success: false, message: "Email already exists"})
            }
        })
        */
});

router.post('/contacts/login',(req,res)=>{
    // res.json("helllo world");
      User.find({email: req.body.email})
      .exec()
      .then((result) => {
            if(result.length < 1){
              return  res.json({success: false, message: "User not found "}) //email doesnt even exist 
            }
            const user = result[0];
            // const password = result[1];
                // Load hash from your password DB.
            bcrypt.compare(req.body.password, user.password, (err, ret) => {
                if(ret) {
                    const payload = {
                        userId: user._id
                    }
                    const token =  jwt.sign(payload, "contactmgr")
                    return  res.json({success: true, token:token, message: "Login Successful"})
                }else{
                    return res.json({success: false, message: "Password doesnt match :( "}) //email right pass wrong 
                }
            });
      }) .catch(err => {
        res.json({success: false, message: "Authorization failed"}) 
      })

})

router.get('/contacts/profile', checkAuth, (req,res) => {
    const userId= req.userData.userId;
    User.findById(userId)
    .exec()
    .then((result)=> {
        res.json({success:true, data:result})
    }).catch(err => {
        res.json({success:true, message:"Server error"})
    })
})

module.exports = router 