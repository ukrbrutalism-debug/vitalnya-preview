# Vital’nya — temporary GitHub Pages preview

This is the **review** copy of the Vital’nya website for the organization to approve before launch. It is separate from vitalnya.nl.

## Contents

- `index.html` — illustrated homepage and seven-chapter storybook
- `programma.html` — interactive November programme (sample timetable)
- `doe-mee.html` — participation/volunteer preview
- `contact.html` — contact information and form design preview
- `bedankt.html` — confirmation page layout preview (not linked from active forms)
- `assets/` — illustration and logo files
- `data/november-programme.json` — source data reference (editing it alone does not update the rendered timetable)

## Easiest way to publish with GitHub Pages

1. Sign in to https://github.com and create a **new repository** named `vitalnya-preview`. Choose Public if your plan requires it for GitHub Pages; do **not** initialize with a README, .gitignore or license (the website already includes a README).
2. Download and extract the ZIP from ChatGPT on your computer.
3. On the new, empty repository page, select **uploading an existing file**. Drag **all files and folders INSIDE** `Vitalnya_GitHub_Pages_REVIEW/` into the upload area. `index.html` MUST be at the root of the repository, not inside a nested folder.
4. Choose **Commit changes**.
5. Open repository **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, choose **main** and **/(root)**, then click **Save**.
6. After the Pages deployment reports success, share the link: `https://YOUR-GITHUB-USERNAME.github.io/vitalnya-preview/`.
7. Test the homepage, the seven chapters and page-flip animation, Programma filters/popups, joining/contact pages, and mobile navigation.

Reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Important safeguards

- GitHub Pages sites are public even when the repository may be private under certain plans. **Anyone with the URL can view the preview.** The robots directives request no indexing but do not protect it with a password.
- Contact and volunteer forms are disabled on purpose: GitHub Pages is static hosting and cannot process Netlify form submissions.
- Real donation buttons redirect to the participation section during review, rather than opening payment checkout.
- Do not enter personal details in the disabled fields. Direct email links are active.
- The November timetable is a sample; dates and recurring activities must be reconfirmed.
- The illustrations are artistic interpretations. Historical details, privacy text, donation destination and programme must be approved before launch.
- This package is intended for temporary review, not production deployment.

## Update the preview

Replace the changed files in the same GitHub repository and commit. GitHub Pages will publish the new version automatically.

## Going live later

Use the original V16 production package as a baseline for deploying on a hosting service with real form processing, or configure an appropriate form provider for your production host. Do not simply turn the preview forms back on under GitHub Pages: submissions would still not be received.
