const express= require('express');

const app=express();
app.get('/',(req,res)=>res.send('API is running!!'));

const PORT=process.env.PORT||5000;
//hello
app.listen(PORT,()=>console.log(`server started on ${PORT}`))

