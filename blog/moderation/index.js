const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();

app.use(bodyParser.json());


// retrive events
app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        console.log(status);

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    }
    // we need to return res.send so the request wont hang
    res.send({ 'content': data.content })
});


app.listen(4003, () => {
    console.log('Listening on 4003');
})
