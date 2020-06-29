import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const REGISTER_USER = gql`
    mutation Register($email: String!, $passwprd: String!) {
        register(email: $email, password: $password)
    }
`

export const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, { data }] = useMutation(REGISTER_USER)

    return (
        <form onSubmit={async event => {
            event.preventDefault();
            const response = await register({
                variables: {
                    email,
                    password
                }
            })
            console.log(response)
        }}>
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