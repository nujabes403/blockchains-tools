This tool provides following features.  
1. Converts byte array to hex string.  
2. Conerts hex string to byte array.  
<br />

Business Logic:  
<span style="color: #618BF7;">
  ```
  byteArray.map(num => {
      const hexNum = num.toString(16)
      return hexNum.length === 2
        ? hexNum
        : '0' + hexNum
      }).join('')
  ```
  <br />
  ```
  export const parseHex = (hex) => {
    const bin = [], i, c, isEmpty = 1, buffer
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
  ```  
</span>  

<br />

You can type byte array as follows  
i) With parenthesis - <span style="color: #618BF7;">[11, 20, 33, 45]</span>  
ii) Only with commas - <span style="color: #618BF7;">11, 20, 33, 45</span>  
iii) Only with spaces - <span style="color: #618BF7;">11 20 33 45</span>  
