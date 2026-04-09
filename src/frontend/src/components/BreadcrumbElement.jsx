import { Link } from "react-router";

export function BreadcrumbElement({routes, activeText}){
    return(
        <div className="card shadow p-3">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {routes.map(
                        (item)=>(
                            <li className="breadcrumb-item"><Link className="breadcrumbLink" to={item.link}>{item.text}</Link></li>
                        )
                    )}
                    <li className="breadcrumb-item active" aria-current="page">{activeText}</li>
                </ol>
            </nav>
        </div>
    )
}