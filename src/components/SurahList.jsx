import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SurahList() {
  const [surahs, setSurahs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSurahs = async () => {
    // if data is stored
    if (sessionStorage.getItem("surahs")) {
      setSurahs(JSON.parse(sessionStorage.getItem("surahs")));
      return;
    }

    // if data is NOT stored
    const { data } = await axios.get("https://api.alquran.cloud/v1/surah");
    setSurahs(data.data);
    sessionStorage.setItem("surahs", JSON.stringify(data.data)); //storing
  };

  useEffect(() => {
    fetchSurahs();
    console.log(surahs);
  }, []);

  // Function to remove diacritics (Harakat) from Arabic text
  const removeDiacritics = (text) => {
    return text.normalize("NFKD").replace(/[\u064B-\u065F]/g, "");
  };

  const filteredSurahs = surahs.filter((surah) => {
    const normalizedSurahName = removeDiacritics(surah.name); // Arabic name without diacritics
    const normalizedSearch = removeDiacritics(searchTerm); // Search term without diacritics

    return (
      surah.englishName.toLowerCase().match(searchTerm.toLowerCase()) ||
      normalizedSurahName.includes(normalizedSearch) || // Compare without diacritics
      surah.number.toString().startsWith(searchTerm)
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-10">
        {/* 🔍 Search Bar */}
        <div className="relative mb-8 max-w-lg mx-auto">
          <MagnifyingGlassIcon className="absolute left-4 top-3 h-6 w-6 text-gray-500" />
          <input
            type="text"
            placeholder="Search Surah Name Or Number. etc Fatiha Or 1..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 📖 Surah Grid */}
        {filteredSurahs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSurahs.map((surah) => (
              <Link
                to={`/surah/${surah.number}`}
                key={surah.number}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white bg-blue-500 px-2 rounded-full  ">
                    {surah.number}
                  </span>
                  <span className="text-sm px-3 py-1 bg-blue-500 text-white rounded-full">
                    {surah.revelationType == "Meccan" ? "Makki" : "Madani"}
                  </span>
                </div>

                <div className="mt-4 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {surah.englishName}
                  </h3>
                  <p className="text-gray-500">
                    {surah.englishNameTranslation}
                  </p>
                </div>

                <div className="mt-3 font-arabic font-semibold text-gray-800 text-3xl text-center ">
                  {surah.name}
                </div>

                <div className="mt-3 text-sm text-center bg-blue-500 text-white rounded-xl py-1">
                  Total Aayaat : {surah.numberOfAyahs}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* if search does not match  */}
        {filteredSurahs.length <= 0 && (
          <div className="flex items-center justify-center h-36">
            <span className="text-gray-500 text-center text-lg font-semibold">
              No Surah matches your search ! Try another name or number. 🔍
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
