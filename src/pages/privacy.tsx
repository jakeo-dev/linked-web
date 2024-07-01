export default function Privacy() {
  return (
    <div className="text-white px-56 py-12">
      <h1 className="text-2xl font-semibold mb-2">
        Linked Word Game Privacy Policy
      </h1>

      <p>
        No data at all is collected through the Linked Word Game app. The game
        works completely offline and no information from any users is used or
        sent anywhere. No data is stored locally on the app either.
      </p>
      <p>
        If you still have concerns, contact{" "}
        <a
          href="mailto:hi@jakeo.dev"
          target="_blank"
          className="underline hover:decoration-wavy hover:decoration-1 hover:text-gray-200 transition-all"
        >
          hi@jakeo.dev
        </a>
        .
      </p>
    </div>
  );
}
