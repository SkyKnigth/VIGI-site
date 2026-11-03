# Configuration EmailJS VIGI

Les identifiants EmailJS utilisés dans le portfolio ont été préremplis dans `.env`.

**IMPORTANT :** le modèle `template_fh97emc` peut encore envoyer à l’adresse du portfolio. Dans le tableau de bord EmailJS, modifier le champ **To Email** du modèle pour `j.gigou@vigimi.fr` (adresse fixe), puis vérifier les variables `{{sujet}}`, `{{prenom}}`, `{{nom}}`, `{{email}}`, `{{message}}` et définir **Reply To** sur `{{email}}`.

Sans cette modification dans le compte EmailJS, le destinataire VIGI n’est pas garanti. Ne pas définir le destinataire via `{{to_email}}` envoyé par le navigateur.

Lancer `npm install` puis `npm run dev` depuis `frontend` et effectuer un envoi de test. Activer les restrictions de domaine et protections anti-spam EmailJS. Ne jamais placer de mot de passe dans les variables `VITE_`.
