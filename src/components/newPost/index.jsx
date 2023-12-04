import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FirebaseContext } from "../../context/FirebaseContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../context/PostsContext";
import { AuthContext } from "../../context/AuthContext";
// ... (your imports)

const AddNewPost = () => {
    const { user } = useContext( AuthContext );
    const [body, setBody] = useState( "" );
    const nav = useNavigate();
    const [loading, setLoading] = useState( false );
    const { db } = useContext(FirebaseContext);
    const { refetch } = useContext(PostsContext);

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        const title = e.target.title.value;
        const excert = e.target.excert.value;
        const image = e.target.image.value;
        const slug = title.split( "" ).join( "-" ) + "-" + new Date().getTime();
        setLoading( true ); 
        try {
            const colRef = collection( db, "posts" );
            await addDoc(colRef, {
              title,
              excert,
              slug,
              image,
              body,
              user: user.email,
              createdAt: serverTimestamp(),
            });
            e.target.reset();
            setBody( "" )
            setLoading( false );
            refetch();
            nav('/blog/'+slug)
        } catch ( error ) {
            console.log( error.message );
        }

        setLoading( false );
    };
    // const add20Post = async () => {
    //     for ( let index = 0; index < 20; index++ ) {
    //         await addDoc(collection(db, "posts"), {
    //           title: "post num " + index,
    //           excert: "post excert " + index,
    //           slug: "post slug " + index,
    //           image:
    //             "https://react.dev/images/docs/react-devtools-extension.png",
    //           body: "<p>https://react.dev/images/docs/react-devtools-extension.png</p><p>https://react.dev/images/docs/react-devtools-extension.pnghttps://react.dev/images/docs/react-devtools-extension.pnghttps://react.dev/images/docs/react-devtools-extension.png</p>",
    //           user: user.email,
    //           createdAt: serverTimestamp(),
    //         });   
        // }
    // }
    return (
      <section className="py-5">
        <Container>
          <Row>
            <Col md="8" lg="6" className="mx-auto">
              <h2 className="mb-4">Add New Post</h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Post Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Post Title"
                    name="title"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Post Excert</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Post Excert"
                    name="excert"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Post Image</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter Post image URL"
                    name="image"
                  />
                </Form.Group>
                <Form.Group>
                  <ReactQuill theme="snow" value={body} onChange={setBody} />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  Submit {loading ? "..." : ""}
                </Button>
              </Form>
            </Col>
          </Row>
          {/* <button onClick={add20Post} >add 20</button> */}
        </Container>
      </section>
    );
};
export default AddNewPost;
