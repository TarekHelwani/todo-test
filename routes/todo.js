const { validateTodo } = require("../models/user");
const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

router.get("/:id" , [auth], async (req, res) => {
    console.log('!!');
    const User = req.user;

    const todo = User.todos.find(todo => todo.id === req.params.id);

    if (!todo) return res.status(404).send("The todo was not found");

    res.send(todo);
});

router.get("/", [auth], async (req, res) => {
    const todos = req.user.todos;
    res.send(todos);
});

router.post("/", [auth], async (req, res) => {
    const { error } = validateTodo(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const User = req.user;
    const todo = {
        title: req.body.title,
        description: req.body.description,
    };
    User.todos.push(todo);
    await User.save();

    res.send(todo);
});

router.put("/:id", [auth], async (req, res) => {
    const { error } = validateTodo(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const User = req.user;

    const todo = User.todos.find(todo => todo.id === req.params.id);

    if (!todo) return res.status(404).send("The movie with the given ID was not found.");

    const updatedToDo = {
        "todo.title": req.body.title,
        "todo.description": req.body.description,
    }

    User.updateOne({"todos._id": req.params.id}, {"$set": updatedToDo});
    res.send(todo);
});

router.delete("/:id", [auth], async (req, res) => {
    const User = req.user;

    const todo = User.todos.find(todo => todo.id === req.params.id);

    if (!todo) return res.status(404).send("The todo wasn't found");

    User.todos.splice(0, todo);

    User.save();

    res.send(todo);
});


module.exports = router;
