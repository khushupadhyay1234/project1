const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
const config = require("config");  // Ensure that `config` is properly required

async function connectDatabase() {
    try {
        // Correct usage of template literal for connection string
        await mongoose.connect(`${config.get("MONGODB_URI")}/scath`);
        dbgr("connected");
    } catch (err) {
        dbgr(err);
    }
}

connectDatabase();  // Call the function to initiate the connection

module.exports = mongoose.connection;
