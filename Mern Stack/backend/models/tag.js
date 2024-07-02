const mongoose = require('mongoose');

const optionsSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['programmingLanguage', 'projectType', 'VUCourse', 'platform'],
        required: true,
    },
    values: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Options', optionsSchema);
