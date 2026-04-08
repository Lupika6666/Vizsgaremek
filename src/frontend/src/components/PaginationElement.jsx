import { Link } from "react-router";

export function PaginationElement({page, maxPage, route}) {
    let currentRoute = "";
    if(route.includes("?")){
        currentRoute = `${route}&oldal=`;
    }
    else{
        currentRoute = `${route}?oldal=`;
    }

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item"><Link className="page-link" to={`/${route}`}>Első</Link></li>
                {page > 1 && (<li className="page-item"><Link className="page-link" to={`/${currentRoute}${page - 1}`}>Előző</Link></li>)}
                {page <= 1 && (<li className="page-item disabled"><span className="page-link">Előző</span></li>)}
                {page > 2 && (<li className="page-item"><Link className="page-link" to={`/${currentRoute}${page - 2}`}>{page - 2}</Link></li>)}
                {page > 1 && (<li className="page-item"><Link className="page-link" to={`/${currentRoute}${page - 1}`}>{page - 1}</Link></li>)}
                <li className="page-item"><Link className="page-link active" to={`/${currentRoute}${page}`}>{page}</Link></li>
                {page < maxPage && (<li className="page-item"><Link className="page-link" to={`/${currentRoute}${page + 1}`}>{page + 1}</Link></li>)}
                {page < maxPage - 1 && (<li className="page-item"><Link className="page-link" to={`/${currentRoute}${page + 2}`}>{page + 2}</Link></li>)}
                {page < maxPage && (<li className="page-item"><Link className="page-link" to={`/${currentRoute}${page + 1}`}>Következő</Link></li>)}
                {page >= maxPage && (<li className="page-item disabled"><span className="page-link">Következő</span></li>)}
                <li className="page-item"><Link className="page-link" to={`/${currentRoute}${maxPage}`}>Utolsó</Link></li>
            </ul>
        </nav>
    )
}