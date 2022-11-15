import {toast} from "react-toastify";

const showNotifyWarning = (message: string) => toast.warn(<div className='text-center text-dark'> {message} </div>);

export default showNotifyWarning;