# Botium Connector for Ubitec Bot Framework

[![NPM](https://nodei.co/npm/botium-connector-ubitec.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/botium-connector-ubitec/)

[![Codeship Status for codeforequity-at/botium-connector-ubitec](https://app.codeship.com/projects/69e80810-6c83-0138-fc87-523c19412751/status?branch=master)](https://app.codeship.com/projects/394685)
[![npm version](https://badge.fury.io/js/botium-connector-ubitec.svg)](https://badge.fury.io/js/botium-connector-ubitec)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()


This is a [Botium](https://www.botium.ai) connector for testing your Ubitec Bot Framework chatbot.

__Did you read the [Botium in a Nutshell](https://medium.com/@floriantreml/botium-in-a-nutshell-part-1-overview-f8d0ceaf8fb4) articles? Be warned, without prior knowledge of Botium you won't be able to properly use this library!__

## How it works
Botium connects to the API of your Ubitec Bot Framework chatbot.

It can be used as any other Botium connector with all Botium Stack components:
* [Botium CLI](https://github.com/codeforequity-at/botium-cli/)
* [Botium Bindings](https://github.com/codeforequity-at/botium-bindings/)
* [Botium Box](https://www.botium.ai)

## Requirements
* **Node.js and NPM**
* a **Ubitec bot**
* a **project directory** on your workstation to hold test cases and Botium configuration

## Install Botium and Ubitec Bot Framework Connector

When using __Botium CLI__:

```
> npm install -g botium-cli
> npm install -g botium-connector-ubitec
> botium-cli init
> botium-cli run
```

When using __Botium Bindings__:

```
> npm install -g botium-bindings
> npm install -g botium-connector-ubitec
> botium-bindings init mocha
> npm install && npm run mocha
```

When using __Botium Box__:

_Already integrated into Botium Box, no setup required_

## Connecting Ubitec Bot Framework chatbot to Botium

Process is very simple, you have to know just the endpoint URL and Basic Authentication credentials for your chatbot.
  
Create a botium.json with this URL in your project directory: 

```
{
  "botium": {
    "Capabilities": {
      "PROJECTNAME": "<whatever>",
      "CONTAINERMODE": "ubitec",
      "UBITEC_URL": "..."
    }
  }
}
```

To check the configuration, run the emulator (Botium CLI required) to bring up a chat interface in your terminal window:

```
> botium-cli emulator
```

Botium setup is ready, you can begin to write your [BotiumScript](https://github.com/codeforequity-at/botium-core/wiki/Botium-Scripting) files.

## How to start samples

There is a sample available in [samples](./samples) with Botium Bindings.

* Adapt botium.json in the sample directory if required (change URL)
* Install packages, run the test

```
> cd ./samples
> npm install && npm test
```

## Supported Capabilities

Set the capability __CONTAINERMODE__ to __ubitec__ to activate this connector.

### UBITEC_URL
Path of the Botium Consumer endpoint

### UBITEC_USER
Username for Basic Authentication

### UBITEC_PASSWORD
Password for Basic Authentication
