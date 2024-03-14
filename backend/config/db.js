const mongoose=require('mongoose')
const connectDB=async()=>{
    const MONGO_URL="mongodb+srv://sreeraj2122:sreeraj12345@cluster0.v4zfctw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    try {
        mongoose.connect(MONGO_URL).then(()=>{
            console.log("Database connected");
        })
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}   
module.exports=connectDB 