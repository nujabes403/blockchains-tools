import { caver } from 'utils/caver'
const rlp = require('rlp')

export const replaceGlobally = (originalText, searchText, replaceText) => {
  const regex = new RegExp(searchText, 'g')
  return originalText.replace(regex, replaceText)
}

export const rawTxTypeMap = Object.entries(caver.helpers.constants)
  .reduce((acc, [typeTag, typeValue]) => {
    if (typeof typeValue !== 'string') return acc
    typeValue = typeValue.replace('0x', '')
    acc[typeValue] = replaceGlobally(replaceGlobally(typeTag, '_', ' '), ' TYPE TAG', '')
    return acc
  }, {})
  
export const recoverRawTx = (rawTx) => {
  const zeroXRemovedRawTx = rawTx.replace('0x', '')
  
  const type = zeroXRemovedRawTx.slice(0, 2)
  const typeDetachedRawTx = '0x' + zeroXRemovedRawTx.slice(2)
  
  const typeName = rawTxTypeMap[type]
  
  if (!typeName) { // legacy Tx
    const [nonce, gasPrice, gas, to, value, data, v, r, s] = caver.utils.rlpDecode(rawTx)
    return { nonce, gasPrice, gas, to, value, data, v, r, s }
  }
  
  const decodedOutput = caver.utils.rlpDecode(typeDetachedRawTx)
    
  switch (type) {
    case '18': {
      const [nonce, gasPrice, gas, to, value, from, humanReadable, accountKey, signatures] = decodedOutput
      return { nonce, gasPrice, gas, to, value, from, humanReadable, accountKey, signatures }
    }
    case '20': {
      const [nonce, gasPrice, gas, from, accountKey, signatures] = decodedOutput
      return { nonce, gasPrice, gas, from, accountKey, signatures }
    }
    case '21': {
      const isFeePayerTx = decodedOutput.length > 6
      if (isFeePayerTx) {
        const [nonce, gasPrice, gas, from, accountKey, senderSignature, feePayer, feePayerSignature] = decodedOutput
        return { nonce, gasPrice, gas, from, accountKey, senderSignature, feePayer, feePayerSignature }
      } else {
        const [nonce, gasPrice, gas, from, accountKey, senderSignature] = decodedOutput
        return { nonce, gasPrice, gas, from, accountKey, senderSignature }
      }
    }
    case '22': {
      const isFeePayerTx = decodedOutput.length > 7
      if (isFeePayerTx) {
        const [nonce, gasPrice, gas, from, accountKey, feeRatio, senderSignature, feePayer, feePayerSignature] = decodedOutput
        return { nonce, gasPrice, gas, from, accountKey, feeRatio, senderSignature, feePayer, feePayerSignature }
      } else {
        const [nonce, gasPrice, gas, from, accountKey, feeRatio, senderSignature] = decodedOutput
        return { nonce, gasPrice, gas, from, accountKey, feeRatio, senderSignature }
      }
    }
    case '08': {
      const [nonce, gasPrice, gas, to, value, from, signature] = decodedOutput
      return { nonce, gasPrice, gas, to, value, from, signature }
    }
    case '10': {
      const [nonce, gasPrice, gas, to, value, from, data, signature] = decodedOutput
      return { nonce, gasPrice, gas, to, value, from, data, signature }
    }
    case '09': {
      const isFeePayerTx = decodedOutput.length > 7
      if (isFeePayerTx) {
        const [nonce, gasPrice, gas, to, value, from, senderSignature, feePayer, feePayerSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, senderSignature, feePayer, feePayerSignature }
      } else {
        const [nonce, gasPrice, gas, to, value, from, senderSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, senderSignature }
      }
    }
    case '0a': {
      const isFeePayerTx = decodedOutput.length > 8
      
      if (isFeePayerTx) {
        const [nonce, gasPrice, gas, to, value, from, feeRatio, senderSignature, feePayer, feePayerSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, feeRatio, senderSignature, feePayer, feePayerSignature }
      } else {
        const [nonce, gasPrice, gas, to, value, from, feeRatio, senderSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, feeRatio, senderSignature }
      }
    }
    case '11': {
      const isFeePayerTx = decodedOutput.length > 8
      
      if (isFeePayerTx) {
        const [nonce, gasPrice, gas, to, value, from, data, senderSignature, feePayer, feePayerSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, data, senderSignature, feePayer, feePayerSignature }
      } else {
        const [nonce, gasPrice, gas, to, value, from, data, senderSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, data, senderSignature }
      }
    }
    case '12': {
      const isFeePayerTx = decodedOutput.length > 9
      
      if (isFeePayerTx) {
        const [nonce, gasPrice, gas, to, value, from, data, feeRatio, senderSignature, feePayer, feePayerSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, data, feeRatio, senderSignature, feePayer, feePayerSignature }
      } else {
        const [nonce, gasPrice, gas, to, value, from, data, feeRatio, senderSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, data, feeRatio, senderSignature }
      }
    }
    case '28': {
      const [nonce, gasPrice, gas, to, value, from, data, humanReadable, signature] = decodedOutput
      return { nonce, gasPrice, gas, to, value, from, data, humanReadable, signature }
    }
    case '29': {
      const isFeePayerTx = decodedOutput.length > 9
      
      if (isFeePayerTx) {
        const [nonce, gasPrice, gas, to, value, from, data, humanReadable, senderSignature, feePayer, feePayerSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, data, humanReadable, senderSignature, feePayer, feePayerSignature }
      } else {
        const [nonce, gasPrice, gas, to, value, from, data, humanReadable, senderSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, data, humanReadable, senderSignature }
      }
    }
    case '2a': {
      const isFeePayerTx = decodedOutput.length > 10
      
      if (isFeePayerTx) {
        const [nonce, gasPrice, gas, to, value, from, data, humanReadable, feeRatio, senderSignature, feePayer, feePayerSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, data, humanReadable, feeRatio, senderSignature, feePayer, feePayerSignature }
      } else {
        const [nonce, gasPrice, gas, to, value, from, data, humanReadable, feeRatio, senderSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, data, humanReadable, feeRatio, senderSignature }
      }
    }
    case '30': {
      const [nonce, gasPrice, gas, to, value, from, data, signature] = decodedOutput
      return { nonce, gasPrice, gas, to, value, from, data, signature }
    }
    case '31': {
      const isFeePayerTx = decodedOutput.length > 8
      
      if (isFeePayerTx) {
        const [nonce, gasPrice, gas, to, value, from, data, senderSignature, feePayer, feePayerSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, data, senderSignature, feePayer, feePayerSignature }
      } else {
        const [nonce, gasPrice, gas, to, value, from, data, senderSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, data, senderSignature }
      }
    }
    case '32': {
      const isFeePayerTx = decodedOutput.length > 9
      
      if (isFeePayerTx) {
        const [nonce, gasPrice, gas, to, value, from, data, feeRatio, senderSignature, feePayer, feePayerSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, data, feeRatio, senderSignature, feePayer, feePayerSignature }
      } else {
        const [nonce, gasPrice, gas, to, value, from, data, feeRatio, senderSignature] = decodedOutput
        return { nonce, gasPrice, gas, to, value, from, data, feeRatio, senderSignature }
      }
      break
    }
    case '38': {
      const [nonce, gasPrice, gas, from, signature] = decodedOutput
      return { nonce, gasPrice, gas, from, signature }
    }
    case '39': {
      const isFeePayerTx = decodedOutput.length > 5
      
      if (isFeePayerTx) {
        const [nonce, gasPrice, gas, from, senderSignature, feePayer, feePayerSignature] = decodedOutput
        return { nonce, gasPrice, gas, from, senderSignature, feePayer, feePayerSignature }
      } else {
        const [nonce, gasPrice, gas, from, senderSignature] = decodedOutput
        return { nonce, gasPrice, gas, from, senderSignature }
      }
    }
    case '3a': {
      const isFeePayerTx = decodedOutput.length > 6
      
      if (isFeePayerTx) {
        const [nonce, gasPrice, gas, from, feeRatio, senderSignature, feePayer, feePayerSignature] = decodedOutput
        return { nonce, gasPrice, gas, from, feeRatio, senderSignature, feePayer, feePayerSignature }
      } else {
        const [nonce, gasPrice, gas, from, feeRatio, senderSignature] = decodedOutput
        return { nonce, gasPrice, gas, from, feeRatio, senderSignature }
      }
    }
    case '48': {
      const [nonce, gasPrice, gas, to, value, from, anchoredData, signature] = decodedOutput
      return { nonce, gasPrice, gas, to, value, from, anchoredData, signature }
    }
      
  }
}