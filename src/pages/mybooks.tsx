import Alert from "../components/Alert";
import Auth from "../components/Auth";
import Card from "../components/Card";
import ContainerBlock from "../components/ContainerBlock";
import Pagination from "../components/Pagination";
import useBooks from "../hooks/useBooks";

export default function MyBooks() {

    const {
        books,
        bookSelect,
        bookDelete,
        userFirestore,
        exibirMsg,
        alert, 
        color,
        AlterandoStartIndex,
        pages,
        pageAtual,

      } = useBooks();
    
    return(
        <ContainerBlock>

            <Auth />

            {
                exibirMsg ?
                    <Alert alert={alert} color={color} />
                    
                :
                <></>
            }
            
            <div className="flex h-screen justify-center bg-gray-50 dark:bg-gray-900">
                <div style={{justifyContent:'center'}} className="w-full max-w-6xl 
                            sm:mb-8 md:mb-16 mt-14 p-2"> 
                    <div className={`mt-4 mb-4 
                                    grid xs:grid-cols-1 sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-6 `}>
                        {
                            books.map((book, index) => {
                                return (
                                    <div key={index}>
                                    <Card bookDelete={bookDelete} bookSelect={bookSelect} book={book} />
                                </div>
                                )
                            })
                        }
                    </div>

                    {pages > 1 ? 
                        <Pagination pages={pages} pageAtual={pageAtual} AlterandoStartIndex={AlterandoStartIndex} />
                        :
                        <></>
                    }
                </div>
            </div>
        </ContainerBlock>
    )
}