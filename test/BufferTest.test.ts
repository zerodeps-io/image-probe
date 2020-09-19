import { readFileSync } from "fs";

import { ImageProbe } from "../source";


describe("Testing probe from buffer", () => {

    const webpvp8 = readFileSync("./test/files/webp/testvp8.webp");
    const webpvp8l = readFileSync("./test/files/webp/testvp8l.webp");
    const webpvp8x = readFileSync("./test/files/webp/testvp8x.webp");
    const png = readFileSync("./test/files/png/test.png");
    const bmp = readFileSync("./test/files/bmp/blk.bmp");
    const gif = readFileSync("./test/files/gif/test.gif");
    const jpeg = readFileSync("./test/files/jpeg/relax.jpg");
    const jpeg2000 = readFileSync("./test/files/jpeg/relax.jp2");
    const svg = readFileSync("./test/files/svg/viewbox.svg");
    const loremIpsum = readFileSync("./test/files/text/loremipsum.txt");

    test("it detects a valid WEBP file with VP8", () => {
        expect(ImageProbe.fromBuffer(webpvp8))
            .toEqual({
                type: "webp",
                mimeType: "image/webp",
                width: 1600,
                height: 900
            });
    });

    test("it detects a valid WEBP file with VP8L", () => {
        expect(ImageProbe.fromBuffer(webpvp8l))
            .toEqual({
                type: "webp",
                mimeType: "image/webp",
                width: 1200,
                height: 900
            });
    });

    test("it detects a valid WEBP file with VP8X", () => {
        expect(ImageProbe.fromBuffer(webpvp8x))
            .toEqual({
                type: "webp",
                mimeType: "image/webp",
                width: 1440,
                height: 900
            });
    });

    test("it detects a valid PNG file", () => {
        expect(ImageProbe.fromBuffer(png))
            .toEqual({
                type: "png",
                mimeType: "image/png",
                width: 802,
                height: 670
            });
    });

    test("it detects a valid GIF file", () => {
        expect(ImageProbe.fromBuffer(gif))
            .toEqual({
                type: "gif",
                mimeType: "image/gif",
                width: 802,
                height: 670
            });
    });

    test("it detects a valid JPEG file", () => {
        expect(ImageProbe.fromBuffer(jpeg))
            .toEqual({
                type: "jpeg",
                mimeType: "image/jpeg",
                width: 400,
                height: 300
            });
    });

    test("it detects a valid JPEG2000 file", () => {
        expect(ImageProbe.fromBuffer(jpeg2000))
            .toEqual({
                type: "jp2",
                mimeType: "image/jp2",
                width: 400,
                height: 300
            });
    });

    test("it detects a valid BMP file", () => {
        expect(ImageProbe.fromBuffer(bmp))
            .toEqual({
                type: "bmp",
                mimeType: "image/bmp",
                width: 200,
                height: 144
            });
    });

    test("it detects a valid SVG file", () => {
        expect(ImageProbe.fromBuffer(svg))
            .toEqual({
                type: "svg",
                mimeType: "image/svg",
                width: 123,
                height: 456
            });
    });

    test("it doesn't detect an invalid file", () => {
        expect(ImageProbe.fromBuffer(loremIpsum))
            .toEqual(undefined);
    });
});
