import { useEffect, useState } from "react";

export default function usePagination( Nlimit: number ) {
    const [totalItems, setTotalItems] = useState(0);
    const [pages, setPages] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [pageAtual, setPageAtual] = useState(1);
    const [limit, setLimit] = useState(Nlimit);

    useEffect(() => {
        setPages(Math.ceil(totalItems/limit))
    }, [totalItems])

    function AlterandoStartIndex(proxPage: number){
        var numero = (proxPage-1) * limit;
        setStartIndex(numero)
        setPageAtual(proxPage)
    }

    return {
        totalItems, pages, startIndex, pageAtual, limit,
        setTotalItems, setPages, setStartIndex, setPageAtual, setLimit,
        AlterandoStartIndex
    }
}