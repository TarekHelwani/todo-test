// const config = require("config");
// const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
        title: {
            type: String,
        },
        description: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024,
        },
    },
    {
        timestamps: true
    }
)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    todos: [todoSchema]
});

// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign(
//         {
//             _id: this._id,
//             name: this.name,
//             email: this.email,
//             isAdmin: this.isAdmin
//         },
//         config.get("jwtPrivateKey")
//     );
//     return token;
// };

const User = mongoose.model("User", userSchema);

function validateTodo(todo) {
    const todoSchema = {
        title: Joi.string(),
        description: Joi.string()
            .min(5)
            .max(1024)
            .required()
    };

    return Joi.validate(todo, todoSchema);

}

function validateUser(user) {
    const userSchema = {
        name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        email: Joi.string()
            .min(3)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(3)
            .max(255)
            .required(),
    };

    return Joi.validate(user, userSchema);
}


exports.User = User;
exports.validateTodo = validateTodo;
exports.validateUser = validateUser;
