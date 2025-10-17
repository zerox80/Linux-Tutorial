import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  modules,
  focusModes,
  quickWins,
  learningTracks,
  cheatSheetBlocks,
  faqItems,
  milestoneBadges,
  scenarioDeck,
  deepDiveResources,
} from '../data/content';

const levelOptions = ['Alle', ...new Set(modules.map((module) => module.level))];
const focusLookup = Object.fromEntries(focusModes.map((mode) => [mode.id, new Set(mode.includes)]));
const focusLabelMap = Object.fromEntries(focusModes.map((mode) => [mode.id, mode.label]));
const totalModuleMinutes = modules.reduce((total, module) => total + module.estimated, 0);
const totalCommandCount = modules.reduce((total, module) => total + module.commands.length, 0);
const totalMissionCount = modules.reduce((total, module) => total + module.missions.length, 0);

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('Alle');
  const [activeFocus, setActiveFocus] = useState(null);
  const [dailyMinutes, setDailyMinutes] = useState(45);
  const [weekCount, setWeekCount] = useState(4);
  const [selectedTrack, setSelectedTrack] = useState(learningTracks[0].id);

  const selectedLevel = levelFilter === 'Alle' ? null : levelFilter;
  const focusSet = useMemo(() => (activeFocus ? focusLookup[activeFocus] ?? null : null), [activeFocus]);

  const filteredModules = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();
    return modules.filter((module) => {
      if (selectedLevel && module.level !== selectedLevel) {
        return false;
      }

      if (focusSet && !focusSet.has(module.id)) {
        return false;
      }

      if (needle.length > 0) {
        const haystack = [
          module.title,
          module.summary,
          module.pillar,
          ...(module.keywords ?? []),
          ...(module.takeaways ?? []),
          ...(module.missions ?? []),
        ]
          .join(' ')
          .toLowerCase();

        if (!haystack.includes(needle)) {
          return false;
        }
      }

      return true;
    });
  }, [focusSet, searchTerm, selectedLevel]);

  const sortedModules = useMemo(() => {
    if (!focusSet) {
      return filteredModules;
    }

    const priority = new Set([...focusSet]);
    return [...filteredModules].sort((a, b) => {
      const aPriority = priority.has(a.id);
      const bPriority = priority.has(b.id);

      if (aPriority === bPriority) {
        return 0;
      }

      return aPriority ? -1 : 1;
    });
  }, [filteredModules, focusSet]);

  const selectedFocusMode = useMemo(() => focusModes.find((mode) => mode.id === activeFocus) ?? null, [activeFocus]);

  const modulesForPlan = useMemo(() => {
    if (!selectedFocusMode) {
      return modules;
    }

    const allowed = new Set(selectedFocusMode.includes);
    return modules.filter((module) => allowed.has(module.id));
  }, [selectedFocusMode]);

  const planMinutesPerWeek = Math.max(20, dailyMinutes) * 7;

  const learningPlan = useMemo(() => {
    const weeks = Math.max(1, weekCount);
    const buckets = Array.from({ length: weeks }, (_, index) => ({
      week: index + 1,
      minutes: 0,
      items: [],
    }));

    let currentWeek = 0;

    modulesForPlan.forEach((module) => {
      if (buckets[currentWeek].minutes + module.estimated > planMinutesPerWeek && currentWeek < weeks - 1) {
        currentWeek += 1;
      }

      buckets[currentWeek].items.push(module);
      buckets[currentWeek].minutes += module.estimated;
    });

    return buckets;
  }, [modulesForPlan, planMinutesPerWeek, weekCount]);

  const totalPlanMinutes = useMemo(
    () => modulesForPlan.reduce((total, module) => total + module.estimated, 0),
    [modulesForPlan],
  );

  const computedWeeks = Math.max(1, Math.ceil(totalPlanMinutes / planMinutesPerWeek));

  const selectedTrackData =
    learningTracks.find((track) => track.id === selectedTrack) ?? learningTracks[0];

  const resetFilters = () => {
    setSearchTerm('');
    setLevelFilter('Alle');
    setActiveFocus(null);
  };

  return (
    <div className="page">
      <header className="hero">
        <span className="badge">Linux Lernstudio - Oktober 2025</span>
        <h1>Baue deine Linux-Exzellenz mit Focus-Modus und Praxisplaenen auf</h1>
        <p className="hero-text">
          Kuratiere deinen Lernpfad, sichere den Betrieb produktiver Systeme und erhalte sofort einsatzbereite
          Befehle. Waehle einen Fokus, plane realistische Wochenpakete und arbeite dich praxisnah durch die Module.
        </p>

        <div className="metrics">
          <div>
            <span className="metric-value">{modules.length}</span>
            <span className="metric-label">Module mit Outcomes</span>
          </div>
          <div>
            <span className="metric-value">{Math.round(totalModuleMinutes / 60)} h</span>
            <span className="metric-label">Gesamtumfang</span>
          </div>
          <div>
            <span className="metric-value">{totalCommandCount}</span>
            <span className="metric-label">bereit zum Kopieren</span>
          </div>
          <div>
            <span className="metric-value">{totalMissionCount}</span>
            <span className="metric-label">Praxisaufgaben</span>
          </div>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <section className="panel">
            <h2>Navigator</h2>
            <label className="input-label" htmlFor="search">
              Stichwortsuche
            </label>
            <input
              id="search"
              type="search"
              placeholder="z. B. SELinux, Backup, Ansible..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <div className="filter-group">
              <span className="filter-title">Level</span>
              <div className="chip-group">
                {levelOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`chip ${levelFilter === option ? 'active' : ''}`}
                    onClick={() => setLevelFilter(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-title">Focus-Modus</span>
              <div className="focus-mode-list">
                {focusModes.map((mode) => {
                  const isActive = activeFocus === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      className={`focus-mode ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveFocus(isActive ? null : mode.id)}
                    >
                      <span className="focus-badge">{mode.badge}</span>
                      <div className="focus-body">
                        <strong>{mode.label}</strong>
                        <p>{mode.description}</p>
                      </div>
                      <span className="focus-meta">{mode.includes.length} Module</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button type="button" className="reset-btn" onClick={resetFilters}>
              Filter zuruecksetzen
            </button>
          </section>

          <section className="panel">
            <h2>Quick Wins</h2>
            <ul className="quickwins">
              {quickWins.map((win) => (
                <li key={win.title}>
                  <h3>{win.title}</h3>
                  <span className="quick-time">{win.time}</span>
                  <ol>
                    {win.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel">
            <h2>Milestones</h2>
            <ul className="milestone-list">
              {milestoneBadges.map((badge) => (
                <li key={badge.id}>
                  <h3>{badge.title}</h3>
                  <p>{badge.description}</p>
                  <ul>
                    {badge.criteria.map((criterion) => (
                      <li key={criterion}>{criterion}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <main className="content">
          <section className="planner">
            <header className="planner-header">
              <h2>Dein Lernplan</h2>
              <p>
                {selectedFocusMode
                  ? `Fokus "${selectedFocusMode.label}" umfasst ${modulesForPlan.length} Module (${totalPlanMinutes} Min).`
                  : `Alle Module umfassen ${modulesForPlan.length} Module (${totalPlanMinutes} Min).`}
                {' '}Mit {planMinutesPerWeek} Minuten pro Woche benoetigst du etwa {computedWeeks} Wochen.
              </p>
            </header>

            <div className="planner-controls">
              <label htmlFor="daily-minutes">
                Taegliche Lernzeit: <strong>{dailyMinutes} Min</strong>
              </label>
              <input
                id="daily-minutes"
                type="range"
                min="20"
                max="120"
                step="5"
                value={dailyMinutes}
                onChange={(event) => setDailyMinutes(Number(event.target.value))}
              />

              <label htmlFor="weeks">
                Plan-Laenge: <strong>{weekCount} Wochen</strong>
              </label>
              <input
                id="weeks"
                type="range"
                min="1"
                max="12"
                step="1"
                value={weekCount}
                onChange={(event) => setWeekCount(Number(event.target.value))}
              />
            </div>

            <div className="week-grid">
              {learningPlan.map((week) => (
                <div key={week.week} className="week-card">
                  <h3>Woche {week.week}</h3>
                  <span className="week-minutes">{week.minutes} Min</span>
                  <ul>
                    {week.items.map((item) => (
                      <li key={item.id}>
                        <span>{item.title}</span>
                        <small>{item.estimated} Min - {item.level}</small>
                      </li>
                    ))}
                    {week.items.length === 0 ? <li className="placeholder">Reserve fuer Wiederholung oder Labs.</li> : null}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="module-section">
            <header className="section-header">
              <h2>Module & Praxis</h2>
              <span className="result-count">{sortedModules.length} Module im aktuellen Filter</span>
            </header>

            {sortedModules.length === 0 ? (
              <div className="empty">
                <h3>Keine Treffer</h3>
                <p>Veraendere Suchbegriff oder Fokus, um weitere Module einzublenden.</p>
              </div>
            ) : (
              <div className="module-grid">
                {sortedModules.map((module) => (
                  <article key={module.id} className="module-card" id={module.id}>
                    <header className="module-header">
                      <div className="module-meta">
                        <span className="module-pill">{module.pillar}</span>
                        <div className="module-tags">
                          <span>{module.level}</span>
                          <span>{module.estimated} Min</span>
                        </div>
                      </div>
                      <h3>{module.title}</h3>
                      <p>{module.summary}</p>
                    </header>

                    <ul className="module-takeaways">
                      {module.takeaways.map((takeaway) => (
                        <li key={takeaway}>{takeaway}</li>
                      ))}
                    </ul>

                    <div className="module-card-footer">
                      <span className="module-card-counts">
                        {module.commands.length} Befehle | {module.missions.length} Missionen | {module.resources.length} Quellen
                      </span>
                      <Link to={`/module/${module.id}`} className="module-link">
                        Zum Modul
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="tracks">
            <h2>Lernpfade</h2>
            <div className="track-selector">
              {learningTracks.map((track) => (
                <button
                  key={track.id}
                  type="button"
                  className={`track-chip ${selectedTrack === track.id ? 'active' : ''}`}
                  onClick={() => setSelectedTrack(track.id)}
                >
                  {track.title}
                </button>
              ))}
            </div>

            <div className="track-detail">
              <h3>{selectedTrackData.title}</h3>
              <p className="track-audience">{selectedTrackData.audience}</p>
              <p className="track-cadence">{selectedTrackData.cadence}</p>
              <p className="track-deliverable">{selectedTrackData.deliverable}</p>
              <ul className="track-modules">
                {selectedTrackData.modules.map((moduleId) => {
                  const module = modules.find((entry) => entry.id === moduleId);
                  return module ? (
                    <li key={moduleId}>
                      <Link to={`/module/${module.id}`}>{module.title}</Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </section>

          <section className="scenarios">
            <h2>Stresstests & Szenarien</h2>
            <div className="scenario-grid">
              {scenarioDeck.map((scenario) => (
                <article key={scenario.title} className="scenario-card">
                  <header>
                    <h3>{scenario.title}</h3>
                    <span className="scenario-badge">{scenario.difficulty}</span>
                  </header>
                  <p>{scenario.context}</p>
                  <h4>Ziele</h4>
                  <ul>
                    {scenario.objectives.map((objective) => (
                      <li key={objective}>{objective}</li>
                    ))}
                  </ul>
                  <h4>Hinweise</h4>
                  <ul>
                    {scenario.hints.map((hint) => (
                      <li key={hint}>{hint}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="resources">
            <h2>Deep Dives</h2>
            <div className="resource-grid">
              {deepDiveResources.map((resource) => (
                <article key={resource.url} className="resource-card">
                  <h3>{resource.label}</h3>
                  <p>{resource.description}</p>
                  <a href={resource.url} target="_blank" rel="noreferrer">
                    Quelle oeffnen
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="cheats">
            <h2>Cheat-Sheet</h2>
            <div className="cheat-grid">
              {cheatSheetBlocks.map((block) => (
                <div key={block.title} className="cheat-card">
                  <h3>{block.title}</h3>
                  <ul>
                    {block.entries.map((entry) => (
                      <li key={entry.cmd}>
                        <code>{entry.cmd}</code>
                        <span>{entry.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="faq">
            <h2>FAQ</h2>
            <div className="faq-grid">
              {faqItems.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer className="footer">
        <p>
          Stand: 17. Oktober 2025 - Teile dein Feedback, damit neue Module und Szenarien entstehen. Focus-Modus zeigt
          dir jederzeit den naechsten sinnvollen Schritt.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
