function ModuleCommandLab({ commands, copiedCommand, onCopy, sectionId }) {
  if (!commands?.length) {
    return null;
  }

  return (
    <section className="module-detail-section" id={sectionId}>
      <h2>Command-Lab</h2>
      <div className="command-grid">
        {commands.map((command) => (
          <div key={command.label} className="command-card">
            <div className="command-head">
              <h3>{command.label}</h3>
              <button
                type="button"
                onClick={() => onCopy(command.command)}
                className="copy-btn"
              >
                {copiedCommand === command.command ? 'Kopiert!' : 'Kopieren'}
              </button>
            </div>
            <pre>
              <code>{command.command}</code>
            </pre>
            <p>{command.description}</p>
            <div className="command-tags">
              {command.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ModuleCommandLab;
