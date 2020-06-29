import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const BYE_QUERY = gql`
    query Bye {
        bye
    }
`


export const Bye: React.FC = () => {
    const { data, loading, error } = useQuery(BYE_QUERY)

    if(loading) return <div>Loading..</div>

    if(error) {
        console.log('error', error)
        return <div>Error</div>
    }

    if(!data) return <div>No Data</div>
    return (
        <div>{data.bye}</div>
    )


    

}