import React from 'react';
import PostCreate from './postCreate';
import PostList from './postList';

export default () => {
    return <div className="container">
        <h1>Create Post</h1>
        <PostCreate />
        <h1>------------</h1>
        <PostList />
    </div>;
}
