import React from "react";

const FooterSection = ({ title, links }) => (
  <div className="mb-6 md:mb-0">
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <ul>
      {links.map((link, index) => (
        <li key={index} className="mb-2">
          <a href="#" className="hover:underline font-semibold">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const footerSections = [
    {
      title: "About Us",
      links: ["Our Story", "How It Works", "Testimonials"],
    },
    {
      title: "Customer Support",
      links: ["FAQ", "Contact Us", "Shipping Info"],
    },
    {
      title: "Legal",
      links: ["Terms of Service", "Privacy Policy", "Return Policy"],
    },
    {
      title: "Connect With Us",
      links: ["Facebook", "Twitter", "Instagram"],
    },
  ];

  return (
    <footer className="bg-green-100 text-black py-8   right-0">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <FooterSection
              key={index}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-white border-opacity-20 text-center font-semibold">
          <p>&copy; 2024 Second-hand Mobile Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
