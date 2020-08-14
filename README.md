# koji-dev-tools

This project aims to make debugging and working locally easier for your Koji templates.

## Features

- Remix mode toggle
- VCC value explorer with live updates
- Logs of postMessage communication between windows
- Simulated VCC interactions
- Screenshot (BETA)

## Roadmap

- Simulate IAP flow
- Simulate Feed Debug
- Automatic warnings about misconfigured entitlements
- Support for displaying objects/arrays in VCC simulator

## Prerequisites

You will need to have Python and pip installed in order to use the automated scripts and screenshot tools.

## Installation

Clone this repo, and run `yarn install-all` to install the packages

## Usage

To run this project locally, simply `yarn start`

This project depends on the initial config state of the template. Right after calling `instantRemixing.ready()`, add the following snippet to post the configuration to
koji-dev-tools:

```
// Post the vccValues to koji-dev-tools
window.parent.postMessage({
	vccValues: instantRemixing.get([]),
}, '*');
```