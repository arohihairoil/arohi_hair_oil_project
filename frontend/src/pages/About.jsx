import React from 'react'
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-1/2 md:max-w-[400px]"
          src={assets.HairOil_photo1}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-[20px]">
          <p>
            Arohi was born out of a passion for natural care and a desire to
            provide effective hair solutions using traditional ingredients. Our
            journey began with a simple idea: to create a hair oil that truly
            nourishes, strengthens, and revitalizes hair from root to tip.
          </p>
          <p>
            Since our inception, we have worked tirelessly to craft a powerful
            blend of Natural and oils that promote healthy hair growth and scalp
            care. Each ingredient is carefully selected to ensure quality,
            purity, and visible results.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Arohi is to help people achieve strong, healthy, and
            beautiful hair naturally. We are committed to delivering safe,
            effective, and trustworthy products that bring confidence and
            satisfaction to our customers.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"OUR "} text2={"PRODUCT BENEFITS"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 gap-6 items-start">
        <div className="border px-10 md:px-16 py-8 flex flex-col gap-5 w-full md:w-1/3 text-[19px]">
          <b className="text-[#D81B60]">Product Benefits :</b>
          <ol className="text-gray-600 flex flex-col gap-1 list-decimal pl-5">
            <li>Helps reduce hair fall</li>
            <li>Promotes healthy hair growth</li>
            <li>Helps remove dandruff</li>
            <li>Repairs frizzy and damaged hair</li>
            <li>Relieves headache and stress</li>
            <li>Makes hair silky and shiny</li>
          </ol>
        </div>

        {/* Ingredients */}
        <div className="border px-10 md:px-16 py-8 flex flex-col gap-5 w-full md:w-1/3 text-[19px]">
          <b className="text-[#D81B60]">Ingredients :</b>
          <ol className="text-gray-600 flex flex-col gap-1 list-disc pl-5">
            <li>Fenugreek</li>
            <li>Bhringraj</li>
            <li>Amla</li>
            <li>Hibiscus</li>
            <li>Ginger</li>
            <li>Rosemary</li>
            <li>Flaxseeds</li>
            <li>Kalonji</li>
            <li>Curry Leaves</li>
            <li>Vitamin E</li>
            <li>Neem</li>
            <li>Coconut Oil</li>
            <li>Castor Oil</li>
            <li>Tulasi</li>
            <li>Moringa Leaves</li>
          </ol>
        </div>

        {/* How to Apply */}
        <div className="border px-10 md:px-16 py-8 flex flex-col gap-5 w-full md:w-1/3 text-[19px]">
          <b className="text-[#D81B60]">How to Apply :</b>
          <ul className="text-gray-600 flex flex-col gap-1 list-decimal pl-5">
            <li>
              Wash your hair with Arohi Hair Growth Shampoo and allow it to dry
              completely.
            </li>
            <li>
              Take a small amount of Arohi Hair Oil and apply it directly to the
              scalp.
            </li>
            <li>Massage gently for 5 minutes to improve blood circulation.</li>
            <li>Leave the oil on your hair for up to 24 hours.</li>
            <li>Wash again and repeat 2–3 times a week for best results.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
