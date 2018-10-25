const express=require("express")
const cors=require("cors")
const bodyparser=require("body-parser")
const db=require("./database")
const app=express()
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt-nodejs');
const auth=require("./auth")

app.use( bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors())

app.get("/",(req,res,next)=>{
    res.send("Hello World!")
})


app.post("/signup",(req,res,next)=>{
    console.log(req.body)
    let hashedPassword=bcrypt.hashSync(`${req.body.password}`)
    db.query(`INSERT INTO users (username,password) VALUES ('${req.body.username}','${hashedPassword}')`,(err,result)=>{
        if(err) res.status(400).send(err)
        res.status(201).send(result)
    })
})

app.post("/login",(req,res,next)=>{

    if(!req.body){
        res.status(400).send({message:"login failed!"})
        return 
    }

    let username=req.body.username
    let password=req.body.password

    if(username.length===0 || password.length===0){
        res.status(401).send({message:"login failed!"})
        return 
    }

    db.query(`SELECT * FROM users WHERE username='${username}' LIMIT 1`,(err,result)=>{
        if(err) res.status(401).send(err)
        if(result.length!==0){
            const hashPassword=result[0].password
            if(bcrypt.compareSync(password,hashPassword)){
                let token=jwt.sign({user_id:result[0].id},auth.secretKey)
                res.status(200).send({message:"Autherization Successfull",token:token})
            }
            else{
                res.status(401).send({message:"Autherzation failed!"})
            }
        }
        else{
            res.status(401).send({message:"Autherzation failed!"})
        }
    })
})


app.post("/getUserDetail/",auth.authenticateToken,(req,res,next)=>{
    db.query(`SELECT username,id FROM users WHERE id=${req.body.id}`,(err,result)=>{
        if(err || result.length===0){
            res.status(200).send({message:"not found!"})
        }

        console.log("asdasd")
        res.status(400).send(result)
    })
})


module.exports=app