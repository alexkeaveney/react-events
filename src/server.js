const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 5000;
var async = require("async");
var fetch = require('node-fetch');

let db;

app.get('/api/hello', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send(JSON.stringify({ message: "Hello" }));
});

app.get('/api/login/:id', (req, res) => {
    let facebookId = req.param('id');

    //holds user that connects
    let user_new;

    //holds db user collection
    let collection = db.collection('users');

    //read request for user of passed in username
    collection.findOne({ facebook: facebookId }, function (err, user) {

        //if there is an error log it and return
        if (err) { console.log(err); return;}

        //check no error
        else {
            //checks user is not undefined (not in DB)
            if (user) {
                //creates user object with score from DB
                user_new = {facebook: facebookId, id: user.id};
                console.log("in database");
            }

            //checks if user not in the DB
            else {
                let newId;
                newId = collection.count({}, function (error, count) {
                    //console.log(error, count);

                    //creates user object with score of 0
                    user_new = {facebook: facebookId, id: count+1};

                    //inserts the new user into the DB
                    collection.insert({
                        facebook: facebookId,
                        id: count+1
                    });

                });

            }

        } //close no errors

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(JSON.stringify(user_new));

    }); //closes DB findOne block


});

app.get('/api/getfavourites/:id', (req, res) => {

    console.log("Favourite tapped");
    let favourites = req.params.id;
    var array = favourites.split(',');
    let collection = db.collection('events');
    let ids = [];

    for (let i = 0; i < array.length; i++) {
        //ids.push(parseInt(array[i]));
        ids.push(array[i]);
        console.log(ids[i]);
    }

    console.log("Array===" + array.length);

    let i = 0;
    let locations = [];
    console.log("idsLength==="+ ids.length);

    collection.find({eventbrite:{$in:ids}}).each(function(err, result) {
        //console.log(result);
        if (err) {
            //console.log(err);
            // i++;
        }
        if (result) {
            console.log("Result===" + result.name);
            i++;
            console.log(i);
            locations.push(result);

            if (i == ids.length) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(JSON.stringify({"locations": locations}));
            }
        }

    });

});

app.get('/api/favourite/:id', (req, res) => {
    console.log("Favourite tapped");
    let id = req.params.id;

    let collection = db.collection('events');


    collection.findOne({ eventbrite: id }, function (err, event) {

        //if there is an error log it and return
        if (err) { console.log(err); return;}

        //check no error
        else {
            //checks if user was is db
            if (event) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(JSON.stringify({"message": "already in database"}));
            }
            //not in DB
            else {
                let token = "BH6C43BZNN6UUWYUDFHI";
                let url = "https://www.eventbriteapi.com/v3/events/";
                let requestURL = url + id + "/?token=" + token + "&expand=venue";


                fetch(requestURL)
                  .then(function(response){
                    if(response.ok) return response.json();
                    throw new Error("Request Failed");
                  })
                 .then(data => {
                     let n = data.name.text;
                     let id = data.id;
                     let d = data.description.text;
                     let i = data.logo.url;
                     let lat = data.venue.latitude;
                     let lng = data.venue.longitude;
                     let ven = data.venue.name;
                     let url = data.url;
                     let date = data.start.local;

                     let location = {
                         name: n,
                         eventbrite: id,
                         description: d,
                         image_url: i,
                         lat: lat,
                         lng: lng,
                         venue: ven,
                         website: url,
                         date: date
                     }

                     collection.insert({
                         name: n,
                         eventbrite: id,
                         description: d,
                         image_url: i,
                         lat: lat,
                         lng: lng,
                         venue: ven,
                         website: url,
                         date: date
                     }, function(err, success) {
                         if (err) {
                             res.setHeader('Access-Control-Allow-Origin', '*');
                             res.send(JSON.stringify({"message": err}));
                         }
                         if (success) {
                             res.setHeader('Access-Control-Allow-Origin', '*');
                             res.send(JSON.stringify({"message": location}));
                         }
                     });
                 });


            }
        }


    });




});


//connect to MongoDB
MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {

    //if there is an error log it
    if (err) { console.log(err); }
    //if there are no errors
    else {
        //set db object to 'cheat' database
        db = database.db('react-events');
    }

    //listen for requests to db on port 8000
    app.listen(8000, () => {
        console.log('Database connected');
    });
});





app.listen(port, () => console.log(`Listening on port ${port}`))
