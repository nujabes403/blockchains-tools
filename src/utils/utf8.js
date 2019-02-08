// Reference: https://gist.github.com/valentinkostadinov/5875467

export function toHex(s) {
  // utf8 to latin1
  var s = unescape(encodeURIComponent(s))
  var h = ''
  for (var i = 0; i < s.length; i++) {
      h += s.charCodeAt(i).toString(16)
  }
  return h
}

export function fromHex(h) {
  var s = ''
  for (var i = 0; i < h.length; i+=2) {
      s += String.fromCharCode(parseInt(h.substr(i, 2), 16))
  }
  try {
    return decodeURIComponent(escape(s))
  } catch (e) {
    console.log(e, 'err')
    return ''
  }
}
