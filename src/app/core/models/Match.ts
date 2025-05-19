import { NumberValueAccessor } from "@angular/forms";
import { Ods } from "./Ods";

export interface Match {
    id: number,
    name: string,
    imageUrl: string,
    type: string,
    compability: number,
    location: string,
    odsList: Ods[]
}