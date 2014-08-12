/**
 * Created by Alexander Henka on 06.08.14.
 * Copyright by Alexander Henka
 */


(function tagNameDictionary () {


    var _validTagNames = {

        'a' : true,
        'abbr' : true,
        'address' : true,
        'area' : true,
        'article' : true,
        'aside' : true,
        'audio' : true,

        'b' : true,
        'base' : true,
        'bdo' : true,
        'bdi' : true,
        'blockquote' : true,
        'body' : true,
        'br' : true,
        'button' : true,

        'canvas' : true,
        'caption' : true,
        'cite' : true,
        'code' : true,
        'col' : true,
        'colgroup' : true,

        'data' : true,
        'datalist' : true,
        'dd' : true,
        'del' : true,
        'detail' : true,
        'dialog' : true,
        'div' : true,
        'dl' : true,
        'dt' : true,

        'em' : true,
        'embed' : true,

        'fieldset' : true,
        'figcaption' : true,
        'figure' : true,
        'footer' : true,
        'form' : true,

        'h1' : true,
        'h2' : true,
        'h3' : true,
        'h4' : true,
        'h5' : true,
        'h6' : true,
        'header' : true,
        'hgroup' : true,
        'hr' : true,
        'html' : true,

        'i' : true,
        'iframe' : true,
        'img' : true,
        'input' : true,
        'ins' : true,

        'kbd' : true,
        'keygen' : true,

        'label' : true,
        'legend' : true,
        'li' : true,
        'link' : true,

        'main' : true,
        'map' : true,
        'mark' : true,
        'menu' : true,
        'menuitem' : true,
        'meta' : true,
        'meter' : true,

        'nav' : true,
        'noscript' : true,

        'object' : true,
        'ol' : true,
        'optgroup' : true,
        'option' : true,
        'output' : true,

        'p' : true,
        'param' : true,
        'pre' : true,
        'progress' : true,

        'q' : true,

        'rb' : true,
        'rp' : true,
        'rt' : true,
        'rtc' : true,
        'ruby' : true,

        's' : true,
        'samp' : true,
        'script' : true,
        'section' : true,
        'select' : true,
        'small' : true,
        'source' : true,
        'span' : true,
        'strong' : true,
        'style' : true,
        'sub' : true,
        'summary' : true,

        'table' : true,
        'tbody' : true,
        'td' : true,
        'template' : true,
        'textarea' : true,
        'tfoot' : true,
        'th' : true,
        'thead' : true,
        'time' : true,
        'title' : true,
        'tr' : true,
        'track' : true,

        'u' : true,
        'ul' : true,

        'var' : true,
        'video' : true,
        'wbr' : true

    };

    Object.keys(_validTagNames).forEach(function (tag) {
        _validTagNames[tag] = {'eleName' : tag ,'type' : false}
    });


   /*
    * Additional tag names
    */
    _validTagNames.hyperlink = {
        'eleName' : 'a' ,'type' : false
    };
    _validTagNames.button = {
        'eleName' : 'input' ,'type' : 'button'
    };
    _validTagNames.submitbutton = {
        'eleName' : 'input' ,'type' : 'submit'
    };
    _validTagNames.checkbox = {
        'eleName' : 'input' ,'type' : 'checkbox'
    };
    _validTagNames.radiobutton = {
        'eleName' : 'input' ,'type' : 'radio'
    };

   /*
    * Export the dictionary
    */
    module.exports = _validTagNames;

})();