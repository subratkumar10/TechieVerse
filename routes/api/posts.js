const express= require('express')
const router= express.Router();
const auth=require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post=require('../../models/Post');
const Profile=require('../../models/Profile');
const User=require('../../models/User');

router.post('/',[auth,
[
  check('text','Text field is required').not().isEmpty()
]],async (req,res)=>{

const errors=validationResult(req);
if(!errors.isEmpty())
{
  return res.status(400).json({errors:errors.array()})
}

const user =await User.findById(req.user.id);

try {

  
const newPost=new Post( {
  text: req.body.text,
  name: user.name,
  avatar: user.avatar,
  user: req.user.id
});
await newPost.save();
res.json(newPost);


  
} catch (error) {
  console.error(error.message);
  res.status(500).send('Server error');
  
}
 
})

router.get('/',auth,async(req,res)=>{
  try {
    const posts=await Post.find().sort({date:-1});
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
    
  }
})

router.get('/:id',auth,async(req,res)=>{
  try{
    const posts=await Post.findById(req.params.id).sort({date:-1});
    if(!posts)
    {
      return res.status(404).json({msg:'Posts are not available for this user'});
    }
    res.json(posts);
 
  }catch(err){

    console.error(err.message);
    if(err.kind=='ObjectId')
    {
      return res.status(400).json({msg:'Posts are not available for this user'});
    }
    res.status(500).send('Server error');
    
   
}
}  
)

router.delete('/:id',auth,async(req,res)=>{
  try{
    const post=await Post.findById(req.params.id);
    if(!post)
    return res.status(404).json({msg:'No posts are available for this user'});

   if(post.user.toString()!==req.user.id)
   {
    return res.status(401).json({msg:'User is not authorised to delete this post'});
   }

   await post.remove();

    res.json({msg:'Post is removed of id '+req.params.id});
 
  }catch(err){

    console.error(err.message);
    if(err.kind=='ObjectId')
    {
      return res.status(400).json({msg:'Posts are not available for this user'});
    }
    res.status(500).send('Server error');
    
   
}
}  
)


router.put('/like/:id',auth,async(req,res)=>{
  try{
    const post= await Post.findById(req.params.id);
    if(post.likes.filter(like=>like.user.toString()==req.user.id).length >0)
    return res.status(400).json({msg:'Post is already liked by this user'});
    post.likes.unshift({user:req.user.id});
    await post.save();
    return res.json(post.likes);
  }
  catch(err)
  {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

router.put('/unlike/:id',auth,async(req,res)=>{
  try{
    const post= await Post.findById(req.params.id);
    if(post.likes.filter(like=>like.user.toString()==req.user.id).length===0)
    return res.status(400).json({msg:'Post has not yet been liked by this user'});
   const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex,1);
    await post.save();
    return res.json({msg:'Post is unliked by this user'});
  }
  catch(err)
  {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})


router.put('/comment/:id',auth,[
  check('text','Text field is required').not().isEmpty()],
  
  async(req,res)=>{

    const errors=validationResult(req);
if(!errors.isEmpty())
{
  return res.status(400).json({errors:errors.array()})
}


try {
const user =await User.findById(req.user.id);
const post=await Post.findById(req.params.id);

  
const newComment={
  text: req.body.text,
  name: user.name,
  avatar: user.avatar,
  user: req.user.id
};
post.comments.push(newComment);
await post.save();
res.json(post.comments);


  
} catch (error) {
  console.error(error.message);
  res.status(500).send('Server error');
  
}

    
})

router.put('/uncomment/:id/:comment_id',auth,
async(req,res)=>{

  try{
    const post=await Post.findById(req.params.id);
    if(!post)
    return res.status(404).json({msg:'No posts are available for comment for this user'});

    const comment=post.comments.find(comment=>comment.id===req.params.comment_id);
    if(!comment)
    return res.status(404).json({msg:'No comment is available for this user'});
    if(comment.user.toString()!==req.user.id)
    return res.status(401).json({msg:'User is not authorised to delete this comment'});
    const removeIndex=post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id);
    post.comments.splice(removeIndex,1);

    await post.save();
    return res.json({msg:'Comment is removed of id '+req.params.comment_id});
 
  }catch(err){

  console.error(error.message);
  res.status(500).send('Server error');
  }

    
})



module.exports=router;
