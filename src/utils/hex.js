export const parseHex = (hex) => {
  hex = hex.replace('0x', '')
  let bin = [], i, c, isEmpty = 1, buffer
  for (i = 0; i < hex.length; i++) {
    c = hex.charCodeAt(i)
    if (c > 47 && c < 58 || c > 64 && c < 71 || c > 96 && c < 103) {
      buffer = buffer << 4 ^ (c > 64 ? c + 9 : c) & 15
      if (isEmpty ^= 1) {
        bin.push(buffer & 0xff)
      }
    }
  }
  return bin
}
