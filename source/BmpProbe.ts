import { Probe } from "./Probe";
import { ProbeSizeResults } from "./ProbeSizeResults";
import { StringSignature } from "./StringSignature";


const MINIMUM_BUFFER_LENGTH = 26;
const SIGNATURE = new StringSignature("BM");

export class BmpProbe extends Probe {

    public get type(): string {
        return "bmp";
    }

    public get mimeType(): string {
        return "image/bmp";
    }

    public probeType(buffer: Buffer): boolean {
        return buffer.length >= MINIMUM_BUFFER_LENGTH &&
            SIGNATURE.check(buffer, 0);
    }

    public probeSize(buffer: Buffer): ProbeSizeResults | undefined {
        return {
            width: buffer.readUInt16LE(18),
            height: buffer.readUInt16LE(22)
        };
    }

}
