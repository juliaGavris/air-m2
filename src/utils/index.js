/**
 *
 * @param path
 * @example
 * "./" => "./"
 * "./some/joice/model_schema.js" => joice => ./some/joice/
 */
export function catalog(path) {
    return path.replace(/\w{1,}.js/g, "");
}

export function concatPath(...paths) {
    return paths.reduce( (acc, next) => next[0] === "." ? acc + next : next, "");
}

export function forEachFromData(func) {
    return ({data, ...args}) => ({
        data: data.map( data => func({data, ...args}) ),
        ...args
    })
}

export function routeNormalizer(route) {
    try {
        return route.split("/")
        //an empty string includes
            .filter(x => !".".includes(x))
            .map(x => x[0] === "{" ? JSON.parse(x.replace(/[a-zA-Z]\w{1,}/g, x=> `"${x}"`)) : x);
    }
    catch(e) {
        throw `can't parse this route: ${route}`
    }
}

/**
 *
 * @param {Array} schema
 */
export function schemasNormalizer([key, ...elems]) {
    return [
        key,
        elems.length && !Array.isArray(elems[0]) ? elems.shift() : {},
        ...elems.map( elem => schemasNormalizer(elem) )
    ];
}

export function searchBySignature(sign, arr, sprop = "key") {
    return arr.find(({[sprop]: key}) => {
        return typeof sign === "string" ?
            key === sign :
                /*<@>*/ typeof key === "object" &&/*</@>*/
                Object.keys(sign).every( k => key[k] === sign[k] )
    })
}