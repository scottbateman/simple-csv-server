# simple-csv-server
A simple server for storing posted csv and accessing the data, which is stored in a sqlite3 db.

## What it does
A simple server that just accepts text/plain posted data in a comma seprated format. The server can also return all data in csv format. Strings must be quoted. Has post end points based on the individual table names.

## Configuring
Simply edit config.js providing the appropriate data table details.

## Install and Run
 - Clone this repo
 - To install dependencies
 ``` npm install ```

 - To run the server
 ``` npm start ```

## Testing
Use this curl command to test insertions via post
```
curl -d "'column1 text','column2 text',3" -H"Content-Type:text/plain" http://127.0.0.1:9666/TableName
```
Use this wget command to test data access via get
```
wget http://127.0.0.1:9666/TableName
```
## TODO
Add some security to prevent SQL injection.
