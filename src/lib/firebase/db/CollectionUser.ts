import firebase from '../firestoreConfig';
import User from "../../../core/User"
import UserRepository from "../../../core/UserRepository";

export default class CollectionBook implements UserRepository {

    #conversor = {
        toFirestore(user: User) {
            return {
                idprovider: user.idprovider,
                qtdbooks: user.qtdbooks
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): User {
            const dados = snapshot.data(options);
            return new User(dados.idprovider, dados.qtdbooks, snapshot.id)
        }
    }


    async adicionar(user: User): Promise<User> {
        const docRef = await this.collection().add(user)    
        const doc = await docRef.get()
        return doc.data()
    }

    async editar(user: User): Promise<void> {
        const docRef = await this.collection().doc(user.id).set(user)  
    }

    async obterUm(idprovider: string): Promise<User[]> {
        const query = await this.collection().where("idprovider", "==", idprovider).get()
        return query.docs.map(doc => doc.data()) ?? []
    }

    async excluir(user: User): Promise<void> {
        return this.collection().doc(user.id).delete()      
    }


    private collection() {
        return firebase.firestore().collection('users').withConverter(this.#conversor)
    }
}