import React, { useState } from "react";

// Step type
export type Step = {
  id: number;
  title: string;
  content?: React.ReactNode;
};

type StepperProps = {
  steps: Step[];
  initialStep?: number;
};

export default function Stepper({ steps, initialStep = 1 }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const goToStep = (id: number) => {
    setCurrentStep(id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Stepper Header */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="flex-1 flex items-center">
              <div
                className="flex flex-col items-center w-full cursor-pointer"
                onClick={() => goToStep(step.id)}
              >
                {/* Circle */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isActive
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {isCompleted ? "✓" : step.id}
                </div>

                {/* Label */}
                <p
                  className={`mt-2 text-sm text-center transition-all
                  ${isActive ? "text-blue-500 font-medium" : "text-gray-500"}`}
                >
                  {step.title}
                </p>
              </div>

              {/* Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`flex-auto border-t-2 mx-2 transition-all
                  ${
                    currentStep > step.id
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>


      {/* Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === steps.length}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}



