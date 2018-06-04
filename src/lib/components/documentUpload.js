import reject from '../promiseHandler';
import normalizedLocator from '../common';
import q from 'q';

/**
 * returns a promise function which uploads the document for given locators
 * @param nemo : nemo object
 * @param filePath : file path relative to ../data/images/
 * @param dropzoneWaitLocator : locator for dropzone wait
 * @param dropzoneFileInputLocator : locator for dropzone File input locator
 * @param uploadSuccessLocator : locator for dropzone File upload success
 * @returns {Function}
 */
export default function docUpload(nemo, filePath, dropzoneWaitLocator, dropzoneFileInputLocator, uploadSuccessLocator) {
    return function () {
        var defer = q.defer();
        const waitLocator = normalizedLocator(nemo, dropzoneWaitLocator);
        const fileInputLocator = normalizedLocator(nemo, dropzoneFileInputLocator);
        const successLocator = normalizedLocator(nemo, uploadSuccessLocator);
        return nemo.view._waitVisible(waitLocator, 1500000)
            .then(function () {
                if (nemo.data.env !== 'development') {
                    var remote = require('selenium-webdriver/remote');
                    nemo.driver.setFileDetector(new remote.FileDetector());
                }
                return nemo.view._find(fileInputLocator)
                    .then(function (aa) {
                        aa.sendKeys(path.join(__dirname, '../data/images/' + filePath));
                    })
                    .then(function () {
                        return nemo.view._waitVisible(successLocator, 30000);
                    }, reject(defer, 'fileUploadSuccess'));
            }, reject(defer, 'dropzoneWait'));
    };
}