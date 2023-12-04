import React, { useContext, useEffect, useRef } from 'react'
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap'
import { PostsContext } from '../../context/PostsContext';
import PostCard from './PostCard';

const MainBlog = () => {
    const { loading, error, data, fetch,fetching,fetchNext } = useContext(PostsContext);
  
   const isMount = useRef(false);
   useEffect(() => {
     if (!isMount.current) {
       fetch();
       isMount.current = true;
     }
   }, []);
  const blogObserverRef=useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver( ( entries ) => {
      const blogObserver = entries[0];
      console.log(blogObserver);
      if ( blogObserver.isIntersecting ) {
        //fetch next data
        fetchNext()
      }
    },{})
    if(blogObserverRef.current)observer.observe(blogObserverRef.current);
    return () => {
    if (blogObserverRef.current) observer.unobserve(blogObserverRef.current);

    };
  }, [data,blogObserverRef,fetchNext]);
    
    return (
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">Latest Posts</h2>
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
              {data.map((post) => (
                <Col key={post.id}>
                  <PostCard post={post} hrf="" />
                </Col>
              ))}
            </Row>
          ) : null}

          {fetching && <p className="text-center">Loading .............</p>}

          <div className="blog-observer" ref={blogObserverRef}></div>
        </Container>
      </section>
    );
};

export default MainBlog
