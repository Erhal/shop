import {IProduct} from "../../../store/_types";

export interface ICartProductCardProps {
    product: IProduct;
    toggleCartBoxVisibility?: () => void;
}

export interface ICartProductCardInputProps {
    product: IProduct;
}