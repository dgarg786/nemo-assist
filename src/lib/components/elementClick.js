import { resolve, reject } from '../promiseHandler';
import { normalizedLocator } from '../common';
import q from 'q';
import _ from 'lodash';


/**
 * @method elementClick
 * @description returns a promise function which waits for the element and then trigger it's click
 * @param {object} nemo nemo object
 * @param {object|string} elementLocator  a DOM locator that can be either location of locator in LOCATOR folder eg: 'policy.spinner'<br>
                             OR can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}<br>
                             OR can be locator string eg 'xpath://*[@name = "documentType"]'
 * @param {number} waitTime waitTime in milliseconds by default it's 3000
 * @returns {Function}
 */
export default function elementClick (nemo, elementLocator, preCondition, waitTime) {
    preCondition = (arguments.length >= 3) ? preCondition : true;
    waitTime = waitTime || _.get(nemo, 'data.waitTime', 3000);
    return function () {
        const locator = normalizedLocator(nemo, elementLocator);
        var defer = q.defer();
        if (!preCondition) {
            return resolve(defer)();
        }
        return nemo.view._waitVisible(locator, waitTime)
            .then(function () {
                return nemo.view._find(locator).click();
            }, reject(defer, `click failed ${elementLocator}`));
    };
}