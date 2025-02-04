const express = require("express")
const router = express.Router()
const { searchController } = require("../controllers/searchController")
const User = require("../models/userSchema")
// router.get("/search" , searchController)
router.get("/search" , async (req, res)=>{
    const {query} = req.query; 
    
        if(!query){
            return res.status(404).json({error:"No Query found"})
        }
        try{
            const searchResult =  { people: await User.find({name:{$regex : query , $options :"i"}}),
            //  result2: await Post.find({name:{$regex : query , $options :"i"}})
            }
            console.log(searchResult)
            return res.status(200).json({searchResult})
        }catch(e){
                console.log(e, "error in fecthing data from the collections")
        }
    })
module.exports =  router;