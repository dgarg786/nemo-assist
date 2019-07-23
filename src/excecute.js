const defaultLegoList = require('./default_legos');
const baseDirPath = require('./constants/baseDirPath');
const configuredLegoList = require(`${baseDirPath}/legos/index.js`);
const delimiter = '##';

function executeLego(nemo, legoConfig = {}) {
    return function(resolvedObject = {}) {
        if (!legoConfig.executor) {
            return Promise.resolve();
        }
        let extendedConfig = Object.assign({}, legoConfig.params, { resolvedObject, nemo });
        if (typeof legoConfig.executor === 'function') {
            return legoConfig.executor(extendedConfig)();
        }

        const templateLit = param => {
            return eval('`' + param + '`');
        };

        Object.keys(extendedConfig).forEach(function(key) {
            if (typeof extendedConfig[key] === 'string') {
                extendedConfig[key] = templateLit(extendedConfig[key]);
            }
        });

        console.log("Started Executing", legoConfig.label || legoConfig.name, ' for lego Type', legoConfig.executor);

        const legoExecutorList = { ...defaultLegoList, ...(configuredLegoList || {}) };
        return legoExecutorList[legoConfig.executor](extendedConfig)();
    };
}

function executeBlock(nemo, blockConfig = {}) {
    return function(resolvedObject = {}) {
        if (!blockConfig.workFlow) {
            return Promise.resolve();
        }
        const params = blockConfig.params;
        const blockWorkFlow = blockConfig.workFlow;

        Object.keys(params).forEach(param => {
            let name = param.split(delimiter)[0];
            let childParamKey = param
                .split(delimiter)
                .splice(1)
                .join(delimiter);
            let childValue = params[param];
            blockWorkFlow
                .filter(config => config.label === name)
                .forEach(config => {
                    config.params[childParamKey] = childValue;
                });
        });
        return executeProcessor(nemo, blockWorkFlow, resolvedObject);
    };
}

function executeProcessor(nemo, executeFlow, resolvedObject = {}) {
    if (!executeFlow) {
        return 'INVALID_FLOW';
    }
    const flowConfig = Array.isArray(executeFlow) ? executeFlow : [executeFlow];
    return flowConfig.reduce((previous, current) => {
        if (current.type == 'lego') {
            return previous.then(executeLego(nemo, current));
        }
        return previous.then(executeBlock(nemo, current));
    }, Promise.resolve(resolvedObject));
}

module.exports = executeProcessor;
