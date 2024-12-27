const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        console.log('MONGO_URI:', process.env.MONGO_URI);
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected`);
    }

    

    catch(err){
        console.log(`Error: ${err.message}`);
        
    }
    
}

module.exports = connectDB;