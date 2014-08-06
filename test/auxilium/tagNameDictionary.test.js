/**
 * Created by Alexander Henka on 06.08.14.
 * Copyright by Alexander Henka
 */

var assert = require('assert');


var tagNameDictionary = require('../../core/auxilium/tagNameDictionary');
var compValidTagNames;

describe('Tag name dictionary', function(){

    before(function(){
        compValidTagNames = {

            'a' :  {'eleName' : 'a','type' : false},
            'abbr' : { 'eleName' : 'abbr','type' : false},
            'address' : {'eleName' : 'address','type' : false},
            'area' : {'eleName' : 'area','type' : false},
            'article' : {'eleName' : 'article','type' : false},
            'aside' : {'eleName' : 'aside','type' : false},
            'audio' : {'eleName' : 'audio','type' : false},

            'b' : {'eleName' : 'b','type' : false},
            'base' : {'eleName' : 'base','type' : false},
            'bdo' : {'eleName' : 'bdo','type' : false},
            'bdi' : {'eleName' : 'bdi','type' : false},
            'blockquote' : {'eleName' : 'blockquote','type' : false},
            'body' : {'eleName' : 'body','type' : false},
            'br' : {'eleName' : 'br','type' : false},
            'button' : {'eleName' : 'button','type' : false},

            'canvas' : {'eleName' : 'canvas','type' : false},
            'caption' : {'eleName' : 'caption','type' : false},
            'cite' : {'eleName' : 'cite','type' : false},
            'code' : {'eleName' : 'code','type' : false},
            'col' : {'eleName' : 'col','type' : false},
            'colgroup' : {'eleName' : 'colgroup','type' : false},

            'data' : {'eleName' : 'data','type' : false},
            'datalist' : {'eleName' : 'datalist','type' : false},
            'dd' : {'eleName' : 'dd','type' : false},
            'del' : {'eleName' : 'del','type' : false},
            'detail' : {'eleName' : 'detail','type' : false},
            'dialog' : {'eleName' : 'dialog','type' : false},
            'div' : {'eleName' : 'div','type' : false},
            'dl' : {'eleName' : 'dl','type' : false},
            'dt' : {'eleName' : 'dt','type' : false},

            'em' : {'eleName' : 'em','type' : false},
            'embed' : {'eleName' : 'embed','type' : false},

            'fieldset' : {'eleName' : 'fieldset','type' : false},
            'figcaption' : {'eleName' : 'figcaption','type' : false},
            'figure' : {'eleName' : 'figure','type' : false},
            'footer' : {'eleName' : 'footer','type' : false},
            'form' : {'eleName' : 'form','type' : false},

            'h1' : {'eleName' : 'h1','type' : false},
            'h2' : {'eleName' : 'h2','type' : false},
            'h3' : {'eleName' : 'h3','type' : false},
            'h4' : {'eleName' : 'h4','type' : false},
            'h5' : {'eleName' : 'h5','type' : false},
            'h6' : {'eleName' : 'h6','type' : false},
            'header' : {'eleName' : 'header','type' : false},
            'hgroup' : {'eleName' : 'hgroup','type' : false},
            'hr' : {'eleName' : 'hr','type' : false},
            'html' : {'eleName' : 'html','type' : false},

            'i' : {'eleName' : 'i','type' : false},
            'iframe' : {'eleName' : 'iframe','type' : false},
            'img' : {'eleName' : 'img','type' : false},
            'input' : {'eleName' : 'input','type' : false},
            'ins' : {'eleName' : 'ins','type' : false},

            'kbd' : {'eleName' : 'kbd','type' : false},
            'keygen' : {'eleName' : 'keygen','type' : false},

            'label' :{'eleName' : 'label','type' : false},
            'legend' : {'eleName' : 'legend','type' : false},
            'li' : {'eleName' : 'li','type' : false},
            'link' : {'eleName' : 'link','type' : false},

            'main' : {'eleName' : 'main','type' : false},
            'map' : {'eleName' : 'map','type' : false},
            'mark' : {'eleName' : 'mark','type' : false},
            'menu' : {'eleName' : 'menu','type' : false},
            'menuitem' : {'eleName' : 'menuitem','type' : false},
            'meta' : {'eleName' : 'meta','type' : false},
            'meter' : {'eleName' : 'meter','type' : false},

            'nav' : {'eleName' : 'nav','type' : false},
            'noscript' : {'eleName' : 'noscript','type' : false},

            'object' : {'eleName' : 'object','type' : false},
            'ol' : {'eleName' : 'ol','type' : false},
            'optgroup' : {'eleName' : 'optgroup','type' : false},
            'option' : {'eleName' : 'option','type' : false},
            'output' : {'eleName' : 'output','type' : false},

            'p' : {'eleName' : 'p','type' : false},
            'param' : {'eleName' : 'param','type' : false},
            'pre' : {'eleName' : 'pre','type' : false},
            'progress' : {'eleName' : 'progress','type' : false},

            'q' : {'eleName' : 'q','type' : false},

            'rb' : {'eleName' : 'rb','type' : false},
            'rp' : {'eleName' : 'rp','type' : false},
            'rt' : {'eleName' : 'rt','type' : false},
            'rtc' : {'eleName' : 'rtc','type' : false},
            'ruby' : {'eleName' : 'ruby','type' : false},

            's' : {'eleName' : 's','type' : false},
            'samp' : {'eleName' : 'samp','type' : false},
            'script' : {'eleName' : 'script','type' : false},
            'section' : {'eleName' : 'section','type' : false},
            'select' : {'eleName' : 'select','type' : false},
            'small' : {'eleName' : 'small','type' : false},
            'source' : {'eleName' : 'source','type' : false},
            'span' : {'eleName' : 'span','type' : false},
            'strong' : {'eleName' : 'strong','type' : false},
            'style' : {'eleName' : 'style','type' : false},
            'sub' : {'eleName' : 'sub','type' : false},
            'summary' : {'eleName' : 'summary','type' : false},

            'table' : {'eleName' : 'table','type' : false},
            'tbody' : {'eleName' : 'tbody','type' : false},
            'td' : {'eleName' : 'td','type' : false},
            'template' : {'eleName' : 'template','type' : false},
            'textarea' : {'eleName' : 'textarea','type' : false},
            'tfoot' : {'eleName' : 'tfoot','type' : false},
            'th' : {'eleName' : 'th','type' : false},
            'thead' : {'eleName' : 'thead','type' : false},
            'time' : {'eleName' : 'time','type' : false},
            'title' : {'eleName' : 'title','type' : false},
            'tr' : {'eleName' : 'tr','type' : false},
            'track' : {'eleName' : 'track','type' : false},

            'u' : {'eleName' : 'u','type' : false},
            'ul' : {'eleName' : 'ul','type' : false},

            'var' : {'eleName' : 'var','type' : false},
            'video' : {'eleName' : 'video','type' : false},
            'wbr' : {'eleName' : 'wbr','type' : false}



        };



        //Aditional


        compValidTagNames.hyperlink = {
            'eleName' : 'a' ,'type' : false
        };
        compValidTagNames.button = {
            'eleName' : 'input' ,'type' : 'button'
        };
    });

    describe('Create Tag name dictionary ', function(){
        it('The tag name dictionary should look "compValidTagNames"', function(){
            assert.deepEqual(tagNameDictionary, compValidTagNames ,"Create DOMElement");
        })
    });

});