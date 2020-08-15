const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios')

const app = express();

// middleware extracts the entire
// body portion of an incoming request
// req.body
app.use(bodyParser.json());
app.use(cors());


const commentsByPost = {};

// retrive existing comments
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPost[req.params.id] || []);
})

// create new
app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPost[req.params.id] || [];

    comments.push({ id: commentId, content, status: 'Pending' });
    commentsByPost[req.params.id] = comments
    debugger
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'Pending'
        }
    });

    res.status(201).send({
        action: 'Comment Was Added To PostId:' + req.params.id,
        comments: comments
    });

})

// retrive events
app.post('/events', async (req, res) => {

    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;

        const comments = commentsByPost[postId];

        const comment = comments.find(comment => {
            return comment.id === id;
        })

        comment.status = status;
        debugger
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
                content
            }
        })
    }

    res.send({});
})

app.listen(4001, () => {
    console.log('Listening on 4001');
})
