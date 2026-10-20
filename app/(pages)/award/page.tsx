"use client";

import React, { useState } from "react";

const data = [


    { id: 1, type: "teacher", name: "Mr. Phool Chand Verma", degination: 'Math', year: 2025, image: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 2, type: "student", name: "Anjali Gupta", class: 10, year: 2025, image: "https://randomuser.me/api/portraits/women/44.jpg" },

    { id: 3, type: "teacher", name: "Mr. Subham Gupta", degination: 'Science', year: 2026, image: "https://randomuser.me/api/portraits/women/32.jpg" },
    { id: 4, type: "student", name: "Rahul Verma", class: 6, year: 2026, image: "https://randomuser.me/api/portraits/women/22.jpg" },

    { id: 5, type: "teacher", name: "Mr. Sharma", degination: 'English', year: 2027, image: "https://randomuser.me/api/portraits/women/21.jpg" },
    { id: 6, type: "student", name: "Rohit Kumar", class: 12, year: 2027, image: "https://randomuser.me/api/portraits/women/42.jpg" },

    { id: 6, type: "teacher", name: "Mr. Lavkush", degination: 'English', year: 2027, image: "https://randomuser.me/api/portraits/women/23.jpg" },
    { id: 7, type: "student", name: "Kamlesh Kumar", class: 12, year: 2027, image: "https://randomuser.me/api/portraits/women/24.jpg" },
    { id: 8, type: "teacher", name: "Mr. Shyam", degination: 'English', year: 2027, image: "https://randomuser.me/api/portraits/women/25.jpg" },
    { id: 9, type: "teacher", name: "Mr. Ashok Kumar", class: 12, year: 2027, image: "https://randomuser.me/api/portraits/women/26.jpg" },
];

export default function Award() {
    const [activeTab, setActiveTab] = useState("all");
    const [year, setYear] = useState("2027");

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
        <section>
            <div className="bg-blue-900 h-40 flex items-center">
                <div className="max-w-7xl mx-auto">
                    <h1 className="uppercase text-xl font-bold text-yellow-400">best teacher & Student of the year {year}</h1>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-12">

                {/* Header */}
                <div className="flex justify-between items-center mb-8 pb-2 flex-wrap gap-4  border-b border-gray-300">

                    {/* Tabs */}
                    <div className="flex bg-gray-200 rounded p-1 text-sm">
                        {["all", "teacher", "student","Parent","Guest"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 cursor-pointer rounded font-semibold capitalize transition 
                  ${activeTab === tab
                                        ? "bg-gray-300 text-blue-500"
                                        : "text-black hover:bg-gray-300 hover:text-blue-500 hover:text-black"}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Year Dropdown */}

                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="border text-black px-2 py-2 rounded font-semibold cursor-pointer"
                    >
                        <option value="2027">2027</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                    </select>
                </div>

                {/* Cards */}

                {filteredData.length > 0 ? <div className="grid md:grid-cols-3 gap-6">
                    {filteredData?.map((item) => (<>

                        {/* New Design here  */}


                        <div className="relative bg-[radial-gradient(circle_at_center,_#111,_#000)] rounded-2xl px-5 py-8 text-center text-white overflow-hidden">

                            {/* Particles */}
                            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffd700_1px,transparent_1px),radial-gradient(#ffd700_1px,transparent_1px)] bg-[length:6px_6px,12px_12px]"></div>

                            {/* Waves */}
                            <div className="absolute top-[-40px] left-[-20%] w-[150%] h-[120px] opacity-40 blur-[20px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                            <div className="absolute bottom-[-40px] left-[-20%] w-[150%] h-[120px] opacity-40 blur-[20px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="text-sm text-gray-300 tracking-widest uppercase">
                                    ALCM faimaly
                                </div>

                                <div className="text-xl text-shadow-amber-50 font-semibold mt-2 uppercase">
                                    BEST {item.type}
                                </div>

                                <div className="text-3xl text-yellow-400 font-extrabold mb-5 uppercase">
                                    OF THE Year {item.year}
                                </div>

                                {/* Image */}
                                <div className="w-[150px] h-[150px] mx-auto rounded-full p-[6px] bg-gradient-to-br from-yellow-400 to-yellow-700 shadow-[0_0_40px_rgba(255,215,0,0.6)]">
                                    <img
                                        src={item.image}
                                        alt="employee"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>

                                {/* Ribbon */}
                                <div className="relative inline-block mt-4 px-10 py-3 bg-gradient-to-b from-yellow-400 to-yellow-700 text-black font-bold rounded-full shadow-[0_5px_20px_rgba(255,215,0,0.6)]">
                                    {item.name}

                                    {/* Ribbon sides (pseudo replacement) */}
                                    <span className="absolute left-[-10px] top-1/2 w-5 h-5 bg-yellow-700 rotate-45 -translate-y-1/2"></span>
                                    <span className="absolute right-[-10px] top-1/2 w-5 h-5 bg-yellow-700 rotate-45 -translate-y-1/2"></span>
                                </div>

                                {/* Description */}
                                <div className="mt-5 text-sm text-gray-300 leading-relaxed">
                                    Congratulations on your achievement, I hope that by being selected
                                    as the best {item.type}, it will be further improved.
                                </div>
                            </div>
                        </div>




                        {/* <div
                            key={item.id}
                            className="bg-white text-black p-4 rounded border border-gray-200 shadow-lg hover:scale-105 transition"
                        >
                            <div className="flex gap-5">
                                <div className="min-h-52 min-w-52 h-52 w-52 bg-gray-200 rounded"></div>
                                <p className="text-base text-gray-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt minus, saepe cumque deleniti illo veritatis quis rem sapiente enim accusantium hic repellat officia dolores doloribus vero reprehenderit? Necessitatibus dolorem placeat odit facere quae praesentium sint ab autem, culpa blanditiis odio quibusdam deleniti consequatur amet eveniet</p>
                            </div>
                            <h2 className="text-blue-700 font-bold text-lg capitalize mt-2">
                                {item.name}
                            </h2>
                            <div className="flex items-center justify-between">
                                {item.type === 'teacher' ? <p className="text-base text-gray-900">{item.degination} Teacher</p> : <p className="text-base text-gray-900">Class {item.class}</p>}
                         
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
                        </div> */}
                    </>
                    ))
                    } </div> : (
                    <p className="flex items-center justify-center h-40 text-lg text-gray-400">No data found</p>
                )}


            </div>





        </section>
    );
}