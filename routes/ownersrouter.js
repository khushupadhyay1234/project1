const express = require("express");
const router = express.Router();
const ownermodel = require("../models/ownermodel"); // Corrected model import

router.get("/", function(req, res) {
    res.send("hey it is working");
});

if (process.env.NODE_ENV === "development") { // Fixed the typo in environment variable
    router.post("/create", async function(req, res) {
        try {
            let owners = await ownermodel.find();
            if (owners.length > 0) {
                return res.status(403).send("You don't have permission");
            }

            let { fullname, email, password } = req.body;
            let createdOwner = await ownermodel.create({
                fullname,
                email,
                password,
            });
            res.status(201).send(createdOwner);

        } catch (err) {
            res.status(500).send("Server Error");
        }
    });
}

module.exports = router;
