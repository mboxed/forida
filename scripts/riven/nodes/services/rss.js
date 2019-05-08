'use strict'

RIVEN.lib.Rss = function RssNode (id, rect) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M65,65 L65,65 L245,65 L245,245 L65,245 Z M65,125 L65,125 L245,125 M95,95 L95,95 L95,95 '

  this.receive = function () {
    const logs = Ø('database').cache.horaire
    const selection = []
    for (const id in logs) {
      const log = logs[id]
      if (selection.length >= 60) { break }
      if (log.time.offset > 0) { continue }
      if (!log.pict) { continue }
      selection.push(log)
    }

    return this.render(selection)
  }

  this.items = function (logs) {
    let html = ''
    for (const id in logs) {
      const log = logs[id]
      html += `
  <item>
    <title>${log.term} — ${log.name}</title>
    <link>https://mboxed.github.io/forida/${log.term.toUrl()}</link>
    <guid isPermaLink='false'>IV${log.pict}</guid>
    <pubDate>${log.time.toDate().toUTCString()}</pubDate>
    <dc:creator><![CDATA[M]]></dc:creator>
    <description>
      &lt;img src="hhttps://mboxed.github.io/forida/media/diary/${log.pict}.jpg"/&gt;
      &lt;br/&gt;
      ${log.host.data.BREF.toHeol(log.host).stripHTML()}
    </description>
  </item>
`
    }
    return html
  }

  this.render = function (logs) {
    return `
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">

<channel>
  <title>Forida — Journal</title>
  <link>https://mboxed.github.io/forida/</link>
  <description>M's Journal</description>
  <image>
    <url>https://mboxed.github.io/forida/media/services/rss.jpg</url>
    <title>Forida</title>
    <link>https://mboxed.github.io/forida</link>
  </image>
  <pubDate>${logs[0].time.toDate().toUTCString()}</pubDate>
  <generator>Oscean - Riven</generator>
  ${this.items(logs)}
</channel>

</rss>`.toEntities()
  }
}
