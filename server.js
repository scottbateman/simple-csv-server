var express = require("express");
var app = express();
var sqlinjection = require('sql-injection');
app.use(sqlinjection);

const config = require('./config');
const sqlite = require('sqlite3').verbose();

//connect or create db
var db = new sqlite3.Database(config.DB_NAME, sqlite3.READ_WRITE, (err) => {
    if (err){
        //if can't open for READ_WRITE try create
        var db = new sqlite3.Database(config.DB_NAME, (err) => {
            if (err){
                console.log(`Cannot connect to db: ${config.DB_NAME}`);
                process.exit();
            }
            //create tables
            else
            {
                //create database creation statements
                const DB_CREATION_STATEMENTS = [];
                config.tables.forEach(table => {
                    let create_table = `CREATE ${table.table_name} \(${table.join()}\)`;
                    db.exec(create_table, (err, row) => {
                        if (err){
                            console.error('error creating table:'+ err);   
                        }
                        else
                        {
                            console.log('created table: '+row);
                        }
                    });    
                });

            }
        }
    }
    console.log(`Connected to db: ${config.DB_NAME}`);
});


//start server
app.listen(HTTP_PORT, () => {
    console.log("simple_csv_server running on port ${config.HTTP_PORT}");
});



//set up endpoints 
for (let i = 0; i < config.tables.length(); i++){
    table = config.tables[i];
    app.post('/' + table.table_name, function(req, res){
        let insert = `insert into ${table.table_name} values \(${req.body}\);`        
        db.exec(insert, (err, row)=>{
            if (err){   
                let error_msg = `error on query:
                    ${insert}`;
                console.error(error_msg);
                res.status(500).send(erro_msg);
            }
            else{
                res.sendStatus(200);
            }
        });
    }(table));
}

//default response for any other request
app.use(function(req,res){
   console.log("no endpoint: "+req.params);
   res.status(404).send("Not found");
});

function clenaup(){
    app.close();
    db.close();
    process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
