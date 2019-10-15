# image-probe

Get image format and dimensions quickly and efficiently. Without any single additional dependency!

## Installation

npm install --save @zerodeps/image-probe

## Usage

```typescript
import { ImageProbe } from "@zerodeps/image-probe";

const buffer = readFileSync("image.jpg");

const results = ImageProbe.fromBuffer(buffer);
/*
{
    type: "jpeg",
    mimeType: "image/jpeg",
    width: 512,
    height: 256
}
*/
```

## Supported image type formats

| Image Format | Type | MIME Type  |
| ------------ | ---- | ---------- |
| JPEG         | jpeg | image/jpeg |
| JPEG 2000    | jp2  | image/jp2  |
| GIF (87a)    | gif  | image/gif  |
| GIF (89a)    | gif  | image/gif  |
| PNG          | png  | image/png  |
| PNG (IHDR)   | png  | image/png  |
| WEBP (VP8)   | webp | image/webp |
| WEBP (VP8L)  | webp | image/webp |
| WEBP (VP8X)  | webp | image/webp |
| BMP          | bmp  | image/bmp  |
