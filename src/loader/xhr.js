import { stream } from "air-stream"

export default ( { type = "GET", path, content: { type: ctype } }) => stream( emt => {
    const xhr = new XMLHttpRequest();
    xhr.open(type, path, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-type', `${ctype}; charset=utf-8`);
    xhr.onload = ( ) => emt(xhr);
    xhr.send();
} );