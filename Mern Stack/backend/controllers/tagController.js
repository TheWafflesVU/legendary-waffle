const Options = require('../models/option');

const getOption = async (req, res) => {
    try {
        const { type } = req.params;
        const options = await Options.findOne({ type });
        if (options) {
            res.status(200).json(options.values);
        } else {
            res.status(404).json({ message: 'Options not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controller to add a new option
const addOption = async (req, res) => {
    const { type, values } = req.body;

    try {
        // Find if the options type already exists
        let options = await Options.findOne({ type });

        if (options) {
            // If the type exists, update the values array
            options.values = [...new Set([...options.values, ...values])];
            await options.save();
        } else {
            // If the type doesn't exist, create a new document
            options = new Options({ type, values });
            await options.save();
        }

        res.status(201).json(options);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOption,
    addOption
}

