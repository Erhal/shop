import React, {ReactNode} from "react";

export interface IAppModalProps {
    children: ReactNode;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}