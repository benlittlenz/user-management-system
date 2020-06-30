import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { format } from 'date-fns'

import { UpdateUser } from '../UpdateUser'

const GET_USERS = gql`
    {
        users {
            user_id
            firstName
            lastName
            email
            is_admin
            created_at
        }
    }
`

const ME_QUERY = gql`
    query Me {
        me {
            user_id
            email
            firstName
            lastName
            is_admin
        }
    }
`

const DELETE_USER = gql`
    mutation DeleteUser($user_id: Int!) {
        deleteUser(user_id: $user_id)
    }
`;

interface Props { }

export const Home: React.FC<Props> = () => {
    const { data, loading } = useQuery(GET_USERS)
    const meData = useQuery(ME_QUERY)
    const [deleteUser] = useMutation(DELETE_USER)

    if (loading) return <div>Loading..</div>
    return (
        <div>
            <h1>Users</h1>
            <div className="md:px-32 py-8 w-full">
                <div className="shadow overflow-hidden rounded border-b border-gray-200">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Created at</th>
                                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Last name</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                                {meData.data.me.is_admin === true && (
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Delete</th>
                                )}
                                {meData.data.me.is_admin === true && (
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Edit</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {data.users.map((user: any) => {
                                const userID = user.user_id
                                return (
                                    <tr key={user.user_id}>
                                        <td className="w-1/3 text-left py-3 px-4">{format(new Date(user.created_at), "dd/MM/yyyy")}</td>
                                        <td className="w-1/3 text-left py-3 px-4">{user.firstName}</td>
                                        <td className="w-1/3 text-left py-3 px-4">{user.lastName}</td>
                                        <td className="text-left py-3 px-4">{user.email}</td>
                                        {meData.data.me.is_admin === true && (
                                            <td className="text-left py-3 px-4"><button onClick={async () => {
                                                deleteUser({
                                                    variables: {
                                                        user_id: userID
                                                    },
                                                    update: (store, data) => {

                                                        // console.log(data)
                                                        // store.writeQuery({
                                                        //     query: GET_USERS,
                                                        //     data: {
                                                        //         users: user.filter(e)
                                                        //     }
                                                        //     //data: userData
                                                        //     //data: { userData: users.filter(e => e.id !== user.user_id) }
                                                        // });
                                                    }
                                                })
                                            }}>Delete User</button></td>
                                        )}
                                    </tr>
                                )

                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <UpdateUser />
            </div>
        </div>
    )
}