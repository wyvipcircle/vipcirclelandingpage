import { navigation, partners, showcase, villas } from "./content";
import {
  Arrow,
  ExperienceCarousel,
  FAQ,
  Gallery,
  Header,
  InterestButton,
  InterestProvider,
  SocialMarks,
} from "./interactions";

function SectionHeading({ eyebrow, id, children, description, className = "" }) {
  return (
    <div className={`section-heading ${className}`}>
      <p className="eyebrow">
        {id === "faq-title" && <span className="faq-mark" aria-hidden="true" />}
        {eyebrow}
      </p>
      <h2 id={id}>{children}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <a className="brand footer-brand" href="#home" aria-label="VIPCIRCLE home">
            <img src="/media/vipcircle-navy.webp" alt="" width="241" height="58" />
          </a>
          <p>
            A performance-based partnership platform connecting Bali’s hotels and villas
            with creators and guest experiences.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <p>Sections</p>
          <ul>
            {navigation.slice(1).map(({ label, href }) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
            <li><InterestButton intent="partner">Become a Partner</InterestButton></li>
          </ul>
        </nav>
      </div>
      <p className="copyright">© 2026 VIPscore.ai. All rights reserved.</p>
    </footer>
  );
}

export default function HomePage() {
  return (
    <InterestProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <img className="hero-sky" src="/media/hero-sky.webp" alt="" fetchPriority="high" />
            <img className="hero-people" src="/media/hero-people.webp" alt="" fetchPriority="high" />
          </div>
          <Header />
          <div className="hero-copy">
            <p className="hero-label">VIP CIRCLE</p>
            <h1 id="hero-title">Bali has a guest list.</h1>
            <p className="hero-description">
              Discover private villas and experiences in Bali through the creators who bring people together there.
            </p>
            <div className="hero-actions">
              <InterestButton intent="updates" className="button button-primary">
                Get Launch Updates <Arrow />
              </InterestButton>
              <InterestButton intent="circle" className="button button-glass">
                Become a VIPCIRCLE
              </InterestButton>
            </div>
          </div>
        </section>

        <section className="partners" aria-labelledby="partners-title">
          <h2 className="eyebrow" id="partners-title">Trusted by 100+ top hospitality brands</h2>
          <ul className="partner-logos">
            {partners.map(({ name, image, width }) => (
              <li key={name} style={{ "--logo-width": `${width}px` }}>
                <img src={`/media/${image}`} alt={name} loading="lazy" />
              </li>
            ))}
          </ul>
        </section>

        <section className="host section" id="how-it-works" aria-labelledby="host-title">
          <SectionHeading
            id="host-title"
            eyebrow="Two revenue opportunities"
            description="A creator picks a villa, brings their circle together, and makes the evening their own. Maybe it’s dinner by the pool. Maybe someone puts on music and nobody’s in a hurry to leave."
          >
            It starts with a <em>host.</em>
          </SectionHeading>
          <div className="host-photo">
            <img
              src="/media/host-dinner.webp"
              alt="A villa gathering around the pool under string lights in Bali"
              width="1238"
              height="531"
              loading="lazy"
            />
          </div>
        </section>

        <section className="properties section" id="for-properties" aria-labelledby="properties-title">
          <SectionHeading id="properties-title" eyebrow="Two revenue opportunities">
            The places behind <em>the stories.</em>
          </SectionHeading>
          <Gallery className="villa-gallery" label="Featured Bali villas">
            {villas.map(({ name, image, logo }) => (
              <figure className="villa-card" key={name}>
                <img className="card-photo" src={`/media/${image}`} alt="" loading="lazy" />
                <figcaption>
                  <img className="villa-logo" src={`/media/${logo}`} alt={name} loading="lazy" />
                </figcaption>
              </figure>
            ))}
          </Gallery>
        </section>

        <section className="showcase section" aria-labelledby="showcase-title">
          <SectionHeading
            className="editorial-heading"
            id="showcase-title"
            eyebrow="Creator showcase"
            description={<>Give potential guests a closer look at the stays and experiences<br className="desktop-break" /> your property makes possible.</>}
          >
            Let your next guests{" "}<br className="desktop-break" /><em>picture</em> themselves here.
          </SectionHeading>
          <Gallery className="creator-gallery" label="Creator showcase">
            {showcase.map(({ title, image, description }) => (
              <figure className="creator-card" key={title}>
                <img className="card-photo" src={`/media/${image}`} alt={description} loading="lazy" />
                <SocialMarks />
                <figcaption>{title}</figcaption>
              </figure>
            ))}
          </Gallery>
        </section>

        <section className="experiences section" id="experiences" aria-labelledby="experiences-title">
          <SectionHeading
            className="editorial-heading"
            id="experiences-title"
            eyebrow="VIP Experiences"
            description={<>Help guests discover more of Bali while creating new revenue<br className="desktop-break" /> opportunities beyond accommodation.</>}
          >
            An exceptional stay{" "}<br className="desktop-break" />goes <em>beyond</em> your property.
          </SectionHeading>
          <ExperienceCarousel />
        </section>

        <section className="faq section" id="faq" aria-labelledby="faq-title">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            description="Clear answers about fees, commissions, and what a partnership involves."
          >
            Frequently Asked <em>Question.</em>
          </SectionHeading>
          <FAQ />
        </section>
      </main>
      <Footer />
    </InterestProvider>
  );
}
