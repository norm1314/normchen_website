/* do a new practice for transection using async, SQL(BEGIN), SQL(BEGIN), SQL(ROLLBACK) if fail
https://youtu.be/ufdHsFClAk0?t=2400
*/

// Finish prac


const {Client} = require('pg')
//require 'pg'.client
const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "RayRM",
    port: 5432,
    database: "postgres"
})
//information for accessing DB



printTable()


async function printTable(){
    try {
    await client.connect()
    console.log("connect to the DB successfullly")
    await client.query("BEGIN")
    /*
    // INSERT ERROR check if it do rollback after error
    await client.query("INSERT INTO emotion_record VALUES (1, 'error test',3)")
    await client.query("INSERT INTO emotion_record VALUES (10, 'error test',3)")
    console.log("I INSERT the value(1, 'error test',3)")
    */
    const print = await client.query("SELECT * FROM emotion_record")
    console.table(print.rows)
    console.log("finish print")
    await client.query("END")
    }

    catch (error) {
        console.log(`un-oh, something goes worng. it might be ${error}. I will rollback for you.`)
        client.query("ROLLBACK")
    }
    finally {
        client.end()
        console.log("end connection")
    }

}

/* 
review
1. syntax error: aync funName function({ ... })  <- wrong
2. forget to add comma "", user: postgres  <- wrong
3. Typo "FORM", await client.query("SELECT * FORM emotion_record")   <- wrong
4. there is no function client.disconnect() <- wrong
5. !!!major code error, forget to print out the table, 
6. print table but out put the object,  console.table(print.rows) <- might be more easy to read




Figure out

6. why print collect so many data, which need user to designated .rows, and what does .rows do 

How to use debugger one line by a time (like tutorial video on the first line)

*/