export default class Book {
    #id: string
    #title: string
    #previewLink: string
    #authors: [string]
    #thumbnail: string
    #id_user: string
    #idGoogleBooks: string
    #description: string

    constructor(title: string, description: string, previewLink: string, authors: [string], thumbnail: string, id_user: string, idGoogleBooks: string, id: string=null){
        this.#id = id
        this.#idGoogleBooks = idGoogleBooks
        this.#description = description
        this.#title = title
        this.#previewLink = previewLink
        this.#authors = authors
        this.#thumbnail = thumbnail
        this.#id_user = id_user
    }

    static vazio() {
        return new Book('', '', '', [""], '', '', '')
    }

    get id() {
        return this.#id
    }
    get idGoogleBooks() {
        return this.#idGoogleBooks
    }

    get id_user() {
        return this.#id_user
    }

    get description() {
        return this.#description
    }

    get title() {
        return this.#title
    }

    get previewLink () {
        return this.#previewLink
    }

    get authors () {
        return this.#authors
    }

    get thumbnail () {
        return this.#thumbnail
    }
}