const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();

// middleware extracts the entire
// body portion of an incoming request
// req.body
app.use(bodyParser.json());

const events = []

// retrive events
app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);
    axios.post('http://localhost:4003/events', event);
    console.log({ 'event': event });
    res.send({ status: 'Event Sent' });
})

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Listening on 4005');
})
