# vvisp

Korean version: [README-ko.md](./README-ko.md)

[![CircleCI](https://circleci.com/gh/HAECHI-LABS/vvisp.svg?style=svg)](https://circleci.com/gh/HAECHI-LABS/vvisp)
[![Coverage Status](https://coveralls.io/repos/github/HAECHI-LABS/vvisp/badge.svg?branch=dev)](https://coveralls.io/github/HAECHI-LABS/vvisp?branch=dev)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

> The easiest smart contract development framework and command line interface on EVM based blockchain. 

**Simple and fast smart contract deployment and execution with a single command line**

###Key Benefits
 - Improving Environment of Blockchain Service Development
 - Reducing Operation Time of Blockchain Service Development 
 - Shortening the Learning Curve of Developers Who Are Not Familiar with Blockchain

## Table of Contents

- [Description](#description)
- [Install](#install)
- [Usage](#usage)
- [Commands](#commands)
- [Contributing](#contributing)
- [Architecture](#architecture)
- [Contact](#contact)
- [License](#license)

## Description
**CLI tool easy to use for developers who are not familiar with blockchain.**

: Smart contracts in the blockchain are uncommon development areas.
There are many things that developers are unfamiliar with DApp development.
Even if you create a contract by referring to several references, there is an entry barrier to learn how to deploy and how to use smart contracts.
`vvisp` is a command line interface (CLI) tool designed to reduce the learning curve.

**(1) Deploying a contract with a single line of command**

: Deploying smart contracts to a blockchain is very complex.
In order to deploy a contract, you must write your smart contract deployment codes as well as create smart contracts.
A developer needs to consider deploying multiple smart contracts in order for DApp.
`vvisp` defines deployment target as a simple configuration file and then deploys smart contracts by considering the dependencies automatically with a single line of command instead of hundreds lines of code.

**(2) Executing the contract function with one command line**

: Developers had to study the library, call the function, and manually write the function call code to execute the function of a contract.
This is a big entry barrier for developers who are unfamiliar with smart contract development.
However, `vvisp` is designed to execute a specific function of a contract with a single command line and to receive results without complex processes.

**(3) Supporting Upgradeable Smart Contract Framework**

: Additionally, `vvisp` supports USCF(Upgradeable Smart Contract Framework).
Even if developers do not have deep knowledge about upgradeability, they can easily use embedded upgradeable libraries at vvisp.
If you want more information about the Upgradeable Smart Contract Framework, you can take a look at the HAECHI-LABS [pdf file](https://drive.google.com/file/d/1H9gtmpiZ5zwIFwgHGOOvz9Oa8SAlpM5h/view?usp=sharing).

| **Contributors**: Please see the [Contributing](#contributing) section of this README. |
| --- |

## Install

Install [Node.js](http://nodejs.org/) first.
Then, install [npm](https://npmjs.com/) and
```sh
$ npm install --global @haechi-labs/vvisp
```
or install [yarn](https://yarnpkg.com) and
```sh
$ yarn global add @haechi-labs/vvisp
```

## Usage

If you want to see sample repository, see [here](https://github.com/HAECHI-LABS/vvisp-sample).

**1. Start your project**
```sh
$ mkdir my-project
$ cd my-project
$ vvisp init
```
You don't have to do `` $ npm init `` or ``$ truffle init``.
We supports environment for [truffle](https://truffleframework.com/truffle) and it will make `package.json` automatically.

_[See details](./packages/vvisp/commands/README.md#init)_ for ``$ vvisp init``.

**2. Make your Contracts at `contracts/`**

Now, you can use `abi-to-script`, `compile` and `flatten` commands.

**3. Set `vvisp-config.js` file**

Please set environment variables in `vvisp-config.js` file.
See [here](https://github.com/HAECHI-LABS/vvisp/blob/dev/CONFIGURATION.md#config) for more information about `vvisp-config.js`.
Now you can use `deploy-contract` command.

**4. Set `service.vvisp.json` file**

Please set information about your DApp service in `service.vvisp.json`.
See [here](https://github.com/HAECHI-LABS/vvisp/blob/dev/CONFIGURATION.md#service) for more information about `service.vvisp.json`.
Now you can use `deploy-service` command.

Please see [CONFIGURATION.md](./CONFIGURATION.md) to configure your project.

Run `$ vvisp --help` for more details about functions of `vvisp`.

## Commands

Please see linked documentation below:
- [init](./packages/vvisp/commands/README.md#init): Start your project
- [compile](./packages/vvisp/commands/README.md#compile): Compile solidity contract files
- [deploy-contract](./packages/vvisp/commands/README.md#deploy-contract): Deploy contract
- [deploy-service](./packages/vvisp/commands/README.md#deploy-service): Deploy service of your contracts
- [abi-to-script](./packages/vvisp/commands/README.md#abi-to-script): Generate javascript APIs interacting with smart contract on blockchain
- [console](./packages/vvisp/commands/README.md#console): Provides a console environment that can invoke contracts interactively
- [flatten](./packages/vvisp/commands/README.md#flatten): Flatten several contract files in one file



## Architecture

<p align="center"><img src="./images/[vvisp]logical-view.png" width="550px" height="300px"></p>

`vvisp` communicates with main-net, test-net through rpc, and helps to develop, upgrade, test, compile and control the user’s current version of the DApp service.
`vvisp` supports truffle test framework.



<p align="center"><img src="./images/[vvisp]module-view.png" width="630px" height="450px"></p>

- vvisp

  vvisp consists of vvisp-utils, vvisp and vvisp-contracts.

  - vvisp-utils

    vvisp-utils provides several useful functions for use with vvisp or vvisp-sample.

  - vvisp

    vvisp performs the core logic of vvisp.

  - vvisp-contracts

    vvisp-contracts is a library for developing smart contracts and enables them to be upgradable.

- vvisp-sample

  vvisp-sample is the boilerplate package generated by `vvisp init` command.

  - contractApis

    It is generated automatically by the `vvisp abi-to-script` command and provides a javascript library that allows you to easily execute deployed projects.

  - configuration

    These are the configuration files needed for vvisp to work and test such as `vvisp-config.js`, `service.vvisp.json`, `state.vvisp.json`

  - test

    These are test cases of user-written contracts.

  - contracts

    contracts consist of registry contract that is automatically generated by the `vvisp init` command and the contracts that the user write himself.



## Contributing

Thank you for considering to join this project!
We always welcome contributors :)

*Notes on project main branches:*
- `master`: Stable, released version
- `dev`: Work targeting stable release

To contribute, please see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Contact 

- General Contact: hello@haechi.io
- [Facebook](https://www.facebook.com/HAECHILABS/)
- [Medium](https://medium.com/haechi-labs)

## License

MIT
