import {toast} from "react-toastify";

const notifySuccess = (message) => toast.success(<div className='text-center text-dark'> {message} </div>);


const showNotifySuccess = (message) => {
    notifySuccess(message);
}

export default showNotifySuccess;