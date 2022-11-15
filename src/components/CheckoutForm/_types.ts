import {Control} from "react-hook-form";

export interface ICities {
    value: string;
    label: string;
}

export interface IUseCheckoutForm {
    name: string;
    phone: string;
    email: string;
    city: string;
    address: string;
}

export interface ICitiesSelectProps {
    control: Control<IUseCheckoutForm>;
    error: boolean;
}

export interface ICity {
    createdAt: string
    name: string
    objectId: string
    updatedAt: string
}

export interface ILoadOptionsFunc {
    (inputValue: string, callback: (options: ICities[]) => void): void;
}

export interface IResponseData {
    results: ICity[];
}