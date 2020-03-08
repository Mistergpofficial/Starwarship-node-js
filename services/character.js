const filmService = require('../services/film'),
    axios = require('axios');

/**
 * Fetch characters in a movie
 * @param movieId
 * @returns {Promise<any[]>}
 */
exports.fetchCharactersInMovie = async function (movieId) {

    try {

        const movieData = await filmService.fetchMovieById(movieId);
        //we pass the array of movie characters to a promise.all
        let movieCharacters = await Promise.all( movieData.characters.map(async (url) => {
            const characterData = await axios.get(url);
            return characterData.data;
        }));

        return movieCharacters;

    }catch (e) {
        Promise.reject(e);
    }
};