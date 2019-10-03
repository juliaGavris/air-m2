import Observer from "fontfaceobserver"
import {resolve} from 'path';

const FONT_LOADING_TIMEOUT = 30000;

export default ( { fonts, revision, size, ...args } ) => {
      const style = document.createElement("style");
      const families = fonts.map(({family}) => family);
      fonts.forEach(({formats, family}) => {
        const src = formats.map(({url, name}) => {
          url = resolve(revision ? `${url}?rev=${revision}` : url);
          return `url('file:///${url}') ${name ? `format('${ name }')` : ''}`;
        }).join(',');
        style.textContent +=
          `@font-face { 
              font-family: '${family}'; 
              src: ${src}; 
          }`;
      });
      document.head.appendChild(style);
      return Promise.all(
        families.map(family => {
          return new Observer(family)
            .load(null, FONT_LOADING_TIMEOUT)
            .then( () => ( {
              type: "font", font: { fontFamily: family, fontSize: size, ...args }
            } ) );
        })
      );
  }
