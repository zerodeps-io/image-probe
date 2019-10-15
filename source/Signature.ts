export class Signature {

    protected readonly array: number[] = [];

    public constructor(data: number[]) {
        this.array = data;
    }

    public check(buffer: Buffer, position: number): boolean {
        for (let i = 0, j = position; i < this.array.length; i++) {
            if (buffer[j++] !== this.array[i]) {
                return false;
            }
        }

        return true;
    }

}
