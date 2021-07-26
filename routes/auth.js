const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
require('dotenv').config()

//declare variables to be used across the route
let code = "";
let secretstring = [];

const clientid = process.env.CLIENT_ID;
const clientsecret = process.env.CLIENT_SECRET;

//Routes
router.get('/', (req,res) => {
    try{
        let check = 0;
        let index = 0;
        specialcode = req.query.code;
        let state = req.query.state;
        while (index < secretstring.length && check==0) {
        if(secretstring[index] == state)
        {
            //exchange code for access token
            check = 1;
            secretstring.splice(index, 1);
            axios.post('https://todoist.com/oauth/access_token', {
                client_id: clientid,
                client_secret: clientsecret,
                code: specialcode
              })
              .then((response) => 
              {
                //use let here later
                accesstoken = response.data.access_token;
                accesstoken = 'Bearer ' + accesstoken;
                res.redirect('/auth/authsuccess')
              }, (error) => {
                console.log(error);
                res.send("Auth Unsuccesful ! :(");
              });
        }
        index++;
    }
    if(check == 0 ){
          res.send("Auth Unsuccessful ! Secret Tokens Do not Match !")
    }
  }catch(err){
        res.json({message: err});
    }
    });

router.get('/login', (req,res) => {
    let tempsecretstring = makestring(30);
    baseauthurl = "https://todoist.com/oauth/authorize"
    userauthurl = baseauthurl + "?client_id=" + clientid + "&scope=data:read" + "&state=" + tempsecretstring;
    secretstring.push(tempsecretstring);
    res.redirect(userauthurl);
    });

router.get('/authsuccess', (req,res) => {
  htmlpath = path.join(__dirname, '/sync.html')
  res.sendFile(htmlpath);
    });


module.exports = router;



//Global Functions


function makestring(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

