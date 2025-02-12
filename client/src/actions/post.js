import axios from "axios";
import { setAlert } from "./alert";
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT

} from "./types";   


// Get posts method

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get("/api/posts");
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.status === 400 ? err.response.data.msg : err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Add likes

export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.status === 400 ? err.response.data.msg : err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Remove likes

export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.status === 400 ? err.response.data.msg : err.response.statusText,
                status: err.response.status
            }
        });
    }
}

//Delete posts

export const deletePost = postId => async dispatch => {
    try {
        await axios.delete(`/api/posts/${postId}`);
        dispatch(setAlert("Post removed", "success"));
        dispatch({
            type: DELETE_POST,
            payload: postId
        });

        dispatch(setAlert("Post removed", "success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.status === 400 ? err.response.data.msg : err.response.statusText,
                status: err.response.status
            }
        });
    }
}

// add Posts

export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const res = await axios.post("/api/posts", formData, config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(setAlert("Post created", "success"));
    
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.status === 400 ? err.response.data.msg : err.response.statusText,
                status: err.response.status
            }
        });
    }
}




// Get post by id

export const getPostById = postId =>
    async dispatch => {
        try {
            const res = await axios.get(`/api/posts/${postId}`);
            dispatch({
                type: GET_POST,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: {
                    msg: err.response.status === 400 ? err.response.data.msg : err.response.statusText,
                    status: err.response.status
                }
            });
        }
    };

    // Add comments

    export const addComment = (postId, formData) => async dispatch => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
    
        try {
            const res = await axios.put(`/api/posts/comment/${postId}`, formData, config);
            console.log({res});
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            });
            dispatch(setAlert("Comment added", "success"));
        
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: {
                    msg: err.response.status === 400 ? err.response.data.msg : err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }

    // Delete comments

    export const deleteComment = (postId, commentId) => async dispatch => {
        try {
            await axios.put(`/api/posts/uncomment/${postId}/${commentId}`);
            dispatch({
                type: REMOVE_COMMENT,
                payload: commentId
            });
            dispatch(setAlert("Comment removed", "success"));
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: {
                    msg: err.response.status === 400 ? err.response.data.msg : err.response.statusText,
                    status: err.response.status
                }
            });
        }
    }





