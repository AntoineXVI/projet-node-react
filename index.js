const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;

dbo.connectToServer();


app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});


app.get("/pokemon/list", function (req, res) {
    //on se connecte à la DB MongoDB
    const dbConnect = dbo.getDb();
    //premier test permettant de récupérer mes pokemons !
    dbConnect
      .collection("pokemon")
      .find({}) // permet de filtrer les résultats
      /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching pokemons!");
        } else {
          res.json(result);
        }
      });
      /*
      Bref lisez la doc, 
      il y a plein de manières de faire ce qu'on veut :) 
      */
      
});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const jsonParser = bodyParser.json();

app.post('/pokemon/insert', jsonParser, (req, res) => {
    const body = req.body;
    //on se connecte à la DB MongoDB
    const dbConnect = dbo.getDb();
    console.log('Got body_insert:', body);
    dbConnect
        .collection("pokemon")
        .insertOne(body)
        .then(function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });

});

app.delete('/pokemon/delete', jsonParser, (req, res) => {
    const body = req.body;
    //on se connecte à la DB MongoDB
    const dbConnect = dbo.getDb();
    console.log('Got body_delete:', body);
    dbConnect
        .collection("pokemon")
        .deleteOne(body)
        .then(function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });

});

app.post('/pokemon/update', jsonParser, (req, res) => {
    const body = req.body;
    //on se connecte à la DB MongoDB
    const dbConnect = dbo.getDb();
    filter = {name: body.pokemonupdate}
    set = {$set:{name:body.name}}
    dbConnect.collection("pokemon").updateMany(filter,set);
    res.json(body);
  });


//pokedex

app.get("/pokedex/list", function (req, res) {
    //on se connecte à la DB MongoDB
    const dbConnect = dbo.getDb();
    //premier test permettant de récupérer mes pokemons !
    dbConnect
      .collection("pokedex")
      .find({}) // permet de filtrer les résultats
      /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching pokemons!");
        } else {
          res.json(result);
        }
      });
      /*
      Bref lisez la doc, 
      il y a plein de manières de faire ce qu'on veut :) 
      */
      
});

app.post('/pokedex/insert', jsonParser, (req, res) => {
    const body = req.body;
    //on se connecte à la DB MongoDB
    const dbConnect = dbo.getDb();
    console.log('Got body_insert:', body);
    if (body.name in dbConnect.collection("pokemon").find({name:{}})) {
        dbConnect
            .collection("pokedex")
            .insertOne(body)
            .then(function (err, result) {
                if (err) {
                    res.json(err);  
                }else {
                    res.json(result);
                }
            });
    }else{
        console.log("error, le pokemon n'existe pas");
    }
});

app.delete('/pokedex/delete', jsonParser, (req, res) => {
    const body = req.body;
    //on se connecte à la DB MongoDB
    const dbConnect = dbo.getDb();
    console.log('Got body_delete:', body);
    dbConnect
        .collection("pokedex")
        .deleteOne(body)
        .then(function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });

});