var express = require('express');
var router = express.Router();
var {dbUrl,mongodb,MongoClient} = require('../dbSchema');
const {ObjectId} = require("mongodb")
var {hashPassword, hashCompare,createToken,verifyToken} = require("../Auth");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("Deskala");
    const user = await db.collection("users").find({email:req.body.email});
    if(user.length > 0){
      res.json({
        statusCode:400,
        message:"User Already Exists"
      })
    }
    else{
      let hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;
      let user = await db.collection("users").insertOne(req.body);
      res.json({
        statusCode:200,
        message:"Signup Successfully"
      })
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode : 500,
      message : "Internal Server Error"
    })
  }
})

router.post('/addcandidate',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    let db = await client.db("Deskala");
    let user = await db.collection("Candidate").insertOne(req.body);
    res.json({
      statusCode:200,
      message:"Successfully Inserted"
    })
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
})

router.delete('/removecandidate/:id',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    let db = await client.db("Deskala");
    let user = await db.collection("Candidate").find({email:req.body.email}).toArray();
    if(user){
      let del = await db.collection("Candidate").deleteOne({ _id: ObjectId(req.params.id) })   
      res.json({
        statusCode:200,
        message:"Successfully Deleted"
      })
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
})


router.get('/candidate',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    let db = await client.db("Deskala");
    let user = await db.collection("Candidate").find().toArray();
    res.json({
      statusCode:200,
      message:"Successfully Inserted",
      user
    })
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
})

router.post("/signin", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    let db = await client.db("Deskala");
    let user = await db.collection("users").findOne({ email: req.body.email });
    if (user) {
      let compare = await hashCompare(req.body.password, user.password);
      if (compare) {
        let token  = await createToken(user.email )
        res.json({
          statusCode: 200,
          email: user.email,
          token
        });
      } else {
        res.json({
          statusCode: 400,
          message: "Invalid Password",
        });
      }
    } else {
      res.json({
        statusCode: 404,
        message: "User Not Found",
      });
    }
  } catch {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  } finally {
    client.close();
  }
});

router.put('/editcandidate/:id',async(req,res)=>{
    const client = await MongoClient.connect(dbUrl);
    console.log(req.params.id)
  try {
    let db = client.db("Deskala");
    let candidate = await db.collection("Candidate").find().toArray();
    if(candidate.length > 0){
      let candidate = await db.collection("Candidate").updateOne({_id:ObjectId(req.params.id)},{$set:{...req.body}});
      res.json({
        statusCode: 200,
        candidate,
        messgae:"Edit Successfully"
      })
    }
    else {
      res.json({
        statusCode: 400,
        messgae: "Invalid Category"
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      statusCode: 500,
      messgae: "Internal Server Error"
    })
  }
})

router.post("/auth",verifyToken,async(req,res)=>{
  res.json({
    statusCode:200,
    message:req.body.purpose
  })
})


module.exports = router;
