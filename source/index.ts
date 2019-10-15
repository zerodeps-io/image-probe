import { ProbeResults } from "./ProbeResults";
import { Probe } from "./Probe";
import { BmpProbe } from "./BmpProbe";
import { JpegProbe } from "./JpegProbe";
import { Jpeg2000Probe } from "./Jpeg2000Probe";
import { GifProbe } from "./GifProbe";
import { PngProbe } from "./PngProbe";


export class ImageProbe {

    private static probes: Probe[] = [];

    public static register(probe: Probe): void {
        this.probes.push(probe);
    }

    public static fromBuffer(buffer: Buffer): ProbeResults | undefined {
        for (const probe of this.probes) {
            if (probe.probeType(buffer)) {
                const results = probe.probeSize(buffer);

                if (results !== undefined) {
                    return {
                        type: probe.type,
                        mimeType: probe.mimeType,
                        ...results
                    };
                }
            }
        }

        return undefined;
    }

}

ImageProbe.register(new PngProbe());
ImageProbe.register(new JpegProbe());
ImageProbe.register(new GifProbe());
ImageProbe.register(new Jpeg2000Probe());
ImageProbe.register(new BmpProbe());
