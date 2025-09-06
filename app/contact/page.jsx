export default function ContactPage() {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        We’re happy to hear from you! If you have any questions, feedback, or
        issues while using the platform, feel free to reach out.
      </p>
      <p className="mb-4">
        📧 Email:{" "}
        <a
          href="mailto:quickadssy@gmail.com"
          className="text-blue-600 hover:underline"
        >
          quickadssy@gmail.com
        </a>
      </p>
      <p>We aim to respond to all messages as soon as possible.</p>
    </main>
  );
}
