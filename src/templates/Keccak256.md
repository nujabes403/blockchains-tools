This tool provides following features.  
1. Calculate the keccak256 hash of the input.  
<br />

Business Logic:  
<span style="color: #618BF7;">
  `keccak256Hash = keccak256(input).toString('hex')`  
</span>  

<br />
Keccak256 is a hashing function providing 32-byte hashes.  
this function has following use cases:  
- random number generator  
- block hashing  
- transaction hashing  
- stealth address private key image (for double spend protection)  
- public address checksum  
- RingCT  
- multisig  
- bulletproofs  
- ...and likely a few other things.  

<br />

cf) "Keccak256" uses `keccak256` as a library.  
[(https://github.com/miguelmota/keccak256)](https://github.com/miguelmota/keccak256)  
You can use this library with `window.keccak256` in browser console of this page.
