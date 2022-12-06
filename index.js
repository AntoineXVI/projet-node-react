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
  
app.get('/something', (req, res) => {
    const color1 = req.query.color1;
    const color2 = req.query.color2;
    /* 
    Traitement du code ensuite...
    */
})

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const jsonParser = bodyParser.json();
app.post('/pokemon/insert', jsonParser, (req, res) => {
    const body = req.body;
    console.log('Got body:', body);
    dbConnect
    .collection("pokemon")
    .insert(...body)
    res.json(body);
});