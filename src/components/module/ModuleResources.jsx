function ModuleResources({ resources, sectionId }) {
  if (!resources?.length) {
    return null;
  }

  return (
    <section className="module-detail-section" id={sectionId}>
      <h2>Weiterfuehrende Quellen</h2>
      <ul>
        {resources.map((resource) => (
          <li key={resource.url}>
            <a href={resource.url} target="_blank" rel="noreferrer">
              {resource.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ModuleResources;
