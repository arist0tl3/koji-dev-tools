# koji-dev-tools

This project aims to make debugging and working locally easier for your Koji templates.

## Features

- Remix mode toggle
- VCC value explorer with live updates
- Logs of postMessage communication between windows
- Simulated VCC interactions

## Installation

Clone this repo, and run `yarn` to install the packages

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