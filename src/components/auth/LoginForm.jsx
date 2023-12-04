import React, { useContext } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const nav=useNavigate()
    const { signIn ,isAuth} = useContext( AuthContext );

    const formik = useFormik( {
        validateOnMount: false,
        initialValues: {
            email: "",
            pass: "",
        },
        validationSchema: Yup.object().shape( {
            email: Yup.string().required().email(),
            pass: Yup.string().min( 6 ).required(),
        } ),
        onSubmit:async ( vals ) => {
            console.log( "values", vals );
          if ( formik.isValid ) {
            try {
              await signIn( vals.email, vals.pass );

                    isAuth && nav( "/" );
                } catch (error) {
                    alert(error.message);
                }
            }
        }
    } );

    return (
      <Card className="p-3 bg-light mt-4">
        <Form onSubmit={formik.handleSubmit}>
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
            <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
          </Form.Group>
          {/* end  */}
          {/* Start */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="pass"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Form.Text className="text-danger">{formik.errors.pass}</Form.Text>
          </Form.Group>
          {/* end  */}

          {/* start  */}
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Keap me signed in  " />
          </Form.Group>
          {/* end  */}
          <Button variant="primary" type="submit" className="w-100">
            login
          </Button>
        </Form>
      </Card>
    );
}

export default LoginForm

