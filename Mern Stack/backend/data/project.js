const mongoose = require('mongoose');
const Project = require('../models/projectModel')

const testProjects = [
    {
        title: "Web Development Bootcamp",
        tags: ["JavaScript", "HTML", "CSS"],
        num_teammates: 5,
        description: "An intensive web development bootcamp focusing on modern web technologies.",
        email: "bootcamp@example.com",
        user_id: mongoose.Types.ObjectId("667ccf2dae082bddb9a6c942")
    },
    {
        title: "AI Research Project",
        tags: ["Python", "Machine Learning", "AI"],
        num_teammates: 3,
        description: "Research project exploring advanced machine learning algorithms and their applications.",
        email: "airesearch@example.com",
        user_id: mongoose.Types.ObjectId("667ccf2dae082bddb9a6c942")
    },
    {
        title: "Mobile App Development",
        tags: ["Kotlin", "Android", "Mobile"],
        num_teammates: 4,
        description: "Developing a cross-platform mobile application using modern development tools.",
        email: "mobileapp@example.com",
        user_id: mongoose.Types.ObjectId("667ccf2dae082bddb9a6c942")
    },
    {
        title: "Blockchain Technology",
        tags: ["Blockchain", "Cryptocurrency", "Ethereum"],
        num_teammates: 2,
        description: "Exploring blockchain technology and developing a decentralized application.",
        email: "blockchain@example.com",
        user_id: mongoose.Types.ObjectId("667ccf2dae082bddb9a6c942")
    },
    {
        title: "Data Science with R",
        tags: ["R", "Data Analysis", "Statistics"],
        num_teammates: 6,
        description: "A comprehensive data science project using R for data analysis and statistical modeling.",
        email: "datascience@example.com",
        user_id: mongoose.Types.ObjectId("667ccf2dae082bddb9a6c942")
    }
];

// Insert test data into the database
Project.insertMany(testProjects)
    .then(() => {
        console.log("Test projects inserted successfully.");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error("Error inserting test projects: ", error);
        mongoose.connection.close();
    });
