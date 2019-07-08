//=========================================
//REQUIREMENTS
//=========================================

var path = require("path");

//=========================================
//ROUTING
//=========================================

module.exports = function(app) {

//If route is survey, go to survey.html
app.get("/survey", function(req, res){
    res.sendFile(path.join(__dirname, "/../public/survey.html"));
});

//If no matching route, go to default home.
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "/../public/home.html"));
});

};