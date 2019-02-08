This tool provides following features.  
1. Get a contract address with sender address and nonce  
<br />

Business Logic:  
<span style="color: #618BF7;">
  `contractAddress = '0x' + keccak256(rlp.encode([sender, nonce])).toString('hex').slice(-40)`  
</span>  

<br />
A contract address is deterministic. It is just the rightmost 20 bytes of the keccak256 hash of an RLP encoding of the Sender's address and their tx nonce. Which means it's possible to guess what the contract address will be with a sender's address and a nonce before deploying contract.  

<br />
ex) Crypto Kitties contract is deployed at tx <span style="text-decoration: underline;">[0x691f348ef11e9ef95d540a2da2c5f38e36072619aa44db0827e1b8a276f120f4](https://etherscan.io/tx/0x691f348ef11e9ef95d540a2da2c5f38e36072619aa44db0827e1b8a276f120f4)</span>. In this tx, the sender address is <span style="text-decoration: underline;">`0xba52c75764d6f594735dc735be7f1830cdf58ddf`</span> and the nonce of the tx is `3515`.  
<span style="color: #618BF7; font-size:14px;">
`'0x' + keccak256(rlp.encode(['0xba52c75764d6f594735dc735be7f1830cdf58ddf', 3515])).toString('hex').slice(-40)`
</span>
returns <span style="text-decoration: underline;">`0x06012c8cf97bead5deae237070f9587f8e7a266d`</span> which is the address of crypto kitties contract.  
<br />

ex2) Dyverse(KYDY) contract address: <span style="text-decoration: underline;">0xd90f5ebc01914bbd357b754956aafb199f4d1624</span>  
= Sender: <span style="text-decoration: underline;">0x526e7283a6cc9b19b871bab650926934a3ec4c56</span>  
= Nonce: 5

<span style="color: #618BF7; font-size:14px;">
`'0xd90f5ebc01914bbd357b754956aafb199f4d1624' = '0x' + keccak256(rlp.encode(['0x526e7283a6cc9b19b871bab650926934a3ec4c56', 5])).toString('hex').slice(-40)`
</span>

<br />
cf) "Contract Address" uses `rlp` and `keccak256` as libraries.  
[(https://github.com/ethereumjs/rlp)](https://github.com/ethereumjs/rlp)  
[(https://github.com/miguelmota/keccak256)](https://github.com/miguelmota/keccak256)  
You can use these libraries with `window.rlp`, `window.keccak256` in browser console of this page.
