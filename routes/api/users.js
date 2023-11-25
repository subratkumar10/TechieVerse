const express= require('express')
const router= express.Router();
const { body, validationResult } = require('express-validator');
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs')
const config=require('config')
var jwt = require('jsonwebtoken');

// router.post('/',(req,res)=>{

//    console.log(req.body);
//    res.send('users routes')  
// })

const User=require('../../models/User.js')
router.post(
  '/',
  
  [body('name','name is required').not().isEmpty(),
  body('email','Please enter a valid email').isEmail(),
  body('password','please enter a password with 6 or more letter').isLength({ min: 6 })],
  async(req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {name,email,password}=req.body;
    console.log(req.body);
    try{

         let user=await User.findOne({email:email})
         if(user)
         {
            return res.status(400).json({errors:[{msg:'User is already exist please try new one'}]})
         }
         const avatar=gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
         })
         user=new User({name,email,password,avatar});
         const slt=await bcrypt.genSalt(10);
         user.password= await bcrypt.hash(password,slt);
         await user.save();
         const payload={
            user:{
               id:user.id
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