/** 
 * Patrick Punch
 * 4/21/2025
 * CS 493
*/
require('dotenv').config();

const mysql = require('mysql2/promise');

const mysql_host = process.env.MYSQL_HOST || 'localhost';
const mysql_port = process.env.MYSQL_PORT || '3306';
const mysql_db = process.env.MYSQL_DATABASE || 'messagesdb';
const mysql_user = process.env.MYSQL_USER || 'messagesuser';
const mysql_password = process.env.MYSQL_PASSWORD;

const mysqlPool = mysql.createPool({
    connectionLimit: 10,
    host: mysql_host,
    port: mysql_port,
    database: mysql_db,
    user: mysql_user,
    password: mysql_password
});


const express = require('express')
const app = express();

app.use(express.json());

const port = 8086;


app.listen(port, () => {
    console.log(`== Server is listening on port ${port}`);
});

app.get("/messages", async (req, res, next) => {
    const [messages] = await mysqlPool.query("SELECT id, message FROM messages");
    res.send(messages);
    console.log("== Retrieved all messages");
});

app.get("/messages/:id", async (req, res, next) => {
    const id = req.params.id;
    const [message] = await mysqlPool.query(`select id, message FROM messages
        where id = ?
    `, id);
    if (message.length === 0){
        res.status(404).send({"error": `Message ${id} not found`});
        console.log(`== Message ${id} not found`);
    } else {
        res.send(message[0]);
        console.log(`== Retrieved from id ${id}`);
    }
});

app.post("/messages", async (req, res, next) => {
    const { message } = req.body;
    if (!message){
        res.status(400).send({ error: "Message content required" });
        return;
    }
    const [result] = await mysqlPool.query(
        "INSERT INTO messages (message) VALUES (?)",
        [message]
    );

    const insertedId = result.insertId;

    res.status(201).send({
        id: insertedId,
        links: {
            self: `/messages/${insertedId}`
        }
    });

    console.log(`== Inserted message id ${insertedId}`);
});

app.delete('/messages/:id', async (req, res, next) => {
    const id = req.params.id;

    const [result] = await mysqlPool.query(
        "DELETE FROM messages WHERE id = ?",
        [id]
    );

    if (result.affectedRows === 0) {
        res.status(404).send({ error: `Message ${id} not found` });
        console.log(`== Message ${id} not found`);
    } else {
        res.status(200).send({ status: `Message ${id} deleted` });
        console.log(`== Deleted message id ${id}`);
    }
});

async function init_db() {
    await mysqlPool.query("drop table if exists messages");

    await mysqlPool.query(`create table messages (
        id integer primary key auto_increment,
        message varchar(512)
    )`);
}

init_db();
