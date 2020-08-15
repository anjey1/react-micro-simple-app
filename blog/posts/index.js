const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios')

const app = express();

// middleware extracts the entire
// body portion of an incoming request
// req.body
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// retrive existing posts
app.get('/posts', (req, res) => {
    res.send(posts);
})

// create new
app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    if (title) {
        posts[id] = {
            id,
            title
        };

        await axios.post('http://localhost:4005/events', {
            type: 'PostCreated',
            data: {
                id, title
            }
        })
        res.status(201).send(posts[id]);
    } else {
        res.status(400).send({ error: 'No Title' });
    }
})

// retrive events
app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type)
    res.send({});
})


app.listen(4000, () => {
    console.log('Listening on 4000');
})
