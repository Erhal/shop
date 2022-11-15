import {toast} from "react-toastify";

const showNotifySuccess = (message: string) => toast.success(<div className='text-center text-dark'> {message} </div>);

export default showNotifySuccess;