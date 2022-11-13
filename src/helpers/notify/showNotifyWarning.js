import {toast} from "react-toastify";

const notifyWarning = (message) => toast.warn(<div className='text-center text-dark'> {message} </div>);

const showNotifyWarning = (message) => {
    notifyWarning(message);
}

export default showNotifyWarning;