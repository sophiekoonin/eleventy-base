module.exports = {
  kebabCase: (str) => {
    return str.replace(/\s+/g, '-').toLowerCase();
  },
  sentenceCase: (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },
};
