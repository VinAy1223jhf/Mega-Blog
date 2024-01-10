import React from 'react';
import { useEffect, useState } from 'react';
import Container from '../container/container';
import PostForm from '../post-form/PostForm';
import service from '../../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';



function EditPost() {
    const [post, setpost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setpost(post)
                }
            })
        }else{
            navigate('/')
        }
    },[slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
}

export default EditPost;
