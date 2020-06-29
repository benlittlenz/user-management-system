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

    console.log(data)
    return (
        <div>
            Home page
        </div>
    )
}