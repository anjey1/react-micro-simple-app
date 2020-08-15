// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import React from 'react';

export default ({ comments }) => {

    // Declare a new state variable, which we'll call "count"
    // Using the State Hook React 16.8
    // const [comments, setComments] = useState([]);

    // const fetchData = async () => {
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    //     setComments(res.data);
    // }

    // // useEffect tell React that your component needs to do something after render
    // // it runs both after the first render and after every update

    // useEffect(() => {
    //     fetchData();
    // }, [])



    const renderedComments = Object.values(comments).map(comment => {

        let content;

        if (comment.status === 'Pending') {
            content = 'This comment is awaiting moderation'
        }

        if (comment.status === 'approved') {
            content = comment.content;
        }

        if (comment.status === 'rejected') {
            content = 'This comment has been rejected'
        }

        return <li key={comment.id}>{content}</li>
    });




    return <ul>{renderedComments}</ul>;
}