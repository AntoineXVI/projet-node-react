const express = require("express");
const dbo = require("./db/db");
var cors = require('cors')
const app = express();
app.use(cors())
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
      .insertMany(body)
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
  const dbConnect = dbo.getDb();
  pokemontoupdate = {name:body.pokemontoupdate}
  set = {name:body.name}
  dbConnect
  .collection("pokemon")
  .updateOne(pokemontoupdate,{$set:set});
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

//Collection Type//
app.get("/types/list", function (req, res) {
  const dbConnect = dbo.getDb();!
  dbConnect
    .collection("type")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });

});

app.post('/types/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body_insert:', body);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("type")
    .insertMany(body)
    .then(function (result, error) {
      if (error) {
        res.json(error, error.message);
      }else{
        res.json(result)
      }
    });
});

app.post('/types/update', jsonParser, (req, res) => {
  const body = req.body;
  const dbConnect = dbo.getDb();
  filter = {name_type: body.typeupdate}
  set = {$set:{name_type:body.name_type}}
  dbConnect.collection("type").updateMany(filter,set);
  res.json(body);
});

app.delete('/types/delete', jsonParser, (req, res) => {
  const body = req.body;
  const dbConnect = dbo.getDb();
  console.log('Got body_delete:', body);
  dbConnect
    .collection("type")
    .deleteOne(body)
    .then(function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});