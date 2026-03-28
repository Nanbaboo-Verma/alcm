"use client";

import React, { useState } from "react";

const data = [


    { id: 1, type: "teacher", name: "Mr. Phool Chand Verma", degination: 'Math', year: 2025 },
    { id: 2, type: "student", name: "Anjali Gupta", class: 10, year: 2025 },

    { id: 3, type: "teacher", name: "Mrs. Subham Gupta", degination: 'Science', year: 2026 },
    { id: 4, type: "student", name: "Rahul Verma", class: 6, year: 2026 },

    { id: 5, type: "teacher", name: "Mr. Sharma", degination: 'English', year: 2027 },
    { id: 6, type: "student", name: "Rohit Kumar", class: 12, year: 2027 },
];

export default function Award() {
    const [activeTab, setActiveTab] = useState("all");
    const [year, setYear] = useState("2026");

    // Filter Logic
    const filteredData = data.filter((item) => {
        const matchTab = activeTab === "all" || item.type === activeTab;
        const matchYear = item.year.toString() === year;
        return matchTab && matchYear;
    });

    //   useEffect(() => {
    //   fetch("/api/awards")
    //     .then(res => res.json())
    //     .then(data => setData(data));
    // }, []);

    return (
        <section className="">
            <div className="bg-blue-900 h-40 flex items-center">
                <div className="max-w-7xl mx-auto">
                    <h1 className="uppercase text-xl font-bold text-white">best teacher & Student of the year {year}</h1>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-16">

                {/* Header */}
                <div className="flex justify-between items-center mb-12 pb-4 flex-wrap gap-4  border-b border-gray-300">

                    {/* Tabs */}
                    <div className="flex bg-blue-800 rounded-lg p-1">
                        {["all", "teacher", "student"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 cursor-pointer rounded-lg font-semibold capitalize transition 
                  ${activeTab === tab
                                        ? "bg-yellow-400 text-black"
                                        : "text-white hover:bg-yellow-300 hover:text-black"}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Year Dropdown */}

                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="border text-black px-4 py-2 rounded font-semibold cursor-pointer"
                    >
                        <option value="2027">2027</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                    </select>
                </div>

                {/* Cards */}

                {filteredData.length > 0 ? <div className="grid md:grid-cols-2 gap-6">
                    {filteredData?.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white text-black p-4 rounded border border-gray-200 shadow-lg hover:scale-105 transition"
                        >
                            <div className="flex gap-5">
                              <div className="min-h-52 min-w-52 h-52 w-52 bg-gray-200 rounded"></div>
                              <p className="text-base text-gray-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt minus, saepe cumque deleniti illo veritatis quis rem sapiente enim accusantium hic repellat officia dolores doloribus vero reprehenderit? Necessitatibus dolorem placeat odit facere quae praesentium sint ab autem, culpa blanditiis odio quibusdam deleniti consequatur amet eveniet</p>
                            </div>

                            {/* <h2 className="text-blue-700 font-bold text-lg capitalize">
                                Best {item.type}
                            </h2> */}
                            <h2 className="text-blue-700 font-bold text-lg capitalize mt-2">
                                {item.name}
                            </h2>
                            {/* <p className="mt-2 font-semibold">{item.name}</p> */}
                            <div className="flex items-center justify-between">
                                {item.type === 'teacher' ? <p className="text-base text-gray-900">{item.degination} Teacher</p> : <p className="text-base text-gray-900">Class {item.class}</p>}
                                {/* <p className="text-sm text-gray-500">Year: {item.year}</p> */}
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-300 pt-5 mt-8">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm text-gray-500 border border-gray-300 min-h-10 h-10 min-w-10 w-10 rounded-full p-1 cursor-pointer">Fb</p>
                                    <p className="text-sm text-gray-500 border border-gray-300 min-h-10 h-10 min-w-10 w-10 rounded-full p-1 cursor-pointer">Inta</p>
                                    <p className="text-sm text-gray-500 border border-gray-300 min-h-10 h-10 min-w-10 w-10 rounded-full p-1 cursor-pointer">Tale</p>
                                     <p className="text-sm text-gray-500 border border-gray-300 min-h-10 h-10 min-w-10 w-10 rounded-full p-1 cursor-pointer">Ytb</p>
                                </div>
                                 <p className="text-sm text-blue-700 cursor-pointer">Get...</p>
                            </div>
                        </div>
                    ))
                    } </div> : (
                    <p className="flex items-center justify-center h-40 text-lg text-gray-400">No data found</p>
                )}


            </div>
        </section>
    );
}