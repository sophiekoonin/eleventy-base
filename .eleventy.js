const marked = require('marked');
const contentful = require('contentful');
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CONTENTFUL_SPACE,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_TOKEN,
  host: process.env.CONTENTFUL_HOST,
  environment: 'master',
});

const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const {
  textAndImageBlock,
  contentBlock,
  imageProcessing,
} = require('./src/shortcodes');

module.exports = (config) => {
  config.addWatchTarget('./src');

  config.addPassthroughCopy({ './src/static': '/' });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  config.addShortcode('documentToHtmlString', documentToHtmlString);
  config.addShortcode('imageProcessing', imageProcessing);
  config.addShortcode('marked', marked);
  config.addShortcode('contentBlock', contentBlock);

  config.addShortcode('textAndImageBlock', textAndImageBlock);

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
