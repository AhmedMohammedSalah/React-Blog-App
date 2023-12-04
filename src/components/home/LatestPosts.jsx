import React, { useContext, useEffect, useRef } from 'react'
import { Alert, Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PostsContext } from '../../context/PostsContext';
import PostCard from '../blog/PostCard';

const LatestPosts = () => {
    const nav = useNavigate();
    const { loading, error, data, fetch } = useContext(PostsContext);
    const isMount = useRef(false);
    useEffect(() => {
      if (!isMount.current) {
        fetch();
      }
      isMount.current = true;
    }, []);
    
    return (
      <section className="py-5">
        <Container>
          <h1 className="text-center mb-5"> Latest Articles</h1>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : null}
          {error ? (
            <div className="text-center">
              <Alert variant="danger">{error}</Alert>
            </div>
          ) : null}
          {(!loading || !error) && data ? (
            <Row xs="1" md="2" lg="4">
              {data.slice( 0, 4 ).map( ( post ) => (
                <Col key={post.id}>
                  <PostCard post={post} hrf='blog/' />
                </Col>
              ) )}
            </Row>
          ) : null}
          <div className="mt-4 text-center">
            <Button
              variant="outline-dark"
              className="px-5"
              onClick={() => nav("/blog")}
            >
              See All
            </Button>
          </div>
        </Container>
      </section>
    );
}

export default LatestPosts
