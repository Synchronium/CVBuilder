type InterestsBlockProps = {
  interests?: string;
};

export function InterestsBlock({ interests }: InterestsBlockProps) {
  if (!interests) {
    return null;
  }

  return (
    <section className="cv-section" aria-labelledby="interests-heading">
      <h2 id="interests-heading">Interests</h2>
      <p>{interests}</p>
    </section>
  );
}
