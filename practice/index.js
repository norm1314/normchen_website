const Client = require('pg').Client
/*alternative writing
-> const {Client} = require('pg')
=> {Client} means that ones want to select & store the same  variable Client(which decide the select method)
require pg library but only use class Client */
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
 .then(() => client.query("SELECT * FROM emotion_record where id = $1", ["4"]))
 //use parameter($1) to avoid SQL injection 
 .then(results => console.table(results.rows))
 .catch(e => console.log("failed"))
 .finally(() => client.end())//make sure it close
