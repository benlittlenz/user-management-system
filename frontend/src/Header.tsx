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
            firstName
            lastName
            is_admin
        }
    }
`

const LOGOUT_USER = gql`
    mutation Logout {
        logout
    }
`;

export const Header: React.FC = () => {
    const { data, loading } = useQuery(ME_QUERY)
    const [logout, { client }] = useMutation(LOGOUT_USER)
    console.log(data)
    return (
        <div>
            <nav className="flex items-center bg-gray-800 p-3 flex-wrap">
                <div
                    className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
                >
                    <div
                        className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto"
                    >
                        <Link
                            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                            to="/"><span>Home</span>
                        </Link>

                        <Link
                            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                            to="/login"><span>Login</span>
                        </Link>

                        <Link
                            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                            to="/register"><span>Register</span>
                        </Link>

                        {!loading && data && data.me && (
                            <button
                                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                                onClick={async () => {
                                    //clear refresh & access user tokens
                                    await logout();
                                    SetAccessToken("");
                                    await client!.resetStore();
                                }}>Logout</button>
                        )}

                    </div>
                </div>
            </nav>
            <header>
                {data && data.me ? <div>Welcome {data.me.firstName} {data.me.lastName}!</div> : null}
            </header>
        </div>

    )
}