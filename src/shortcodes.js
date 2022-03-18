const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const { kebabCase } = require('./filters');

const SocialSVGs = {
  facebook: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="none" d="M0 0h24v24H0z" />
  <path
    d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
    fill="currentColor" />
</svg>`,
  twitter: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="none" d="M0 0h24v24H0z" />
  <path
    d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"
    fill="currentColor" />
</svg>
`,
  instagram: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="none" d="M0 0h24v24H0z" />
  <path
    d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
    fill="currentColor" />
</svg>
`,
  youtube: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="none" d="M0 0h24v24H0z" />
  <path
    d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"
    fill="currentColor" />
</svg>
`,
};

function imageProcessing(photo) {
  return `<img class='u-max-full-width'
          srcset="https:${
            photo.fields.file.url
          }?w=480&fm=webp&q=80&fit=fill&f=faces 480w,
          https:${
            photo.fields.file.url
          }?w=800&fm=webp&q=80&fit=fill&f=faces 800w" sizes="(max-width: 600px) 480px,800px"
          src="https:${photo.fields.file.url}?w=480&fit=fill&f=faces"
          alt="${photo.fields.description || ''}" loading="lazy">`;
}

module.exports = {
  paragraphBlock: function (item) {
    return `<section class="paragraph-block"><p class="prose">${documentToHtmlString(
      item
    )}</p></section>`;
  },
  contentBlock: function ({ data }) {
    const contentBlock = data.target;
    return `
                <section class="content-block prose" id="${kebabCase(
                  contentBlock.fields.heading
                )}">
                            <h2 class="block-heading">${
                              contentBlock.fields.heading
                            }</h2>
                            <div class="content-block-content prose p" data-color-reverse>
                            ${documentToHtmlString(contentBlock.fields.content)}
                            </div>
                </section>`;
  },
  textAndImageBlock: function ({ data }) {
    const textAndImageBlock = data.target;
    const imageBlock = imageProcessing(textAndImageBlock.fields.image);
    const textBlock = `<div class="text-block prose">
<div class="text shadow p" data-color-reverse>
    ${documentToHtmlString(textAndImageBlock.fields.bodyText)}
</div></div>`;

    const content =
      textAndImageBlock.fields.imageSide === 'left'
        ? `
      ${imageBlock}
      ${textBlock}
     `
        : ` 
     ${textBlock}
     ${imageBlock}
     `;

    return `
      <section id="${kebabCase(
        textAndImageBlock.fields.heading
      )}" class="text-and-image">
      <h2 class="block-heading" data-img-align="${
        textAndImageBlock.fields.imageSide
      }">${textAndImageBlock.fields.heading}</h2>
      <div class="text-and-image-content">
       ${content}
        </div>
      </section>`;
  },
  imageProcessing,
  socialMenu: function (socials) {
    return `
    <nav aria-label="social">
  <ul class="social-menu">
  ${socials
    .map(
      ({ name, url }) => `
    <li>
    <a title="${name}" href="https://www.${name}.com/${url}">
    <span class="visually-hidden">${name}</span>
    ${SocialSVGs[name]}
    </a>
    </li>`
    )
    .join('')}
  </ul>
  </nav>
    `;
  },
};
