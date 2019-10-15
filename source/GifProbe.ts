import { Probe } from "./Probe";
import { ProbeSizeResults } from "./ProbeSizeResults";
import { StringSignature } from "./StringSignature";


const MINIMUM_BUFFER_LENGTH = 10;
const SIGNATURE87A = new StringSignature("GIF87a");
const SIGNATURE89A = new StringSignature("GIF89a");

export class GifProbe extends Probe {

    public get type(): string {
        return "gif";
    }

    public get mimeType(): string {
        return "image/gif";
    }

    public probeType(buffer: Buffer): boolean {
        return buffer.length >= MINIMUM_BUFFER_LENGTH &&
            (SIGNATURE87A.check(buffer, 0) || SIGNATURE89A.check(buffer, 0));
    }

    /* eslint complexity: "off" */
    public probeSize(buffer: Buffer): ProbeSizeResults | undefined {
        return {
            width: buffer.readUInt16LE(6),
            height: buffer.readUInt16LE(8)
        };
    }

}
