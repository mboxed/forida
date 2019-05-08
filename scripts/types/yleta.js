'use strict'

function Yleta (data = {}) {
  Entry.call(this, data.name, data)

  this.unde = 'Lietal'
  this.english = data.english
  this.childspeak = name || data.name.toLowerCase()
  this.adultspeak = adultspeak(name || data.name)
  this.type = this.childspeak.substr(0, 2)
  this.key = this.childspeak.substr(0, this.childspeak.length - 2)
  this.indexes = [this.name]
  this.yletaodeta = new Yletaodeta(this.childspeak)
  this.bref = `<b>${this.name.toTitleCase()}</b>${this.name !== this.adultspeak ? `, or ${this.adultspeak}, ` : ''} is the ${'Lietal'.toLink()} word for \"${this.english}\" in English.`

  this.parts = function (size = 2) {
    const chunks = []
    let target = `${this.childspeak}`
    let from = size
    while (from < target.length + size) {
      chunks.push(target.substr(target.length - from, from))
      from += size
    }
    return chunks
  }

  this.glyph = function () {
    return `M65,155 L65,155 L155,155 M155,65 L155,65 L155,245 M185,155 L185,155 L245,155 M185,185 L185,185 L185,185`
  }

  this.body = function () {
    return `${permutate(this.key)}${this.yletaodeta.toSVG(100, 100, 23, 'white', true)}`
  }

  this.toString = function () {
    const en = this.english
    return `<p><b>${this.name.toTitleCase()}</b>${this.name.toLowerCase() !== this.adultspeak.toLowerCase() ? ', or ' + this.adultspeak.toTitleCase() : ''} is a ${'Lietal'.toLink()} word${en ? ' that translates to \"' + en + '\" in <i>English</i>' : ''}.</p>`
  }

  function adultspeak (childspeak, vowels = { 'a': 'ä', 'i': 'ï', 'o': 'ö', 'y': 'ÿ' }) {
    if (childspeak.length === 2) {
      return childspeak.substr(1, 1) + childspeak.substr(0, 1)
    }
    if (childspeak.length === 6) {
      return adultspeak(childspeak.substr(0, 2)) + adultspeak(childspeak.substr(2, 4))
    }
    if (childspeak.length === 8) {
      return (adultspeak(childspeak.substr(0, 4)) + adultspeak(childspeak.substr(4, 4))).replace('aa', 'ä').replace('ii', 'ï').replace('oo', 'ö').replace('yy', 'ÿ')
    }
    const c1 = childspeak.substr(0, 1)
    const v1 = childspeak.substr(1, 1)
    const c2 = childspeak.substr(2, 1)
    const v2 = childspeak.substr(3, 1)
    // lili -> lï
    if (c1 === c2 && v1 === v2) {
      return vowels[v1] + c1
    }
    // lila -> lia
    if (c1 === c2) {
      return v1 + c1 + v2
    }
    // kala -> käl
    if (v1 === v2) {
      return vowels[v1] + c1 + 'e' + c2
    }
    return v1 + c1 + 'e' + c2 + v2
  }
}

function permutate (key) {
  const a = [['k', 't', 'd'], ['r', 's', 'l'], ['j', 'v', 'f']]
  const v = ['y', 'i', 'a', 'o']
  let html = ''
  for (const ai in a) {
    const b = a[ai]
    html += `<tr>`
    for (const bi in b) {
      const consonant = b[bi]
      html += `<td>`
      for (const vi in v) {
        const name = `${key}${consonant}${v[vi]}`
        const result = Ø('asulodeta').find(name, 'name')
        html += `<b>${new Yleta({ name: name }).adultspeak}</b>: ${result ? result.english : '<i>--</i>'}<br />`
      }
      html += `</td>`
    }
    html += `</tr>`
  }
  return `<table>${html}</table>`
}

function divieths () {
  const c = ['k', 't', 'd', 'r', 's', 'l', 'j', 'v', 'f']
  const v = ['y', 'i', 'a', 'o']
  const e = []
  // Elementary
  for (const ci in c) {
    for (const vi in v) {
      e.push(`${c[ci]}${v[vi]}`)
    }
  }
  // Permutations
  const a = []
  for (const ai1 in e) {
    for (const ai2 in e) {
      a.push(`${e[ai1]}${e[ai2]}`)
    }
  }
  return a
}
