import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { SetAccessToken } from './UserToken';

const ME_QUERY = gql`
    query Me {
        me {
            user_id
            email
        }
    }
`

const LOGOUT_USER = gql`
    mutation Logout {
        logout
    }
`;

export const Header: React.FC = () => {
    const { data } = useQuery(ME_QUERY)
    const [logout, { client }] = useMutation(LOGOUT_USER) 
    
    return (
        <div>
            <header>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Link to="/login">Login</Link>
                </div>
                <div>
                    <Link to="/register">Register</Link>
                </div>
                <div>
                    <Link to="/bye">bye</Link>
                </div>
                <div>
                    <button onClick={async () => {
                        //clear refresh & access user tokens
                        await logout();
                        SetAccessToken("");
                        await client!.resetStore(); 
                    }}>Logout</button>
                </div>
                {data && data.me ? <div>You are logged in as: {data.me.email}</div> : null}
            </header>
        </div>

    )
}