const Tag = require('../models/tagModel');

const getTagsWithType = async (req, res) => {
    try {
        const { type } = req.params;
        const tags = await Tag.find({ type }, {value: 1, _id: 0});
        if (tags) {
            res.status(200).json(tags.map(tag => tag.value));
        } else {
            res.status(404).json({ message: 'Tags not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controller to add a new option
const addTag = async (req, res) => {
    const { type, value } = req.body;

    try {

        const tag = new Tag({ type, value });
        await tag.save();
        res.status(201).json(tag);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }

};

// Controller to add a new option
const addTagsWithType = async (req, res) => {
    const { type } = req.params;
    const { tags } = req.body; // Expecting an array of tags, each with type and value

    try {
        const tagDocuments = tags.map(tag => new Tag({type: type, value: tag}));
        await Tag.insertMany(tagDocuments, { ordered: false }); // Insert all tags, continue on error
        res.status(201).json({ message: 'Tags added successfully' });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error code
            res.status(400).json({ message: 'Some tags already exist.' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }

};

module.exports = {
    getTagsWithType,
    addTag,
    addTagsWithType
}

