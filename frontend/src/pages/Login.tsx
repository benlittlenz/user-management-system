import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { RouteComponentProps } from 'react-router-dom';
import { SetAccessToken } from '../UserToken';

const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userToken
            user {
                user_id
                email
            }
        }
}
`

const ME_QUERY = gql`
    query Me {
        me {
            user_id
            email
        }
    }
`

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { data }] = useMutation(LOGIN_USER)

    return (
        <form onSubmit={async event => {
            event.preventDefault();
            const response = await login({
                variables: {
                    email,
                    password,
                }, 
                //update cache and store logged in user
                update: (store, { data }) => {
                    if(!data) return null;
                    store.writeQuery({
                        query: ME_QUERY,
                        data: {
                            __typename: 'Query',
                            me: data.login.user,
                        }
                    })
                    
                }
            })

            //On successful register, redirect user to home page and store user access token in a variable
            console.log(response)

            if(response && response.data) {
                SetAccessToken(response.data.login.userToken);
            }
            
            history.push('/')

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