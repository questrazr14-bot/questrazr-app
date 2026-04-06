export function ContactPage() {
  return (
    <section className="page-card">
      <p className="page-kicker">Contact</p>
      <h1>Let&apos;s build the next part.</h1>
      <p className="page-lead">
        This contact page is ready to be replaced with a real form, email
        workflow, or support flow whenever you want.
      </p>

      <div className="contact-grid">
        <article className="contact-panel">
          <h2>Email</h2>
          <p>hello@questrazr.app</p>
        </article>
        <article className="contact-panel">
          <h2>Phone</h2>
          <p>+91 90000 00000</p>
        </article>
        <article className="contact-panel">
          <h2>Availability</h2>
          <p>Monday to Friday, 10 AM to 6 PM</p>
        </article>
      </div>
    </section>
  );
}
