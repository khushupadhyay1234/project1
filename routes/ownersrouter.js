const express = require("express");
const router = express.Router();
const ownermodel = require("../models/owner-model"); // Corrected model import

router.get("/", function(req, res) {
    res.send("hey it is working");
});

if (process.env.NODE_ENV === "development") { // Fixed the typo in environment variable
    router.post("/create", function(req, res) { // Fixed 'Req' to 'req'
        res.send("hey it is working");
    });
}

module.exports = router;
