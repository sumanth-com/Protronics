import type { LegalPageConfig } from "@/lib/legal/types";

export const TERMS_OF_SERVICE_PAGE: LegalPageConfig = {
  path: "/terms-of-service",
  eyebrow: "LEGAL · PURCHASE & USE",
  title: "Terms of Service",
  subtitle:
    "Understand the terms governing the use of Protronics products, services, and this website.",
  lastUpdated: "30 May 2026",
  seo: {
    title: "Terms & Conditions | Protronics",
    description:
      "Review the terms governing purchases, warranties, trade-ins, and services provided by Protronics.",
    keywords: [
      "Protronics terms",
      "purchase terms",
      "warranty terms",
      "refurbished appliance terms",
    ],
  },
  sections: [
    {
      id: "acceptance-of-terms",
      title: "Acceptance of Terms",
      blocks: [
        {
          type: "paragraph",
          text: "By accessing the Protronics website, placing an enquiry, or purchasing a product, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.",
        },
        {
          type: "paragraph",
          text: "We may update these terms periodically. Continued use of our website or services after changes are posted constitutes acceptance of the revised terms.",
        },
      ],
    },
    {
      id: "product-information",
      title: "Product Information",
      blocks: [
        {
          type: "paragraph",
          text: "Protronics specialises in professionally renewed and refurbished premium appliances. Each unit undergoes our restoration process, including multi-point inspection, sanitisation, and performance verification.",
        },
        {
          type: "list",
          items: [
            "Product images are representative; minor cosmetic variations may exist on individual units.",
            "Specifications (capacity, energy rating, features) are listed to the best of our knowledge and may vary by model year.",
            "“Refurbished,” “renewed,” and “restored” describe appliances that have been inspected, serviced, and certified by Protronics—not brand-new factory stock unless explicitly stated.",
          ],
        },
      ],
    },
    {
      id: "pricing",
      title: "Pricing",
      blocks: [
        {
          type: "paragraph",
          text: "All prices are displayed in Indian Rupees (INR) unless otherwise noted. Prices include applicable taxes where stated at checkout.",
        },
        {
          type: "list",
          items: [
            "Prices may change without prior notice; the price confirmed at order placement applies to your purchase.",
            "Promotional offers, trade-in credits, and bundle discounts are subject to specific campaign terms.",
            "Delivery, installation, or extended service fees—if applicable—will be disclosed before you confirm your order.",
          ],
        },
      ],
    },
    {
      id: "orders",
      title: "Orders",
      blocks: [
        {
          type: "paragraph",
          text: "Placing an enquiry or order constitutes an offer to purchase. Order confirmation—via email, WhatsApp, or written communication—creates a binding agreement subject to these terms.",
        },
        {
          type: "list",
          items: [
            "We reserve the right to decline or cancel orders due to stock availability, pricing errors, or suspected fraud.",
            "You are responsible for providing accurate contact and delivery information.",
            "Order modifications may be accommodated before dispatch; contact us as soon as possible.",
          ],
        },
      ],
    },
    {
      id: "warranty",
      title: "Warranty",
      blocks: [
        {
          type: "paragraph",
          text: "Eligible Protronics appliances include warranty coverage as described on the product page and in our Warranty policy. Warranty terms vary by product category and campaign.",
        },
        {
          type: "callout",
          title: "Standard coverage",
          text: "Most refrigerators include a 1-year Protronics warranty covering manufacturing and restoration-related defects under normal residential use. Full warranty details are available at protronics.in/warranty.",
        },
        {
          type: "paragraph",
          text: "Warranty does not cover misuse, unauthorised repairs, cosmetic wear, or damage from power surges, improper installation, or accidents. Proof of purchase is required for claims.",
        },
      ],
    },
    {
      id: "returns",
      title: "Returns",
      blocks: [
        {
          type: "paragraph",
          text: "We want you to be confident in your purchase. Return eligibility depends on product condition, delivery status, and the reason for return.",
        },
        {
          type: "list",
          items: [
            "Report delivery damage or defects within 48 hours of delivery with photos and description.",
            "Change-of-mind returns may be subject to inspection fees and restocking charges where applicable.",
            "Approved returns must include original accessories and be in the condition received unless otherwise agreed.",
          ],
        },
        {
          type: "paragraph",
          text: "Contact our support team before returning any product. Unauthorised returns may not be accepted.",
        },
      ],
    },
    {
      id: "delivery",
      title: "Delivery",
      blocks: [
        {
          type: "paragraph",
          text: "Delivery timelines are estimates based on your location, product availability, and installation requirements. We will communicate expected dates when your order is confirmed.",
        },
        {
          type: "list",
          items: [
            "Someone aged 18 or above must be present to receive delivery and sign acknowledgement.",
            "Installation services—where offered—are performed by authorised partners according to site readiness requirements.",
            "Delays due to weather, logistics constraints, or force majeure are not grounds for cancellation fees unless otherwise stated.",
          ],
        },
      ],
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      blocks: [
        {
          type: "paragraph",
          text: "When using our website and services, you agree to:",
        },
        {
          type: "list",
          items: [
            "Provide truthful information and not impersonate others.",
            "Use the website only for lawful purposes and not attempt to disrupt our systems.",
            "Ensure adequate electrical supply, ventilation, and space for appliance installation as per manufacturer guidelines.",
            "Maintain appliances according to user manuals and Protronics care recommendations.",
          ],
        },
      ],
    },
    {
      id: "liability",
      title: "Liability",
      blocks: [
        {
          type: "paragraph",
          text: "To the fullest extent permitted by law, Protronics is not liable for indirect, incidental, or consequential damages arising from use of our website or products, except where such limitation is prohibited.",
        },
        {
          type: "paragraph",
          text: "Our total liability for any claim relating to a product or service is limited to the amount you paid for that product, unless mandatory consumer protection laws require otherwise.",
        },
        {
          type: "paragraph",
          text: "Nothing in these terms excludes liability for death or personal injury caused by negligence, fraud, or other liabilities that cannot be limited under applicable law.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        {
          type: "paragraph",
          text: "For questions about these Terms of Service, orders, warranty, or support:",
        },
        {
          type: "list",
          items: [
            "Email: Protronicspro4@gmail.com",
            "Phone: 8861236266 / 8618135976",
            "Website: protronics.in/contact",
            "Business hours: Mon–Sat · 10:00 AM – 7:00 PM IST",
          ],
        },
        {
          type: "paragraph",
          text: "Disputes are governed by the laws of India. Courts in Bengaluru, Karnataka shall have exclusive jurisdiction, subject to applicable consumer protection forums.",
        },
      ],
    },
  ],
};
