# Privacy Policy — Hide Google AI (Managed Fork)

**Effective date:** August 25, 2026

This extension is an internal fork of the open-source project [hide-google-ai](https://github.com/asahisuenaga/hide-google-ai) by Asahi Suenaga (MIT License), modified and distributed by Francophone Charter School of Oakland for installation on school-managed Chrome browsers only.

## What this extension does

It hides the AI Mode entry point and AI-generated Overviews on Google Search results pages by applying CSS and DOM changes to specific, known elements on those pages. It makes no other changes to any page.

## Data collection

This extension does not collect, store, transmit, or share any user data. Specifically:

- **No storage.** The extension does not request the `storage` permission and does not read or write anything to Chrome sync storage, local storage, cookies, or any other persistence mechanism.
- **No network activity of its own.** The extension makes no network requests, includes no analytics, telemetry, advertising, or crash-reporting code of any kind.
- **No content is read out.** The content script only checks for the presence of a small, fixed set of known search-results page elements in order to hide them. Nothing about the page — search queries, results, or any other content — is copied, logged, transmitted, or retained anywhere.

## Permissions explained

- **Host permissions on Google Search domains** (`google.com`, `google.co.uk`, `google.de`, and other Google country domains): required only so the extension's content script can run on whichever Google Search domain the browser happens to load, in order to apply the display rule described above. No data from these pages is extracted or sent anywhere.

## Third-party sharing

None. No data is collected, so none is shared.

## Changes to this policy

Because this extension is distributed internally rather than through a public listing with its own release notes, any changes to this policy will be reflected directly in this file and in this repository's version history.

## Contact

Questions about this extension or its data practices can be directed to Francophone Charter School of Oakland IT.

---

Based on the open-source project [hide-google-ai](https://github.com/asahisuenaga/hide-google-ai), MIT License, Copyright (c) 2025 Asahi Suenaga. See `LICENSE` in this repository.
