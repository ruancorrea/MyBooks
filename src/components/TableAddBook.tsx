import Book from "../core/Book"
import useSearchBook from "../hooks/useSearchBook"
import { IconAdd, IconDelete, IconView } from "./Icons"
import Pagination from "./Pagination"

interface TabelaProps {
    bookSelect: (book: Book) => void
    bookAdd: (book: Book) => void
    infoLivroVisivel: boolean
    setModalInfoBookVisivel: (b: boolean) => void
}

export default function TableAddBook(props: TabelaProps) {
    const exibirAcoes = props.bookSelect || props.bookAdd

    const {
        books, pages, pageAtual, bookSearch,
        AlterandoStartIndex, setBookSearch
    } = useSearchBook()

    function renderizarPesquisar() {
        return (
            <div className="p-2">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  " placeholder="Book Search" 
                     onChange={(e: any) => 
                        {
                            setBookSearch(e.target.value);
                        }}
                    />
                </div>
            </div>
        )
    }

    function renderizarCabecalho() {
        return (
            <tr className="hover:bg-gray-100 dark:bg-gray-800">
                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                    Title
                </th>
                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                    Author
                </th>
                {exibirAcoes ? <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300"></th> : false }
            </tr>
        )
    }
    function renderizarDados() {
        return books?.map((book, index) => {
            return (
                <tr key={index} className="hover:bg-gray-100 dark:bg-gray-300">
                    <td className="px-6 text-sm font-medium text-gray-900 ">{book.title}</td>
                    <td className="px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{book.authors ? book.authors[0] : " "}</td>
                    {exibirAcoes ? renderizarAcoes(book) : false}
                </tr>
            )
        })
    }

    function renderizarAcoes(book: Book) {
        return (
            <td className='flex justify-center'>
                {props.bookAdd ? (
                    <button onClick={() => props.bookAdd?.(book)} className={`
                        flex justify-center items-center
                        text-green-600 rounded-full p-2 m-1
                        hover:bg-green-50
                    `}>
                        {IconAdd}
                    </button> 
                ) : false}

                {props.bookSelect ? (
                    <a onClick={() => { props.bookSelect?.(book); props.setModalInfoBookVisivel(true);}} className={`
                        flex justify-center items-center
                        text-blue-600 rounded-full p-2 m-1
                        hover:bg-blue-50
                    `}>
                        {IconView}
                    </a>
                ) : false}
            </td>
        )
    }

    return (
        <div className="bg-gray-50 h-full dark:bg-gray-900">
            <div className="flex   justify-center">
                <div style={{justifyContent:'center'}} className="w-full max-w-6xl
                            sm:mb-2 md:mb-6 mt-2 p-1 "> 
                    <div className="flex flex-col">
                        <div className="overflow-x-auto shadow-md sm:rounded-lg ">
                            <div className="inline-block align-middle">
                                { props.infoLivroVisivel 
                                ? <></> :
                                <div>
                                    {renderizarPesquisar()}
                                </div>
                                 }
                                {books.length > 0 ? 
                                    <table className="table-fixed h-screen w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                        {renderizarCabecalho()}
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {renderizarDados()}
                                        </tbody>
                                    </table>
                                :
                                false
                                }       
                            </div>
                            {pages ? 
                                <Pagination pages={pages} pageAtual={pageAtual} AlterandoStartIndex={AlterandoStartIndex} />
                                :
                                <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
