module.exports = {
    "roots": [
        "./src"
    ],
    "transform": {
        "^.+\\.spec.ts?$": "ts-jest",
        "^.+\\.spec.tsx?$": "ts-jest"
    },
    "testResultsProcessor": "jest-sonar-reporter",
}