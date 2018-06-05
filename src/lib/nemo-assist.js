import textInputEnter from './components/textInput';
import selectDropdownOption from './components/selectDropDown';
import elementClick from './components/elementClick';
import documentUpload from './components/documentUpload';
import { normalizedLocator, waitTillVanish } from './common';

module.exports = {
    textInputEnter: textInputEnter,
    selectDropdownOption: selectDropdownOption,
    elementClick: elementClick,
    documentUpload: documentUpload,
    normalizedLocator: normalizedLocator,
    waitTillVanish: waitTillVanish
};