import { useEffect, useState } from "react";
import axios from 'axios'
import Book from "../core/Book";
import usePagination from "./usePagination";
import keyAPI from '../lib/keyGoogle';
import useBooks from "./useBooks";

export default function useSearchBook() {
    
    const { userFirestore } = useBooks()
    const [bookSearch, setBookSearch] = useState("");
    const [books, setBooks] = useState([]);
    const { totalItems, pages, startIndex, pageAtual, limit,
            setTotalItems, setPages, setStartIndex, setPageAtual, AlterandoStartIndex } = usePagination(10);



 
    useEffect(() => {
        if(bookSearch.length > 0){
            ArmazenandoLivros();
        }
    }, [startIndex]);


    useEffect(() => {
        if(bookSearch.length > 0) {
            searchBook();
        }
    }, [bookSearch]);



    function ArmazenandoLivros() {
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + bookSearch + "&key=" + keyAPI + "&maxResults=" + limit + "&startIndex=" + startIndex)
        .then(data => {
            setTotalItems(data.data.totalItems)
            setBooks([])
            for(let i=0; i < data.data.items.length; i++){
                const book = data.data.items[i]
                //console.log(book.id)
                const descricao = book.volumeInfo.description === undefined ? "Sem descrição." : `${book.volumeInfo.description}`
                const thumbnail = book.volumeInfo.imageLinks === undefined ? "" : `${book.volumeInfo.imageLinks.thumbnail}`,
                newBook = new Book(
                                    book.volumeInfo.title, 
                                    descricao,
                                    book.volumeInfo.previewLink, 
                                    book.volumeInfo.authors, 
                                    thumbnail, 
                                    userFirestore.idprovider, //id_user
                                    book.id // uid
                                    )
                setBooks(prev => [...prev, newBook]);
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    async function searchBook(){
        //e.preventDefault();
        setStartIndex(0);
        setPageAtual(1);
        ArmazenandoLivros();
    }

    
    return {
        bookSearch,
        books,
        totalItems,
        pages,
        startIndex,
        pageAtual,
        setBookSearch,
        setBooks,
        setTotalItems,
        setPages,
        setStartIndex,
        setPageAtual,
        AlterandoStartIndex,
        searchBook,
        ArmazenandoLivros
    }
}