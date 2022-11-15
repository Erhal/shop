import {FC} from "react";
import {IHeaderProps} from "./_types";

const Header: FC<IHeaderProps> = ({title}) => {
    return (
        <header className="bg-dark py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">{title ? title : ''}</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
