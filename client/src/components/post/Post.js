import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import {getPostById} from '../../actions/post'
import { Link, useParams} from 'react-router-dom';
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'

const Post = ({
    getPostById,
    post: {post,loading},
}) => {
    const { id } = useParams();

    useEffect(()=>{
        getPostById(id);
    },[getPostById]);

  return (
    <Fragment>
        <Link to='/posts' className='btn'>Back To Posts</Link>
        {post === null || loading ? <Spinner/> : <Fragment>
            console.log("post id is",{post._id}) ;
            <PostItem post={post} showActions={false}/>
            <CommentForm postId={post._id}/>
        </Fragment>}
    </Fragment>
  )
}

Post.propTypes = {
    getPostById: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
        post: state.post
    })

export default connect(mapStateToProps,{getPostById})(Post);