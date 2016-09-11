var SP = SP || {};

SP.Utilities = SP.Utilities || {};

SP.Utilities.URLUpdater = function () {
    /* Private Members */
    var siteURL = _spPageContextInfo.webServerRelativeUrl, // Site URL; reaplce ~site keyword
        siteCollectionURL = _spPageContextInfo.siteServerRelativeUrl, //Site Collection URL; replace ~siteCollection keyword

    // Method to log error in console, and display on screen
    logError = function (error) {
        error = JSON.stringify(error);
        console.log(error);
        alert(error);
    },

    // Method to replace keyword from value
    keywordReplacer = function (value) {
        value = String(value);

        if (value.indexOf('~siteCollection') > -1)
            value = value.replace('~siteCollection', siteCollectionURL);
        else if (value.indexOf('~site') > -1)
            value = value.replace('~site', siteURL);

        return value;
    },

    // Method to traverse all elements and replace keywords
    replaceURLKeywords = function ($wrapper) {
        var $targetElements = $wrapper.find('img, script, link');

        if ($targetElements.length) {
            jQuery.each($targetElements, function (index, item) { // Traverse each element and replace keywords with actual values
                var $item = jQuery(item);
                if ($item.is('img') || $item.is('script')) {
                    var src = $item.data('src');
                    if (src && (src.indexOf('~siteCollection') > -1 || src.indexOf('~site') > -1))
                        src = keywordReplacer(src); // Replace Keyword
                    $item.attr('src', src);
                } else if ($item.is('link')) {
                    var href = $item.data('href');
                    if (href && (href.indexOf('~siteCollection') > -1 || href.indexOf('~site') > -1))
                        href = keywordReplacer(href); // Replace Keyword
                    $item.attr('href', href);
                }
            });
        }
    };

    // Initialize Method
    this.init = function (selector) {
        if (window.jQuery) {
            var $element = jQuery(selector);

            if ($element.length)
                replaceURLKeywords($element); // Call method to replace URL keywords
            else
                logError("Wrapper Element not found.");
        } else
            logError("jQuery not found.");
    }

}