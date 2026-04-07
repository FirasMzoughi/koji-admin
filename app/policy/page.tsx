import React from 'react';

export const metadata = {
  title: 'Règles de confidentialité - Koji',
  description: 'Politique de confidentialité de l\'application Koji',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-10 px-4 md:px-8 pb-10">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Règles de confidentialité</h1>
        <p className="text-gray-600 mb-4">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Informations que nous collectons</h2>
          <p className="text-gray-600 mb-2">
            Nous collectons les informations que vous nous fournissez directement, notamment :
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Les informations de profil (nom, adresse e-mail, etc.)</li>
            <li>Les données d'utilisation de l'application</li>
            <li>Les informations relatives aux commandes et aux transactions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Utilisation de vos informations</h2>
          <p className="text-gray-600 mb-2">
            Nous utilisons les informations que nous collectons pour :
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Fournir, maintenir et améliorer nos services</li>
            <li>Traiter vos transactions et commandes</li>
            <li>Communiquer avec vous concernant les mises à jour ou le support client</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Partage de vos informations</h2>
          <p className="text-gray-600 mb-2">
            Nous ne partageons pas vos informations personnelles avec des tiers, sauf dans les cas suivants :
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Avec votre consentement explicite</li>
            <li>Pour se conformer à des obligations légales</li>
            <li>Avec nos prestataires de services qui nous aident à opérer l'application</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Sécurité des données</h2>
          <p className="text-gray-600">
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès, l'altération, la divulgation ou la destruction non autorisés.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Vos droits</h2>
          <p className="text-gray-600">
            Vous avez le droit d'accéder, de corriger ou de supprimer vos informations personnelles. Vous pouvez exercer ces droits en nous contactant directement ou en utilisant les paramètres de votre compte.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contact</h2>
          <p className="text-gray-600">
            Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter via le support de l'application.
          </p>
        </section>
      </div>
    </div>
  );
}
