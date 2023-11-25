const express= require('express')
const router= express.Router();
const auth=require('../../middleware/auth');
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs')
const config=require('config')
var jwt = require('jsonwebtoken');

router.get('/',auth,async(req,res)=>{
  try{
    const user=await User.findById(req.user.id).select('-password');
    console.log(user)
    res.json(user)
  }catch(err){
    console.errror(err.message);
    res.status(500).send('Server error');

  }
  // res.send('auth routes')
})

router.post(
  '/',
  
  [
  body('email','Please enter a valid email').isEmail(),
  body('password','please enter a password').exists()],
  async(req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    console.log(req.body);
    try{

         let user_data=await User.findOne({email:email})
         if(!user_data)
         {
            return res.status(400).json({errors:[{msg:'User is not registered yet!!! or Invalid credentials'}]})
         }
         const flag=await bcrypt.compare(password,user_data.password);
         if(!flag)
         {
          return res.status(400).json({errors:[{msg:'password is incorrect!!!Please try again'}]})
         }
         const payload={
            user:{
               id:user_data.id
            }
         }
         jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
               expiresIn:36000
            },
            (err,token)=>{
               if(err)throw err;
               res.json({token})
            }
         )
       

    }catch{

      console.error(err.message)
      res.status(500).send('Server')
    }

   //  User.create({
   //    username: req.body.username,
   //    password: req.body.password,
   //  }).then(user => res.json(user));
  },
);
module.exports=router;