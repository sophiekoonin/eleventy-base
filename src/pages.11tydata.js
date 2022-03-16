const { kebabCase } = require('./filters');

module.exports = {
  eleventyComputed: {
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
