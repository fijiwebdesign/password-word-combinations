# Password word combinations

Combine a list of words into all combinations possible for password generation or cracking

Takes a list of words, prefixes, suffixes and separators and combines them into every permutation. 

Can be used for the wordlist for John the Ripper or phrasen|drescher. 

This is only feasible for a short list of words, prefixes, suffixes and word separators. 


## Install locally

```
git clone https://github.com/fijiwebdesign/password-word-combinations.git

npm install 

node . /path/to/words.txt
```

## Install globally

```
npm install -g password-word-combinations

password-word-combinations /path/to/words.txt
```

Words must be listed one per line. 

`words-combined.txt` will be generated with output words, one per line.

## Usage

```

Word combinations

Generate all word combinations from words, prefixes, suffixes and separators

    Usage:

      Installed globally

        password-word-combinations /path/to/words.txt 

      or installed locally

        npm start -- /path/to/words.txt 

      or 

        node index.js /path/to/words.txt

      or 

        node . /path/to/words.txt

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


```

## Usage with phrasen|drescher private key cracking

Install phrasen|drescher by following: 
http://leidecker.info/projects/phrasendrescher/index.shtml

Use `password-word-combinations` to generate all word permutations as documented above. 

Run `pd` for `pkey` private key cracking and pass in the `combined-words.txt` via the `-d` option.


### Example 

```
pd pkey -K ~/.ssh/keys/codementor-bali -v -d ./words-combined.txt
```


## Usage with John the ripper

Install Johntheripper
https://gist.github.com/fijiwebdesign/0a56ec28f1f23412fc16cca70f48d8e0

Todo. Document usage.

## Copyright

ISC - (c) gabe@fijiwebdesign.com 
