import React from "react";

const Banner: React.FC = () => {
    // bg color #f5f0dc
    return (
        <section className="relative overflow-hidden bg-[#f3f0e8] py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-5">
                {/* Center Content */}
                <div className="text-center">
                    {/* <h1 className="text-4xl font-extrabold leading-tight bg-gradient-to-r from-blue-700 to-yellow-500 bg-clip-text text-transparent">
                        Better Future For Your Kids
                    </h1> */}

                    {/* <h1 className="text-4xl font-extrabold leading-tight text-yellow-600">
                        Better Future For Your Kids
                    </h1> */}
                     {/* <h1 className="text-4xl font-extrabold leading-tight text-black">
                        Better Future For Your Kids
                    </h1> */}

                    <h1 className="text-4xl font-extrabold leading-tight text-gray-600">
                        Better Future For Your Kids
                    </h1> 


                    <p className="mx-auto mt-4 max-w-md text-sm text-gray-600">
                        Let the child be the director, and the actor in his own play
                    </p>

                    <button type="submit" className="h-10 md:h-11 mt-11 mb-5 bg-black hover:bg-[#383838] text-white md:text-base text-sm font-normal md:px-5 px-4 rounded-3xl transition-colors cursor-pointer">Get Started</button>

                    <p className="mx-auto mt-6 max-w-lg text-xs text-gray-500">
                        We just don't give our students only lecture but real life
                        experiment, workshops and field experience throughout the journey!
                    </p>

                    {/* Stats */}
                    <div className="mt-8 flex justify-center gap-10">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-[#1E1B4B]">7.5k+</h3>
                            <p className="text-xs text-gray-500">
                                Total active students taking gifted courses
                            </p>
                        </div>

                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-[#1E1B4B]">50+</h3>
                            <p className="text-xs text-gray-500">
                                Available field programs and increasing
                            </p>
                        </div>
                    </div>
                </div>


                <div className="grid items-center gap-10 md:grid-cols-3">

                    {/* Left Image */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <img
                                src="/images/kid-left.png"
                                alt="Student"
                                className="relative z-10 w-64 rounded-full"
                            />
                            <div className="absolute inset-0 -z-10 rounded-full bg-orange-400/20"></div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <img
                                src="/images/kid-right.png"
                                alt="Student"
                                className="relative z-10 w-64 rounded-full"
                            />
                            <div className="absolute inset-0 -z-10 rounded-full bg-yellow-400/30"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Banner;
