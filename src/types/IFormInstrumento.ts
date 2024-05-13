import { Dispatch, SetStateAction } from "react";
import { iInstrumento } from "./iInstrumento";

export interface IFormInstrumento {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    values: iInstrumento;
}