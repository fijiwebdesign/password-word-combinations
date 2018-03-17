#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const os = require('os')

const paths = {
  words: argv._[0],
  prefix: argv.prefix,
  suffix: argv.suffix,
  sep: argv.sep
}
const max = argv.max || 3
const out_file = argv.out || './words-combined.txt'

let words = {}, out_words = []

if (!paths.words) {
  console.error('Word file path parameter not set - At least one parameter required')
  return usage()
}

Object.keys(paths).forEach(key => {
  const path = paths[key]
  if (path) {
    words[key] = fs.readFileSync(path).toString().split("\n")
      .filter(word => word) // non empty
      .filter( (word, index, self) => self.indexOf(word) === index) // unique
  }
})

console.log('settings', words)

function prefixer(words, prefixes) {
  let prefixed = []
  prefixes.forEach(prefix => words.forEach(word => prefixed.push(prefix + word)))
  return prefixed
}

function suffixer(words, suffixes) {
  let suffixed = []
  suffixes.forEach(suffix => words.forEach(word => suffixed.push(word + suffix)))
  return suffixed
}

function capitalizer(words) {
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
}

function combiner(words, seperators) {
  let combined = []
  words.forEach(word => words.forEach(word2 => {
    combined.push(word + word2)
    seperators.forEach(sep => combined.push(word + sep + word2))
  }))
  return combined
}

// words
const uppercased = capitalizer(words.words)
out_words = [...out_words, ...words.words, ...uppercased]
console.log('words', words.words, uppercased)

// prefixed
const prefixed = prefixer(words.words,  words.prefix)
const prefixed_upper = prefixer(capitalizer(words.words),  words.prefix)
out_words = [...out_words, ...prefixed, ...prefixed_upper]
console.log('prefixed', prefixed, prefixed_upper)

// suffixed
const suffixed = suffixer(words.words,  words.suffix)
const suffixed_upper = suffixer(capitalizer(words.words),  words.suffix)
out_words = [...out_words, ...suffixed, ...suffixed_upper]
console.log('suffixed', suffixed, suffixed_upper)

// prefixed suffixed
const prefixed_suffixed = prefixer(suffixed,  words.prefix)
const prefixed_suffixed_upper = prefixer(capitalizer(suffixed),  words.prefix)
out_words = [...out_words, ...prefixed_suffixed, ...prefixed_suffixed_upper]
console.log('prefixed', prefixed_suffixed, prefixed_suffixed_upper)

// combined
const combined = combiner(words.words, words.sep)
const combined_upper = combiner(capitalizer(words.words), words.sep)
out_words = [...out_words, ...combined, ...combined_upper]
console.log('combined', combined, combined_upper)

// combined prefixed
const combined_prefixed = prefixer(combined, words.prefix)
const combined_prefixed_upper = prefixer(capitalizer(combined), words.prefix)
out_words = [...out_words, ...combined_prefixed, ...combined_prefixed_upper]
console.log('combined_prefixed', combined_prefixed, combined_prefixed_upper)

// combined suffixed
const combined_suffixed = suffixer(combined, words.prefix)
const combined_suffixed_upper = suffixer(capitalizer(combined), words.prefix)
out_words = [...out_words, ...combined_suffixed, ...combined_suffixed_upper]
console.log('combined_suffixed', combined_suffixed, combined_suffixed_upper)

// combined prefixed suffixed
const combined_prefixed_suffixed = prefixer(combined_suffixed, words.prefix)
const combined_prefixed_suffixed_upper = prefixer(capitalizer(combined_suffixed), words.prefix)
out_words = [...out_words, ...combined_prefixed_suffixed, ...combined_prefixed_suffixed_upper]
console.log('combined_prefixed_suffixed', combined_prefixed_suffixed, combined_prefixed_suffixed_upper)

fs.writeFileSync(out_file, out_words.join(os.EOL))


/**
 * usage instructions
 */
function usage() {
  console.log(`
    Word combinations - Generate all word combinations from words, prefixes, suffixes and separators

    Usage:

      npm start -- /path/to/words.txt 

      or 

      node index.js /path/to/words.txt

    Options:

      Prefixes
      --prefix /path/to/prefixes.txt 

      Suffixes
      --suffix /path/to/suffixes.txt 

      Separators
      --sep /path/to/separators.txt

      Max words combined
      --max 3

    Examples:

      node . ../words.txt

      node . ../words.txt --prefix ../prefixes.txt --suffix ../suffixes.txt --sep ../separators.txt

  `)
}