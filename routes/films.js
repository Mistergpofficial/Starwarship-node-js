const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const env = require('dotenv').config();
const axios = require('axios');
var stringify = require('json-stringify-safe');
const _ = require('lodash');
const Film = require("../models/Film");


 // Get all movies
router.get("/", async (request, response) => {
   try {
   const api_url = `${process.env.SWAPI_URL}/films`
   const response_api = await axios.get(api_url);
   const repr = JSON.parse(stringify(response_api))
   const sort = _.sortBy(repr.data['results'], 'release_date');
  
 
     Film.find().select('title opening_crawl episode_id release_date comment_count').exec().then(obj => {
        if(obj.length > 0){
         const retrieved = {
            count: obj.length,
            filmArray: obj.filter(ob => {
                return {
                  title: ob.title,
                  opening_crawl: ob.opening_crawl,
                  episode_id: ob.episode_id,
                  release_date: ob.release_date,
                  comment_count: ob.comment_count
                }
            })
        }
         response.json({
            status: 200,
            message: "Film retrieved",
            data: retrieved
           
         })
        }else{  
         var film = Film.collection.insertMany(sort);
          response.json({
            status: 200,
            message: "Film retrieved",
            data: sort
         })
        }
     });
     
   }
   catch (err) {
      console.log(err)
      return response.json({ err })
   }
   
});


// List character for a movie
router.get('/:id', async (req, res) => {
   
});



module.exports = router