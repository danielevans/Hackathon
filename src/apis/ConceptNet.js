var ConceptNet = {
  baseURI: process.env.GATSBY_CONCEPT_API_BASE_URI,
  url: function (path) {
    return [ConceptNet.baseURI, path].join('');
  },

  escape(word) {
    return encodeURIComponent(word.toString().toLowerCase().replace(/[\s]+/, ''));
  },

  associations: async function (word) {
    return fetch(ConceptNet.url(`/related/c/en/${escape(word)}?filter=/c/en&limit=5`)).then(async (response) => {
      let json = await response.json();
      return window.z = (json["related"] || []).map((relation) => {
        return (relation["@id"] || "").replace(/^.*\//, '').replace('_', ' ');
      });
    }); // TODO: Handle errors in a useful way
  }
};

export default ConceptNet;
