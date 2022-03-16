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
  contentBlock: function ({ data }) {
    const contentBlock = data.target;
    return `
                <section id="${kebabCase(contentBlock.fields.heading)}">
                            <h2 class="major">${
                              contentBlock.fields.heading
                            }</h2>
                            ${documentToHtmlString(contentBlock.fields.content)}
                </section>`;
  },
  textAndImageBlock: function ({ data }) {
    const textAndImageBlock = data.target;
    if (textAndImageBlock.fields.imageSide) {
      return `
      <section id="${kebabCase(
        textAndImageBlock.fields.heading
      )}" class="text-and-image">
      ${imageProcessing(textAndImageBlock.fields.image)}
              <div class="text">
                  <h2 class="major">${textAndImageBlock.fields.heading}</h2>
                  ${documentToHtmlString(textAndImageBlock.fields.bodyText)}
              </div>
      </section>`;
    } else {
      return `
                      <section id="${kebabCase(
                        textAndImageBlock.fields.heading
                      )}" class="text-and-image">
                            
                              <div class="text">
                                  <h2 class="major">${
                                    textAndImageBlock.fields.heading
                                  }</h2>
                                  ${documentToHtmlString(
                                    textAndImageBlock.fields.bodyText
                                  )}
                              </div>
                              ${imageProcessing(textAndImageBlock.fields.image)}
                      </section>`;
    }
  },
  imageProcessing,
};
