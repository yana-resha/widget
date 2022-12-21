import './detailsBlock.scss';
import { el } from "redom";
import { langName } from "../../..";


export function detailsBlock (obj) {
  
  const text = obj.text;
  const block = obj.block;


  block.push(
    {
      type: '2',
      svg: '<svg width="30px" height="30px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M338.8,166.6h-69.9l0,0h-17.2c0,0,0,0,0,0H142.4c-8.2,0-14.4,7.3-13.1,15.4l42.7,256.1   c1.1,6.4,6.6,11.1,13.1,11.1h111c6.5,0,12-4.7,13.1-11.1L351.9,182C353.2,174,347,166.6,338.8,166.6z" fill="#15AEE5"/><path d="M374.2,62.8h-64.5c-13.4,0-25.4,8.5-29.9,21.1l-6.8,19.3c-1.9,1-3.6,2.2-5.1,3.6c-6.1,5.4-15.1,5.1-21.4,0   c-6.9-5.6-15.7-9-25.2-9c-12.9,0-24.4,6.1-31.8,15.7c-5.4-5.2-13.2-7.8-21.6-6c-8.6,1.9-15.4,8.9-17.4,17.5   c-0.6,2.9-0.7,5.8-0.3,8.6c0.7,5.3,0.3,10.7-1.6,15.7h108.2H275h40.6c-1-2-1.2-4.4-0.1-6.7c2.7-5.7,3.6-12.3,2.3-19.3   c-2.4-12-12.3-21.6-24.4-23.7c-0.3,0-0.5-0.1-0.8-0.1l3.5-9.9c2-5.8,7.5-9.6,13.6-9.6h64.5c4.8,0,8.7-3.9,8.7-8.7   C382.8,66.6,379,62.8,374.2,62.8z" fill="#1D3A55"/></g></svg>', 
      title: 'какой-то текст'
    }, 
    {
      type: '2',
      svg: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="30px" height="30px" viewBox="0 0 31.21 31.21" style="enable-background:new 0 0 31.21 31.21;" xml:space="preserve"><g><path d="M14.569,4.853l-1.214-1.71l1.369-0.806l0.323-1.611l1.37,0.564L18.353,0l0.725,1.128l1.771-0.322L20.47,2.385c0.4,0.547,0.646,1.217,0.646,1.947c0,1.822-1.479,3.301-3.301,3.301C16.173,7.633,14.821,6.427,14.569,4.853z M17.748,9.833l-1.74-0.013v4.684l4.369,3.861l1.313-1.707l-3.896-3.764L17.748,9.833z M21.763,30.576l-2.967,0.375l-0.08-0.848l-0.646-5.479l-1.217-3.85l-0.509,4.229l-2.237,5.141l0.65,0.273l-0.33,0.792l-2.602-1.096l0.101-0.238l-0.007-0.002l2.318-5.594l0.042-1.104l-4.832-1.736l1.661-4.623l0.067,0.022l3.062-5.742V8.128h1.584l0.002-0.005l0.008,0.005h3.196v5.47l-0.896-0.905l0.008-3.191l-2.299-0.036l-0.265,0.496v4.935l0.026,0.004l3.427,2.91v1.018h-1.484l-0.148,0.332l1.349,0.023l1.37,5.211l0.842,5.426l0.688-0.096L21.763,30.576z M14.238,12.468l-2.449,4.593l2.449,0.879V12.468z M16.837,18.828h-0.129l0.11,0.039L16.837,18.828z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>',
      title: 'еще текст'
    },
    {
      type: '2',
      svg: '<svg width="30px" height="30px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M256,233.1c-26.9,0-48.9,21.9-48.9,48.8c0,4.8,3.9,8.7,8.7,8.7c4.8,0,8.7-3.9,8.7-8.7   c0-17.4,14.2-31.5,31.5-31.5c4.8,0,8.7-3.9,8.7-8.7C264.7,237,260.8,233.1,256,233.1z" fill="#15AEE5"/><path d="M418.3,159.3h-72l-7.7-32c-2.8-11.7-13.3-19.9-25.3-19.9H198.7c-12,0-22.4,8.2-25.3,19.9l-7.7,32h-72   c-10.2,0-18.4,8.3-18.4,18.4v208.4c0,10.2,8.3,18.4,18.4,18.4h324.6c10.2,0,18.4-8.3,18.4-18.4V177.8   C436.7,167.6,428.5,159.3,418.3,159.3z M256,354c-39.8,0-72.1-32.3-72.1-72.1s32.3-72.1,72.1-72.1c39.8,0,72.1,32.3,72.1,72.1   S295.8,354,256,354z M408.9,227.3c0,6.3-5.1,11.4-11.4,11.4h-16.2c-6.3,0-11.4-5.1-11.4-11.4v-16.2c0-6.3,5.1-11.4,11.4-11.4h16.2   c6.3,0,11.4,5.1,11.4,11.4V227.3z" fill="#1D3A55"/></g></svg>',
      title: 'и еще текст',
    }
  )


  const container = el('div.details-block');
  const imgBlock = el('div.details-block__img-block', el('img', {
    src: '',
    alt: `${langName.alt}`,
  }))



  const title = el('div.details-block__title', `${text.name}`)
  const contentEvent = el('div.details-block__content-event-block', title);
  container.append(imgBlock);

  container.append(contentEvent);


  // контейнеры для блоков с дополнительной информацией
  const svgContainer = el('div.info-svg-container')
  const infoContainer = el('div.info-text-container')

  if (text.preview_text) {
    let detail = el('div.detail-text');
    detail.innerHTML = `${text.detail_text}`;
    contentEvent.append(detail)
  }

  if (text.detail_text) {
    let detail = el('div.detail-text');
    detail.innerHTML = `${text.detail_text}`;
    contentEvent.append(detail)
  }
  
  if (text.short_description) {
    const shortDescription = el('p')
    shortDescription.innerHTML = `${text.short_description}`;
    contentEvent.append(shortDescription)
  }

  if (block && block.length > 0) {
    block.forEach(element => {
      if (element.type === '1') {
        const div = el('div.details-block__org-block');
        div.innerHTML = `${element.name}: ${element.value} `;
        infoContainer.append(div)
        
      }
      if (element.type === '2') {
        const svgBlock = el('div.details-block__svg-block');
        const svg = el('span.svg-span');
        svg.innerHTML = element.svg;
        const svgTitle = el('span.svg-title', `${element.title}`);
        svgBlock.append(svg, svgTitle);
        svgContainer.append(svgBlock)
      }
    });
    container.append(infoContainer);
    container.append(svgContainer)
  }

  return container;
}