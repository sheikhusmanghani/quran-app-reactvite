import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function SurahDetail() {
  const { number } = useParams();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const { data } = await axios.get(
          `https://api.alquran.cloud/v1/surah/${number}/editions/ar.alafasy,ur.asad`
        );

        const combinedData = {
          ...data.data[0], // Arabic
          urduEdition: data.data[1], // Urdu
        };

        setSurah(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [number]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔙 Back Button */}
      <div className="container mx-auto px-6 py-6">
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:text-blue-800 transition"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Surahs
        </Link>
      </div>

      {/* 📖 Surah Header */}
      <div className="container mx-auto px-6 py-4 bg-blue-600 text-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold">{surah.englishName}</h1>
        <p className="text-lg mt-1 opacity-90">
          {surah.englishNameTranslation}
        </p>
        <p className="text-sm mt-1">{surah.revelationType}</p>
      </div>

      {/* 📜 Surah Ayahs */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {surah.ayahs.map((ayah, index) => (
            <div
              key={ayah.number}
              className="p-4 border-b border-gray-200 last:border-0"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  {/* Arabic Text */}
                  <p className="text-2xl text-right font-arabic leading-loose text-gray-900">
                    {ayah.text}
                  </p>

                  {/* Urdu Translation */}
                  <p className="text-lg urdu-font text-gray-600 mt-3">
                    {surah.urduEdition.ayahs[index].text}
                  </p>
                </div>

                {/* Ayah Number Badge */}
                <span className="mt-4 md:mt-0 ml-auto md:ml-4 text-white bg-blue-500 px-3 py-1 rounded-full text-sm">
                  {ayah.numberInSurah}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
