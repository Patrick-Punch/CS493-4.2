require('dotenv').config();

const express = require('express')
const app = express();

app.use(express.json());

const port = 8086;

let next_id = 0;
const messages = {};

app.listen(port, () => {
    console.log(`== Server is listening on port ${port}`);
});

app.get("/messages", (req, res, next) => {
    res.send(messages);
    console.log("== Retrieved all messages");
});

app.get("/messages/:id", (req, res, next) => {
    const id = req.params.id;

    if (!(id in messages)) {
        res.status(404).send({"error": `Message ${id} not found`});
        console.log(`== Index ${id} out of bounds`);
    } else {
        res.send(messages[id]);
        console.log(`== Retrieved from id ${id}`);
    }
});

app.post("/messages", (req, res, next) => {
    const message = req.body;
    const id = next_id++;

    message["id"] = id;
    messages[id] = message;

    res.status(201);

    res.send({
        "id": id,
        "links": {
            "self": `/messages/${id}`
        }
    });

    console.log(`== Posted to id ${id}`);
});

app.delete('/messages/:id', (req, res, next) => {
    const id = req.params.id;

    if (!(id in messages)) {
        res.status(404).send({"error": `Message ${id} not found`});
        console.log(`== Index ${id} out of bounds`);
    } else {
        delete messages[id];
        res.status(200).send({"status": `message ${id} deleted`});
    }
});
