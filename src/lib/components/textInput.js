import resolve from '../promiseHandler';
import reject from '../promiseHandler';
import normalizedLocator from '../common';
import q from 'q';


/**
 * returns a promise function which waits for the TextInput and then enters the required text
 * @param nemo : nemo object
 * @param optionToEnter : Text to enter in TextInput
 * @param textInputLocator : locator which can be location of locator in LOCATOR folder eg: 'policy.spinner' OR
 *                           can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}  OR
 *                           can be locator string eg 'xpath://*[@name = "documentType"]'
 * @returns {Function}
 */
export default function textInputEnter(nemo, optionToEnter, textInputLocator) {
    return function () {
        const locator = normalizedLocator(nemo, textInputLocator);
        const defer = q.defer();
        if (!optionToEnter || !locator) {
            return resolve(defer)();
        }
        return nemo.view._waitVisible(locator, 30000)
            .then(function () {
                return nemo.view._find(locator).clear()
                    .then(function () {
                        return nemo.view._find(locator).sendKeys(optionToEnter);
                    }, reject(defer, `${textInputLocator}Clear`));
            }, reject(defer, `can't type in ${textInputLocator}`));
    };
}