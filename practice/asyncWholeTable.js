 const Client = require('pg').Client
 //call the specific part(client) in library('pg')
const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "RayRM",
    port: 5432,
    database: "postgres" 
}) 

printTable();


async function printTable(){
    try{
    await client.connect()
    console.log("connected successfully")
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

    