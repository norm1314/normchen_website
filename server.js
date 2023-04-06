const Client = require("pg").Client
const express = require("express")
const {Connection} = require("pg")
//call library & framework using npm

const client = new Client({ 
   user: "postgres",
   password: "postgres",
   host: "normchen-1",
   port: 5432,
   database: "postgres" 
}) 
const app = express()

//body parser, a middleware function used in Node.js and the Express framework to parse incoming request bodies in JSON format.
app.use(express.json());


//serve the html on address "(http://localhost:9090)/"
app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`) )
//printTable and transmit data in JSON format
app.get("/emotion_record", async (req, res) => {
    // set up root /emotion_recor, and return the following  when access this root
    const rows = await printTable();
    res.setHeader("content-type", "application/json")//the browser misread the file type, could set manually.
    //console.log(res.getHeaders())  //-> check if the content type correct //
    res.send(JSON.stringify(rows))
    //stringify send String not Object ,and send it to web page
})


//http method:  use app(express) for commnicate with web page
app.post("/emotion_record", async (req, res) => {
    let results = {}
    try{ 
    // set up root /emotion_recor, and return the following  when access this root
        const reqJson = req.body; //will not parse by express, if you didn't.body tell express .body is JSON.
        console.log(`INSERT text: ${reqJson}`)
        await expressEmotion(reqJson.thought);//.emotion come from browser(user end)
        results.success = true; 
    }
    catch(e){ 
        results.success = false; 
    }
    finally{
        res.setHeader("content-type", "application/json")//the browser misread the file type, could set manually.
        /*console.log(res.getHeaders())  //-> check if the content type correct */
        res.send(JSON.stringify(results))
        //stringify send String not Object ,and send it to  
    }
})
 
//delete
app.delete("/emotion_record", async (req, res) => {
    let results = {}
    try{ 
    // set up root /emotion_recor, and return the following  when access this root
        const reqJson = req.body; //will not parse by express, if you didn't.body tell express .body is JSON.
        console.log(`DELETE id: [${reqJson}]`)
        await deletedOneByOne(reqJson.id);//.id come from browser(user end)
        results.success = true; 
    }
    catch(e){ 
        results.success = false; 
    }
    finally{
        res.setHeader("content-type", "application/json")//the browser misread the file type, could set manually.
        /*console.log(res.getHeaders())  //-> check if the content type correct */
        res.send(JSON.stringify(results))
        //stringify send String not Object ,and send it to  
    }
})




//start a server
app.listen(9090, () =>  console.log("web server is listening on 9090"))



//function start() connect to DB
start()
async function start(){
    try{
        await client.connect()
        console.log("connected successfully!")
        }
    catch(e) 
    {
        console.log(`error! something wrong. Failed to connect ${e}`)
    }
}


async function printTable() {
    try{
        const results = await client.query("SELECT * FROM emotion_record")
        return results.rows;
    }
    catch(e){
        return [];
    }
}

async function expressEmotion(thou){
    try{
        
        //parameterized query avoid SQL injection
        await client.query("INSERT INTO emotion_record (thought) VALUES ($1)", [thou]);
        return true;
    }
    catch(e){
        return false;
    }
}

//delete, one by one, specify one ID at a time.
async function deletedOneByOne(id){
    try{
        
        //parameterized query avoid SQL injection
        await client.query("DELETE FROM emotion_record WHERE id = $1", [id]);
        return true;
    }
    catch(e){
        return false;
    }
}


//printTable();
/* ----OLD printTAble
async function printTable(){
   try{
   await client.connect()
   console.log("connected suc cessfully")
   const callTable = await client.query("INSERT INTO emotion_record VALUES (1,'what',2)")
   console.log(callTable.rows)
   }

   catch(ex) 
   {
       console.log(`error! something wrong ${ex}`)
   }

   finally
   {
       await client.end()
       console.log("client disconnected successfully") 
   }
}
*/
   