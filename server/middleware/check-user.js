const User = require('../models/userModel');

let checkCreate = (req, res, next) => {
    User.findOne({ idfacebook: req.body.userId })
    .then((result)=>{
        if (result){
            next();
        } else {
            const newUser = new User({
                idfacebook: req.body.userId,
                name: req.body.name,
                email: req.body.email
            })

            newUser.save()
            .then((result)=>{
                next();
            })
            .catch((err) => {
                res.status(500).json(err);
            })
        }
    }).catch((err)=>{
        res.status(500).json(err);
    });
}

module.exports = checkCreate