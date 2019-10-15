import { Probe } from "./Probe";
import { ProbeSizeResults } from "./ProbeSizeResults";
import { StringSignature } from "./StringSignature";


const MINIMUM_BUFFER_LENGTH = 40;
const SIGNATURE_RIFF = new StringSignature("RIFF");
const SIGNATURE_VP8 = new StringSignature("WEBPVP8 ");
const SIGNATURE_VP8L = new StringSignature("WEBPVP8L");
const SIGNATURE_VP8X = new StringSignature("WEBPVP8X");

export class WebpProbe extends Probe {

    public get type(): string {
        return "webp";
    }

    public get mimeType(): string {
        return "image/webp";
    }

    public probeType(buffer: Buffer): boolean {
        return buffer.length >= MINIMUM_BUFFER_LENGTH &&
            SIGNATURE_RIFF.check(buffer, 0);
    }

    /* eslint complexity: "off" */
    public probeSize(buffer: Buffer): ProbeSizeResults | undefined {
        if (SIGNATURE_VP8.check(buffer, 8)) {
            if (buffer[16 + 7] !== 0x9D || buffer[16 + 8] !== 0x01 || buffer[16 + 9] !== 0x2A) {
                // Bad signature
                return undefined;
            }

            return {
                width: buffer.readUInt16LE(16 + 10) & 0x3FFF,
                height: buffer.readUInt32LE(16 + 12) & 0x3FFF
            };
        }

        if (SIGNATURE_VP8L.check(buffer, 8)) {
            if (buffer[20] !== 0x2F) {
                return undefined;
            }

            const bits = buffer.readUInt32LE(16 + 5);

            return {
                width: (bits & 0x3FFF) + 1,
                height: ((bits >> 14) & 0x3FFF) + 1
            };
        }

        if (SIGNATURE_VP8X.check(buffer, 8)) {
            return {
                width: buffer.readUIntLE(16 + 8, 3) + 1,
                height: buffer.readUIntLE(16 + 11, 3) + 1
            };
        }

        return undefined;
    }

}
