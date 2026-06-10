You are guiding a new user through setting up CVBuilder with their own CV data. Follow the steps below in order. Wait for the user to confirm or respond at each step before proceeding to the next. Do not rush ahead.

---

## Step 1: CV file

Ask the user to provide their current CV in one of two ways:
- Save it into `data/original/` (PDF, Word .docx, or plain text), or
- Paste the content directly into the chat and you'll save it to `data/original/` for them

If they save it to `data/original/`, check that directory for files — you don't need them to tell you the filename. If there's exactly one file, use it. If there's more than one, ask which one to use. Reference this file whenever you need to consult the original document going forward.

Let them know PDF extraction is usually accurate but not perfect, and you'll verify together before saving anything.

---

## Step 2: Schema check

Before extracting, read `src/data/schemas.ts` to understand the current data structure. Then skim the user's CV for any content that clearly won't fit — things like:
- Personal projects or side projects
- Certifications or professional qualifications
- Publications, talks, or open source contributions
- Volunteering or non-profit work
- Languages spoken
- Anything else that doesn't map to role/education/interests

If you find any, flag them to the user before extracting. For each one, offer to:
a) Extend the Zod schema to accommodate it
b) Update the relevant templates to render it somewhere sensible

Get the user's decision on each before proceeding. Make the schema and template changes now if agreed, so extraction captures everything correctly from the start.

---

## Step 3: Extraction

Read the user's CV file and extract all data into the structure defined in `src/data/schemas.ts`. Also read `data/base.cv.json` if it exists to understand the expected conventions — if it doesn't exist yet, that's fine.

Extract:
- Person: name, headline, email, phone, LinkedIn URL, address, work authorisation
- Summary statement
- Roles: group multiple positions at the same company under one role entry. Extract company name, positions (title + dates), bullet points, and tech stack for each.
- Education: institution, qualification, grade, start/end years
- Interests (if present)
- Any additional fields agreed in Step 2

Write the extracted data to `data/base.cv.json`. Do not invent or infer information that isn't in the CV — leave fields empty or omit them if unsure.

Then update `src/data/resolveCv.ts` to import the user's data file instead of the example:
```ts
// Change this line:
import rawCv from "../../data/base.cv.example.json";
// To:
import rawCv from "../../data/base.cv.json";
```

Present a summary of what you extracted — role by role — and ask the user to confirm it looks accurate before continuing. Fix anything that's wrong or missing.

---

## Step 4: Backup

Once the user confirms the extraction is accurate, save a copy to `data/base.cv.original.json`. Tell the user this is their safety net — you'll always work on `base.cv.json` and leave the original untouched.

---

## Step 5: Setup

Ask the user to run `npm install` if they haven't already, then `npm run dev` to start the app. Tell them to confirm when it's running at `http://localhost:5173`. Now that their data is extracted, the app will render something meaningful.

---

## Step 6: Missing information

Review `data/base.cv.json` and report what's missing or incomplete. Split into two sections:

**Critical (affects the printed CV):**
- Roles missing bullet points or dates
- Missing job titles or company names
- Empty or weak summary
- Missing tech stacks (where relevant)
- Roles that should be marked `condensed: true` — explain that this flag reduces the print detail for older or less important roles, showing just company name, title, and duration, to save space for what matters. Ask which roles, if any, should be deprioritised this way.

**Optional (enhances the interactive web version only):**
Explain that CVBuilder generates both a printable PDF and an interactive web page. The following only appear in the web version and aren't needed for a PDF output, but they add depth for anyone viewing the site:
- `interactive.context` — a short description of the role's significance
- Company website URLs
- LinkedIn URL (shown as a link in the web version, hidden in print)

Work through the critical items with the user now, collecting their input. Flag the optional ones and let them decide whether to fill them in now or later.

---

## Step 7: Visual check and template selection

Take a screen screenshot of the default template:
```
npm run screenshot -- divided /tmp/cv-screen.png
```

Show it to the user. Then describe the four available templates:
- **Classic** — clean single-column, safe for any employer
- **Two Column** — sidebar layout with contact details and skills on the left
- **Divided** — split left/right within each role, strong typographic structure
- **Vivid** — bold, colourful, editorial — shows personality

Ask which they'd like to focus on, or whether they'd like to see screenshots of all of them. Take screenshots as needed:
```
npm run screenshot -- <template> /tmp/cv-<template>.png
```

---

## Step 8: TA report

Run `/cv-report` to produce a talent acquisition report on the current content. Use it to guide the user on what to improve: weak bullets, missing metrics, vague language, things to cut. Make clear this is an iterative loop — report → tweak → review — not a one-time pass.

---

## Step 9: Print layout

Take a print screenshot of the chosen template:
```
npm run screenshot -- <template> /tmp/cv-print.png --print
```

Show it and explain the two-page target: two A4 pages is the sweet spot for most recruiters and ATS systems — enough room to tell a full story without padding. If the content runs long, work through it: tighten bullets, mark older roles as `condensed: true`, or adjust print styles.

---

## Step 10: PDF output

When the user is happy, explain how to generate their PDF:
1. Open `http://localhost:5173/?template=<name>` in Chrome or Edge
2. Press **Cmd+P** (Mac) or **Ctrl+P** (Windows)
3. Set destination to **Save as PDF**, paper size **A4**, margins **None** (the CSS handles margins)
4. Save

---

## Step 11: What's next

Let the user know what else is possible:
- **New templates** — run `/make-template` and describe the style they want
- **Targeted variants** — run `/cv-variant` to create a version optimised for a specific role, company stage, or job listing
- **Ongoing refinement** — `/cv-report` and `/cv-compare` are available any time as they iterate
