import { Probe } from "./Probe";
import { ProbeSizeResults } from "./ProbeSizeResults";
import { Signature } from "./Signature";


const MINIMUM_BUFFER_LENGTH = 4;
const SIGNATURE = new Signature([0xFF, 0xD8]);

export class JpegProbe extends Probe {

    public get type(): string {
        return "jpeg";
    }

    public get mimeType(): string {
        return "image/jpeg";
    }

    public probeType(buffer: Buffer): boolean {
        return buffer.length >= MINIMUM_BUFFER_LENGTH &&
            SIGNATURE.check(buffer, 0);
    }

    /* eslint complexity: "off" */
    public probeSize(buffer: Buffer): ProbeSizeResults | undefined {
        let offset = 2;
        while (buffer.length - offset > 2) {
            // A JPEG marker should start with 0xFF
            if (buffer[offset++] !== 0xFF) {
                return undefined;
            }

            // Skip padding
            let code = buffer[offset++];
            while (code === 0xFF && offset < buffer.length) {
                code = buffer[offset++];
            }

            let length = 0;
            if ((code >= 0xD0 && code <= 0xD9) || code === 0x01) {
                // According to JPEG 1992, standalone markers have no length
                length = 0;
            } else if (code >= 0xC0 && code <= 0xFE) {
                if (buffer.length - offset < 2) {
                    return undefined;
                }
                length = buffer.readUInt16BE(offset) - 2;
                offset += 2;
            } else {
                // Unknown markers - malformed file?
                return undefined;
            }

            if (code === 0xD9 || code === 0xDA) {
                // End of stream - file has no size markers?
                return undefined;
            }

            if (length >= 5 && (code >= 0xC0 && code <= 0xCF) && code !== 0xC4 && code !== 0xC8 && code !== 0xCC) {
                if (buffer.length - offset < 2) {
                    return undefined;
                }

                return {
                    width: buffer.readUInt16BE(offset + 3),
                    height: buffer.readUInt16BE(offset + 1)
                };
            }

            offset += length;
        }

        return undefined;
    }

}
