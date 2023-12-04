import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './PostCard.module.css'
const getDate = ( d ) => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}
const PostCard = ( { post ,hrf} ) => {
    return (
      <Link to={hrf +post.slug} className={`${styles.postCard_link} mb-4`}>
        <Card>
          <div className={styles.postCard_img}>
            <Card.Img
              variant="top"
              src={post.image}
              style={{ height: "12rem" }}
            />
            <div className={styles.postCard_img_info}>
              <small> created By : {post.user}</small>
              <small>{getDate(post.createdAt)}</small>
            </div>
          </div>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.excert}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    );
}

export default PostCard