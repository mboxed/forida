'use strict'

function Taxon (data = {}) {
  Entry.call(this, data.name, data)

  this.species = data.species
  this.genus = data.genus
  this.family = data.family
  this.order = data.order
  this.class = data.class
  this.phylum = data.phylum
  this.kingdom = data.kingdom
  this.common = data.name

  this.binomial = `${this.genus.substring(0,1)}. ${this.species}`

  this.indexes = [this.name, this.binomial]

  this.unde = 'Taxon'
  this.bref = `<p>${this.binomial}, or the ${this.common}.</p>`

  this.body = function () {
    return `<p>${this.genus} ${this.species}</p>
    <ul>
      <li class="kingdom"><b>Kingdom</b>: ${this.kingdom}</li>
      <li class="phylum"><b>Phylum</b>: ${this.phylum}</li>
      <li class="class"><b>Class</b>: ${this.class}</li>
      <li class="order"><b>Order</b>: ${this.order}</li>
      <li class="family"><b>Family</b>: ${this.family}</li>
      <li class="genus"><b>Genus</b>: ${this.genus}</li>
      <li class="species"><b>Species</b>: ${this.species}</li>
    </ul>`
  }

  this.toString = function () {
    return `<p>${this.common.toLink()} (<i>${this.binomial}</i>)</p>`
  }
}
