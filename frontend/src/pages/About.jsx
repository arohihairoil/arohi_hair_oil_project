import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      {/* ABOUT TITLE */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* ABOUT CONTENT */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.HairOil_photo1}
          alt="Arohi Hair Oil – Natural Ayurvedic Hair Growth Oil"
          loading="lazy"
          decoding="async"
          width="400"
          height="400"
          className="
    w-full
    max-w-[260px]
    sm:max-w-[320px]
    md:max-w-[400px]
    h-auto
    object-contain
  "
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-[20px]">
          <p>
            Arohi was created with a focus on traditional personal care
            practices and the use of natural ingredients. Our aim is to offer
            hair care products inspired by time-tested routines for regular use.
          </p>

          <p>
            We carefully select ingredients that are commonly used in hair care
            formulations to maintain consistency and quality. Our products are
            designed to complement everyday hair care and grooming routines.
          </p>

          <b className="text-gray-800">Our Mission</b>

          <p>
            Our mission is to provide thoughtfully formulated hair care products
            that fit naturally into daily self-care practices. We strive to
            deliver reliable products that customers can confidently include in
            their regular hair care routine.
          </p>
        </div>
      </div>

      {/* PRODUCT BENEFITS */}
      <div className="text-xl py-4">
        <Title text1={"OUR "} text2={"PRODUCT DETAILS"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 gap-6 items-start">
        {/* Benefits */}
        <div className="border px-10 md:px-16 py-8 flex flex-col gap-5 w-full md:w-1/3 text-[19px]">
          <b className="text-[#D81B60]">Product Overview :</b>
          <ol className="text-gray-600 flex flex-col gap-1 list-decimal pl-5">
            <li>Designed for regular hair care use</li>
            <li>Commonly used to support daily grooming routines</li>
            <li>Helps maintain hair softness and manageability</li>
            <li>Suitable for general personal care practices</li>
            <li>Inspired by traditional hair care methods</li>
            <li>Intended for external use only</li>
          </ol>
        </div>

        {/* Ingredients */}
        <div className="border px-10 md:px-16 py-8 flex flex-col gap-5 w-full md:w-1/3 text-[19px]">
          <b className="text-[#D81B60]">Ingredients :</b>
          <p className="text-gray-600 text-[18px]">
            The ingredients listed below are commonly used in traditional hair
            care formulations.
          </p>
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
          <b className="text-[#D81B60]">How to Use :</b>
          <ul className="text-gray-600 flex flex-col gap-1 list-decimal pl-5">
            <li>Start with clean, dry hair using a mild shampoo.</li>
            <li>Take a small amount of Arohi Hair Oil.</li>
            <li>Apply gently to the scalp using fingertips.</li>
            <li>Massage lightly for a few minutes.</li>
            <li>Use as part of your regular hair care routine.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
