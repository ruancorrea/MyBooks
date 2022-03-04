import User from "./User";

export default interface UserRepository {
    adicionar(user: User): Promise<User>
    editar(user: User): Promise<void>
    excluir(user:User): Promise<void>
    obterUm(id: string): Promise<User[]>
}