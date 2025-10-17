import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { modules } from '../data/content';
import ModuleBackNav from '../components/module/ModuleBackNav';
import ModuleHeader from '../components/module/ModuleHeader';
import ModuleTakeaways from '../components/module/ModuleTakeaways';
import ModuleExplanation from '../components/module/ModuleExplanation';
import ModuleCommandLab from '../components/module/ModuleCommandLab';
import ModuleMissions from '../components/module/ModuleMissions';
import ModuleResources from '../components/module/ModuleResources';
import ModuleCopyFeedback from '../components/module/ModuleCopyFeedback';
import ModuleNotFound from '../components/module/ModuleNotFound';

function ModulePage() {
  const { moduleId } = useParams();
  const module = useMemo(
    () => modules.find((entry) => entry.id === moduleId) ?? null,
    [moduleId]
  );
  const [copiedCommand, setCopiedCommand] = useState('');

  const handleCopy = async (snippet) => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedCommand(snippet);
      setTimeout(() => setCopiedCommand(''), 2000);
    } catch (error) {
      console.error('Copy failed', error);
      setCopiedCommand('error');
      setTimeout(() => setCopiedCommand(''), 2000);
    }
  };

  if (!module) {
    return <ModuleNotFound />;
  }

  const quickNavItems = [
    module.takeaways?.length
      ? { id: 'takeaways', label: 'Outcomes & Takeaways' }
      : null,
    module.explanation?.length
      ? { id: 'explanation', label: 'Erklaerung & Kontext' }
      : null,
    module.commands?.length
      ? { id: 'command-lab', label: 'Command-Lab' }
      : null,
    module.missions?.length
      ? { id: 'missions', label: 'Praxisaufgaben' }
      : null,
    module.resources?.length
      ? { id: 'resources', label: 'Weiterfuehrende Quellen' }
      : null,
  ].filter(Boolean);

  const commandCount = module.commands?.length ?? 0;
  const missionCount = module.missions?.length ?? 0;
  const resourceCount = module.resources?.length ?? 0;
  const takeawayCount = module.takeaways?.length ?? 0;
  const focusCount = module.focus?.length ?? 0;
  const estimatedTime = module.estimated ? `${module.estimated} Min` : 'Flexibel';

  return (
    <div className="module-detail">
      <ModuleBackNav />
      <ModuleHeader module={module} />
      <div className="module-detail-body">
        <main className="module-detail-main">
          <ModuleTakeaways
            takeaways={module.takeaways}
            sectionId="takeaways"
          />
          <ModuleExplanation
            sections={module.explanation}
            sectionId="explanation"
          />
          <ModuleCommandLab
            commands={module.commands}
            copiedCommand={copiedCommand}
            onCopy={handleCopy}
            sectionId="command-lab"
          />
          <ModuleMissions missions={module.missions} sectionId="missions" />
          <ModuleResources
            resources={module.resources}
            sectionId="resources"
          />
        </main>

        <aside className="module-detail-aside" aria-label="Moduluebersicht">
          <div className="module-aside-card module-overview-card">
            <span className="overview-pill">{module.pillar}</span>
            <h2>Moduluebersicht</h2>
            <p className="overview-summary">
              Alles, was du fuer einen fokussierten Deep-Dive brauchst, auf einen Blick.
            </p>
            <div className="overview-grid" role="list">
              <div role="listitem">
                <span className="overview-label">Level</span>
                <span className="overview-value">{module.level}</span>
              </div>
              <div role="listitem">
                <span className="overview-label">Zeit</span>
                <span className="overview-value">{estimatedTime}</span>
              </div>
              <div role="listitem">
                <span className="overview-label">Befehle</span>
                <span className="overview-value">{commandCount}</span>
              </div>
              <div role="listitem">
                <span className="overview-label">Missionen</span>
                <span className="overview-value">{missionCount}</span>
              </div>
              <div role="listitem">
                <span className="overview-label">Quellen</span>
                <span className="overview-value">{resourceCount}</span>
              </div>
              <div role="listitem">
                <span className="overview-label">Fokusfelder</span>
                <span className="overview-value">{focusCount}</span>
              </div>
              <div role="listitem">
                <span className="overview-label">Outcomes</span>
                <span className="overview-value">{takeawayCount}</span>
              </div>
            </div>
            {commandCount > 0 ? (
              <a href="#command-lab" className="module-primary-action">
                Command-Lab starten
              </a>
            ) : null}
          </div>

          {quickNavItems.length ? (
            <nav
              className="module-aside-card module-quick-nav"
              aria-label="Inhaltsnavigation"
            >
              <span className="quick-nav-title">Direkt zum Abschnitt</span>
              <ul>
                {quickNavItems.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <div className="module-aside-card module-tip-card">
            <h3>Flow behalten</h3>
            <p>
              Plane deine Session in Etappen: erst Takeaways lesen, dann Befehle im Terminal testen,
              zum Schluss Missionen validieren.
            </p>
            <p className="module-tip-meta">
              Pro-Tipp: sichere dir die kopierten Befehle direkt in deinem Notizen-Tool.
            </p>
          </div>
        </aside>
      </div>
      <ModuleCopyFeedback copiedCommand={copiedCommand} />
    </div>
  );
}

export default ModulePage;
