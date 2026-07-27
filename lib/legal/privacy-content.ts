import type { LegalPageConfig } from "@/lib/legal/types";
import { PROTRONICS_NAP } from "@/lib/local/business";

export const PRIVACY_POLICY_PAGE: LegalPageConfig = {
  path: "/privacy-policy",
  eyebrow: "LEGAL · TRUST & TRANSPARENCY",
  title: "Privacy Policy",
  subtitle:
    "Learn how Protronics collects, uses, and protects your information when you browse, enquire, or purchase from us.",
  lastUpdated: "30 May 2026",
  seo: {
    title: "Privacy Policy | Protronics",
    description:
      "How Protronics collects, uses, stores, and protects personal data when you browse, enquire, trade in, or buy refurbished appliances.",
    keywords: [
      "Protronics privacy policy",
      "data protection",
      "personal information",
      "refurbished appliances privacy",
    ],
  },
  sections: [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      blocks: [
        {
          type: "paragraph",
          text: "We collect information that helps us deliver premium refurbished appliances, respond to enquiries, and improve your experience. The data we collect depends on how you interact with Protronics.",
        },
        {
          type: "heading",
          text: "Information you provide",
        },
        {
          type: "list",
          items: [
            "Name, phone number, email address, and delivery address when you enquire or place an order.",
            "Product preferences, trade-in details, and messages sent via forms, WhatsApp, or email.",
            "Payment-related information processed securely through our payment partners (we do not store full card details on our servers).",
          ],
        },
        {
          type: "heading",
          text: "Information collected automatically",
        },
        {
          type: "list",
          items: [
            "Device type, browser, approximate location, and pages viewed on our website.",
            "Cookies and similar technologies that remember preferences and measure site performance.",
            "Communication metadata such as timestamps when you contact support.",
          ],
        },
      ],
    },
    {
      id: "how-we-use-information",
      title: "How We Use Information",
      blocks: [
        {
          type: "paragraph",
          text: "We use your information only for legitimate business purposes connected to our services.",
        },
        {
          type: "list",
          items: [
            "Processing orders, scheduling delivery, and providing installation support.",
            "Responding to enquiries, warranty claims, and after-sales service.",
            "Sending service updates, order confirmations, and—with your consent—promotional offers.",
            "Improving our website, product catalogue, and customer experience.",
            "Complying with applicable laws, fraud prevention, and dispute resolution.",
          ],
        },
        {
          type: "callout",
          title: "Our commitment",
          text: "We do not sell your personal information to third parties for their independent marketing purposes.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        {
          type: "paragraph",
          text: "Cookies are small files stored on your device that help our website function and remember your preferences.",
        },
        {
          type: "list",
          items: [
            "Essential cookies required for security, session management, and core site features.",
            "Analytics cookies that help us understand how visitors use our pages (aggregated where possible).",
            "Preference cookies that remember theme settings and recently viewed items.",
          ],
        },
        {
          type: "paragraph",
          text: "You can control cookies through your browser settings. Disabling certain cookies may limit some website features.",
        },
      ],
    },
    {
      id: "data-protection",
      title: "Data Protection",
      blocks: [
        {
          type: "paragraph",
          text: "We implement administrative, technical, and organisational measures designed to protect your information against unauthorised access, alteration, or disclosure.",
        },
        {
          type: "list",
          items: [
            "Access to customer data is limited to authorised personnel who need it for their role.",
            "Secure connections (HTTPS) are used when you submit information through our website.",
            "We review our practices periodically and work with reputable service providers who maintain appropriate safeguards.",
          ],
        },
        {
          type: "paragraph",
          text: "While we take reasonable steps to protect your data, no method of transmission over the internet is completely secure. We encourage you to use strong passwords and protect your account credentials.",
        },
      ],
    },
    {
      id: "third-parties",
      title: "Third Parties",
      blocks: [
        {
          type: "paragraph",
          text: "We may share information with trusted partners who help us operate our business, subject to confidentiality obligations.",
        },
        {
          type: "list",
          items: [
            "Payment processors to complete transactions securely.",
            "Logistics and installation partners to fulfil deliveries.",
            "Technology providers for hosting, analytics, and customer communication tools.",
            "Professional advisers where required by law or for legal proceedings.",
          ],
        },
        {
          type: "paragraph",
          text: "Our website may contain links to third-party sites. Their privacy practices are governed by their own policies—we encourage you to review them before providing personal information.",
        },
      ],
    },
    {
      id: "user-rights",
      title: "User Rights",
      blocks: [
        {
          type: "paragraph",
          text: "Depending on applicable law, you may have rights regarding your personal information, including the right to access, correct, or delete certain data, and to withdraw consent for marketing communications.",
        },
        {
          type: "list",
          items: [
            "Request a copy of the personal information we hold about you.",
            "Ask us to correct inaccurate or incomplete information.",
            "Opt out of promotional emails or WhatsApp marketing at any time.",
            "Raise a complaint with us if you believe your data has been handled improperly.",
          ],
        },
        {
          type: "paragraph",
          text: "To exercise these rights, contact us using the details in the Contact Information section. We will respond within a reasonable timeframe.",
        },
      ],
    },
    {
      id: "contact-information",
      title: "Contact Information",
      blocks: [
        {
          type: "paragraph",
          text: "For privacy-related questions, data requests, or concerns about how we handle your information, please reach out to Protronics:",
        },
        {
          type: "list",
          items: [
            "Email: Protronicspro4@gmail.com",
            `Phone: ${PROTRONICS_NAP.telephoneDisplay}`,
            `Address: ${PROTRONICS_NAP.addressDisplay}`,
          ],
        },
        {
          type: "paragraph",
          text: "We may update this Privacy Policy from time to time. Material changes will be reflected on this page with an updated “Last updated” date.",
        },
      ],
    },
  ],
};
