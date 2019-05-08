'use strict'

RIVEN.lib.Query = function QueryNode (id, rect) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M60,150 L60,150 L240,150 L240,150 L150,240 M150,60 L150,60 L240,150'
  this.location = null

  this.bang = function (input = window.location.hash) {
    if (input.indexOf('~') > -1) {
      Ø('terminal').bang(input)
      this.goto('home')
    } else if (this.location !== input.toUrl()) {
      this.goto(input || 'home')
    }
  }

  this.goto = function (input = 'home') {
    const time = performance.now()
    this.location = input.toUrl()
    window.location.hash = this.location
    Ø('document').setMode('state', 'loading')
    setTimeout(() => { this.send(this.location) }, 50)
    setTimeout(() => { Ø('document').setMode('state', 'ready') }, 150)
    console.info(`${this.id}-${this.location}`, `Query completed in ${(performance.now() - time).toFixed(2)}ms.`)
  }

  this.answer = function (q) {
    this.bang()
  }

  this.queue = function (a, speed = 1000) {
    if (a.length === 0) { return }
    setTimeout(() => {
      this.send(a[0].toUrl())
      this.queue(a.slice(1))
    }, speed)
  }
}

RIVEN.lib.Init = function QueryNode (id, rect) {
  RIVEN.Node.call(this, id, rect)
  this.glyph = 'M60,150 L60,150 L240,150 L240,150 L150,240 M150,60 L150,60 L240,150'
}

const detectBackOrForward = function (onBack, onForward) {
  let hashHistory = [window.location.hash]
  let historyLength = window.history.length

  return function () {
    let hash = window.location.hash; let length = window.history.length
    if (hashHistory.length && historyLength === length) {
      if (hashHistory[hashHistory.length - 2] === hash) {
        hashHistory = hashHistory.slice(0, -1)
        onBack()
      } else {
        hashHistory.push(hash)
        onForward()
      }
    } else {
      hashHistory.push(hash)
      historyLength = length
    }
  }
}

window.addEventListener('hashchange', detectBackOrForward(
  function () { Ø('query').bang() },
  function () { Ø('query').bang() }
))
