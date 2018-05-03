var zomato = require('zomato');

var client = zomato.createClient({
    userkey: '3f11a86ba0b467ff6d808a2010e602a6',
});

client.getCategories(null, function(err, result) {
    if(!err){
        console.log(result);
    } else {
        console.log(err);
    }

});

client.getCities({
    q:"Twin-Cities", //query by city name
    lat:"44.9778", //latitude
    lon:"93.2650", //longitude
    city_ids:"1,2,3", //comma separated city_ids value
    count:"5" // number of maximum result to display
    }, function(err, result){
        if(!err){
          console.log(result);
        }else {
          console.log(err);
        }
    });