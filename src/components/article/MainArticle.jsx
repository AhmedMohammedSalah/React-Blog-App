import React, { useEffect, useRef } from 'react'
import useFetchDoc from '../../hooks/useFetchDoc'
import { useParams } from 'react-router-dom'
import { Alert, Card, Container, Row, Spinner } from 'react-bootstrap'
import styles from "./Article.module.css";
const getDate = (d) => {
  const date = new Date(d);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const MainArticle = () => {
    const params = useParams()
    const { loading, error, data, getData } = useFetchDoc( 'posts', params.slug );
    const isMount = useRef( null );
    useEffect( () => {
        if ( !isMount.current ) { 
            getData();
        }
        isMount.current=true
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );
    if ( loading ) return (
        
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
        
    )
    if (error) {
        return ( <Alert variant='danger'>{ error}</Alert>)
    }
    if ( data ) {
        // return console.log( data.image );
          return (
            <article className="article">
              <div className={styles.article_hero}>
                <img src={data.image} alt={data.title} />
              </div>
              <Container>
                <Row>
                  <Card>
                    <Card.Body>
                      <Card.Title> {data.title} </Card.Title>
                      <Card.Subtitle className="mt-2 text-muted">
                        <small> By: {data.user}</small>
                        <small> {getDate(data.createdAt)} </small>
                      </Card.Subtitle>
                      <div
                        className="mt-5"
                        dangerouslySetInnerHTML={{ __html: data.body }}
                      ></div>
                    </Card.Body>
                  </Card>
                </Row>
              </Container>
            </article>
          );
    }
}

export default MainArticle
