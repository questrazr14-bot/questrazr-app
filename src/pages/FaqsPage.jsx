const faqs = [
  {
    question: "What is QuestRazr?",
    answer:
      "QuestRazr is a React-based project scaffold that we can grow into a full learning and career platform.",
  },
  {
    question: "Why start with simple pages first?",
    answer:
      "A simple base makes it easier to add real features one at a time without carrying unnecessary complexity.",
  },
  {
    question: "Can these pages be redesigned later?",
    answer:
      "Yes. The current pages are intentionally straightforward and can be restyled or expanded whenever you want.",
  },
  {
    question: "What can be added next?",
    answer:
      "We can add components, forms, backend integration, authentication, or any feature flow you want to tackle next.",
  },
];

export function FaqsPage() {
  return (
    <section className="page-card">
      <p className="page-kicker">FAQs</p>
      <h1>Frequently asked questions</h1>
      <div className="faq-list">
        {faqs.map((item) => (
          <article key={item.question} className="faq-item">
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
