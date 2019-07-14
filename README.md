# Manguru Frontend
[![Build Status](https://travis-ci.org/lheydel/manguru-front.svg?branch=master)](https://travis-ci.org/lheydel/manguru-front) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lheydel_manguru-front&metric=alert_status)](https://sonarcloud.io/dashboard?id=lheydel_manguru-front)

This repository handles the frontend of the web platform [Manguru](TODO) ([Github](https://github.com/lheydel/manguru)).\
It provides a user interface with ReactJS and Redux.

# Table of contents
 - [Pre-reqs](#pre-reqs)
 - [Getting started](#getting-started)
    - [Running in dev mode](##running-in-dev-mode)
- [Tools](#tools)
    - [Language and framework](##language-and-framework)
    - [Tests](##tests)
    - [Continuous integration](##continuous-integration)
    - [Code analysis](##code-analysis)
 - [Development rules](#development-rules)
    - [Basic rules](##basic-rules)

# Pre-reqs
To build and run this app locally, you will to install [Node.js](https://nodejs.org/en/)

> **/!\ Important /!\\** - Be sure to read the [Development rules](#development-rules) part before doing any update on the project resources!

# Getting started
> **Note** - To run the tests, please refer to the [associated](##tests) part.

Please ensure that Docker is running on your computer before doing anything.
 
## Running in dev mode
 - Clone the repository
```
git clone --depth=1 https://github.com/lheydel/manguru-front.git manguru-front
```
 - Install dependencies
```
cd manguru-front
npm install
```
 - Build and run the project
```
npm start
```

---
When the app is running, you can access it at http://localhost:3000.

> **Note** - In dev mode, the app is refreshing itself each time a typescript source file is updated, so you don't need to restart it over and over.

# Tools
This part is mainly informative and quickly describes the main tools and technologies used in this project.

## Language and framework
As the goal of manguru-front is to provide a smooth web user interface, it uses [ReactJS](https://reactjs.org/) for its high efficiency and adaptability, coupled with [Redux](https://redux.js.org/) to easily manage the global state of the app.

Also, for a better code structure and development efficiency, [Typescript](https://www.typescriptlang.org/) is installed and configured for all the parts of the project.

## Tests
The test runner used in this project is called [Jest](https://jestjs.io/). It manages unit, integration and end-to-end tests and works well with asynchroneous operations.

The React components are testing via [Enzyme](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme) wich provides utility functions to render them in a test environment.

To run the tests, use the command line `npm test`. It will run jest in watch mode and generate the test coverage stats.

## Code analysis
To improve and maintain the global quality of the source code, this project uses a static code analysis tool named [Sonarqube](https://www.sonarqube.org/), which scan the project and detect code smells and security issues. It also get the test coverage stats from Jest.

## Continuous integration
This project is configured to trigger a build on [Travis CI](https://travis-ci.org/) each time a push is done on this Github repository. 

Each Travis build runs the test suite with Jest and scan the project with Sonarqube.

Also, for some branches, it builds a Docker image and push it on a private Docker repository. This image will then be used as part of the deployment of the entire platform.

# Development rules
Here are the rules you must follow if you want to make any code change on this project. Any modification that does not respect those rules will be rejected.

## Basic rules
In order to maintain a good overall quality, every update must be supported by relevant tests and have a good evaluation on Sonarqube.\
Also, please respect the general structure of the project to avoid any confusion. You can read [this](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1) to have a better understanding of the React components structure.

