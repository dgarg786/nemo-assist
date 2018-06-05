import { resolve, reject } from '../promiseHandler';
import { normalizedLocator } from '../common';
import q from 'q';
import _ from 'lodash';

/**
 * @method textInputEnter
 * @description returns a promise function which waits for the TextInput and then enters the required text
 * @param {object} nemo nemo object
 * @param {string} optionToEnter Text to enter in TextInput
 * @param {object|string} textInputLocator  a DOM locator that can be either string with location of nemo-view object in LOCATOR folder eg: 'policy.spinner'<br>
                             OR can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}<br>
                             OR can be locator string eg 'xpath://*[@name = "documentType"]'
 * @param {number} waitTime waitTime in milliseconds by default it's 20000
 * @returns {Function}
 */
export default function textInputEnter(nemo, optionToEnter, textInputLocator, waitTime) {
    waitTime = waitTime || _.get(nemo, 'data.waitTime', 20000);
    return function () {
        const locator = normalizedLocator(nemo, textInputLocator);
        const defer = q.defer();
        if (!optionToEnter || !locator) {
            return resolve(defer)();
        }
        return nemo.view._waitVisible(locator, waitTime)
            .then(function () {
                return nemo.view._find(locator).clear()
                    .then(function () {
                        return nemo.view._find(locator).sendKeys(optionToEnter);
                    }, reject(defer, `${textInputLocator}Clear`));
            }, reject(defer, `can't type in ${textInputLocator}`));
    };
}