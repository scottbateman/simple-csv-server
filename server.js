var express = require("express");
var app = express();
var bodyparser = require('body-parser');
var fs = require('fs');

app.use(bodyparser.text())

const config = require('./config');
const sqlite = require('sqlite3').verbose();


let table_create = false;

//test to see if db exists
try{
    if (fs.existsSync(config.DB_NAME))
    {
        console.log(`${config.DB_NAME} found.`);
    }
    else{
        console.log(`${config.DB_NAME} NOT found. Will create it and try to create tables.`);
        table_create = true;
    }
} catch(err){
    console.log(`${config.DB_NAME} NOT found. Will create it and try to create tables.`);
    table_create = true;
}


//connect or create db
var db = new sqlite.Database(config.DB_NAME, (err) => {
    if (err){
        console.log(`Cannot connect to db: ${config.DB_NAME}`);
        process.exit();
    }
    //create tables
    else if (table_create){
        console.log("CREATING TABLES...");
        //create database creation statements
        config.tables.forEach(table=> {
            let create_table = `CREATE TABLE ${table.table_name} \(${table.columns.join()}\)`;
            console.log(create_table);
            db.exec(create_table, (err, row) => {
                if (err){
                    console.error('error creating table:'+ err);   
                }
                else{
                    console.log('created table');
                }
            });    
        });
    }
    console.log(`Connected to db: ${config.DB_NAME}`);
});

//start server
var http_server = app.listen(config.HTTP_PORT, () => {
    console.log(`simple_csv_server running on port ${config.HTTP_PORT}`);
});

//set up endpoints 
for (let i = 0; i < config.tables.length; i++){
    table = config.tables[i];
    (function(table){
        app.post('/' + table.table_name, function(req, res){
            let insert = `insert into ${table.table_name} values \(${req.body}\);`        
            db.exec(insert, (err, row)=>{
                if (err){   
                    let error_msg = `error on query:
                        ${insert}
                    `;
                    console.error(error_msg);
                    console.error(err);
                    res.status(500).send(error_msg);
                }
                else{
                    res.sendStatus(200);
                }
            });
        })
    })(table);
}

//default response for any other request
app.use(function(req,res){
   console.log("no endpoint: "+req.params);
   res.status(404).send("Not found");
});

function cleanup(){
    console.log("Closing simple_csv_server");
    http_server.close();
    db.close();
    process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
