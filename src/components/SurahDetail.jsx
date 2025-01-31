import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

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
          className="flex items-center font-semibold text-blue-600 hover:text-red-800 transition text-lg"
        >
          <ArrowLeftCircleIcon className="h-6 w-auto mr-2 border-2 rounded-full" />
          Back to Surahs
        </Link>
      </div>

      {/* 📖 Surah Header */}
      <div className="container mx-auto px-6 py-4 bg-blue-600 text-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold">
          {surah.englishName} &nbsp;
          <span className="text-lg mt-1 ">
            ( {surah.englishNameTranslation} )
          </span>
        </h1>

        <p className="text-sm mt-1 font-semibold">
          Surah Number : {surah.number}&nbsp; - &nbsp;
          {surah.revelationType == "Meccan" ? "Makki" : "Madani"} - &nbsp;Number
          Of Aayaat : {surah.numberOfAyahs}
        </p>
      </div>

      {/* 📜 Surah Ayahs */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* <span className="font-arabic text-"> بِسْمِ اللّٰهِ الرَّحْمَٰنِ الرَّحِيمِ</span> */}
          {surah.ayahs.map((ayah, index) => (
            <div
              key={ayah.number}
              className="p-4 border-b-2 border-gray-200 last:border-0 "
            >
              <div className="flex fle x-col gap-3 items-baseline md:flex-row md:items-baseline md:justify-between ">
                <div className="flex-1 ">
                  {/* Arabic Text */}
                  <p className="text-2xl text-right font-arabic leading-loose text-gray-900">
                    {ayah.text} .
                  </p>

                  {/* Urdu Translation */}
                  {/* <p className="text-lg urdu-font text-gray-600 mt-3">
                    {surah.urduEdition.ayahs[index].text}
                  </p> */}
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
