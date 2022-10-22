import './style.scss'

const SpinnerBorder = () => {
    return (
        <div className='SpinnerBorder d-flex justify-content-center align-items-center'>
            <div className="spinner-border" role="status" style={{width: '3rem', height: '3rem'}}>
                <span className="sr-only"></span>
            </div>
        </div>
    );
};

export default SpinnerBorder;