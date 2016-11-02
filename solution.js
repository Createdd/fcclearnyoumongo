var mongo = require('mongodb').MongoClient;//load the mongoDB
var size = process.argv[2];//the first argument
var url = 'mongodb://localhost:27017/learnyoumongo';//Store the url of the database
mongo.connect(url, function(err, db) {
  if (err) throw err;//add error handler
  var collection = db.collection('prices');//specify the collection
  collection.aggregate(
      [{$match: {size:size}},//select the documents that meet the criteria
      {$group:{_id:'average', average: {$avg: '$price'}}}//use the average($avg) operator on the price property and pass it as average property 
      ])
      .toArray(function(err, results){
      if (err) throw err;//add error handler
      if(!results.length)
          throw new Error('No results found!');
      var res = results[0];
      console.log(Number(res.average).toFixed(2));//log out the rounded average 
      db.close();
  });//use the aggregate method and pass it the pipeline stages $match and $group to target the prices of a certain size
});//connect to the database with the provided url and use the callback function
