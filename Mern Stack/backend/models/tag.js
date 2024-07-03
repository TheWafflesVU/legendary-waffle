const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['programmingLanguage', 'projectType', 'VUCourse', 'platform'],
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});

tagSchema.index({ type: 1, value: 1 }, { unique: true })

module.exports = mongoose.model('Tag', tagSchema);
