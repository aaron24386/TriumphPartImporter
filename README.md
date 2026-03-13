## Triumph Part Importer (Chrome Extension)

Triumph Part Importer is a Chrome extension that helps you move parts from the Triumph dealer site into Lizzy with as little copy‑and‑paste as possible.

It reads basket information from `triumphonline.net`, shows it in a clean React UI inside the extension, and then lets you import that basket into a job on `lizzy.nizex.com`.

---

### Overview

**What it does**

- Reads your current basket on `triumphonline.net`.
- Stores the basket inside the extension so you can review it.
- Lets you import that basket into `lizzy.nizex.com` from the Job “Add Items” page.

**Who it’s for**

- Dealerships and users who:
  - Build baskets on `triumphonline.net`, and
  - Use `lizzy.nizex.com` to manage jobs and invoices.

> This project is not affiliated with Triumph or Lizzy. It’s a personal tool that automates a workflow many dealers already do manually.

---

### How it works (end‑to‑end workflow)

1. **On TriumphOnline**

   - Open `triumphonline.net` and log in.
   - Navigate to the **Manage Basket** page.
   - You’ll see a new **Export Basket** button added by the extension next to the name of the basket.
   - Click **Export Basket**.
   - The current baskets parts, quantites and descriptions are read and stored inside the extension, ready to be imported into Lizzy.

2. **On Lizzy**

   - Open `lizzy.nizex.com` and go to the relevant **Job**.
   - Open the **Add Items** page for that job.
   - Click the **Lizzy Importer** extension icon in your browser toolbar.
   - In the popup:
     - Select the basket you want to import.
     - Click **Import** to send the parts into Lizzy’s “Add Items” page.

3. **Review**

   - Review the imported parts in Lizzy.
   - Make any final adjustments in Lizzy before processing the job.

---

### Features

- **Basket export from TriumphOnline**
  - Custom **Export Basket** button added on the Manage Basket page.
  - Reads basket contents and stores them locally in the extension.

- **Reviewable popup UI**
  - React‑based popup UI to browse and select saved baskets.
  - Basic information for each part and basket is displayed before import.

- **Import into Lizzy**
  - From Lizzy’s Job → Add Items page, trigger the import from the extension popup.
  - Sends each part line into Lizzy as if it were entered manually.

- **In progress / planned**
  - Search bar in the popup to filter baskets by text.
  - Remove individual basket options.
  - Better state management for more reliable data handling.
  - Improved error handling for both export and import flows.
  - Settings page to:
    - Clear extension cache (all stored baskets).
  - Packaging for the Chrome Web Store once the workflow is stable.

---

### Project status

- **Status**: Work in progress, but actively used.
- **Real‑world usage**: Currently used by a small number of users, including a motorcycle dealership.
- Expect some rough edges, especially around error handling.

---

### Tech stack

- **Extension framework**: Chrome extension (Manifest V3) based on a Vite + Turborepo boilerplate.
- **UI**: React + TypeScript, Tailwind CSS.
- **Build tooling**: Vite, Turborepo, pnpm workspaces.

Key areas for this project:

- `pages/popup/`
  - Main popup React app that shows:
    - Header, search bar, basket list, and import actions.
  - Components like:
    - `SearchBar.tsx` – upcoming filtering for baskets.
    - `Basket.tsx`, `Part.tsx`, `Popup.tsx`, etc. – core UI for reviewing and importing parts.

- `pages/content/`
  - Content scripts that:
    - Run on `triumphonline.net` to extract basket information.
    - Run on `lizzy.nizex.com` to drive the import into the Add Items page.
  - Files like:
    - `part.ts` – part data types / helpers.
    - `importer.ts`, `exporter.ts` – logic for talking to each site.

---

### Requirements

- **Node**: `>= 22.12.0` (matches the boilerplate’s engine requirement).
- **Package manager**: `pnpm` (recommended and used by the repo).
- **Browser**: Google Chrome (development currently focused on Chrome; Firefox support is not a goal right now).

---

### Getting started (development)

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd TriumphPartImporter