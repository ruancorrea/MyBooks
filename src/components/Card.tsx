import { useState } from "react";
import Book from "../core/Book"
import { IconView, IconDelete } from "./Icons"
import ModalCard from "./ModalCard"
import InfoBook from "./InfoBook";

interface CardProps{
    book: Book
    bookDelete: (id: string) => void
    bookSelect: (book: Book) => void
}

export default function Card(props: CardProps) {
    const [ modalDeleteVisivel, setModalDeleteVisivel ] = useState(false);
    const [ modalInfoBookVisivel, setModalInfoBookVisivel ] = useState(false);


    return (
        <div>
            <div className="md:max-w md:h-56 md:w-40 sm:w-30 sm:h-30 xs:w-28 xs:h-32 m-4 rounded-md overflow-hidden shadow-lg dark:shadow-gray-700 dark:shadow-2xl hover:translate-y-5 duration-150">
                <div className="flex justify-center w-full h-5 items-center p-4 bg-gradient-to-r mb-4 ">
                    <button onClick={() => {setModalInfoBookVisivel(true)}} className={`flex h-full justify-center text-blue-600
                                        rounded-full hover:bg-blue-50 px-1`}>{IconView}</button>
                    <button onClick={() => {setModalDeleteVisivel(true)}} className={`flex h-full justify-center text-red-600 
                                        rounded-full hover:bg-red-50`}>{IconDelete}</button>
                </div>
                <div className={`flex px-6 py-4 flex-col items-center
                                bg-gradient-to- from-gray-50 to-gray-200   `}>
                    <img className="ml-2 object-cover w-full rounded-t-lg md:h-30 md:w-30 sm:h-20 sm:w-20 md:rounded-none md:rounded-l-lg" src={props.book.thumbnail} alt="" />

                    <div className="font-bold text-xs sm:text-sm text-center  ">{props.book.title}</div>
                    <p className="flex pb-2 text-xs text-gray-700 text-center dark:text-gray-300">{props.book.authors[0]}</p>
                </div> 
            </div>

            <ModalCard 
            text={`Are you sure you want to delete this book?`} 
            modalVisivel={modalDeleteVisivel} setModalVisivel={setModalDeleteVisivel} 
            delete={props.bookDelete} book={props.book}/>

            <InfoBook 
                book={props.book}
                bookDelete={props.bookDelete}
                setModalInfoBookVisivel={setModalInfoBookVisivel}
                setModalDeleteVisivel = {setModalDeleteVisivel}
                modalVisivel={modalInfoBookVisivel}
            />
        </div>
    )
}