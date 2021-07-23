const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
require('dotenv').config()

let code = ""
let secretstring = ""

const clientid = process.env.CLIENT_ID;
const clientsecret = process.env.CLIENT_SECRET;

//Routes
router.get('/', (req,res) => {
    try{
        specialcode = req.query.code;
        let state = req.query.state;
        if(secretstring == state)
        {
            //exchange code for access token
            axios.post('https://todoist.com/oauth/access_token', {
                client_id: clientid,
                client_secret: clientsecret,
                code: specialcode
              })
              .then((response) => 
              {
                accesstoken = response.data.access_token;
                accesstoken = 'Bearer ' + accesstoken;
                res.redirect('/auth/authsuccess')
              }, (error) => {
                console.log(error);
                res.send("Auth Unsuccesful ! :(");
              });
        }
        else
        {
            res.send("Auth Unsuccessful ! Secret Tokens Do not Match !")
        }
    }catch(err){
        res.json({message: err});
    }
    });

router.get('/login', (req,res) => {
    secretstring = makestring(30);
    baseauthurl = "https://todoist.com/oauth/authorize"
    userauthurl = baseauthurl + "?client_id=" + clientid + "&scope=data:read" + "&state=" + secretstring;
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

