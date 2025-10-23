import { TESTIMONIALS } from "@/config/home";

export function Testimonials() {
  return (
    <section className="bg-muted py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          What our clients say
        </h2>
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:gap-16">
          {TESTIMONIALS.map((testimonial) => (
            <figure key={testimonial.author}>
              <blockquote>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  “{testimonial.quote}”
                </p>
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.company}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}