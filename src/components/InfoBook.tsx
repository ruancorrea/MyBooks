import { useState } from "react";
import Book from "../core/Book"

interface NewInfoBookProps {
    modalVisivel: boolean
    setModalDeleteVisivel: (b: boolean) => void
    setModalInfoBookVisivel: (b: boolean) => void
    bookDelete?: (id: string) => void
    bookAdd?: (book: Book) => void
    exibirPesquisarLivro?: () => void
    book: Book
}

export default function InfoBook (props: NewInfoBookProps) {
    const [indexDescricao, setIndexDescricao] = useState(300);
    const [descricao, setDescricao] = useState(props.book.description.substring(0, 300));

    const atualizandoDescricao = () => {
        setIndexDescricao(indexDescricao + 300)
        setDescricao(props.book.description.substring(indexDescricao, indexDescricao+300));
    }

    const iniciandoDescricao = () => {
        setDescricao(props.book.description.substring(0,300));
        setIndexDescricao(300)
    }
    return (
    <div className="flex w-full items-center justify-center">
        {
           props.modalVisivel ?
                <div className="overflow-y-auto overflow-x-hidden flex fixed right-0 left-0 top-4 justify-center items-center md:inset-0 h-modal sm:h-full xs:h-full" id="large-modal">
                    <div className="relative px-4 w-full max-w-3xl h-full md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                    Book Information
                                </h3>
                                <button onClick={() => {
                                    props.setModalInfoBookVisivel(false);
                                    props.exibirPesquisarLivro?.();
                                }}
                                type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="large-modal">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                                </button>
                            </div>
                            {/*<!-- Modal body -->*/}
                            <div className="p-6 space-y-6">
                                <div className="flex flex-col md:flex-row items-center bg-white rounded-lg border shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <img className="ml-2 object-cover h-48 w-44 sm:h-48 sm:w-44 rounded-t-lg md:h-auto md:w-auto md:rounded-none md:rounded-l-lg" src={props.book.thumbnail} alt="" />
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.book.title}</h5>
                                        {props.book.authors ?
                                            <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white">
                                                {props.book.authors.map((author, index) => {
                                                    return (
                                                        <small key={index}>{author} {index == props.book.authors.length-1 ? "" : ", "}</small>
                                                    )
                                                })}
                                            </h5>
                                        : 
                                        <></>
                                        }
                                        { indexDescricao == 300 ?
                                                <></>
                                            :
                                            <a onClick={iniciandoDescricao} className="flex cursor-pointer text-sm font-bold">VOLTAR PRO INICIO ...</a>

                                        }
                                        <div className="inline-flex mb-3 text-sm text-justify font-normal text-gray-700 dark:text-gray-400">{descricao}</div>
                                        
                                        {
                                            indexDescricao > props.book.description.length ?
                                            <></>
                                            :
                                            <a className="cursor-pointer flex font-bold text-sm" onClick={atualizandoDescricao}>... VER MAIS</a>

                                        }
                                    </div>
                                </div>
                            </div>
                            {/*<!-- Modal body -->*/}
                            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <a href={props.book.previewLink} target="_blank" rel="noreferrer" data-modal-toggle="large-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">More information</a>
                                <button onClick={() => {
                                    props.setModalDeleteVisivel(true); // modal delete/add
                                }} data-modal-toggle="large-modal" type="button" 
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">{props.bookDelete ? "Delete Book" : "Add Book"}</button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                false
        }
    </div>
    )
}