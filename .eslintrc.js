module.exports = {
    extends: 'consumerweb/react', // if react is used, otherwise remove it
    rules: {

        // by default underscore is restricted (see .eslintrc in app root directory),
        // but we want it here since Backbone requires it
        'no-restricted-modules': 'off',
        'no-restricted-imports': 'off',
        // by default no-console is warning, we want it as error
        'no-console': 'error',

        // may want to change eventually
        'no-var': 'off',
        'react/jsx-indent-props': 'off', // ['error', 'tab']
        'prefer-const': 'off', // 'error'
        'one-var': 'off', // ['error', 'never'],
        'arrow-body-style': 'off', // ['error', 'as-needed']
        'no-fallthrough': 'off',
        // do not force comma-dangle
        'comma-dangle': ['error', 'never'], // 'comma-dangle': ['error', 'always-multiline']
        // max-params
        'max-params': ['error', 8], // ['error', 5]


        // fight these battles another day
        'consumerweb/param-names': 'off',
        'no-param-reassign': 'off', // usually you want default params here
        'object-shorthand': 'off',
        'quote-props': 'off',
        'consumerweb/no-cjs': 'off',
        'consumerweb/no-indexof': 'off',
        'consistent-return': 'off',
        'no-return-assign': 'off',
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
        'strict': 'warn',
        'indent': [2, 4, {"SwitchCase": 1}],
        'no-unused-vars' : 'off',
        'default-case': 1,
        'callback-return': 1,
        'radix': 1,
        'no-shadow': 1,
        'new-cap': 1,
        'no-sync': 1,
        'no-path-concat': 1,
        'no-use-before-define': 1,
        'no-eq-null': 1,
        'no-undef': 1,

        'consumerweb/jsx-no-inline-content': 'warn',
        'no-sequences': 'warn',

        // force no semicolons
        // 'semi': ['error', 'never'],
        'no-unexpected-multiline': 'error',
        'no-unused-expressions': 1,
        'handle-callback-err': 1,

        'import/no-unresolved': 'off'
    }
};

