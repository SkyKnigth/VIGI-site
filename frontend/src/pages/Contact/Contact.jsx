
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const SUBJECTS = [
  'Adhésion et résiliation',
  "Problème d'accès à l'espace adhérent",
  "Demande d'accompagnement syndical",
  "Signalement d'une situation professionnelle",
  'Question sur mes droits',
  'Autre',
];

const initialForm = {
  subject: '',
  otherSubject: '',
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();


  // Diagnostic temporaire du Service ID
  const serviceDiagnostic = serviceId
    ? JSON.stringify(serviceId)
    : 'NON DÉFINI';

  function update(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('');

    if (busy) return;

    setBusy(true);

    if (!serviceId || !templateId || !publicKey) {
      setStatus(
        'Erreur : un ou plusieurs identifiants EmailJS sont absents.'
      );
      setBusy(false);
      return;
    }

    // Préparation des données du formulaire
    const templateParams = {
      subject:
        form.subject === 'Autre'
          ? form.otherSubject.trim()
          : form.subject,
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };

    try {
      // Envoi direct des données à EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        { publicKey }
      );

      if (response.status === 200) {
        setStatus('Votre message a bien été envoyé à VIGI.');
        setForm(initialForm);
      } else {
        setStatus(
          `Réponse EmailJS : ${response.status} - ${response.text}`
        );
      }
    } catch (error) {
      // Affichage de l'erreur sans ouvrir la console
      const errorCode = error?.status ?? 'inconnu';
      const errorMessage =
        error?.text ||
        error?.message ||
        "L'envoi du message a échoué.";

      setStatus(
        `Erreur EmailJS (${errorCode}) : ${errorMessage}`
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <main className="container contact-page">
        <div className="page-intro">
          <h1 className="page-title">Contactez VIGI</h1>
          <p>
            Une question ou besoin d'un accompagnement ?
            Adressez votre demande au syndicat.
          </p>
        </div>

        <div className="contact-layout">
          <section
            className="contact-unified-panel"
            aria-label="Coordonnées et formulaire de contact"
          >
            <div className="contact-location">
              <div className="contact-address-notice">
                <h3>Adresse de correspondance</h3>
                <p>
                  L'adresse indiquée ci-dessous est uniquement destinée
                  à la réception du courrier. VIGI ne dispose pas de
                  locaux d'accueil du public à cette adresse.
                </p>
              </div>
                <div className="contact-map">
                  <iframe
                    title="Carte Google Maps – VIGI, Domont"
                    src="https://www.google.com/maps?q=7%20rue%20Descartes%2C%2095330%20Domont&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
            </div>

            <form
              className="form-panel contact-form"
              onSubmit={handleSubmit}
            >
              <p className="contact-form__note">
                Les champs marqués d'un * sont obligatoires.
              </p>

              <label className="field" htmlFor="contact-subject">
                Sujet *
              </label>

              <select
                id="contact-subject"
                required
                value={form.subject}
                onChange={(event) =>
                  update('subject', event.target.value)
                }
              >
                <option value="" disabled>
                  — Choisir un sujet —
                </option>

                {SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              {form.subject === 'Autre' && (
                <div className="contact-form__other">
                  <label className="field" htmlFor="contact-other">
                    Précisez votre sujet *
                  </label>

                  <input
                    id="contact-other"
                    required
                    maxLength={150}
                    value={form.otherSubject}
                    onChange={(event) =>
                      update('otherSubject', event.target.value)
                    }
                  />
                </div>
              )}

              <div className="contact-form__names">
                <div>
                  <label className="field" htmlFor="contact-firstname">
                    Prénom *
                  </label>

                  <input
                    id="contact-firstname"
                    required
                    maxLength={60}
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(event) =>
                      update('firstName', event.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="field" htmlFor="contact-lastname">
                    Nom *
                  </label>

                  <input
                    id="contact-lastname"
                    required
                    maxLength={60}
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(event) =>
                      update('lastName', event.target.value)
                    }
                  />
                </div>
              </div>

              <label className="field" htmlFor="contact-email">
                Adresse e-mail *
              </label>

              <input
                id="contact-email"
                name="email"
                required
                type="email"
                maxLength={254}
                autoComplete="email"
                value={form.email}
                onChange={(event) =>
                  update('email', event.target.value)
                }
              />

              <label className="field" htmlFor="contact-message">
                Message *
              </label>

              <textarea
                id="contact-message"
                name="message"
                required
                rows={7}
                maxLength={4700}
                value={form.message}
                onChange={(event) =>
                  update('message', event.target.value)
                }
                placeholder="Décrivez votre demande…"
              />

              <button
                className="btn btn--solid"
                type="submit"
                disabled={busy}
              >
                {busy ? 'Envoi en cours…' : 'Envoyer'}
              </button>

              {status && (
                <p
                  role="status"
                  aria-live="polite"
                  className="contact-form__status"
                >
                  {status}
                </p>
              )}

              <p className="muted contact-form__disclaimer">
                Les informations transmises sont utilisées
                pour répondre à votre demande.
              </p>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
