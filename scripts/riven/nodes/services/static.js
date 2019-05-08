'use strict'

RIVEN.lib.Static = function StaticNode (id, rect) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M65,65 L65,65 L245,65 L245,245 L65,245 Z M65,125 L65,125 L245,125 M95,95 L95,95 L95,95 '

  function _item (term) {
    const body = term.data.BODY ? term.data.BODY.filter((line) => { return line.substr(0, 1) === '&' || line.substr(0, 1) === '-' || line.substr(0, 1) === '|' || line.substr(0, 1) === '#' }) : ''
    const links = Object.keys(term.links).reduce((acc, val) => { return `${acc}<a href='${term.links[val]}' target='_blank'>${val.toTitleCase()}</a> ` }, ' ').trim()
    return `<tr><td><a href='/${term.name.toUrl()}'>${term.name.toTitleCase()}</a></td><td><a href='/${term.parent.name.toUrl()}'>${term.parent.name.toTitleCase()}</a></td><td>${term.span.from && term.span.to ? `[${term.span.from}-${term.span.to}]` : ''}</td><td>${term.bref.toHeol(term).stripHTML()}</td><td>${links}</td></tr>\n`
  }

  this.receive = function () {
    const terms = Ø('database').cache.lexicon
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset='utf-8'>
  <!-- Basic -->
  <meta name='author' content='Test'>
  <meta name='description' content='Forida'/>
  <meta name='keywords' content='M, Mboxed, Lietal, Forida, Oscean' />
  <meta name='license' content='name=BY-NC-SA(4.0), url=https://creativecommons.org/licenses/by-nc-sa/4.0/'/>
  <meta name='thumbnail' content='https://mboxed.github.io/forida/media/services/thumbnail.jpg' />
  <!-- Twitter -->
  <meta name='twitter:card' content='summary'>
  <meta name='twitter:site' content='@mboxxed'>
  <meta name='twitter:title' content='Forida'>
  <meta name='twitter:description' content='The notes, research, and growth of M.'>
  <meta name='twitter:creator' content='@mboxxed'>
  <meta name='twitter:image' content='https://mboxed.github.io/forida/media/services/rss.jpg'>
  <!-- Facebook -->
  <meta property='og:title' content='Forida' />
  <meta property='og:type' content='article' />
  <meta property='og:url' content='https://mboxed.github.io/forida/' />
  <meta property='og:image' content='https://mboxed.github.io/forida/media/services/rss.jpg' />
  <meta property='og:description' content='The notes, research, and growth of M.' /> 
  <meta property='og:site_name' content='Forida' />
  <link rel="alternate"  type="application/rss+xml" title="Feed" href="links/rss.xml" />
  <title>Forida — Static</title>
</head>
<body>
  <h1>Oscean</h1>
  <h3>Last Update: ${Ø('database').cache.horaire[0].time}</h3>
  <table style='font-family: courier, monospace; font-size:12px' border='1'>${Object.keys(terms).sort().reduce((acc, val) => { return `${acc}${_item(terms[val])}` }, '').trim()}</table>
</body>
</html>`.toEntities()
  }
}
