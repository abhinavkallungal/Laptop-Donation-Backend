const db = require('../config/connection')
const collection = require('../config/collections')
const bcrypt = require("bcrypt")

module.exports = {
    signUp: async (req, res) => {
        console.log(req.body)
        const { fullName, phone, password } = req.body
        console.log(collection.USER_COLLECTION)

        try {

            if (!phone || !password || !fullName) {
                return res
                    .status(400)
                    .json({ errors: "Please enter all required fields" });
            }
            const phoneExist = await db
                .get()
                .collection(collection.USER_COLLECTION)
                .findOne({ phone: phone });

            if (phoneExist) {
                return res
                    .status(401)
                    .json({ errors: "This Phone number is already exist" });
            } else {
                const hashedPassword = await bcrypt.hash(
                    password,
                    12
                );
                db.get()
                    .collection(collection.USER_COLLECTION)
                    .insertOne({ fullName, phone, password: hashedPassword })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
    Login: async (req, res) => {
        console.log(req.body)
        let Logindata = req.body;
        const { phone, password } = req.body
        try {
            if (!phone || !password) {
                return res
                    .status(400)
                    .json({ ErrorMessage: "Please enter all required fields" });
            }
           
            var user = await db.get()
            .collection(collection.USER_COLLECTION)
            .findOne({ phone })

            if (!user){
                 return res
                 .status(404)
                 .json({ errors: 'User Not found' })
            }
            const isPasswordCorrect = await bcrypt
            .compare(password, user.password)

            if (!isPasswordCorrect) {
             return res
             .status(401)
             .json({ errors: 'Invalid Password' })
            }
            res.status(200).json({ user})

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }


    }

}