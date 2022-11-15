import {FC} from "react";

const SpinnerBorder: FC = () => {
    return (
        <div className="spinner-border" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="sr-only"></span>
        </div>
    );
};

export default SpinnerBorder;