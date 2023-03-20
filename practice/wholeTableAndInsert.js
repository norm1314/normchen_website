const Client = require('pg').Client
//alternative writing -> const {Client} = require('pg')
//require pg library but only use class Client 
const client = new Client({
     user: "postgres",
     password: "postgres",
     host: "RayRM.home",
     port: 5432,
     database: "postgres"
 })

 client.connect()
 //connect to DB
 .then(() => console.log("connect  with pgDB successfullly"))
 .then(() => client.query("INSERT INTO emotion_record VALUES (7,'do hello',7)"))
 .then(() => client.query("SELECT * FROM emotion_record")) 
 /* use parameter($1) to avoid SQL injection, 
 the $1 parameter is design by the creater of the .query function,
 JS wouldn't recognize the $1. */
 .then(results => console.table(results.rows))
 .catch(e => console.log("failed"))
 .finally(() => client.end())//make sure it close
