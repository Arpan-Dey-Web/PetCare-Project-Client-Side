import React, { useContext } from "react";

const FAQ = () => {
  return (
    <div>
      <section
        className={
          theme === "dark" ? "card-dark text-white" : "card-light text-black"
        }
      >
        <div className="max-w-4xl mx-auto flex flex-col justify-center px-4 py-12 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center mb-10 max-w-2xl mx-auto">
            Got questions about adoption, donations, or volunteering? We've got
            answers to help you give love a home.
          </p>

          <div className="space-y-4">
            <details className="w-full rounded-lg shadow-sm transition">
              <summary className="px-6 py-5 text-lg font-medium cursor-pointer">
                How can I adopt a pet from your platform?
              </summary>
              <p className="px-6 pt-0 pb-5">
                Simply browse available pets, click on their profile, and click
                "Adopt Me." You'll be guided through a simple process including
                an application form and a virtual home visit.
              </p>
            </details>

            <details className="w-full rounded-lg shadow-sm transition">
              <summary className="px-6 py-5 text-lg font-medium cursor-pointer">
                How do I donate food or items to animals in need?
              </summary>
              <p className="px-6 pt-0 pb-5">
                Visit our Donation page and select the items you wish to donate.
                We accept food, toys, blankets, and medicines. Drop-off points
                and pickup options are available!
              </p>
            </details>

            <details className="w-full rounded-lg shadow-sm transition">
              <summary className="px-6 py-5 text-lg font-medium cursor-pointer">
                Can I volunteer even if I have no pet care experience?
              </summary>
              <p className="px-6 pt-0 pb-5">
                Absolutely! We welcome everyone with a kind heart. Whether
                you're helping with walks, events, or content creation — there’s
                always a way to contribute.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
