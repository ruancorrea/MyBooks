import firebase from '../firestoreConfig';
import Book from "../../../core/Book";
import BookRepository from "../../../core/BookRepository";

export default class CollectionBook implements BookRepository {

    #conversor = {
        toFirestore(book: Book) {
            return {
                title: book.title,
                previewLink: book.previewLink,
                authors: book.authors,
                thumbnail: book.thumbnail,
                idGoogleBooks: book.idGoogleBooks,
                id_user: book.id_user,
                description: book.description
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Book {
            const dados = snapshot.data(options)
            return new Book(dados.title, dados.description, dados.previewLink, dados.authors, dados.thumbnail, dados.id_user, dados.idGoogleBooks, snapshot.id)
        }
    }


    async adicionar(book: Book): Promise<Book> {
        const bookJaAdd = await this.collection().where("id_user", "==", book.id_user).where("idGoogleBooks","==",book.idGoogleBooks)
        const encontrado = await bookJaAdd.get()
        if(encontrado.docs.length > 0) {
            console.log("ENCONTRADO BOOK DUPLICADO", encontrado.docs)
            return null
        }
        const docRef = await this.collection().add(book)    
        const doc = await docRef.get()
        return doc.data()
    }

    async excluir(id: string): Promise<void> {
        return this.collection().doc(id).delete()      
    }

    async obterTodosPagination(id_user: string, startIndex: number, limit: number): Promise<Book[]> {
        //where("id_user", "==", id_user)
        const query2 = await this.collection().where("id_user", "==", id_user).get()
        console.log("query2", query2.docs)

        var resp = []
        console.log("startIndex",startIndex, "//", "limit",limit)
        for(var i=startIndex;i<query2.docs.length && i<limit+startIndex;i++){
            console.log("query2.docs[i].data()",query2.docs[i].data())
            resp.push(query2.docs[i].data())
        }

        return resp

        //const query = await this.collection().orderBy("id_user").startAt(id_user).limit(limit).get() // where("id_user", "==", id_user)
        //return query.docs.map(doc => doc.data()) ?? []
    }

    async obterTodos(id_user: string): Promise<Book[]> {
        const query = await this.collection().where("id_user", "==", id_user).get()
        return query.docs.map(doc => doc.data()) ?? []
    }

    private collection() {
        return firebase.firestore().collection('books').withConverter(this.#conversor)
    }
}