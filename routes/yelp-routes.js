
// TOOL TO MAKE AJAX REQUESTS
var fetch = require('node-fetch');
// TOOL TO MAKE URL STRINGS: https://nodejs.org/api/querystring.html
var querystring = require('querystring');

module.exports = function(app) {

    app.get('/api/:postalCode', function (req, res) {
    // ENTER YOUR SEARCH TERM HERE
    var searchTerm = "";
    var zipCode = req.params.postalCode;
    var qs = querystring.stringify({
        term: searchTerm,
        location: zipCode
    });
    // ENTER YOUR API URL
    var url = "https://api.yelp.com/v3/businesses/search?" + qs;
    var params = {
        headers: {
            Authorization: "Bearer W6DsQNPFIyD6bXdUTGnRj3F47JJQq60H1xXAX82YHQQ1GM-yedZcm0SR-VMFn726zLkvAR32d_DTp4WpCXxVvf5mrWCaUWrb51Z7A9UhbvjlqYrHrEKK9ZB6Ik_5WHYx"
        },
        method: "GET",
        // body: {
            // location: zipCode,
            // term: searchTerm
        // }
    };
    console.log("Zip code is " + zipCode);
    
    /**
    * For our request to the Yelp API, we'll use the Fetch API
    * 
    * Reading: https://davidwalsh.name/fetch
    * Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    */
    fetch(url, params)
    .then(resYelp => resYelp.json()) // Return JSON and pass it to the next `then`
    .then(yelpJson => res.send(yelpJson))
    .catch(function (err) {
        console.log("An error occurred");
        res.send(err);
    });
});

}