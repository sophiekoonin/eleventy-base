const { kebabCase } = require('./filters');

module.exports = {
  eleventyComputed: {
    year: () => new Date().getFullYear(),
    choir: ({ pg }) => {
      return pg.choir?.fields?.name?.toLowerCase();
    },
    social: ({ pg }) => {
      const { choir } = pg;
      return Object.keys(choir.fields)
        .filter((k) => k !== 'name')
        .map((key) => ({
          name: key,
          url: choir.fields[key],
        }));
    },
    menu: function ({ pg }) {
      const content = pg.pageContent.content;
      const filtered = content.filter((c) => {
        const fields = c.data.target?.fields;
        return fields?.includeInMainMenu || false;
      });
      return filtered.map((c) => {
        const { heading } = c.data.target.fields;
        return {
          slug: kebabCase(heading),
          label: heading,
        };
      });
    },
  },
};
