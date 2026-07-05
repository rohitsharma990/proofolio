const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1","8.8.8.8"]);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;