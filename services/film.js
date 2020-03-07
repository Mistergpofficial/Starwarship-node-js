const axios = require('axios');
var stringify = require('json-stringify-safe');
const env = require('dotenv').config();
const _ = require('lodash');

/**
 * fetches all movies
 *
 * @returns {Promise<Promise<*|Promise<never>|undefined>|T>}
 */
   exports.fetchMovies = async function () {

        try {
         const api_url = `${process.env.SWAPI_URL}/films`
         const response_api = await axios.get(api_url);
         const repr = JSON.parse(stringify(response_api))
         const sortMovieByReleaseDate = _.sortBy(repr.data['results'], 'release_date');
         return sortMovieByReleaseDate;

        } catch (e) {
           return  Promise.reject(e);
        }

    };
