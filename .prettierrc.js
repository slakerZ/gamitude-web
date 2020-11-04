module.exports = {
    importOrder: [
        "^@material-ui/(.*)$",
        "^redux/(.*)$",
        "^api/(.*)$",
        "^components/(.*)$",
        "^../../../constants",
        "^./types",
        "^./styles",
    ],
    importOrderSeparation: true,
    semi: true,
    trailingComma: "all",
    singleQuote: false,
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    endOfLine: "lf",
};
