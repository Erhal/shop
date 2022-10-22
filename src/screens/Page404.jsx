const Page404 = () => {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{height: '75vh'}}>
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"><span className="text-danger">Opps!</span> {title[0].toUpperCase() + title.slice(1)} not found.</p>
                <p className="lead">
                    The {title} you’re looking for doesn’t exist.
                </p>
            </div>
        </div>
    );
};

export default Page404;