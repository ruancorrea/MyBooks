import { useState } from "react";
import useAuth from "../hooks/useAuth";
import NextLink from 'next/link';
import Auth from "./Auth";

interface TopBarProps {
    title: string
}

export default function TopBar(props: TopBarProps) {
    const { user, signout } = useAuth()
    const [ menuButtonVisivel, setMenuButtonVisivel ] = useState(false);

    return (
        <div className="flex justify-center">
            <Auth />
            <div style={{justifyContent:'center'}} className="fixed w-full max-w-6xl  bg-white
                            sm:mb-8 md:mb-16 border-b">
                <div className="flex justify-between items-center py-4
                                sm:px-4 md:px-8 h-14">
                    <div className="flex" >
                        <h1>{props.title}</h1>
                    </div>

                    

                    <div className="flex">
                            { menuButtonVisivel 
                                ?
                                <div className="flex">
                                    <div style={{marginTop: '290px'}} className="z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
                                        <div className="py-3 px-4">
                                            <span className="block text-sm text-gray-900 dark:text-white">{user?.name}</span>
                                            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{user?.email}({user?.provider})</span>
    
                                        </div>
                                        <ul className="py-1" aria-labelledby="dropdown">
                                            <li> 
                                                <NextLink href="/mybooks" passHref>
                                                    <a className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Books</a>
                                                </NextLink>
                                            </li>
                                            <li> 
                                                <NextLink href="/addbook" passHref>
                                                    <a className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Add Book</a>
                                                </NextLink>
                                            </li>
                                            <li>
                                                <NextLink href="/settings" passHref>
                                                    <a className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                                </NextLink>
                                            </li>
                                            <li >
                                                <a onClick={() => {signout()}} className="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                :
                                <></>
                            }
                        <div className="flex items-center md:order-2">
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" 
                                    onClick={() => {setMenuButtonVisivel(!menuButtonVisivel)}} id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                                <img className="w-8 h-8 rounded-full" src={user?.photoUrl} alt="user photo" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}