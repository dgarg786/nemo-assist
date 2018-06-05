import { resolve, reject } from '../promiseHandler';
import { normalizedLocator } from '../common';
import q from 'q';
import _ from 'lodash';

/**
 * @method selectDropdownOption
 * @description returns a promise function which waits for the selectDropdown and then chooses an option from the dropDown, it supports both kepler and non-kepler support
 * @param {object} nemo nemo object
 * @param {string} optionToSelect key of the section that needs to be selected
 * @param {object|string} dropDownLocator  a DOM locator that can be either string with location of nemo-view object in LOCATOR folder eg: 'policy.spinner'<br>
                             OR can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}<br>
                             OR can be locator string eg 'xpath://*[@name = "documentType"]'
 * @param {boolean} isKepler boolean for the selectDropDown being kepler
 * @param {number} waitTime waitTime in milliseconds by default it's 20000
 * @returns {Function}
 */
export default function selectDropdownOption(nemo, optionToSelect, dropDownLocator, isKepler, waitTime) {
    waitTime = waitTime || _.get(nemo, 'data.waitTime', 20000);
    return function () {
        const locator = normalizedLocator(nemo, dropDownLocator);
        const defer = q.defer();
        if (!optionToSelect || !locator) {
            return resolve(defer)();
        }
        return nemo.view._waitVisible(locator, waitTime)
            .then(function () {
                if (isKepler) {
                    const webElement = nemo.view._find(locator);
                    return webElement.click()
                        .then(function () {
                            let path = `xpath:(//*[starts-with(@id, '${optionToSelect}')])`; // kepler sets id as 'value-x' (x is index of option)
                            return nemo.view._find(path, webElement).click();
                        }, reject(defer, `keplerSelect Click ${dropDownLocator}`));
                }
                return nemo.view._optionValue(locator, optionToSelect);
            }, reject(defer, `can't select in ${dropDownLocator}`));
    };
}
