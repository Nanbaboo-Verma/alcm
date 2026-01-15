"use client";

import React, { useState } from "react";
import styles from "./contact.module.css";
import Toast from "../components/Toast";
import Modal from "../components/Modal";
import CardSection from "./couser-info";
import { Mail, MapPin, Phone } from "react-feather";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!/^\d{10,}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      setError("Please enter a valid phone number");
      return false;
    }
    if (!formData.message.trim()) {
      setError("Message is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to submit form. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-gray-100 dark:bg-black py-8 px-4"
    >
      <div className="py-10">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">Get in Touch</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          We're here to help and answer any questions you might have.
        </p>
      </div>
      <CardSection />
      <div className="flex md:flex-row flex-col mt-32 max-w-7xl mx-auto gap-8">
        <div className="md:w-1/2">
          <section className="bg-gray-100">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Contact Our Support Team
            </h2>
            {/* Description */}
            <p className="text-gray-600 mb-8">
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus id quod maxime placeat facere possimus, omnis
              voluptas assumenda est, omnis dolor repellendus.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700 text-sm">
                  3rd Avenue, 83 Manhattan, New York, USA
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700 text-sm">+1 212 425 8617</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700 text-sm">information@office.com</span>
              </div>
            </div>

          </section>
        </div>

        {/* form section */}
        <div
          className="md:w-1/2 bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md"
        >
          {submitted && (
            <div className={styles.successMessage}>
              ✓ Thank you for your message! We'll get back to you soon.
            </div>
          )}
          <Toast isOpen={submitted} type="success" position="top-center" message="Thank you for your message! We'll get back to you soon" />
          <Toast isOpen={error === "" ? false : true} type="error" position="top-center" message={error} customClass={styles.errorMessage} />
          <Modal isOpen={submitted} onClose={() => setSubmitted(false)}>Thank you for your message! We'll get back to you soon</Modal>

          {error && <div className={styles.errorMessage}>✗ {error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  First Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber" className={styles.label}>
                Phone Number <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message <span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message here"
                className={styles.textarea}
                rows={6}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="h-10  md:w-1/3 w-full md:h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white md:text-base text-sm font-normal md:px-5 px-4 rounded-3xl transition-colors cursor-pointer"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>

            {/* <button type="submit" className={styles.submitButton}>
              Send Message
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
}
