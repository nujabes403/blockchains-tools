This tool provides following feature.  
1. Get a IOST public key from IOST private key.  
<br />

Business Logic:  
<span style="color: #618BF7;">
  `const priKeyBytes = base58.decode(pvkey)`  
  `const kp = nacl.sign.keyPair.fromSeed(priKeyBytes.slice(0, 32))`  
  `const seckey = Buffer.from(kp.secretKey.buffer)`  
  `const pubkey = seckey.slice(seckey.length / 2)`  
  `return base58.encode(pubkey)`
</span>  

<br />

Since IOST uses elliptic curve ED25519 for digital signature, you can get a public key from private key according to the curve.

<br />

cf) "KeyGenerate" uses `tweetnacl` and `bs58` as libraries.  
[(https://github.com/dchest/tweetnacl-js)](https://github.com/dchest/tweetnacl-js)  
[(https://github.com/cryptocoinjs/bs58)](https://github.com/cryptocoinjs/bs58)  
You can use these libraries with `window.nacl`, `window.bs58` in browser console of this page.
