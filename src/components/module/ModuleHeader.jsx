function ModuleHeader({ module }) {
  const focusAreas = module.focus ?? [];
  const keywords = module.keywords ?? [];
  const estimatedLabel = module.estimated ? `${module.estimated} Min` : 'Flexibel';

  return (
    <header className="module-detail-header">
      <div className="module-header-shell">
        <div className="module-header-top">
          <span className="module-pill">{module.pillar}</span>
          <div className="module-header-tags">
            <span>{module.level}</span>
            <span>{estimatedLabel}</span>
          </div>
        </div>
        <h1>{module.title}</h1>
        <p>{module.summary}</p>

        <div className="module-header-meta">
          {focusAreas.length ? (
            <div className="module-header-meta-block">
              <span className="meta-label">Fokusbereiche</span>
              <div className="meta-chip-row">
                {focusAreas.map((area) => (
                  <span key={area}>{area}</span>
                ))}
              </div>
            </div>
          ) : null}

          {keywords.length ? (
            <div className="module-header-meta-block">
              <span className="meta-label">Keywords</span>
              <div className="meta-chip-row meta-chip-soft">
                {keywords.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default ModuleHeader;
