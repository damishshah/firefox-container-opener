Container Tab Opener

A lightweight Firefox extension that opens the same website in multiple Firefox Container Tabs.

Enter a URL, choose how many containers you want, and click Open Container Tabs. The extension creates or reuses containers named Script Container 1, Script Container 2, and so on, then opens the requested website in each container.

Each Firefox container has its own cookie/session storage, allowing the website to maintain a separate session in each container.

Features

Open a website in multiple Firefox containers at once

Choose between 1 and 100 tabs

Automatically adds https:// when a protocol isn't provided

Creates containers automatically when needed

Reuses existing Script Container N containers

Remembers your last URL and tab count

Uses different Firefox container colors for easier identification

No external services or dependencies

Requirements

Mozilla Firefox

A desktop installation of Firefox with support for Multi-Account Containers

No Node.js, npm, Python, or other development tools are required

Project Structure

The extension consists of four files:

firefox-container-opener/
├── manifest.json
├── popup.html
├── popup.js
└── README.md

Running Locally
1. Clone the repository

After uploading this project to GitHub, clone it locally:

git clone https://github.com/YOUR-USERNAME/firefox-container-opener.git
cd firefox-container-opener


Replace YOUR-USERNAME with your GitHub username.

Alternatively, you can download the repository as a ZIP file and extract it.

2. Load the extension in Firefox

Open the following page in Firefox:

about:debugging#/runtime/this-firefox


Click:

Load Temporary Add-on...

Navigate to the project directory and select:

manifest.json


The extension should now appear under Temporary Extensions.

Note: Temporary extensions are intended for development and testing. Firefox removes the temporary extension when Firefox is restarted.

3. Pin the extension

Click Firefox's Extensions button (the puzzle-piece icon).

Find Container Tab Opener and pin it to the toolbar.

You can now click the extension icon whenever you want to open a website in multiple containers.

Using the Extension

Click the Container Tab Opener icon in the Firefox toolbar.

Enter a website URL.

Enter the number of tabs/containers you want to open.

Click Open Container Tabs.

For example:

Website:
https://example.com

Number of tabs:
5


The extension will create or reuse:

Script Container 1
Script Container 2
Script Container 3
Script Container 4
Script Container 5


and open:

Script Container 1 → example.com
Script Container 2 → example.com
Script Container 3 → example.com
Script Container 4 → example.com
Script Container 5 → example.com

Container Reuse

The extension intentionally reuses containers instead of creating new ones every time.

For example:

First run:
20 tabs → Containers 1–20

Second run:
10 tabs → Containers 1–10

Third run:
30 tabs → Containers 1–30


The third run creates only the containers that don't already exist.

This prevents repeated use of the extension from creating hundreds of duplicate containers.

Separate Sessions

Firefox containers maintain separate cookie stores.

For example, you could have:

Script Container 1 → Account A
Script Container 2 → Account B
Script Container 3 → Account C


The website can maintain a different login/session in each container.

The extension itself does not manage usernames, passwords, or website accounts. Authentication is handled by the website and Firefox's container storage.

URL Handling

You can enter either a complete URL:

https://example.com


or simply:

example.com


If http:// or https:// isn't provided, the extension automatically uses:

https://


Only http:// and https:// URLs are accepted.

Configuration

The default maximum is 100 containers per operation.

The default number of tabs is:

5


The extension remembers the last URL and number of tabs using Firefox's local extension storage.

Permissions

The extension requests the following Firefox permissions:

Permission	Purpose
contextualIdentities	Create and access Firefox containers
cookies	Work with container-specific cookie stores
tabs	Create tabs and assign them to containers
storage	Remember the last URL and tab count

These permissions are required for the extension's functionality.

Development

There are no build steps.

After changing a file, return to:

about:debugging#/runtime/this-firefox


Find Container Tab Opener under Temporary Extensions and click Reload.

Then open the extension again to test your changes.

Making Changes

The main files are:

manifest.json — Extension metadata, permissions, and Firefox configuration

popup.html — User interface

popup.js — URL validation, container creation, tab creation, and saved settings

README.md — Project documentation

Known Limitation

This project currently uses Firefox's Temporary Extension installation method.

That means the extension is intended for local development/testing and must be loaded again after Firefox restarts.

A future release could package the extension as a signed .xpi and distribute it through Mozilla's extension ecosystem for a persistent installation.

License

Add your preferred license here.

For example:

MIT License


If you use the MIT License, add a LICENSE file containing the standard MIT license text.

Contributing

Contributions and improvements are welcome.

To contribute:

Fork the repository.

Create a branch for your change.

Make and test your changes in Firefox.

Commit your changes.

Open a pull request.

Disclaimer

This extension is provided as-is for personal use and development. Website behavior, login/session handling, and container compatibility ultimately depend on Firefox and the websites being accessed.
