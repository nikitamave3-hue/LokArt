function Page({ title, description }) {
  return (
    <section className="page-section container">
      <div className="page-card">
        <h1>{title}</h1>
        <p>{description}</p>
        <p>This content is part of the React conversion for LokArt.</p>
      </div>
    </section>
  );
}

export default Page;
