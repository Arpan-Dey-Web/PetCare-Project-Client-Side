import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import { ThemeContext } from '../context/ThemeContext';

const WeprovideFeatures = () => {
    const {theme } = useContext(ThemeContext)
    return (
      <div>
        <section
          className={`m-4 md:m-8  p-4 ${
            theme == "dark" ? "text-white" : "text-black"
          }`}
        >
          <div className="container mx-auto p-4 my-6 space-y-2 text-center">
            <h2 className="text-2xl md:text-3xl font-bold ">
              Empowering Love & Second Chances
            </h2>
            <p className="">
              Every tail deserves a happy ending. Here's how we help make that
              happen.
            </p>
          </div>

          <div className="container mx-auto grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Rescue & Shelter",
                desc: [
                  "Safe spaces for every pet",
                  "Emergency rescues",
                  "Care with compassion",
                ],
                icon: "🐶",
              },
              {
                title: "Adoption Matching",
                desc: [
                  "Personalized for families",
                  "Quick and transparent",
                  "Home checks included",
                ],
                icon: "🏡",
              },
              {
                title: "Health & Vaccines",
                desc: [
                  "Routine checkups",
                  "Vaccinations & vet support",
                  "Healthy from nose to tail",
                ],
                icon: "💉",
              },
              {
                title: "Volunteer Programs",
                desc: [
                  "Walk, play, love",
                  "Help build better futures",
                  "Community-driven",
                ],
                icon: "🤝",
              },
              {
                title: "Pet Donations",
                desc: [
                  "Food, blankets, toys",
                  "Fund surgeries & care",
                  "Every gift makes a difference",
                ],
                icon: "🎁",
              },
              {
                title: "Lost & Found",
                desc: [
                  "Reuniting hearts",
                  "Track lost pets",
                  "Quick response system",
                ],
                icon: "🔍",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 ${theme =='dark' ? "card-dark" : "card-light"}`}
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="my-3 text-2xl font-semibold ">
                  {item.title}
                </h3>
                <div className="space-y-1 text-center  leading-tight">
                  {item.desc.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
};

export default WeprovideFeatures;