This tool provides following features.  
1. Calculate the soliditysha3 hash of the input.  
<br />

Business Logic:  
<span style="color: #618BF7;">
  ```
  soliditySha3Output = web3.utils.soliditySha3({
  ```
  <br />
  ```
    type: type,
  ```
  <br />
  ```
    value: input,
  ```
  <br />
  ```
  }).toString('hex')
  ``` 
</span>  

<br />
Will calculate the sha3 of given input parameters in the same way solidity would.  
This means arguments will be ABI converted and tightly packed before being hashed.  

<br />

cf) "SoliditySha3" uses `web3` as a library.  
[(https://github.com/ethereum/web3.js)](https://github.com/ethereum/web3.js)  
You can use this library with `window.web3` in browser console of this page.
