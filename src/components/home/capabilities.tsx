import { CAPABILITIES } from "@/config/home";

export function Capabilities() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 md:py-32 lg:px-10">
      <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
        Capabilities
      </h2>
      <div className="mt-12 grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-16">
        {CAPABILITIES.map((capability) => (
          <div key={capability.title}>
            <h3 className="text-xl font-semibold tracking-tight">
              {capability.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {capability.items.map((item) => (
                <li key={item} className="text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}