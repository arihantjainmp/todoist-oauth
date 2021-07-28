const express = require('express');
const router = express.Router();
const axios = require('axios');
const Userdata = require('./models/Userdata');
const Accesstokensave = require('./models/Accesstoken');
const mongoose = require('mongoose');
require('dotenv').config()

router.get('/start', (req,res) => {
    const returnData = Accesstokensave.findById(req.query.authtokenid)
    returnData.then((response) => {
      token = response.accesstoken;
    try{
      tasks = axios.get('https://api.todoist.com/rest/v1/tasks', 
    {
        headers: 
        {
          'Authorization': token
        }
    })
    .then(async (response) => 
      {
        //test from here
        const userinfo = new Userdata({
            accesstoken: token,
            tasks: response.data
        });
        try{
        const savedPost = await userinfo.save()
        res.send("Userinfo Saved Successfully. You may now close the website !");
        console.log("Userinfo Saved Successfully.");
        }
        catch (err){
            res.json({ message: err}); 
        }
        //test till here
      },(error) => {
        console.log(error);
        res.send("Couldnt Fetch Data !");
      });
    }catch(err){
        res.json({message: err});
    }
  })
});





module.exports = router;