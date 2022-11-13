import {toast} from "react-toastify";

const notifyInfo = (message) => toast.info(<div className='text-center text-dark'> {message} </div>);


const showNotifyInfo = (message) => {
    notifyInfo(message);
}

export default showNotifyInfo;