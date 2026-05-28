You are helping the user write a targeted cover letter for a specific job, then generating a self-contained HTML file that visually matches their CV template.

Arguments (from `$ARGUMENTS`):
- A job ad URL **or** pasted job description text
- Optional `--template=<name>` — which template to style the letter after. Default: `divided`
- Optional `--variant=<name>` — which CV variant to draw from. Default: `data/base.cv.json`

---

## Step 1: Read the CV

If `--variant` was given, read `data/variants/<name>.cv.json`. Otherwise read `data/base.cv.json`.

---

## Step 2: Get the job description

If the argument looks like a URL, fetch the page. Otherwise treat the text as the job description directly.

Extract:
- **Company name** and what the company does
- **Role title**
- **Key requirements** — the 5–8 things the JD most clearly weights
- **Tone and language** — formal vs. conversational, process-heavy vs. autonomous, etc.

---

## Step 3: Research the company

If a company name is identifiable, do a brief web search. Look for:
- Company size, stage, product focus
- Culture signals (engineering blog, Glassdoor, how they describe themselves)
- Recent news or notable facts that might anchor a specific reference in the letter

---

## Step 4: Analyze fit

Compare the CV against the JD. Identify:
- **Strong matches** — 2–3 pieces of evidence from the CV that directly speak to what the role needs
- **Angle** — what is the most compelling version of this candidate for this specific role? (e.g. "the EM who has also run a business" vs. "the technical leader who can scale a team fast")
- **Gaps** — anything the JD expects that isn't well-represented. Don't fabricate experience, but note what to avoid over-claiming

---

## Step 5: Ask clarifying questions

Before writing anything, ask the user:

1. Is there anything specific they want to emphasise that might not be obvious from the CV?
2. Anything they'd rather downplay or avoid?
3. Do they have a name for the hiring manager, or should the letter open with "Dear Hiring Manager"?
4. What draws them to this company or role specifically? (This helps make the opening genuine rather than generic.)

Keep it to these four. Don't ask more.

---

## Step 6: Write the letter

Use everything gathered. Guidelines:

- **Do not open with** "I am writing to apply for..." or "I am excited to apply..." — start with something specific to the company or role
- **3–4 paragraphs max.** Structure:
  - Para 1: Why this company/role specifically — show you understand what they do and why it's interesting to you
  - Para 2: Your strongest matching evidence — specific, not generic. Name numbers where relevant
  - Para 3: A second angle, or something that makes you distinctive for this specific role
  - Closing: One or two sentences. Confident, not fawning
- **No em dashes** — use commas, parentheses, or plain hyphens
- Match the tone of the JD — if it's conversational, don't be stiff; if it's formal, don't be breezy
- Do not pad. A tight three-paragraph letter beats a sprawling four-paragraph one
- Sign off with "Kind regards," unless the JD's tone clearly warrants something more informal

---

## Step 7: Generate the HTML file

Create a self-contained HTML file at `data/cover-letters/<company-slug>.html`.

The file must:
1. Read the template CSS from `src/templates/<template>/<template>.css` and embed it as an inline `<style>` block (this keeps the letter portable without needing the dev server)
2. Use the same header HTML structure as the template so it looks consistent with the CV
3. Add cover-letter-specific styles (see below)

### Header HTML (divided template)

```html
<header class="divided-header">
  <h1>{person.name}</h1>
  <div class="divided-meta-row">
    <p class="headline">{person.headline}</p>
    <div class="divided-contact">
      <span class="divided-contact-item"><a href="mailto:{email}">{email}</a></span>
      <span class="divided-contact-item">{phone}</span>
      <span class="divided-contact-item">{locality}, {region}</span>
    </div>
  </div>
</header>
```

For other templates, inspect `src/templates/<template>/<template>.tsx` to find the equivalent header structure and replicate it.

### Cover-letter-specific CSS to add after the template CSS

```css
.cv-document {
  max-width: 780px;
  margin: 0 auto;
  padding: 48px 58px;
  font-family: 'Inter', sans-serif;
}

.letter-meta {
  margin: 28px 0 24px;
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.6;
}

.letter-meta .letter-date {
  color: #9ca3af;
  margin-bottom: 16px;
}

.letter-salutation {
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.letter-subject {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.letter-content p {
  font-size: 0.9rem;
  line-height: 1.72;
  color: #374151;
  margin-bottom: 16px;
}

.letter-signoff {
  font-size: 0.9rem;
  margin-top: 28px;
  line-height: 1.9;
}

@media print {
  .cv-document {
    padding: 0;
    max-width: 100%;
  }
  .letter-content p {
    font-size: 0.85rem;
    line-height: 1.65;
  }
}
```

### Full document structure

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cover Letter — {person.name} — {company name}</title>
  <style>
    /* paste template CSS here */
    /* then paste cover-letter CSS above */
  </style>
</head>
<body>
  <article class="cv-document template template-{template}">

    {header HTML from template}

    <div class="letter-meta">
      <p class="letter-date">{today's date, formatted as "28 May 2026"}</p>
      <p>{recipient name and/or company — omit if unknown}</p>
    </div>

    <p class="letter-salutation">Dear {Hiring Manager / name},</p>
    <p class="letter-subject">Re: {Role title} at {Company}</p>

    <div class="letter-content">
      <p>{paragraph 1}</p>
      <p>{paragraph 2}</p>
      <p>{paragraph 3}</p>
      {optional paragraph 4}
    </div>

    <div class="letter-signoff">
      Kind regards,<br>
      <strong>{person.name}</strong>
    </div>

  </article>
</body>
</html>
```

---

## Step 8: Wrap up

Tell the user:
- The file is saved at `data/cover-letters/<company-slug>.html`
- To open it: open the file directly in Chrome
- To generate a PDF: open in Chrome, Ctrl+P, save as PDF, A4, default margins
- They can ask you to revise the letter at any time — you can edit the HTML file directly
