import { readFileSync } from "fs";

import { ImageProbe } from "../source";


describe("Testing probe from buffer", () => {

    const png = readFileSync("./test/files/png/test.png");
    const bmp = readFileSync("./test/files/bmp/blk.bmp");
    const gif = readFileSync("./test/files/gif/test.gif");
    const jpeg = readFileSync("./test/files/jpeg/relax.jpg");
    const jpeg2000 = readFileSync("./test/files/jpeg/relax.jp2");
    const loremIpsum = readFileSync("./test/files/text/loremipsum.txt");

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

    test("it doesn't detect an invalid file", () => {
        expect(ImageProbe.fromBuffer(loremIpsum))
            .toEqual(undefined);
    });
});
