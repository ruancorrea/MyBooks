import Book from "../core/Book";
import BookRepository from "../core/BookRepository";
import { useState , useEffect } from "react";
import CollectionBook from "../lib/firebase/db/CollectionBook"
import useNavegator from "../hooks/useNavegator";
import useAlerts from "./useAlerts";
import usePagination from "./usePagination";
import useUserFirestore from "./useUserFirestore";
import User from "../core/User";


export default function useBooks() {
    const repo: BookRepository = new CollectionBook()
    const [book, setBook] = useState<Book>(Book.vazio())
    const [books, setBooks] = useState<Book[]>([])
    const { meusLivrosVisivel, 
            pesquisarLivroVisivel, 
            infoLivroVisivel,
            exibirMeusLivros, 
            exibirPesquisarLivro, 
            exibirInfoLivro } = useNavegator()

    const { user,
        signout, 
        userDelete,
        userFirestore,
        setUserFirestore,
        userFirestoreDelete,
        userAdd,
        userEdit,
        obterUm } = useUserFirestore();

    const { totalItems, setTotalItems, setPages, pages, startIndex, pageAtual, limit, AlterandoStartIndex } = usePagination(12);

    const { err, exibirMsg, alert, color, setErr, setExibirMsg, setAlert, setColor } = useAlerts();


    useEffect(() => {
        if(userFirestore != null && totalItems > 0){
            /*console.log("qtdbooks", userFirestore.qtdbooks)
            console.log("limit", limit);
            console.log("totalItems", totalItems);
            console.log("startIndex", startIndex);
            console.log("pages", pages); */
            obterTodosPagination();
        }
    }, [pages])

    useEffect(() => {
        if(userFirestore != null && totalItems > 0){
            setPages(Math.ceil(totalItems/limit))
        }
    }, [totalItems])

    useEffect(() => {
        //obterTodos();
        if(userFirestore != null){ 
            setTotalItems(userFirestore.qtdbooks);
        }
    }, [userFirestore])

    useEffect(() => {
        obterTodosPagination()
    }, [pageAtual])


    {/* useEffect(() => {
        obterTodos();
    }, [user]) */}


    async function obterTodos() {
        if(user){
            await repo.obterTodos(user.uid).then(books => {
                setBooks(books)
            })
        }
    }

    async function obterTodosPagination() {
        if(user){
            await repo.obterTodosPagination(user.uid, startIndex, limit).then(books => {
                console.log("books",books)
                setBooks(books)
            })
        }
    }

    function bookSelect(book: Book) {
        setBook(book)
        exibirInfoLivro()
    }  

    async function bookDelete(id: string) {
        await repo.excluir(id).then((res) => {
            if(res == undefined) {
                const atualizandoUser = new User(userFirestore.idprovider, userFirestore.qtdbooks-1, userFirestore.id);
                userEdit(atualizandoUser);
                setAlert("Book successfully deleted");
                setErr(true);
                setColor("green");
                setUserFirestore(atualizandoUser);
            } else {
                //console.log("DELETE", res)
                setAlert("Error deleting book.");
                setErr(true);
                setColor("red")
            }
        })
        obterTodosPagination()
        //obterTodos()
    }  

    async function userBooksDelete() {
        var count = 0
        for(var i=0; i< books.length; i++) {
            await repo.excluir(books[i].id)
            count += 1
        } 

        if(count == books.length){
            setBooks([]);
            const atualizandoUser = new User(userFirestore.idprovider, 0, userFirestore.id);
            userEdit(atualizandoUser);
            setUserFirestore(atualizandoUser);
            //console.log("TODOS OS LIVROS EXCLUÍDOS")
            setAlert("All books successfully deleted.");
            setErr(true);
            setColor("green");
        }
    }

    async function bookAdd(book: Book) {
        await repo.adicionar(book).then((res) => {
            //console.log("ADD RES" , res)
            if (res != null){
                const atualizandoUser = new User(userFirestore.idprovider, userFirestore.qtdbooks+1, userFirestore.id);
                userEdit(atualizandoUser);
                setAlert("Book successfully added.");
                setErr(true);
                setColor("green");
                console.log("resposta != null bookAdd", res)
                setUserFirestore(atualizandoUser);
            }else {
                setAlert("Error adding book.");
                setErr(true);
                setColor("red")
                console.log("respNull bookAdd", res)
            }

        })
        obterTodosPagination()
        //obterTodos()
    } 
    
    return {
        book,
        books,
        bookAdd,
        bookDelete,
        userBooksDelete,
        bookSelect,
        obterTodos,
        exibirPesquisarLivro,
        exibirMeusLivros,
        exibirInfoLivro,
        meusLivrosVisivel,
        pesquisarLivroVisivel,
        infoLivroVisivel,

        err, 
        exibirMsg,
        alert, 
        color,
        setErr, 
        setExibirMsg, 
        setAlert,
        setColor,

        limit,
        startIndex, 
        pages, 
        pageAtual,
        AlterandoStartIndex,
        
        
        userFirestore,
        setUserFirestore,
        userFirestoreDelete,
        userAdd,
        userEdit,
        obterUm,


        user, 
        signout, 
        userDelete,


    }
}