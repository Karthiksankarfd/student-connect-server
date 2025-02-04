const Post = require("../models/postSchema")
const User =  require("../models/userSchema")

exports.searchQuery = async (req, res)=>{
const {query} = req.query; 

    if(!query){
        return res.status(404).json({error:"No Query found"})
    }
    try{
        const searchResult =  { result1: await User.find({name:{$regex : query , $options :"i"}}),
        //  result2: await Post.find({name:{$regex : query , $options :"i"}})
        }
        console.log(searchResult)
        return res.status(200).json({result : searchResult })
    }catch(e){
            console.log(e, "error in fecthing data from the collections")
    }
}