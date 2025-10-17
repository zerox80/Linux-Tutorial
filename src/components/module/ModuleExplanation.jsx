function ModuleExplanation({ sections, sectionId }) {
  if (!sections?.length) {
    return null;
  }

  return (
    <section className="module-detail-section" id={sectionId}>
      <h2>Erklaerung &amp; Kontext</h2>
      {sections.map((section, index) => (
        <article key={section.title ?? index} className="module-explanation-block">
          {section.title ? <h3>{section.title}</h3> : null}
          {section.body?.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
          ))}
        </article>
      ))}
    </section>
  );
}

export default ModuleExplanation;
