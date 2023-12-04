import React, { useContext } from 'react'
import { Button, Card, Form, Nav, NavLink } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from '../../context/AuthContext';
const SignUpForm = () => {
    const {signUp,isAuth} =useContext(AuthContext);
    const formik = useFormik( {
        initialValues: {
            username: "",
            email: "",
            pass1: "",
            pass2: "",
        },
        validationSchema: Yup.object().shape( {
            username: Yup.string().required(),
            email: Yup.string().required().email(),
            pass1: Yup.string().min( 6 ).required(),
            pass2: Yup.string()
                .oneOf( [Yup.ref( "pass1" ), null], "Passwords must match" )
                .required(),
        } ),
        onSubmit:async ( vals ) => {
            console.log( "values", vals );
            if ( formik.isValid ) {
                try {
                    await signUp(vals.email, vals.pass1);
                    isAuth && nav( "/" );
                } catch (error) {
                    alert(error.message);
                }
            }
        },
    } );
    console.log( "formik", formik );

    const nav = useNavigate()
    return (
        <>
            <Card className="p-3 bg-light mt-4">
                <Form onSubmit={formik.handleSubmit}>
                    {/* Start */}
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter UserName"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        <Form.Text className="text-danger">
                            {formik.errors.username}
                        </Form.Text>
                    </Form.Group>
                    {/* end  */}
                    {/* Start */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Form.Text className="text-danger">
                            {formik.errors.email}
                        </Form.Text>
                    </Form.Group>
                    {/* end  */}
                    {/* Start */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="pass1"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Form.Text className="text-danger">
                            {formik.errors.pass1}
                        </Form.Text>
                    </Form.Group>
                    {/* end  */}
                    {/* Start */}
                    <Form.Group className="mb-3" controlId="formConfrirmPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="pass2"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Form.Text className="text-danger">
                            {formik.errors.pass2}
                        </Form.Text>
                    </Form.Group>
                    {/* end  */}
                    {/* start  */}
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I have read all terms " />
                    </Form.Group>
                    {/* end  */}
                    <Button variant="primary" type="submit" className="w-100">
                        Sign Up
                    </Button>
                    <Form.Text className="text-secondary">
                        already have account.
                    </Form.Text>
                    <Button
                        variant="success"
                        type="text"
                        onClick={() => {
                            nav( "/login" );
                        }}
                    >
                        login
                    </Button>
                </Form>
            </Card>
        </>
    );
}
export default SignUpForm
