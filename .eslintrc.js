module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["airbnb", "airbnb/hooks"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // Indent with 4 spaces
        "indent": [2, 4],

        // Indent JSX with 4 spaces
        "react/jsx-indent": [2, 4],

        // Indent props with 4 spaces
        "react/jsx-indent-props": [2, 4],
        // Allow js as filename extension
        "react/jsx-filename-extension": [0],
        "import/extensions": "off",
        "semi": [2, "never"],
        "quotes": ["error", "single"],
        "jsx-quotes": ["error", "prefer-single"],
        "react/jsx-fragments": ["error", "element"],
        }
};
