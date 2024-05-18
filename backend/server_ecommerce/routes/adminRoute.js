const express= require('express');
const bcrypt = require('bcryptjs');
const router= express.Router();

const Admin = require('../models/adminModel');
const { ConnectionStates } = require('mongoose');

//agian ADMIN




async function createAdmins() {
    const adminData = [
        { name: 'Admin1', email: 'admin1@example.com', password: 'password1' },
        { name: 'Admin2', email: 'admin2@example.com', password: 'password2' }
    ];

    for (let data of adminData) {
        const { name, email, password } = data;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            console.log(`Admin with email ${email} already exists.`);
            continue;
        }

        // Create new admin
        const admin = new Admin({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            isAdmin: true
        });

        try {
            await admin.save();
            console.log(`Admin ${name} created successfully.`);
        } catch (error) {
            console.error('Error creating admin:', error);
        }
    }
}

createAdmins();
       
// Admin Login 
router.post("/verifyAdmin",async(req,res)=>{
    const {email,password} = req.body;

    // Fetching admin info from the database
    try{
        const existingUser = await Admin.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User Doesn't Exist!" });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch)  //changed with !
            {

            return res.status(400).json({ message: "Invalid Credentials" });
        }

        result= await Admin.find({email});
        return res.status(200).send(result);
    }
    catch(error){
        return res.status(400).json({ message:error});
    }
});


module.exports = router;