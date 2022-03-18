const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const { kebabCase } = require('./filters');

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
};
