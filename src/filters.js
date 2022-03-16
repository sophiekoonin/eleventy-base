module.exports = {
  kebabCase: (str) => {
    return str.replace(/\s+/g, '-').toLowerCase();
  },
};
