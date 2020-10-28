module.exports = {
    // Parse TSX
    parser: "@typescript-eslint/parser",
    parserOptions: {
        // Parse modern JS
        ecmaVersion: 2020,
        // Allows for the use of imports
        sourceType: "module",
        // Parsing JSX
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        // Must be the last one
        "plugin:prettier/recommended",
    ],
    rules: {
        "sort-imports": "off",
        "import/order": "off",
        "no-console": "error",
        "linebreak-style": "linux",
    },
};
