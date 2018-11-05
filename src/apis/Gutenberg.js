import Stemmer from "en-stemmer";

var Gutenberg = {
  baseURI: process.env.GATSBY_GUTENBERG_API_BASE_URI,
  loaded_dictionaries: {},
  loading_promises: {},
  words: null,

  url: function (path) {
    return [Gutenberg.baseURI, path].join('');
  },

  dictionary: async function (word) {
    let letter = word[0];
    if (!letter) {
      return null;
    }

    letter = letter.toLowerCase();
    if (Gutenberg.loaded_dictionaries[letter]) {
      return Gutenberg.loaded_dictionaries[letter][word];
    }

    return Gutenberg.getDictionary(`/dictionary/${letter}.json`, Gutenberg.loaded_dictionaries, letter).then((dictionary) => {
      return dictionary[word];
    });
  },

  wordList: async function() {
    if (!Gutenberg.words) {
      let file = "/dictionary/words.txt";
      if (!Gutenberg.loading_promises[file]) {
        Gutenberg.loading_promises[file] = fetch(Gutenberg.url(file)).then(async (response) => {
          let body = await response.text();
          Gutenberg.words = body.split("\n");
          return Gutenberg.words;
        });
      }
      return Gutenberg.loading_promises[file];
    }

    return Gutenberg.words;
  },

  getDictionary: async function(file, dictionary, key) {
    if (!Gutenberg.loading_promises[file]) {
      Gutenberg.loading_promises[file] = fetch(Gutenberg.url(file)).then(async (response) => {
        dictionary[key] = await response.json();
        return dictionary[key];
      });
    }

    return Gutenberg.loading_promises[file];
  },


  // this is the ONLY method that accepts unstemmed words
  getParagraph: async function(words) { // TODO This can be much more intelligent
    let wordList = await Gutenberg.wordList();

    let finalWords = words.map((word) => {
      return Stemmer(word);
    }).filter((word) => {
      return wordList.indexOf(word) >= 0;
    });

    let dictionaries = finalWords.map((word) => Gutenberg.dictionary(word));
    let paragraphs = {};
    let winner;


    await Promise.all(finalWords.map(async (word) => {
      let wordDictionary = await Gutenberg.dictionary(word);
      wordDictionary.forEach((paragraph) => {
        let components = paragraph.split(":");
        let count = parseInt(components[0], 10);
        let id = components.slice(1,3).join(":");
        paragraphs[id] = (paragraphs[id] || 0) + count;

        if (!winner) {
          winner = id;
        } else if (paragraphs[winner] < count) {
          winner = id;
        }
      });
    }));

    let documentId = winner.split(':')[0];
    let winnerIndex = winner.split(':')[1];
    let path = documentId.split('').slice(0, documentId.length - 1).join('/');


    let file = `/gutenberg_data/aleph.gutenberg.org/${path}/${documentId}/${documentId}.json`;
    return fetch(Gutenberg.url(file)).then(async (response) => {
      let document = await response.json();
      return { text: (document["paragraphs"][winnerIndex] || {})["text"], document: document, document_id: documentId };
    });
  },
};

export default Gutenberg;
