import { Probe } from "./Probe";
import { ProbeSizeResults } from "./ProbeSizeResults";


interface SvgAttributes {
    width: number | null;
    height: number | null;
    viewbox?: SvgAttributes | null;
}

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;

const extractorRegExps = {
    height: /\sheight=(['"])([^%]+?)\1/,
    root: svgReg,
    viewbox: /\sviewBox=(['"])(.+?)\1/,
    width: /\swidth=(['"])([^%]+?)\1/
};

const INCH_CM = 2.54;
const units: { [unit: string]: number } = {
    cm: 96 / INCH_CM,
    em: 16,
    ex: 8,
    m: (96 / INCH_CM) * 100,
    mm: 96 / INCH_CM / 10,
    pc: 96 / 72 / 12,
    pt: 96 / 72
};

function parseLength(len: string): number | undefined {
    const m = /([0-9.]+)([a-z]*)/.exec(len);
    if (!m) {
        return undefined;
    }
    return Math.round(parseFloat(m[1]) * (units[m[2]] || 1));
}

function parseViewbox(viewbox: string): SvgAttributes {
    const bounds = viewbox.split(" ");
    return {
        height: parseLength(bounds[3]) as number,
        width: parseLength(bounds[2]) as number
    };
}

function parseAttributes(root: string): SvgAttributes {
    const width = root.match(extractorRegExps.width);
    const height = root.match(extractorRegExps.height);
    const viewbox = root.match(extractorRegExps.viewbox);
    return {
        height: height && parseLength(height[2]) as number,
        viewbox: viewbox && parseViewbox(viewbox[2]) as SvgAttributes,
        width: width && parseLength(width[2]) as number
    };
}

function calculateByDimensions(attrs: SvgAttributes): ProbeSizeResults {
    return {
        height: attrs.height as number,
        width: attrs.width as number
    };
}

function calculateByViewbox(attrs: SvgAttributes, viewbox: SvgAttributes): ProbeSizeResults {
    const ratio = (viewbox.width as number) / (viewbox.height as number);
    if (attrs.width) {
        return {
            height: Math.floor(attrs.width / ratio),
            width: attrs.width as number
        };
    }
    if (attrs.height) {
        return {
            height: attrs.height,
            width: Math.floor(attrs.height * ratio)
        };
    }
    return {
        height: viewbox.height as number,
        width: viewbox.width as number
    };
}


export class SvgProbe extends Probe {

    public get type(): string {
        return "svg";
    }

    public get mimeType(): string {
        return "image/svg";
    }

    public probeType(buffer: Buffer): boolean {
        const str = String(buffer);
        return svgReg.test(str);
    }

    /* eslint complexity: "off" */
    public probeSize(buffer: Buffer): ProbeSizeResults | undefined {
        const root = buffer.toString("utf8").match(extractorRegExps.root);
        if (root) {
            const attrs = parseAttributes(root[0]);
            if (attrs.width && attrs.height) {
                return calculateByDimensions(attrs);
            }
            if (attrs.viewbox) {
                return calculateByViewbox(attrs, attrs.viewbox);
            }
        }

        return undefined;
    }

}
