import { reject } from '../promiseHandler';
import { normalizedLocator } from '../common';
import _ from 'lodash';
import q from 'q';


/**
 * @method DocUpload
 * @description returns a promise function which uploads the document for given locators
 * @param {object} nemo nemo object
 * @param {string} filePath file path
 * @param {object|string} dropzoneWaitLocator a DOM locator for dropzone wait that can be <br>
                                              either location of locator in LOCATOR folder eg: 'policy.spinner'<br>
                                              OR can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}<br>
                                              OR can be locator string eg 'xpath://*[@name = "documentType"]'
 * @param {object|string} dropzoneFileInputLocator a DOM locator for dropzone File input that can be <br>
                                                   either location of locator in LOCATOR folder eg: 'policy.spinner'<br>
                                                   OR can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}<br>
                                                   OR can be locator string eg 'xpath://*[@name = "documentType"]'
 * @param {object|string} uploadSuccessLocator a DOM locator for dropzone File upload success that can be<br>
                                               either location of locator in LOCATOR folder eg: 'policy.spinner'<br>
                                               OR can be direct locator object eg: { "type": "css", "locator": "div.hasSpinner"}<br>
                                               OR can be locator string eg 'xpath://*[@name = "documentType"]'
 * @param {number} waitTime waitTime in milliseconds by default it's 3000
 * @returns {Function} function wrapped around Promise
 */
export default function docUpload(nemo, filePath, dropzoneWaitLocator, dropzoneFileInputLocator, uploadSuccessLocator, waitTime) {
    waitTime = waitTime || _.get(nemo, 'data.waitTime', 3000);
    return function () {
        var defer = q.defer();
        const waitLocator = normalizedLocator(nemo, dropzoneWaitLocator);
        const fileInputLocator = normalizedLocator(nemo, dropzoneFileInputLocator);
        const successLocator = normalizedLocator(nemo, uploadSuccessLocator);
        return nemo.view._waitVisible(waitLocator, waitTime)
            .then(function () {
                if (nemo.data.env !== 'development') {
                    var remote = require('selenium-webdriver/remote');
                    nemo.driver.setFileDetector(new remote.FileDetector());
                }
                return nemo.view._find(fileInputLocator)
                    .then(function (aa) {
                        aa.sendKeys(path.join(filePath));
                    })
                    .then(function () {
                        return nemo.view._waitVisible(successLocator, waitTime);
                    }, reject(defer, 'fileUploadSuccess'));
            }, reject(defer, 'dropzoneWait'));
    };
}