import { useState } from "react";
import Alert from "../components/Alert";
import Auth from "../components/Auth";
import ModalCard from "../components/ModalCard";
import InfoBook from "../components/InfoBook";
import TableAddBook from "../components/TableAddBook";
import useBooks from "../hooks/useBooks";
import ContainerBlock from "../components/ContainerBlock";

export default function AddBook() {
    const [ modalInfoBookVisivel, setModalInfoBookVisivel ] = useState(false);
    const [ modalDeleteVisivel, setModalDeleteVisivel ] = useState(false);

    const {
        book,
        bookSelect,
        bookAdd,
        exibirPesquisarLivro,
        infoLivroVisivel,
        err,
        exibirMsg,
        color,
        alert
      } = useBooks()

    return(
        <ContainerBlock>
            <Auth />

            {
                exibirMsg ?
                    <Alert alert={alert} color={color} />
                    
                :
                <></>
            }

            <div className="bg-gray-50 h-screen px-2 dark:bg-gray-900">

                {
                    infoLivroVisivel ?
                    <>
                        <ModalCard 
                            text={`Are you sure you want to add this book?`} 
                            modalVisivel={modalDeleteVisivel} setModalVisivel={setModalDeleteVisivel} 
                            add={bookAdd} book={book}/>

                        <InfoBook 
                            book={book}
                            bookAdd={bookAdd}
                            setModalDeleteVisivel={setModalDeleteVisivel}
                            setModalInfoBookVisivel={setModalInfoBookVisivel}
                            modalVisivel={modalInfoBookVisivel}
                            exibirPesquisarLivro={exibirPesquisarLivro}
                            />
                            </>
                    :
                    <>
                    </>
                }

                <TableAddBook bookSelect={bookSelect} bookAdd={bookAdd} infoLivroVisivel={infoLivroVisivel} setModalInfoBookVisivel={setModalInfoBookVisivel} />  

            </div>
        </ContainerBlock>
    )
}