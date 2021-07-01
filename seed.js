const { User } = require("./models/user");
const mongoose = require("mongoose");
const config = require("config");
const passwordHash = require('password-hash');

//we could've used faker here too

const data = [
    {
        name: "Tarek",
        email: "helwani.tarek@hotmail.com",
        password: passwordHash.generate('123'),
        todos: [
            { title: "Task 1", description: 'this is task 1' },
            { title: "Task 2", description: 'this is task 2' },
            { title: "Task 3", description: 'this is task 3' },
        ]
    },
    {
        name: "Samir",
        email: "dr.samir.h@hotmail.com",
        password: passwordHash.generate('456'),
        todos: [
            { title: "Task 1", description: 'this is task 1' },
            { title: "Task 2", description: 'this is task 2' },
            { title: "Task 3", description: 'this is task 3' },
            { title: "Task 4", description: 'this is task 4' },
            { title: "Task 5", description: 'this is task 5' },
        ]
    },
];

async function seed() {
    await mongoose.connect(config.get("db"), { useNewUrlParser: true  , useUnifiedTopology: true});
    await User.deleteMany({});

    await User.insertMany(data);

    await mongoose.disconnect();

    console.info("Seeding Done!");
}

seed().then(r => 'seeding completed');
