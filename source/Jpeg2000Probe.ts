import { Probe } from "./Probe";
import { ProbeSizeResults } from "./ProbeSizeResults";
import { StringSignature } from "./StringSignature";


const MINIMUM_BUFFER_LENGTH = 56;
const SIGNATURE = new StringSignature("\x00\x00\x00\x0cjP  \r\n\x87\n");

export class Jpeg2000Probe extends Probe {

    public get type(): string {
        return "jp2";
    }

    public get mimeType(): string {
        return "image/jp2";
    }

    public probeType(buffer: Buffer): boolean {
        return buffer.length >= MINIMUM_BUFFER_LENGTH &&
            SIGNATURE.check(buffer, 0);
    }

    /* eslint complexity: "off" */
    public probeSize(buffer: Buffer): ProbeSizeResults | undefined {
        return {
            width: buffer.readUInt32BE(48 + 4),
            height: buffer.readUInt32BE(48)
        };
    }

}
