const { MongoClient } = require("mongodb");
const connectionString =
  "mongodb+srv://antoine:Antop21102003@cluster1.g7kfkn9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return err;
      }
      
      //remplacer whatever par le nom de votre DB !
      dbConnection = db.db("data_pok");
      console.log("Successfully connected to MongoDB.");
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
