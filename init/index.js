const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const { object } = require("joi");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() { 
    await mongoose.connect(MONGO_URL);
    }
 main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log("error");
    })
    
    const initDB = async ()=>{
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj)=>({
        ...obj,
        owner:"68ee7f5103b2ae183e830cda",
    }));
        await Listing.insertMany(initData.data);
        console.log("data  was initialized");
    };
    
  

    initDB();
  