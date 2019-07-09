// * A GET route with the url `/api/friends`. 
// This will be used to display a JSON of all possible friends.
// * A POST routes `/api/friends`. 
// This will be used to handle incoming survey results. 
// This route will also be used to handle the compatibility logic.
var pets = require("../data/pets.js");

module.exports = function (app) {

    app.get("/api/pets", function (req, res) {
        res.json(pets);
    });

    app.post("/api/pets", function (req, res) {
        // Receive user details (name, photo, scores)
        var newUser = req.body;
        var userScores = newUser.scores.map(function (item) {
            return parseInt(item, 10);
        });;
        var sum = userScores.reduce((total, userScores) => total + userScores, 0);
        console.log("User Scores: " + userScores);
        console.log("User SUM: " + sum);
        // console.log("New User Data:" + JSON.stringify(newUser));


        //Comparing user with their best friend match 
        var totalDifference = 0;
        //Object to hold the best match
        var bestMatch = {
            name: "",
            photo: "",
            matchDifference: 1000
        };

        for (var i = 0; i < pets.length; i++) {
            var totalDifference = 0;
            var petScore = pets[i].scores.reduce((a, b) => a + b, 0);
            console.log("Name: " + pets[i] + "Total: " + petScore);


            // If the sum of differences is less then the differences of the current "best match"
            if (totalDifference <= bestMatch.matchDifference) {
                // Reset the bestMatch to be the new friend. 
                bestMatch.name = pets[i].name;
                bestMatch.photo = pets[i].photo;
                bestMatch.matchDifference = totalDifference;
                // }
            }
        }
        console.log(totalDifference + " Total Difference");
        console.log(bestMatch);
        // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
        // the database will always return that the user is the user's best friend).
        pets.push(newUser);
        console.log("New User added");
        console.log(newUser);
        res.json(bestMatch);
    })
};