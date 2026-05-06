"use client";
// src/components/UPCalendar.js
import React, { useEffect, useState } from "react";

export default function Calendar() {
  const [calendarHtml, setCalendarHtml] = useState("");

  useEffect(() => {
    async function fetchCalendar() {
      const res = await fetch(
        "https://www.india.gov.in/api/translation/snippet/no-translation-node/get?url=https://www.india.gov.in/calendar/uttar-pradesh&lang=english&projectId=edc96308-11d6-49a8-855f-fbcd407e094f&cache=true"
      );
      const data = await res.text();
      setCalendarHtml(data);
    }
    fetchCalendar();
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Uttar Pradesh Holiday Calendar
      </h2>
      {/* Inject raw HTML */}
      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: calendarHtml }}
      />
    </div>
  );
}
