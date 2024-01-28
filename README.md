# React QrCode Reader

Read QrCodes with the user's camera. Simple, customizable. Implements [zxing-js/browser](https://github.com/zxing-js/browser).

---

## Table of Contents

1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Components Props](<#Components Props>)
4. [License](#License)

---

## Installation

```shell
npm install react-qr-code-reader
```

## Usage

### Just import it and done!

```TSX
import { QrReader } from 'react-qr-code-reader'

export function SomeComponent() {
  const [read, setRead] = useState(true);
	
  return (
    <QrReader read={read} />
  )
}
```

If a guide to the QrReader is needed, you can import `QrReaderViewFinder` and pass it to `<QrReader />` children.

```TSX
import { QrReader, QrReaderViewFinder } from 'react-qr-code-reader'

export function SomeComponent() {
  const [read, setRead] = useState(true);
	
  return (
    <QrReader read={read}>
      <QrReaderViewFinder />
    </QrReader>
  )
}
```

If you need a fully customized guide, you can pass any React node to it!

## Components Props

### QrReader

| Prop | Type | Optional | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| read | `boolean` | ❌ | - | If the reader should read. |
| videoConstrains | [[#MediaTrackConstraints (Video Tracks)]] | ✅ | { facingMode: 'environment', frameRate: 30 } |  |
| scanDelay | `number` - ms | ✅ | 300 | The delay between each reading. |
| scanSuccessDelay | `number` - ms | ✅ | 3500 | The delay to continue the reading process after a successful reading. |
| onReadError | `(err: string) => void` | ✅ | - | Function called when there is an error in the reading process. |
| onRead | `(result: `[Result](#Result)`) => void` | ✅ | - | Function called when the QrCode is read. |
| flipVideo | `boolean` | ✅ | false | If the previewed video should be flipped. |

**It extends HTML's div attributes!**

### QrReaderViewFinder

| Prop | Type | Optional | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| color | string | ✅ | `rgb(239 68 68)` - red | The guide's scanning corners color. |

**It extends HTML's svg attributes!**

## Types

### MediaTrackConstraints (Video Tracks)

[Ref](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints#instance_properties_of_video_tracks)

| Prop | Type |
| ---- | ---- |
| aspectRatio | number - fraction |
| facingMode | string - user \| environment \| left \| right |
| frameRate | number - fp/s |
| height | number - px |
| width | number - px |

### Result

[Ref](https://github.com/zxing-js/library/blob/99a8e0c65de7bf97565a5dd46299d858c10dd69a/src/core/Result.ts#L73)

| Method | Return | Description |
| ---- | ---- | ---- |
| getText | string | Text encoded on the QrCode. |
| getRawBytes | Uint8Array | Raw bits encondded on the QrCode. |
| getNumBits | number | Number of valid bits in the `Uint8Array` returned by `getRawBytes()`. |
| getResultPoints | ResultPoint[] | QrCode's corners coordinates of the. |
| getBarcodeFormat | BarcodeFormat - 11/QR_CODE | Code of the barcode, in this case, 11. |
| getTimestamp | number - timestamp | When the QrCode was read. |
| toString | string |  |

---

## License

Licensed under the MIT License, Copyright © 2022-present [WorkOS](https://workos.com).

See [LICENSE](./LICENSE) for more information.
