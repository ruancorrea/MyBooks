import Book from "./Book";

export default interface BookRepository {
    adicionar(book: Book): Promise<Book>
    excluir(id:string): Promise<void>
    obterTodosPagination(id_user: string, startIndex: number, limit: number): Promise<Book[]>
    obterTodos(id_user: string): Promise<Book[]>

}