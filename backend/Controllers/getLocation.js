const Location = require("../models/locationModel");

const getLocationData=async(req,res)=>{
    try {
        const { id } = req.params;
        const data = await Location.find({ "user": id }).exec();
         
        if (!data) {
            return res.status(404).json({ message: 'No data found for the specified user.' });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}
module.exports=getLocationData