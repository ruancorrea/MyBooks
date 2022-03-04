export default class User {
    #id: string
    //#books: [string] // id dos livros
    #idprovider: string
    #qtdbooks: number

    constructor(idprovider: string, qtdbooks: number, id: string = null){
        this.#id = id
        this.#idprovider = idprovider
        this.#qtdbooks = qtdbooks
    }

    static vazio() {
        return new User("", 0)
    }

    get id() {
        return this.#id
    }

    get idprovider() {
        return this.#idprovider
    }

    get qtdbooks() {
        return this.#qtdbooks
    }
}