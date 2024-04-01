module.exports = {
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    transform: {
        "\\.[jt]sx?$": "babel-jest",
        ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
            "jest-transform-stub"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{ts,tsx}",
        "!<rootDir>/src/*",
        "!<rootDir>/src/common/**",
        "!<rootDir>/src/layouts/**",
        "!<rootDir>/src/store/**",
        "!<rootDir>/src/features/**/*.ts",// ignore rtk query files
        "!<rootDir>/src/**/*.stories.{ts,tsx}", // ignore storybook files,
	"!<rootDir>/src/**/*.stories.{ts,tsx}",
    ],
    moduleDirectories: ["node_modules", __dirname],
    modulePathIgnorePatterns: ["<rootDir>/lib/"],
    transformIgnorePatterns: [
        "node_modules/@mui/material/styles/useTheme/",
    ],
    setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/setupTests.ts"],
    testTimeout: 10000
};
