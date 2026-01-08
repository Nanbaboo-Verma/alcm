"use client";

import React, { useState, useEffect } from "react";

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  message: string;
  createdAt: string;
}

export default function ContactInfoPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/contact-us/get");
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch contacts");
          return;
        }

        setContacts(data.contacts);
      } catch (err) {
        setError("Failed to load contacts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Contact Information
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Submitted contact messages from visitors
        </p>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Loading contacts...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg">
            ✗ {error}
          </div>
        ) : contacts.length === 0 ? (
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 p-4 rounded-lg">
            ℹ No contacts found yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">
                    First Name
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">
                    Last Name
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">
                    Phone Number
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">
                    Message
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">
                    Submitted Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white">
                      {contact.firstName}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white">
                      {contact.lastName}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white">
                      {contact.phoneNumber}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white max-w-xs truncate">
                      {contact.message}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white text-sm">
                      {new Date(contact.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          <p>Total contacts: <strong>{contacts.length}</strong></p>
        </div>
      </div>
    </div>
  );
}
