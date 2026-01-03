"use client";

import React, { useState } from "react";
import styles from "./contact.module.css";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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

    try {
      // Here you can add your API call to handle the form submission
      console.log("Form submitted:", formData);

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
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 dark:bg-black py-8 px-4"
    >
      <div
        className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md"
      >
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.description}>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        {submitted && (
          <div className={styles.successMessage}>
            ✓ Thank you for your message! We'll get back to you soon.
          </div>
        )}

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

          <button
            type="submit"
            className="h-10 md:h-11 bg-blue-600 hover:bg-blue-700 text-white md:text-base text-sm font-normal md:px-5 px-4 rounded-3xl transition-colors cursor-pointer"
          >
            Send Message
          </button>

          {/* <button type="submit" className={styles.submitButton}>
            Send Message
          </button> */}
        </form>
      </div>
    </div>
  );
}
