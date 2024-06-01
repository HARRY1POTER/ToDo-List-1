"use client";

import React, { useState } from "react";
import axios from "axios";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const [examples, setExamples] = useState([]);
  const [phonetics, setPhonetics] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (word.trim() === "") {
      setError("First enter a word.");
      setDefinition("");
      setSynonyms([]);
      setAntonyms([]);
      setExamples([]);
      setPhonetics([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = response.data;
      const meaning =
        data[0]?.meanings[0]?.definitions[0]?.definition ||
        "No definition found.";
      const synonymsList = data[0]?.meanings[0]?.synonyms || [];
      const antonymsList = data[0]?.meanings[0]?.antonyms || [];
      const exampleList =
        data[0]?.meanings[0]?.definitions[0]?.example || "No example found.";
      const phoneticList = data[0]?.phonetics || [];

      setDefinition(meaning);
      setSynonyms(synonymsList);
      setAntonyms(antonymsList);
      setExamples([exampleList]);
      setPhonetics(phoneticList);
      setError("");
    } catch (error) {
      setError("Word not found.");
      setDefinition("");
      setSynonyms([]);
      setAntonyms([]);
      setExamples([]);
      setPhonetics([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center">
      <div
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg"
        style={{ margin: "7px" }}
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-purple-700">
          Dictionary
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a word"
            value={word}
            onChange={handleInputChange}
            className="border text-black border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-500 text-white py-3 px-4 rounded-2xl w-full hover:bg-purple-600 bg-primary-500 dark:bg-primary-400 shadow-primaryShadow mb-4 hover:bg-primary-600 dark:hover:bg-primary-300 hover:shadow-primaryHover active:shadow-primaryActive transition-all duration-150 active:translate-y-2 items-center justify-center font-semibold text-inline border-purple-950 active:border-transparent border-b-8 select-none focus:outline-none inline-flex"
          >
            Search
          </button>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {definition && (
          <div>
            <p className="text-gray-800 bg-gray-100 p-4 rounded-lg">
              {definition}
            </p>
            {phonetics.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-purple-700">
                  Pronunciation
                </h3>
                {phonetics.map((phonetic, index) => (
                  <div key={index} className="text-gray-800">
                    {/* {phonetic.text && <p>{phonetic.text}</p>} */}
                    {phonetic.audio && (
                      <audio controls>
                        <source src={phonetic.audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                ))}
              </div>
            )}
            {examples.length > 0 && examples[0] !== "No example found." && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-purple-700">
                  Example
                </h3>
                <p className="text-gray-800 bg-gray-100 p-4 rounded-lg">
                  {examples}
                </p>
              </div>
            )}
            {synonyms.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-purple-700">
                  Synonyms
                </h3>
                <ul className="list-disc list-inside">
                  {synonyms.map((synonym, index) => (
                    <li key={index} className="text-gray-800">
                      {synonym}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {antonyms.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-purple-700">
                  Antonyms
                </h3>
                <ul className="list-disc list-inside">
                  {antonyms.map((antonym, index) => (
                    <li key={index} className="text-gray-800">
                      {antonym}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
