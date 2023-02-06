const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
    name : String,
    tag : String,
    uni_name : String,
    state : String,
    start_date : Date,
    end_date : Date,
    status: String,
    researchers : [String],
    views: Number
})

module.exports = mongoose.model("ResearchInfo",researchSchema);