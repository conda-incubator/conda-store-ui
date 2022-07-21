module.exports = {
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    transform: {
        "\\.[jt]sx?$": "babel-jest",
        ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
            "jest-transform-stub",
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{ts,tsx}",
    ],
    testEnvironment: "jsdom",
    moduleDirectories: ["node_modules", __dirname],
    modulePathIgnorePatterns: ["<rootDir>/lib/"],
    transformIgnorePatterns: [
        "node_modules/@mui/material/styles/useTheme/",
    ]
};
