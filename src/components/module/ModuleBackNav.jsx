import { Link } from 'react-router-dom';

function ModuleBackNav() {
  return (
    <nav className="module-back">
      <Link to="/">{'<'} Zurueck zur Uebersicht</Link>
    </nav>
  );
}

export default ModuleBackNav;
