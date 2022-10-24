import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const ScrollToTop = ({children}) => {
    const path = useLocation().pathname

    useEffect(() => {
        window.scroll({top: 0, left: 0, behavior: 'instant'});
    }, [path]);

    return (
        <>
            {children}
        </>
    );
};

export default ScrollToTop;