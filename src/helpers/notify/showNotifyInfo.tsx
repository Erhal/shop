import {toast} from "react-toastify";

const showNotifyInfo = (message: string) => toast.info(<div className='text-center text-dark'> {message} </div>);

export default showNotifyInfo;