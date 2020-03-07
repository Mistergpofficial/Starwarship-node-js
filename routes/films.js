const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const axios = require('axios');
const Film = require("../models/Film");
const filmService = require('../services/film');


 // Get all movies
router.get("/", async (request, response) => {

   let retrievedFilms = await filmService.fetchMovies();
  
   // check if movies exist in database
   // if yes, retrieve them and display 
   //if no, save to db
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
         var film = Film.collection.insertMany(retrievedFilms);
          response.json({
            status: 200,
            message: "Film retrieved",
            data: retrievedFilms
         })
        }
     });
     
  
   
});


// List character for a movie
router.get('/:id', async (req, res) => {
   
});



module.exports = router