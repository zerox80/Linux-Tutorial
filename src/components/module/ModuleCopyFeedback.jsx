function ModuleCopyFeedback({ copiedCommand }) {
  return (
    <div className="sr-only" aria-live="polite">
      {copiedCommand === 'error'
        ? 'Kopieren fehlgeschlagen. Markiere den Code manuell.'
        : copiedCommand
        ? 'Befehl kopiert.'
        : ''}
    </div>
  );
}

export default ModuleCopyFeedback;
