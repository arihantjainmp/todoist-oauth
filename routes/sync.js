const express = require('express');
const router = express.Router();
const axios = require('axios');
const Userdata = require('./models/Userdata');
require('dotenv').config()

router.get('/start', (req,res) => {
    token = accesstoken;
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
});





module.exports = router;