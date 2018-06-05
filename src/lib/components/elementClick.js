import {resolve,reject} from '../promiseHandler';
import {normalizedLocator} from '../common';
import q from 'q';


/**
 * @method elementClick
 * @description returns a promise function which waits for the element and then trigger it's click
 * @param {object} nemo nemo object
 * @param {object|string} elementLocator  a DOM locator that can be either location of locator in LOCATOR folder eg: 'policy.spinner'<br>
                             OR can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}<br>
                             OR can be locator string eg 'xpath://*[@name = "documentType"]'
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