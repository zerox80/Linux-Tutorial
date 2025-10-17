import ModuleBackNav from './ModuleBackNav';

function ModuleNotFound() {
  return (
    <div className="module-detail">
      <ModuleBackNav />
      <div className="module-not-found">
        <h1>Modul nicht gefunden</h1>
        <p>Pruefe die URL oder kehre zur Startseite zurueck.</p>
      </div>
    </div>
  );
}

export default ModuleNotFound;
