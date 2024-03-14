const Location = require("../models/locationModel");

const deleteLocation = async (req, res) => {
    const { name } = req.params;

    try {
      // Find the location by name and delete it
      const deletedLocation = await Location.findOneAndDelete({ name });
      
      if (!deletedLocation) {
        return res.status(404).json({ message: 'Location not found' });
      }
  
      return res.status(200).json({ message: 'Location deleted successfully', deletedLocation });
    } catch (error) {
      console.error('Error deleting location:', error);
      return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = deleteLocation;
