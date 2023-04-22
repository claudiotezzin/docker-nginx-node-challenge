const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql2')
const connection = mysql.createConnection(config)

const createPeople = `create table if not exists people(
    id int not null auto_increment,
    name varchar(255),
    primary key(id)
  )`;
connection.query(createPeople)

const insertPeople = `INSERT INTO people(name) values('Claudio Tezzin')`
connection.query(insertPeople)

var resultado = "";
const selectNames = `SELECT name from people`
connection.query(selectNames, (error, results, fields) => {
    if (error) throw error
    results.forEach(function(item, i) {
        resultado = resultado + "<br>" + item.name
    })
})

connection.end()


app.get('/', (req,res) => {
    res.send("<h1>Full Cycle</h1><br><h2>" + resultado + "</h2>")
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})