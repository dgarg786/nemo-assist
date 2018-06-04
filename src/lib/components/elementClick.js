import resolve from '../promiseHandler';
import reject from '../promiseHandler';
import normalizedLocator from '../common';
import q from 'q';


/**
 * returns a promise function which waits for the element and then trigger it's click
 * @param nemo : nemo object
 * @param elementLocator : locator which can be location of locator in LOCATOR folder eg: 'policy.spinner' OR
 *                         can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}  OR
 *                         can be locator string eg 'xpath://*[@name = "documentType"]'
 * @param preCondition :  boolean, if false it will directy resolve without clicking.By default it's true
 * @returns {Function}
 */
export default function elementClick (nemo, elementLocator, preCondition) {
    preCondition = (arguments.length >= 3) ? preCondition : true;
    return function () {
        const locator = normalizedLocator(nemo, elementLocator);
        var defer = q.defer();
        if (arguments.length >= 2 && !preCondition) {
            return resolve(defer)();
        }
        return nemo.view._waitVisible(locator, 30000)
            .then(function () {
                return nemo.view._find(locator).click();
            }, reject(defer, `click failed ${elementLocator}`));
    };
}