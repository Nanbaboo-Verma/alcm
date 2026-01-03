"use client";

import { useState } from "react";

// export const metadata = {
//   title: "Admission Form - MyApp",
//   description: "Student admission form",
// };

export default function AdmissionForm() {
    const [selectedClass, setSelectedClass] = useState("1");
    const [formData, setFormData] = useState({
        // Student Info
        studentFirstName: "",
        studentMiddleName: "",
        studentLastName: "",
        studentAadhar: "",
        studentPhoto: null as File | null,
        studentMobile: "",
        studentDOB: "",
        studentEmail: "",
        studentAddress: "",
        studentPinCode: "",
        studentDistrict: "",
        studentState: "",
        studentCountry: "",

        // Parent Info
        parentFirstName: "",
        parentMiddleName: "",
        parentLastName: "",
        parentAadhar: "",
        parentPhoto: null as File | null,
        parentMobile: "",
        parentDOB: "",
        parentEmail: "",
        parentAddress: "",
        parentPinCode: "",
        parentDistrict: "",
        parentState: "",
        parentCountry: "",

        // Class and Year
        classSelected: "1",
        year: new Date().getFullYear().toString(),

        // Previous School Details
        schoolName: "",
        schoolAddress: "",
        schoolPinCode: "",
        schoolDistrict: "",
        schoolState: "",
        schoolCountry: "",
        percentage: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "classSelected") {
            setSelectedClass(value);
        }
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, [field]: file }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.studentFirstName || !formData.studentMobile) {
            alert("Please fill in required student information");
            return;
        }
        if (!formData.parentFirstName || !formData.parentMobile) {
            alert("Please fill in required parent information");
            return;
        }

        // Validate previous school details if not class 1
        if (selectedClass !== "1") {
            if (!formData.schoolName || !formData.percentage) {
                alert("Previous school details are required for classes 2-12");
                return;
            }
        }

        console.log("Form submitted:", formData);
        alert("Form submitted successfully!");
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => (currentYear - 5 + i).toString());

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">
                        Student Admission Form
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                        Please fill in all required fields marked with <span className="text-red-500">*</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Student Information Section */}
                    <section className="border-t-2 border-zinc-200 dark:border-zinc-700 pt-6">
                        <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">
                            Student Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="studentFirstName"
                                    value={formData.studentFirstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter first name"
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Middle Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    name="studentMiddleName"
                                    value={formData.studentMiddleName}
                                    onChange={handleInputChange}
                                    placeholder="Enter middle name"
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Last Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    name="studentLastName"
                                    value={formData.studentLastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter last name"
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="studentDOB"
                                    value={formData.studentDOB}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Aadhar Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="studentAadhar"
                                    value={formData.studentAadhar}
                                    onChange={handleInputChange}
                                    placeholder="12-digit aadhar number"
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Mobile Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="studentMobile"
                                    value={formData.studentMobile}
                                    onChange={handleInputChange}
                                    placeholder="10-digit mobile number"
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Email ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="studentEmail"
                                    value={formData.studentEmail}
                                    onChange={handleInputChange}
                                    placeholder="Enter email id"
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Photo <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, "studentPhoto")}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> */}


                        {/* </div> */}

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Pin Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="studentPinCode"
                                    value={formData.studentPinCode}
                                    onChange={handleInputChange}
                                    placeholder="Enter pin code"
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    District <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="studentDistrict"
                                    value={formData.studentDistrict}
                                    onChange={handleInputChange}
                                    placeholder="Enter district name"
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="studentState"
                                    value={formData.studentState}
                                    onChange={handleInputChange}
                                    placeholder="Enter state name"
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="studentCountry"
                                    value={formData.studentCountry}
                                    onChange={handleInputChange}
                                    placeholder="Enter country name"
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="studentAddress"
                                value={formData.studentAddress}
                                onChange={handleInputChange}
                                placeholder="Enter full address"
                                rows={3}
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                required
                            />
                        </div>
                    </section>

                    {/* Parent Information Section */}
                    <section className="border-t-2 border-zinc-200 dark:border-zinc-700 pt-6">
                        <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">
                            Parent Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="parentFirstName"
                                    value={formData.parentFirstName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Middle Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    name="parentMiddleName"
                                    value={formData.parentMiddleName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Last Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    name="parentLastName"
                                    value={formData.parentLastName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Aadhar Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="parentAadhar"
                                    value={formData.parentAadhar}
                                    onChange={handleInputChange}
                                    placeholder="12-digit aadhar number"
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Photo <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, "parentPhoto")}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Mobile Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="parentMobile"
                                    value={formData.parentMobile}
                                    onChange={handleInputChange}
                                    placeholder="10-digit mobile number"
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="parentDOB"
                                    value={formData.parentDOB}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> */}
                        {/* <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Email ID (Optional)
                                </label>
                                <input
                                    type="email"
                                    name="parentEmail"
                                    value={formData.parentEmail}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div> */}

                        {/* </div> */}

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Pin Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="parentPinCode"
                                    value={formData.parentPinCode}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    District <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="parentDistrict"
                                    value={formData.parentDistrict}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="parentState"
                                    value={formData.parentState}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="parentCountry"
                                    value={formData.parentCountry}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="w-full mt-4">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="parentAddress"
                                value={formData.parentAddress}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                required
                            />
                        </div>
                    </section>

                    {/* Class and Year Selection */}
                    <section className="border-t-2 border-zinc-200 dark:border-zinc-700 pt-6">
                        <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">
                            Class and Year
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Select Class <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="classSelected"
                                    value={formData.classSelected}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    {Array.from({ length: 12 }, (_, i) => (i + 1).toString()).map((cls) => (
                                        <option key={cls} value={cls}>
                                            Class {cls}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Select Year <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="year"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Previous School Details (Conditional) */}
                    {selectedClass !== "1" && (
                        <section className="border-t-2 border-zinc-200 dark:border-zinc-700 pt-6 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">
                                Previous School Details
                            </h2>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                                These fields are required for classes 2-12
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        School Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="schoolName"
                                        value={formData.schoolName}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required={selectedClass !== "1"}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        Percentage <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="percentage"
                                        value={formData.percentage}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required={selectedClass !== "1"}
                                    />
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        Pin Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="schoolPinCode"
                                        value={formData.schoolPinCode}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required={selectedClass !== "1"}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        District <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="schoolDistrict"
                                        value={formData.schoolDistrict}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required={selectedClass !== "1"}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="schoolState"
                                        value={formData.schoolState}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required={selectedClass !== "1"}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        Country <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="schoolCountry"
                                        value={formData.schoolCountry}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required={selectedClass !== "1"}
                                    />
                                </div>
                            </div>
                            <div className="w-full mt-4">
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="schoolAddress"
                                    value={formData.schoolAddress}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                    required={selectedClass !== "1"}
                                />
                            </div>
                        </section>
                    )}

                    {/* Submit Button */}
                    <div className="border-t-2 border-zinc-200 dark:border-zinc-700 pt-6 flex gap-4">
                        <button
                            type="reset"
                            className="flex-1 h-10 md:h-11 md:text-base text-sm text-black border border-gray-400 hover:bg-gray-100 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-white font-normal md:px-5 px-4 rounded-3xl transition-colors cursor-pointer"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="h-10 md:h-11 flex-1 bg-blue-600 hover:bg-blue-700 text-white md:text-base text-sm font-normal md:px-5 px-4 rounded-3xl transition-colors cursor-pointer"
                        >
                            Send Message
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}
