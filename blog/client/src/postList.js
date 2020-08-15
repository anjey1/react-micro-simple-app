import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './commentCreate'
import CommentList from './commentList'

export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');
        setPosts(res.data);
    }

    // Run function only when component is diplayed
    useEffect(() => {
        fetchPosts();
    }, [])

    const renderedPosts = Object.values(posts).map(post => {
        return <div
            className="card"
            style={{ width: '30%', marginBottom: '20px' }}
            key={post.id}
        >
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentCreate postId={post.id} />
                <hr />
                <CommentList comments={post.comments} />
            </div>
        </div>
    });

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>;
}
