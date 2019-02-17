This tool provides following features.  
1. Convert between different Ether units.
<br />

Business Logic:  
<span style="color: #618BF7;">
'wei': { title: 'Wei', exponent: 0, },  
'kwei': { title: 'Kwei', exponent: 3, },  
'mwei': { title: 'Mwei', exponent: 6, },  
'gwei': { title: 'Gwei(Shannon)', exponent: 9, },  
'szabo': { title: 'Szabo(Microether)', exponent: 12, },  
'finney': { title: 'Finney(Milliether)', exponent: 15, },  
'ether': { title: 'Ether', exponent: 18, },  
```
this['$' + unitKey].value = valueAsWei
  ? valueAsWei.dividedBy(10 ** exponent).toString(10)
  : ''
```
</span>

<br />

cf) "WeiConverter" uses `BigNumber` as a library.  
[(https://github.com/MikeMcl/bignumber.js)](https://github.com/MikeMcl/bignumber.js)  
You can use this library with `window.BigNumber` in browser console of this page.
