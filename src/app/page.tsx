import Heading from "./components/Heading";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="p-6">
      <section className="mb-8">
        <Heading />
      </section>
      <section>
        <Contact />
      </section>
    </main>
  );
}
