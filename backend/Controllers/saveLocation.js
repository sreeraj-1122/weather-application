const Location = require("../models/locationModel");

const saveFunction = async (req, res) => {
    try {
        const { location, latitude, longitude } = req.body;
        if (!location || !latitude || !longitude) {
            return res.status(400).json({ error: "Location, latitude, and longitude are required." });
        }

        if (isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) {
            return res.status(400).json({ error: "Latitude and longitude must be valid numbers." });
        }

        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized access." });
        }

        const saveData = await Location.create({
            location, latitude, longitude, user: userId
        });

        return res.status(201).json(saveData);
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: "Invalid data provided." });
        }
        res.status(500).json({ error: "Server error." });
    }
};

module.exports = saveFunction;
