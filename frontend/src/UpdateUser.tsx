import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const UPDATE_USER = gql`
    mutation UpdateUser($user_id: Int!, $input: Array!) {
        updateUser(user_id: $user_id, input: $input)
    }
`

export const UpdateUser: React.FC = () => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');

    const [updateUser, { data }] = useMutation(UPDATE_USER)

    console.log(data)
    console.log(firstName, lastName)

    return (
        <form onSubmit={async event => {
            event.preventDefault();
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
            <button onClick={async () => {
                await updateUser({
                    variables: {
                        user_id: 5,
                        input: {
                            firstName,
                            lastName
                        }
                    }
                })
            } 
        } type="submit">Update</button>
        </form>
    )
}