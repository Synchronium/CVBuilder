/**
 * Shown when no CV data is present (neither data/base.cv.json nor
 * data/base.cv.example.json). Points the user at the onboarding flow.
 */
export function EmptyState() {
  return (
    <main className="app">
      <section className="empty-onboarding" aria-labelledby="empty-heading">
        <h1 id="empty-heading">No CV data yet</h1>
        <p>
          CVBuilder couldn&apos;t find a CV to render. To get started, add your
          career data and let Claude Code set it up for you.
        </p>
        <ol className="empty-steps">
          <li>
            Put your existing CV (PDF, Word doc, or plain text) into{" "}
            <code>data/original/</code>.
          </li>
          <li>
            Open this project in Claude Code and run <code>/cv-onboard</code>.
          </li>
          <li>
            Claude extracts your history into <code>data/base.cv.json</code>,
            then this preview loads automatically.
          </li>
        </ol>
        <p className="empty-note">
          Just exploring? Restore <code>data/base.cv.example.json</code> to see
          the sample CV.
        </p>
      </section>
    </main>
  );
}
