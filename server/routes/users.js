const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        phone_number: req.user.phone_number,
        email: req.user.email,
        username: req.user.username,
        job_title: req.user.job_title,
        company_name: req.user.company_name,
        company_lat: req.user.company_lat,
        company_lng: req.user.company_lng,
        address: req.user.address,
        city: req.user.city,
        state: req.user.state,
        zipcode: req.user.zipcode,
        interest_industry: req.user.interest_industry,
        isAdmin: false
    });
});

router.post("/register", (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ registerSuccess: false, err });
        return res.status(200).json({
            registerSuccess: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ logoutSuccess: false, err });
        return res.status(200).send({
            logoutSuccess: true
        });
    });
});

module.exports = router;
