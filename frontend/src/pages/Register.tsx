import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const REGISTER_USER = gql`
    mutation Register(
        $firstName: String!, 
        $lastName: String!, 
        $email: String!, 
        $password: String!,
        $is_admin: Boolean!
        ) {
  register(
      firstName: $firstName, 
      lastName: $lastName,
      email: $email, 
      password: $password,
      is_admin: $is_admin
    )
}
`

export const Register: React.FC = () => {
    const is_admin = false
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, { data }] = useMutation(REGISTER_USER)

    return (
        <form onSubmit={async event => {
            event.preventDefault();
            const response = await register({
                variables: {
                    firstName,
                    lastName,
                    email,
                    password,
                    is_admin
                }
            })
            console.log(response)
        }}>
            <div>
                <input
                    value={firstName}
                    type="text"
                    placeholder="First Name"
                    onChange={event => {
                        setfirstName(event.target.value)
                    }}
                />
            </div>
            <div>
                <input
                    value={lastName}
                    type="text"
                    placeholder="Last Name"
                    onChange={event => {
                        setlastName(event.target.value)
                    }}
                />
            </div>
            <div>
                <input
                    value={email}
                    type="email"
                    placeholder="Email"
                    onChange={event => {
                        setEmail(event.target.value)
                    }}
                />
            </div>

            <div>
                <input
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={event => {
                        setPassword(event.target.value)
                    }}
                />
            </div>
            <button type="submit">Register</button>
        </form>
    )
}