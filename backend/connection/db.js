const mongoose = require("mongoose")


const connection = mongoose.connect("mongodb+srv://hrusikeshviroot:hrusikesh@cluster0.9telhqi.mongodb.net/")

module.exports={connection}