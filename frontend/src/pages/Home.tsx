import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_USERS = gql`
    {
        users {
            user_id
            firstName
            lastName
            email
            is_admin
        }
    }
`

interface Props { }

export const Home: React.FC<Props> = () => {
    const { data, loading } = useQuery(GET_USERS)

    if(loading) return <div>Loading..</div>
    return (
        <div>
            <h1>Users</h1>

            <ul>
                {data.users.map((user: any) => {
                    return (
                        <li key={user.id}>
                            Name: {user.firstName} {user.lastName}
                            <p>{user.email}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}