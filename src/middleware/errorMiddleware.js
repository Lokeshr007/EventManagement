const express = require('express');
app.use(express.json());
app.get("/",async(req,res)=>{
    res.send("API is running..");
})