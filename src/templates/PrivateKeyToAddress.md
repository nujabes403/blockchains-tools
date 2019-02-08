This tool provides following features.  
1. Get a public key from private key.  
2. Get a public address from public key.  
<br />

Business Logic:  
<span style="color: #618BF7;">
  `const publicKeyInstance = ec.keyFromPrivate(privateKey).getPublic()`  
  `const publicKey = '0x' + publicKeyInstance.getX().toString(16) + publicKeyInstance.getY().toString(16)`  
  `const publicAddress = '0x' + keccak256(publicKey).toString('hex').slice(-40)`  
</span>  

<br />

Since Ethereum uses elliptic curve secp256k1 for digital signature, you can get a public key from private key according to the curve.

With a public key, you can get a public address also.  
public address is just rightmost 20 bytes of the keccak256 hash of a public key.

<br />

cf) "PrivateKeyToPublicKey" uses `elliptic` and `keccak256` as libraries.  
[(https://github.com/indutny/elliptic/)](https://github.com/indutny/elliptic/)  
[(https://github.com/miguelmota/keccak256)](https://github.com/miguelmota/keccak256)  
You can use these libraries with `window.secp256k1`, `window.keccak256` in browser console of this page.
