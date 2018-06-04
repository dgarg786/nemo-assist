import _ from 'lodash';


/**
 * normalizes the locator that can be understood by nemo
 * @param nemo : nemo object
 * @param locator : can be location of locator in LOCATOR folder eg: 'policy.spinner' OR
 *                  can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}  OR
 *                  can be locator string eg 'xpath://*[@name = "documentType"]'
 * @returns {*} normalized locator that can be understood by nemo
 */
function normalizedLocator(nemo, locator) {
    if (typeof locator === 'object') {
        return locator;
    } else if (typeof locator === 'string' && locator.indexOf(':') > -1) {
        return locator;
    } else if (typeof locator === 'string') {
        return _.get(nemo, `view.${locator}By`, () => {})();
    }
}

/**
 * Returns a promise function that will wait till the element is present in the DOM and resolves on element getting vanished
 * @param nemo : nemo object
 * @param componentLocator : can be location of locator in LOCATOR folder eg: 'policy.spinner' OR
 *                           can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}  OR
 *                           can be locator string eg 'xpath://*[@name = "documentType"]'
 * @returns {Function}
 */
function waitTillPresent(nemo, componentLocator) {
    return function () {
        const locator = normalizedLocator(nemo, componentLocator);
        return nemo.driver.wait(function() {
            return nemo.view._finds(locator)
                .then(function(elements) {
                    if (elements.length === 0) {
                        return true;
                    }
                    return false;
                });
        }, 30000, `${componentLocator} wait failed`);
    };
}

module.exports = {
    normalizedLocator: normalizedLocator,
    waitTillPresent: waitTillPresent
};