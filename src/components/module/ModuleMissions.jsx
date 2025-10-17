function ModuleMissions({ missions, sectionId }) {
  if (!missions?.length) {
    return null;
  }

  return (
    <section className="module-detail-section" id={sectionId}>
      <h2>Praxisaufgaben</h2>
      <ul>
        {missions.map((mission) => (
          <li key={mission}>{mission}</li>
        ))}
      </ul>
    </section>
  );
}

export default ModuleMissions;
