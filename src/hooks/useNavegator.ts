import { useState } from "react"

export default function useNavegator() {
    const [visivel, setVisivel] = useState<'meusLivros' | 'pesquisarLivro' | 'infoLivro' >('meusLivros')

    const exibirMeusLivros = () => setVisivel('meusLivros')
    const exibirPesquisarLivro = () => setVisivel('pesquisarLivro')
    const exibirInfoLivro = () => setVisivel('infoLivro')

    

    return {
        meusLivrosVisivel: visivel === 'meusLivros',
        pesquisarLivroVisivel: visivel === 'pesquisarLivro',
        infoLivroVisivel: visivel === 'infoLivro',
        exibirMeusLivros,
        exibirPesquisarLivro,
        exibirInfoLivro,
    }
}