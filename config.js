/**
 In this file provide a definition of all database tables using the form below, adding them 
 to the tables definition array. Remember that column order matters, because data posted
 to the server will be put in the database in this same order.
 
 An endpoint for posting csv data will be created using each table name. CSV data will be 
 insert directly into the table of that name..

 const table1 = {
     table_name = 'table1',
     columns = [
        'a INT',
        'b TEXT',
        'c INT',
        'd REAL' 
     ];
 }

 The above would result in the table creation statement:
      CREATE table table1(a INT, b TEXT, c INT, d REAL);

 Add each table definition to the tables array below.
*/

const HTTP_PORT = 9666;             //server port
const DB_NAME = "default_db.db";    //database name... this database file will be created unless already exists
const USE_JSON = false;      //set to true to use JSON instead of csv

//Define tables here


const tables = [];      //add tables to this array

//exports... do not touch
module.exports.HTTP_PORT = HTTP_PORT;
module.exports.DB_NAME = DB_NAME;
module.exports.tables = tables;
