import { resolve, reject } from '../promiseHandler';
import { normalizedLocator } from '../common';
import q from 'q';
import _ from 'lodash';

/**
 * @method elementClick
 * @description returns a promise function which waits for the element and then trigger it's click
 * @param {object} nemo nemo object
 * @param {object|string} elementLocator  a DOM locator that can be either string with location of nemo-view object in LOCATOR folder eg: 'policy.spinner'<br>
                             OR can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}<br>
                             OR can be locator string eg 'xpath://*[@name = "documentType"]'
 * @param {boolean} preCondition defaults to true.
 * @param {number} waitTime waitTime in milliseconds by default it's 20000
 * @returns {Function}
 */
export default function elementClick({ nemo, elementLocator, preCondition, waitTime } = {}) {
  preCondition = !(preCondition === false);
  waitTime = waitTime || _.get(nemo, 'data.waitTime', 20000);
  return function() {
    let locator;
    try {
      locator = normalizedLocator(nemo, elementLocator);
    }
    catch (ex) {
      reject(defer, elementLocator);
    }
    var defer = q.defer();
    if (!preCondition) {
      return resolve(defer)();
    }
    return nemo.view._waitVisible(locator, waitTime).then(function() {
      return nemo.view._find(locator).click();
    }, reject(defer, `click failed ${elementLocator}`));
  };
}
