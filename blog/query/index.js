const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

// middleware extracts the entire
// body portion of an incoming request
// req.body
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {

    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
        console.log(posts[id]);
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        console.log(post)
        post.comments.push({ id, content, status })
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];

        const comment = post.comments.find(comment => {
            return comment.id === id;
        })

        console.log(status)
        comment.status = status
        comment.content = content

    }
}

// retrive existing posts
app.get('/posts', (req, res) => {
    res.send(posts);
})

// create new
app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send({ 'Query Received Event': type });
})

app.listen(4002, async () => {
    console.log('Listening on 4002');
    const res = await axios.get('http://localhost:4005/events');

    for (let event of res.data) {
        console.log('Proccesing event:', event.type);
        handleEvent(event.type, event.data);
    }
})