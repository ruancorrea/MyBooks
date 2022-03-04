import { useEffect, useState } from "react";
import User from "../core/User"
import UserRepository from "../core/UserRepository"
import CollectionUser from "../lib/firebase/db/CollectionUser";
import useAuth from "./useAuth";

export default function useUserFirestore() {
    const { user, signout, userDelete } = useAuth();
    const repo: UserRepository = new CollectionUser()
    const [userFirestore, setUserFirestore] = useState<User>(null);

    useEffect(() => {
       // console.log("userFirestore useEffect",userFirestore);

    }, [userFirestore])

    useEffect(() => {
        if(user!=null){
            obterUm();
        }
    }, [user])

    function verificando() {
        if (user && userFirestore == null) {
            obterUm();
        }
        if (!user) {
            setUserFirestore(null);
        }
    }

    async function obterUm() {
        if (user && userFirestore == null) {
            await repo.obterUm(user.uid).then(users => {
                if(users.length > 0){
                    const userCarregado = new User(users[0].idprovider, users[0].qtdbooks, users[0].id)
                    setUserFirestore(userCarregado);
                }
                else if(users.length == 0 && userFirestore == null) { 
                    userAdd();
                }
            })
        }
    }

    async function userFirestoreDelete() {
        await repo.excluir(userFirestore).then((res) => {
            console.log("USER EXCLUIDO", res)
            setUserFirestore(null)
        }).catch(err => {
            console.log("ERROR AO EXCLUIR USER", err)
        })
    }  

    async function userAdd() {
        const newUser = new User(user.uid, 0)
        await repo.adicionar(newUser).then((userAdicionado) => {
            //console.log("USER ADICIONADO", userAdicionado)
        })
    } 

    async function userEdit(u: User) { 
        await repo.editar(u)
    }

    return {
        userFirestore,
        setUserFirestore,
        userFirestoreDelete,
        userAdd,
        userEdit,
        obterUm,

        user,
        signout, 
        userDelete
    }
}