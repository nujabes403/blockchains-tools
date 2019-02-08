This tool provides following features.  
1. Converts number to hexadecimal string.  
2. Converts hexadecimal string to number.  
<br />

Business Logic:  
<span style="color: #618BF7;">
  `hexadecimalString = new BigNumber(number).toString(16)`  
  `number = new BigNumber(hexadecimalString).toString(10)`  
</span>

<br />
cf) "Number To Hex" uses `bignumber.js` as a library.  
[(https://github.com/MikeMcl/bignumber.js)](https://github.com/MikeMcl/bignumber.js)  
You can use this library with `window.BigNumber` in browser console of this page.
