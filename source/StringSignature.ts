import { Signature } from "./Signature";


export class StringSignature extends Signature {

    public constructor(data: string) {
        const MASK = 0xFF;

        const array: number[] = [];
        for (let i = 0; i < data.length; i++) {
            array.push(data.charCodeAt(i) & MASK);
        }

        super(array);
    }

}
