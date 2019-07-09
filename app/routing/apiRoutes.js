// * A GET route with the url `/api/friends`. 
// This will be used to display a JSON of all possible friends.
// * A POST routes `/api/friends`. 
// This will be used to handle incoming survey results. 
// This route will also be used to handle the compatibility logic.
var pets = require("../data/friends");

module.exports = function(app) {
  
    app.get("/api/pets", function(req, res) {
      res.json(pets);
    });

    app.post("api/pets", function(req,res){
        console.log(req.body.scores);
    })
}