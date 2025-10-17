function ModuleTakeaways({ takeaways, sectionId }) {
  if (!takeaways?.length) {
    return null;
  }

  return (
    <section className="module-detail-section" id={sectionId}>
      <h2>Outcomes &amp; Takeaways</h2>
      <ul>
        {takeaways.map((takeaway) => (
          <li key={takeaway}>{takeaway}</li>
        ))}
      </ul>
    </section>
  );
}

export default ModuleTakeaways;
