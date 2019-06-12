const executeProcess = require('../excecute');
const has = require('lodash/has');
describe('', function() {
  it('should show a signup form for payment processor', async function() {
    let nemo = this.nemo;
      if (has(this, '_runnable.title')) {
          this._runnable.title = nemo.data.name;
      }
    await executeProcess(nemo, nemo.data.workFlow);
  });
});