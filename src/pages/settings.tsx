import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Auth from "../components/Auth";
import ContainerBlock from "../components/ContainerBlock";
import ModalCard from "../components/ModalCard";
import useBooks from "../hooks/useBooks";

export default function Settings() {
    const [ modalDeleteContaVisivel, setModalDeleteContaVisivel ] = useState(false);
    const [ modalDeleteVisivel, setModalDeleteVisivel ] = useState(false);
    const { user, signout, userDelete, userFirestore, userBooksDelete, userFirestoreDelete, err, exibirMsg, color, alert } = useBooks()

    async function deleteUser() {
        userBooksDelete();
        userFirestoreDelete(); // ERROR
        userDelete();
        signout();
    }

    return (
        <ContainerBlock>
            <Auth />
            {
                exibirMsg ?
                    <Alert alert={alert} color={color} />
                :
                <></>
            }
            <div className="flex bg-gray-50  justify-center dark:bg-gray-900">
                <div style={{justifyContent:'center'}} className="w-full max-w-6xl
                            sm:mb-2 md:mb-2 mt-1 p-1">

                    <div className="p-2">
                        <div className="mt-4">
                            {
                                user && userFirestore ?
                                <>

                                <div className="mb-4 flex w-full justify-center">
                                    <img src={user.photoUrl} className="max-w-full h-auto rounded-full" alt="" />
                                </div>
                                <div className="mb-6">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your name</label>
                                    <input type="email" id="email" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly value={user.name}/>
                                    
                                </div>
                                <div className="mb-6">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                                    <input type="email" id="email" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly value={user.email}/>
                                </div>

                                <div className="mb-6">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Provider</label>
                                    <input type="email" id="email" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly value={user.provider}/>
                                </div>

                                <div className="mb-6">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Number of books added</label>
                                    <input type="email" id="email" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly value={userFirestore.qtdbooks}/>
                                    <button onClick={() => setModalDeleteVisivel(true)} type="button" className="mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                        <p>Erase all books</p>
                                    </button>
                                </div>
                                </>
                            :
                            <></>

                            }
                            <ModalCard 
                            text={`Are you sure you want to delete this book?`} 
                            modalVisivel={modalDeleteVisivel} setModalVisivel={setModalDeleteVisivel} 
                            deleteAllBooks={userBooksDelete}/>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button onClick={() => {setModalDeleteContaVisivel(true);}} type="button" 
                        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            <p>
                                Delete account
                            </p>    
                        </button>
                    </div>
                </div>
            </div>
            <ModalCard 
            text={`Are you sure you want to delete the account? This will result in the deletion of all added books.`} 
            modalVisivel={modalDeleteContaVisivel} setModalVisivel={setModalDeleteContaVisivel} 
            deleteAllBooks={deleteUser}/>
        </ContainerBlock>
    )
}