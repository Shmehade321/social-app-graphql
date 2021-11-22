import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import {useForm} from '../util/hooks'
import { AuthContext } from "../context/auth";

const REGISTER_USER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

const Register = (props) => {
    const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});

  const {onChange, onSubmit, values} = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, {data: {register: userData}}) {
        context.login(userData)
      props.history.push("/")
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
      addUser()
  }

  return (
    <div className="form-container">
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      <Form onSubmit={onSubmit} noValidate loading={loading}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          value={values.email}
          onChange={onChange}
          type="email"
          error={errors.email ? true : false}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          value={values.password}
          onChange={onChange}
          type="password"
          error={errors.password ? true : false}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          type="password"
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
