const { User } = require("../models/user");

module.exports = async function (req, res, next) {

    //if we have a real token we will use this code
    // const token = req.header("x-auth-token");
    // if (!token) return res.status(401).send("Access denied. No token provided.");
    //
    // try {
    //     const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    //     req.user = decoded;
    //     next();
    // } catch (ex) {
    //     res.status(400).send("Invalid token.");
    // }

    const id = req.header("x-auth-token");
    if (!id) return res.status(401).send("please send id in the header");

    User.findById(id, function(err, user) {
        if(err) {
            return res.status(401).send("please enter valid id from the database");
        }
        req.user = user;
        next();
    });
};
