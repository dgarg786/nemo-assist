import {resolve,reject} from '../promiseHandler';
import {normalizedLocator} from '../common';
import q from 'q';


/**
 * @method textInputEnter
 * @description returns a promise function which waits for the TextInput and then enters the required text
 * @param {object} nemo nemo object
 * @param {string} optionToEnter Text to enter in TextInput
 * @param {object|string} textInputLocator  a DOM locator that can be either location of locator in LOCATOR folder eg: 'policy.spinner'<br>
                             OR can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}<br>
                             OR can be locator string eg 'xpath://*[@name = "documentType"]'
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