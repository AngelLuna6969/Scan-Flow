
export const Title = ({ title, breadcrums,ruta }) => {
    return (
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>{ title }</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            {
                                breadcrums?.map((breadcrumb) => {
                                    return (
                                        <li className="breadcrumb-item"><a /* href={`#${ruta}`} */>{ breadcrumb }</a></li>
                                    )
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
}
