import React from "react";

const LookingFor: React.FC = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            What You Looking for?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">
            Our dynamic educational platform offers you the tools and resources
            to propel yourself towards a brighter future.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          
          {/* Teach Card */}
          <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              🎓
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              Do You Want Teach Here
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Our dynamic educational platform offers you the tools supportive
              community.
            </p>

            <button className="mt-6 rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
              Get started
            </button>
          </div>

          {/* Learn Card */}
          <div className="rounded-2xl bg-blue-500 p-8 text-white shadow-lg transition hover:shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              💡
            </div>

            <h3 className="text-lg font-semibold">
              Do You Want Learn Here
            </h3>

            <p className="mt-2 text-sm text-white/80">
              Our dynamic educational platform offers you the tools supportive
              community.
            </p>

            <button className="mt-6 rounded-full bg-yellow-400 px-6 py-2 text-sm font-medium text-white transition hover:bg-yellow-500 cursor-pointer">
              Enroll Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LookingFor;
