import { Probe } from "./Probe";
import { ProbeSizeResults } from "./ProbeSizeResults";
import { Signature } from "./Signature";
import { StringSignature } from "./StringSignature";


const MINIMUM_BUFFER_LENGTH = 24;
const SIGNATURE = new Signature([137, 80, 78, 71, 13, 10, 26, 10]);
const SIGNATUREIHDR = new StringSignature("IHDR");

export class PngProbe extends Probe {

    public get type(): string {
        return "png";
    }

    public get mimeType(): string {
        return "image/png";
    }

    public probeType(buffer: Buffer): boolean {
        return buffer.length >= MINIMUM_BUFFER_LENGTH &&
            SIGNATURE.check(buffer, 0);
    }

    /* eslint complexity: "off" */
    public probeSize(buffer: Buffer): ProbeSizeResults | undefined {
        if (SIGNATUREIHDR.check(buffer, 12)) {
            // New format
            return {
                width: buffer.readUInt32BE(16),
                height: buffer.readUInt32BE(16 + 4)
            };
        }

        // Old format
        return {
            width: buffer.readUInt32BE(8),
            height: buffer.readUInt32BE(8 + 4)
        };
    }

}
