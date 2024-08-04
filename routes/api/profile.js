const express= require('express')
const router= express.Router();
const auth=require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');


router.get('/myProfile',auth,async(req,res)=>{
   try{
      const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
      if(!profile)
      {
         return res.status(400).json({msg:'Profile is missing for this user'})
      }
      res.json(profile)

    }catch(err){
      console.errror(err.message);
      res.status(500).send('Server error');   
    }

   
})

//get all profiles
router.get('/',async(req,res)=>{
   try{
      const profiles=await Profile.find().populate('user',['name','avatar']);
      res.json(profiles)
   }catch(err){
      console.error(err.message);
      res.status(500).send('Server error');
   }
}
)

// get profile by user id
router.get('/user/:user_id',async(req,res)=>{
   try{
      const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
      if(!profile)
      {
         return res.status(400).json({msg:'Profile is missing for this user'})
      }
      res.json(profile)
   }catch(err){
      console.error(err.message);
      if(err.kind=='ObjectId')
      {
         return res.status(400).json({msg:'Profile is missing for this user'})
      }
      res.status(500).send('Server error');
   }
}  
)

// delete a profile

router.delete('/',auth,async(req,res)=>{
   try{
      await Post.deleteMany({user:req.user.id});
      await Profile.findOneAndRemove({user:req.user.id});
      await User.findOneAndRemove({_id:req.user.id});
      res.json({msg:" Account has been deleted!!"})
   }catch(err){
      console.error(err.message);
      res.status(500).send('Server error');
   }
}
)

// add experience

router.put('/experience',[auth,[check('title','title is required').not().isEmpty(),
check('company','company is required').not().isEmpty(),
check('from','from date is required').not().isEmpty()]],async(req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty())
   {
      return res.status(400).json({errors:errors.array()})
   }
   const{
      title,
      company,
      location,
      from,
      to,
      current,
      description
   }=req.body;
   const new_experience={
      title:title, company:company, location:location, from:from, to:to, current:current, description:description
   }
   try{
      const profile=await Profile.findOne({user:req.user.id});
      profile.experiences.unshift(new_experience);
      await profile.save();
      res.json(profile);
   }catch(err){
      console.error(err.message);
      res.status(500).send('Server error');
   }
}
)

// delete experience

router.delete('/experience/:exp_id',auth,async(req,res)=>{
   try{
      const profile=await Profile.findOne({user:req.user.id});
      const update_experience=profile.experiences.filter(exp=>exp._id.toString()!==req.params.exp_id);
      profile.experiences=update_experience;
   
      await profile.save();
      res.json(profile);
   }catch(err){
      console.error(err.message);
      res.status(500).send('Server error');
   }
}
)

// add education

router.put('/education',[auth,[check('schoolName','schoolName is required').not().isEmpty(),
check('degree','degree is required').not().isEmpty(),
check('from','from date is required').not().isEmpty()]],async(req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty())
   {
      return res.status(400).json({errors:errors.array()})
   }
   const{
      schoolName,
      degree,
      branch,
      from,
      to,
      current,
      description
   }=req.body;
   const new_education={
      schoolName:schoolName, degree:degree, branch:branch, from:from, to:to, current:current, description:description
   }
   try{
      const profile=await Profile.findOne({user:req.user.id});
      profile.education.unshift(new_education);
      await profile.save();
      res.json(profile);
   }catch(err){
      console.error(err.message);
      res.status(500).send('Server error');
   }
}
)

// delete education

router.delete('/education/:edu_id',auth,async(req,res)=>{
   try{
      const profile=await Profile.findOne({user:req.user.id});
      const update_education=profile.education.filter(edu=>edu._id.toString()!==req.params.edu_id);
      profile.education=update_education;
   
      await profile.save();
      res.json(profile);
   }catch(err){
      console.error(err.message);
      res.status(500).send('Server error');
   }
}
)

router.post('/',[auth,
   [
      check('status','status is required').not().isEmpty(),
      check('skills','skills is required').not().isEmpty()
   ]
],async(req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty())
   {
      return res.status(400).json({errors:errors.array()})
   }
   const{
      user,
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubUserName,
      experiences,
      education,
      facebook,
      instagram,
      youtube,
      linkedin,
      twitter
   }=req.body;

const profileContents={};
profileContents.user=req.user.id;
if(company)profileContents.company=company;
if(website)profileContents.website=website;
if(location)profileContents.location=location;
if(status)profileContents.status=status;
if(skills)
{
   profileContents.skills=skills.split(',').map(skill=>skill.trim());
}
if(bio)profileContents.bio=bio;
if(githubUserName)profileContents.githubUserName=githubUserName;


profileContents.socialMedia={};

if(facebook)profileContents.socialMedia.facebook=facebook;
if(instagram)profileContents.socialMedia.instagram=instagram;
if(youtube)profileContents.socialMedia.youtube=youtube;
if(linkedin)profileContents.socialMedia.linkedin=linkedin;
if(twitter)profileContents.socialMedia.twitter=twitter;

try{
   let profile=await Profile.findOne({user:req.user.id});
   if(profile){
      profile=await Profile.findOneAndUpdate({user:req.user.id},{$set:profileContents},{new:true});
   }
   else{
      profile=new Profile(profileContents);
      await profile.save();
   }
   
   return res.json(profile);
}
catch(err){
   console.error(err.message);
   res.status(500).send('Server error');
}




})
module.exports=router; 

