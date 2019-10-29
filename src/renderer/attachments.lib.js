/**
 * Attachments Lib
 * ==================
 *  Input: Str
 *  Output:  
 *        - URL 
 *        - TAGS 
 * 
 *
 */

import _ from 'lodash';


/**
 * 
 */
const attach = {}
attach.regex = {}
attach.regex.url = /https?:\/\/([\w\d-\.]+)?[\w\d-\.]+\.{1}[\w]{1,4}((\/{1})?)([a-zA-Z0-9&-@_\+.‌​~#?\/=]*)?/gi;
attach.regex.hashtag = /#[a-zA-Z]+/gi;
/**
 * 
 */
attach.scrapPage = (url) => {

}

/**
 * 
 */


/**
 * Extract URLS
 */
attach.extractURL = (str) => {
    var urls = str.match(attach.regex.url)
    if (!urls || !urls.length) {
        return
    }
    var urls = _.uniq(urls)
    console.log('extracted urls', urls)
    return urls
}
/**
 * Extract Hashtag
 */
attach.extractTags = (str) => {
    var tags = str.match(attach.regex.hashtag)
    if (!tags || !tags.length) {
        return
    }
    var tags = _.uniq(tags)
    console.log('extracted hastgats', tags)
    return tags

}
/**
 * 
 */
export const Attach = attach;