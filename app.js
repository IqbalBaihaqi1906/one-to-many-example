"use strict"

const express = require('express')
const app = express()
const PORT = 3000
app.use(express.urlencoded({extended:true}))
app.use(express.json())


const { sequelize } = require('./models')
const {User,Role} = require('./models') // sesuai dengan return di modelnya



app.get("/users",async (req,res) => {
    try {
        const data = await User.findAll(
            {
                attributes : ["email","password"],
                include : Role,     // sesuai nama model yang direlasikan
                // where : {
                //     email : "admin"
                // }
            },
        )
        res.status(200).json({
            data : data
        })

    } catch (error) {
        console.log(error)
    }
})

app.post("/users",async (req,res) => {
    try {
        const {email,password,RoleId} = req.body

        let data = await User.create({email,password,RoleId})
        res.status(201).json({
            data : data
        })

    } catch (error) {
        console.log(error)
    }
})

app.get("/roles",async (req,res) => {
    try {
        const data = await Role.findAll({include : User})
        res.status(200).json({
            message : "success",
            data : data
        })

    } catch (error) {
        console.log(error)
    }
})






app.listen(3000,async () => {
    try {
        console.log(`Server running at port ${PORT}`)
        await sequelize.authenticate()
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
    }
    
})