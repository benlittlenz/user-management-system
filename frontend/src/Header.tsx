import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ME_QUERY = gql`
    query Me {
        me {
            user_id
            email
        }
    }
`
export const Header: React.FC = () => {
    const { data } = useQuery(ME_QUERY)
    console.log(data)
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
        {data && data.me ? <div>You are logged in as: {data.me.email}</div> : null}
            </header>
        </div>

    )
}