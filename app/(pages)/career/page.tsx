import React from "react";

export default function TeacherApplicationForm() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <form className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow space-y-8">

        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6">
          <img
            src="https://www.jotform.com/uploads/ugurg/form_files/Pink%20and%20Blue%20English%20Lessons%20Workshop%20Instagram%20Story.6687a3514c9797.96043906.png"
            alt="Teacher Application"
            className="w-72 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold">Teacher Application</h1>
            <p className="text-gray-600">
              Where Great Teachers Meet Great Opportunities
            </p>
          </div>
        </div>

        {/* Position */}
        <Field label="Position for which you are applying">
          <Input />
        </Field>

        {/* Personal Info */}
        <Section title="Personal Information" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="First Name"><Input /></Field>
          <Field label="Middle Name"><Input /></Field>
          <Field label="Last Name"><Input /></Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Home Phone"><Input type="tel" /></Field>
          <Field label="Work Phone"><Input type="tel" /></Field>
          <Field label="Cell Phone"><Input type="tel" /></Field>
          <Field label="Email"><Input type="email" /></Field>
        </div>

        {/* Education */}
        <Section title="Education" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="High School Name"><Input /></Field>
          <Field label="Years Attended"><Input /></Field>
        </div>

        <RadioGroup label="Graduated?" options={["Yes", "No"]} />

        <Field label="Degree / Major"><Input /></Field>
        <Field label="College Name"><Input /></Field>
        <Field label="Years Attended"><Input /></Field>

        <RadioGroup label="Graduated?" options={["Yes", "No"]} />

        {/* Teaching Experience */}
        <Section title="Teaching Experience" />

        <Textarea label="Most recent position" />
        <Textarea label="Second most recent position" />
        <Textarea label="Third most recent position" />
        <Textarea label="Fourth most recent position" />
        <Textarea label="Employment gaps explanation" />

        {/* Other Experience */}
        <Section title="Other Relevant Experience" />
        <Textarea label="Experience #1" />
        <Textarea label="Experience #2" />
        <Textarea label="Experience #3" />

        {/* References */}
        <Section title="References" />
        <Textarea label="References" />

        {/* Background */}
        <Section title="Background Information" />

        <RadioGroup
          label="Listed on a sex offender registry?"
          options={["Yes", "No"]}
        />
        <RadioGroup
          label="Listed on child/dependent abuse registry?"
          options={["Yes", "No"]}
        />
        <RadioGroup
          label="Ever convicted of a crime?"
          options={["Yes", "No"]}
        />

        <Textarea label="Explain any yes answers" />

        {/* Legal */}
        <RadioGroup
          label="Legally eligible to work in the US?"
          options={["Yes", "No"]}
        />

        <RadioGroup
          label="Able to perform essential job functions?"
          options={["Yes", "No"]}
        />

        {/* License */}
        <RadioGroup
          label="Do you hold a valid teaching license?"
          options={["Yes", "No"]}
        />

        <Field label="Endorsements"><Input /></Field>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

/* Reusable Components */

function Section({ title }: { title: string }) {
  return (
    <h2 className="text-xl font-semibold border-b pb-2">
      {title}
    </h2>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}

function Input({ type = "text" }) {
  return (
    <input
      type={type}
      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

function Textarea({ label } : { label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        className="border rounded-md px-3 py-2 h-40 resize-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function RadioGroup({ label, options } : { label: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2">
          <input type="radio" name={label} className="accent-blue-600" />
          {opt}
        </label>
      ))}
    </div>
  );
}
