import React from "react";
import students from "../../../public/assets/images/students.png";
import { BookOpen, Send, Shield, Star } from "react-feather";

const Banner: React.FC = () => {
    // bg color #f5f0dc
    return (
        <section className="relative overflow-hidden bg-[#f3f0e--8] py-12 pb-24 bg-cover bg-repeat-round" style={{ backgroundImage: "url('/assets/images/banner/new_banner.png')" }}>
            <div className="relative max-w-7xl mx-auto px-4 md:px-5">
                {/* Center Content */}
                {/* <div className="absolute left-0 flex justify-center">
                    <img
                        src="https://png.pngtree.com/png-clipart/20250123/original/pngtree-a-cheerful-young-student-with-long-png-image_20325474.png"
                        alt="Student"
                        className="max-w-[389]"
                    />
                </div> */}

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

                    <h1 className="flex justify-center gap-2 text-4xl font-extrabold leading-tight text-gray-600">
                        <div className="text-[#01276c]">Better Future</div>
                        <div className="text-[#004cd0]">For Your Kids</div>
                    </h1>


                    <p className="mx-auto mt-4 max-w-md text-sm text-gray-600">
                        Let the child be the director, and the actor in his own play
                    </p>

                    <div className="flex justify-center">
                        <button type="submit" className="flex items-center gap-2 h-10 md:h-11 mt-11 mb-5 md:text-base 
                    text-sm font-normal md:px-5 px-4 rounded-3xl cursor-pointer
                    bg-gradient-to-r from-blue-600 to-blue-800 
                    text-white font-medium 
                    shadow-lg shadow-blue-300/50 
                    hover:scale-105 transition duration-300">
                            <Send size={18} />
                            Get Started</button>
                    </div>



                    {/* <div className="flex items-center px-4">
                        <div className="w-full max-w-xl">
                            <div className="flex-1 h-[2px] w-1/6 bg-blue-400 opacity-60"></div>

                            <button className="mx-4 flex items-center gap-2 px-6 py-3 rounded-full 
                    bg-gradient-to-r from-blue-600 to-blue-800 
                    text-white font-medium 
                    shadow-lg shadow-blue-300/50 
                    hover:scale-105 transition duration-300">

                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M14.752 11.168l-9.193-5.3A1 1 0 004 6.732v10.536a1 1 0 001.559.832l9.193-5.3a1 1 0 000-1.732z" />
                                </svg>

                                Get Started
                            </button>

                            <div className="flex-1 h-[2px] w-1/6 bg-blue-400 opacity-60"></div>
                        </div>
                    </div> */}




                    <p className="mx-auto my-6 max-w-lg text-xs text-gray-500">
                        We just don't give our students only lecture but real life
                        experiment, workshops and field experience throughout the journey!
                    </p>

                    {/* Stats */}
                    <div className="mt-14 flex justify-center gap-10 max-w-md mx-auto bg-white shadow rounded p-2">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-[#1E1B4B]">7.5k+</h3>
                            <p className="text-xs text-gray-500">
                                Total active students taking gifted courses
                            </p>
                        </div>

                        <div className="bg-gray-200 w-0.5 "></div>

                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-[#1E1B4B]">50+</h3>
                            <p className="text-xs text-gray-500">
                                Available field programs and increasing
                            </p>
                        </div>
                    </div>
                </div>

                {/* <div className="absolute right-0 top-0 flex justify-center">
                    <img
                        src="/images/kid-left.png"
                        src="https://i.pinimg.com/474x/fd/66/65/fd666566a17eb25065f86b17a26e53c7.jpg"
                        src="https://toppng.com/uploads/preview/school-going-children-png-11552339982mptbl9rfck.png"
                        src="https://p7.hiclipart.com/preview/972/139/782/student-middle-school-education-child-student-school.jpg"
                        src={students.src}
                        alt="Student"
                        className="max-w-[389]"
                    />
                </div> */}
            </div>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2/4 bg-gradient--to-r from--blue-700 to--blue-900 text-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">

                    {/* Item 1 */}
                    <div className="flex items-center gap-4">
                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600/40">
                            <Shield size={18} />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Safe Environment</p>
                            <p className="text-xs text-blue-100">For Every Child</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-10 w-[1px] bg-blue-400/40"></div>

                    {/* Item 2 */}
                    <div className="flex items-center gap-4">
                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600/40">
                            <BookOpen size={18} />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Quality Education</p>
                            <p className="text-xs text-blue-100">For Bright Future</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-10 w-[1px] bg-blue-400/40"></div>

                    {/* Item 3 */}
                    <div className="flex items-center gap-4">
                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600/40">
                            <Star size={18} />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Holistic Development</p>
                            <p className="text-xs text-blue-100">Beyond Classroom</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Banner;
