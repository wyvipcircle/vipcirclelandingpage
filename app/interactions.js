"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { experiences, interestOptions, navigation, questions } from "./content";

const InterestContext = createContext(null);

export function Arrow() {
  return <span className="button-arrow" aria-hidden="true"><span /></span>;
}

export function InterestButton({ intent, className, children }) {
  const openInterest = useContext(InterestContext);

  return (
    <button type="button" className={className} onClick={() => openInterest(intent)}>
      {children}
    </button>
  );
}

export function InterestProvider({ children }) {
  const dialog = useRef(null);
  const [intent, setIntent] = useState(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const option = interestOptions[intent];

  useEffect(() => {
    if (intent && !dialog.current.open) {
      dialog.current.showModal();
      dialog.current.querySelector("input")?.focus();
    }
  }, [intent]);

  function openInterest(nextIntent) {
    setSaved(false);
    setError("");
    setIntent(nextIntent);
  }

  function saveInterest(event) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    const email = fields.email.trim();

    try {
      window.localStorage.setItem(
        `vipcircle-interest:${intent}:${email.toLowerCase()}`,
        JSON.stringify({ ...fields, email }),
      );
      setSaved(true);
    } catch {
      setError("Your browser couldn’t save these details. Check that site storage is enabled and try again.");
    }
  }

  return (
    <InterestContext.Provider value={openInterest}>
      {children}
      <dialog
        className="interest-dialog"
        ref={dialog}
        aria-labelledby="interest-title"
        onClose={() => setIntent(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
      >
        {option && (
          <div className="dialog-body">
            <button
              className="icon-button dialog-close"
              type="button"
              aria-label="Close dialog"
              onClick={() => dialog.current.close()}
            >
              <span aria-hidden="true">×</span>
            </button>
            <h2 id="interest-title">{option.title}</h2>
            {saved ? (
              <>
                <p role="status">Your details are saved on this device.</p>
                <button className="button button-primary" type="button" autoFocus onClick={() => dialog.current.close()}>
                  Done
                </button>
              </>
            ) : (
              <>
                <p>{option.description}</p>
                <form onSubmit={saveInterest}>
                  {intent === "partner" && (
                    <label>
                      Property name
                      <input name="property" autoComplete="organization" required />
                    </label>
                  )}
                  {intent !== "updates" && (
                    <label>
                      Name
                      <input name="name" autoComplete="name" required />
                    </label>
                  )}
                  <label>
                    Email address
                    <input name="email" type="email" autoComplete="email" required />
                  </label>
                  <p className="form-note">This preview saves your details on this device.</p>
                  {error && <p className="form-error" role="alert">{error}</p>}
                  <button className="button button-primary" type="submit">Save my interest <Arrow /></button>
                </form>
              </>
            )}
          </div>
        )}
      </dialog>
    </InterestContext.Provider>
  );
}

export function Header() {
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    function syncLocation() {
      const hash = window.location.hash;
      setActive(navigation.some(({ href }) => href === hash) ? hash : "#home");
      setMenuOpen(false);
    }

    syncLocation();
    window.addEventListener("hashchange", syncLocation);
    return () => window.removeEventListener("hashchange", syncLocation);
  }, []);

  return (
    <header className="header" onKeyDown={(event) => {
      if (menuOpen && event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current.focus();
      }
    }}>
      <a className="brand" href="#home" aria-label="VIPCIRCLE home" onClick={() => setMenuOpen(false)}>
        <img src="/media/vipcircle-white.webp" alt="" width="241" height="58" />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        ref={menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span aria-hidden="true" />
      </button>

      <nav className={`primary-nav${menuOpen ? " is-open" : ""}`} id="primary-navigation" aria-label="Main navigation">
        <ul>
          {navigation.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                aria-current={active === href ? "location" : undefined}
                onClick={() => { setActive(href); setMenuOpen(false); }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-partner">
          <InterestButton intent="partner" className="button button-primary">
            Become a Partner <Arrow />
          </InterestButton>
        </div>
      </nav>

      <InterestButton intent="partner" className="button button-primary header-partner">
        Become a Partner <Arrow />
      </InterestButton>
    </header>
  );
}

export function Gallery({ className, label, children }) {
  const viewport = useRef(null);
  const drag = useRef(null);

  useLayoutEffect(() => {
    const gallery = viewport.current;
    const mobile = window.matchMedia("(max-width: 760px)");

    function setInitialPosition() {
      gallery.scrollLeft = mobile.matches ? 0 : (gallery.scrollWidth - gallery.clientWidth) / 2;
    }

    setInitialPosition();
    mobile.addEventListener("change", setInitialPosition);
    return () => mobile.removeEventListener("change", setInitialPosition);
  }, []);

  function stopDrag(event) {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    event.currentTarget.classList.remove("is-dragging");
  }

  return (
    <div
      className={`gallery ${className}`}
      role="region"
      aria-label={label}
      tabIndex={0}
      ref={viewport}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const gallery = event.currentTarget;
        const firstCard = gallery.firstElementChild;
        const gap = parseFloat(getComputedStyle(gallery).columnGap);
        const step = firstCard.getBoundingClientRect().width + gap;
        gallery.scrollBy({
          left: event.key === "ArrowLeft" ? -step : step,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        });
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        const gallery = event.currentTarget;
        drag.current = { id: event.pointerId, x: event.clientX, left: gallery.scrollLeft };
        gallery.setPointerCapture(event.pointerId);
        gallery.classList.add("is-dragging");
      }}
      onPointerMove={(event) => {
        if (drag.current?.id !== event.pointerId) return;
        event.currentTarget.scrollLeft = drag.current.left + drag.current.x - event.clientX;
      }}
      onLostPointerCapture={stopDrag}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
    >
      {children}
    </div>
  );
}

export function SocialMarks() {
  return (
    <span className="social-marks" aria-hidden="true">
      <svg viewBox="0 0 20 14" focusable="false">
        <rect width="20" height="14" rx="4" fill="currentColor" />
        <path d="m8 4 5 3-5 3Z" fill="white" />
      </svg>
      <svg viewBox="0 0 16 16" focusable="false">
        <rect width="16" height="16" rx="4" fill="currentColor" />
        <circle cx="8" cy="8" r="3" fill="none" stroke="white" strokeWidth="1.1" />
        <circle cx="12.1" cy="4" r=".85" fill="white" />
      </svg>
      <svg viewBox="0 0 15 17" focusable="false">
        <path d="M12 3.2a4 4 0 0 1-1.1-2.7H8v10.9a2.1 2.1 0 1 1-2.2-2.1l.7.1v-3l-.7-.1a5 5 0 1 0 5.1 5V5.8a7 7 0 0 0 3.6 1.1V4a4 4 0 0 1-2.5-.8Z" fill="currentColor" />
      </svg>
    </span>
  );
}

export function ExperienceCarousel() {
  const [active, setActive] = useState(0);
  const startX = useRef(null);
  const dots = useRef(null);

  function move(direction, focus = false) {
    const next = (active + direction + experiences.length) % experiences.length;
    setActive(next);
    if (focus) dots.current.children[next].focus();
  }

  return (
    <div
      className="experience-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Bali experiences"
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1, dots.current.contains(event.target));
      }}
    >
      <div
        className="experience-window"
        tabIndex={0}
        aria-label={experiences[active].title}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          startX.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          if (startX.current === null) return;
          const delta = event.clientX - startX.current;
          if (Math.abs(delta) >= 45) move(delta > 0 ? -1 : 1);
          startX.current = null;
        }}
        onPointerCancel={() => { startX.current = null; }}
      >
        {experiences.map(({ title, image, description }, index) => (
          <img
            key={title}
            className={`experience-image${index === active ? " is-current" : ""}`}
            src={`/media/${image}`}
            alt={description}
            aria-hidden={index !== active}
            loading="lazy"
            draggable="false"
          />
        ))}
        <div className="experience-caption" aria-live="polite">
          <span key={active}>{experiences[active].title}</span>
        </div>
      </div>
      <div className="carousel-dots" ref={dots} role="group" aria-label="Choose an experience">
        {experiences.map(({ title }, index) => (
          <button
            type="button"
            key={title}
            aria-label={title}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {questions.map(({ question, answer }, index) => {
        const selected = open === index;
        const answerId = `faq-answer-${index + 1}`;

        return (
          <article className={`faq-item${selected ? " is-open" : ""}`} key={question}>
            <h3>
              <button
                type="button"
                aria-expanded={selected}
                aria-controls={answerId}
                onClick={() => setOpen(selected ? -1 : index)}
              >
                {question}
                <span className="faq-chevron" aria-hidden="true" />
              </button>
            </h3>
            <div className="faq-answer" id={answerId} inert={!selected}>
              <div><p>{answer}</p></div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
