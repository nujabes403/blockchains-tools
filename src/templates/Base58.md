This tool provides following features.  
1. Base58 Encoding for hex string / string.  
2. Base58 Decoding for hex string / string.  
<br />

If you want to encode hex string, you should add '0x' prefix to the input.  
Otherwise, all your input is treated as normal string.

Business Logic (Encode):  
<span style="color: #618BF7;">
  ```
  if (e.target.value.startsWith('0x')) {
  ```
  <br />
  ```
    const hexBuffer = Buffer.from(e.target.value.replace('0x', ''), 'hex')
  ```
  <br />
  ```
    return bs58.encode(hexBuffer)
  ```
  <br />
  ```
  } else {
  ```
  <br />
  ```
    const normalBuffer = Buffer.from(e.target.value)
  ```
  <br />
  ```
    return bs58.encode(normalBuffer)
  ```
  <br />
  ```
  }
  ```
</span>

<br />
cf) "Base58" uses `bs58` as a library.  
[(https://github.com/cryptocoinjs/bs58)](https://github.com/cryptocoinjs/bs58)  
You can use this library with `window.bs58` in browser console of this page.
