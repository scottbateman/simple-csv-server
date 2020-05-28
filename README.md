# simple-csv-server
A simple server for storing posted csv data to a sqlite3 db.

## What it does
A simple server that just accepts text/plain posted data in a comma seprated format. Strings must be quoted. Has post end points based on the individual table names.

## Configuring
Simply edit config.js providing the appropriate data table details.

## Testing
Use this curl command to test
```
curl -d "'column1 text','column2 text',3" -H"Content-Type:text/plain" http://127.0.0.1:9666/TableName
```
## TODO
Add some security to prevent SQL injection.
