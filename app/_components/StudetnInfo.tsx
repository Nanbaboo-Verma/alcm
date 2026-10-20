import Image from "next/image";

export interface selectedStudent {
  sid: string;
  name: string;
  className: string;
  aadhar: string;
  mobile: string;
  email: string;
  fatherName: string;
  motherName: string;
  address: string;
  photo?: string;
  signature?: string;
  dob?: string;
  gender?: string;
  bloodGroup?: string;
  admissionDate?: string;
}

export default function StudentInfo({
  selectedStudent,
  detailsRef,
}: {
  selectedStudent: selectedStudent | null;
  detailsRef: any;
}) {
  const detail = (label: string, value?: string) => (
    <div className="group min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:border-indigo-200 hover:shadow-[0_4px_14px_rgba(79,70,229,0.07)]">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </p>
      <p className="break-words text-sm font-semibold leading-6 text-slate-800">
        {value?.trim() || "Not provided"}
      </p>
    </div>
  );

  const sectionTitle = (title: string, subtitle: string) => (
    <div className="mb-4 flex items-start gap-3">
      <div className="mt-0.5 h-9 w-1 shrink-0 rounded-full bg-indigo-500" />
      <div>
        <h3 className="text-base font-bold tracking-tight text-slate-800">
          {title}
        </h3>
        <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
      </div>
    </div>
  );

  if (!selectedStudent) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-8 w-8"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-1v6m3-3h-6"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800">
          No Student Selected
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
          Select a student from the table to view their complete profile,
          personal details and documents.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 text-slate-800" ref={detailsRef}>
      {/* Main profile card */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
        {/* Profile banner */}
        <div className="relative overflow-hidden border-b border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-slate-50 p-4 sm:px-8 sm:py-5">
          <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-indigo-100/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-1/3 h-40 w-40 rounded-full bg-violet-100/40 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              <div className="shrink-0 h-[100px] w-[100px] sm:h-[135px] sm:w-[135px] bg-white p-1 rounded-xl shadow">
                {selectedStudent.photo ? (
                  <img
                    src={selectedStudent.photo}
                    alt={selectedStudent.name}
                    height={100}
                    width={100}
                    className="h-full w-full rounded-xl object-cover "
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-3xl font-bold text-white sm:h-24 sm:w-24">
                    {selectedStudent.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    Student Profile
                  </span>
                </div>

                <h2 className="break-words text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {selectedStudent.name}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Student ID:{" "}
                  <span className="font-semibold text-slate-700">
                    {selectedStudent.sid}
                  </span>
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600">
                    Class {selectedStudent.className || "—"}
                  </span>
                  {selectedStudent.gender && (
                    <span className="rounded-lg border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {selectedStudent.gender}
                    </span>
                  )}
                  {selectedStudent.bloodGroup && (
                    <span className="rounded-lg border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600">
                      {selectedStudent.bloodGroup}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden shrink-0 text-right sm:block">
              <div className="mb-2 ml-auto flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-white/80 text-indigo-600 shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3 5 6v5c0 4.5 3 7.5 7 10 4-2.5 7-5.5 7-10V6l-7-3Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 12 2 2 4-4"
                  />
                </svg>
              </div>

              <p className="text-xs font-semibold text-slate-700">
                Student Record
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Profile Information
              </p>
            </div>
          </div>
        </div>

        {/* Profile information */}
        <div className="space-y-8 p-4 sm:p-6 lg:p-7">
          {/* Personal information */}
          <section>
            {sectionTitle(
              "Personal Information",
              "Basic details and identification"
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {detail("Student ID", selectedStudent.sid)}
              {detail("Full Name", selectedStudent.name)}
              {detail("Class / Section", selectedStudent.className)}
              {detail("Date of Birth", selectedStudent.dob)}
              {detail("Gender", selectedStudent.gender)}
              {detail("Blood Group", selectedStudent.bloodGroup)}
            </div>
          </section>

          {/* Contact information */}
          <section>
            {sectionTitle(
              "Contact Information",
              "Student contact details and residence"
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {detail("Mobile Number", selectedStudent.mobile)}
              {detail("Email Address", selectedStudent.email)}
              <div className="sm:col-span-2 lg:col-span-1">
                {detail("Residential Address", selectedStudent.address)}
              </div>
            </div>
          </section>

          {/* Parent details */}
          <section>
            {sectionTitle(
              "Parent / Guardian Details",
              "Family and guardian information"
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {detail("Father's Name", selectedStudent.fatherName)}
              {detail("Mother's Name", selectedStudent.motherName)}
            </div>
          </section>

          {/* School information */}
          <section>
            {sectionTitle(
              "School Information",
              "Admission and enrollment details"
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {detail("Admission Number", selectedStudent.sid)}
              {detail("Class / Section", selectedStudent.className)}
              {detail("Admission Date", selectedStudent.admissionDate)}
            </div>
          </section>

          {/* Documents */}
          <section>
            {sectionTitle(
              "Documents & Identification",
              "Student photo, signature and identity card"
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {/* Photo card */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-indigo-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      Student Photo
                    </h4>
                    <p className="mt-1 text-xs text-slate-400">
                      Profile photograph
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 15-5-5L5 21"
                      />
                    </svg>
                  </span>
                </div>

                <div className="flex min-h-44 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                  {selectedStudent.photo ? (
                    <img
                      src={selectedStudent.photo}
                      alt={`${selectedStudent.name} profile`}
                      className="h-40 w-32 rounded-lg object-cover shadow-sm ring-1 ring-slate-200"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        className="h-10 w-10"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path
                          strokeLinecap="round"
                          d="M4 21v-2a8 8 0 0 1 16 0v2"
                        />
                      </svg>
                      <span className="text-xs font-medium">
                        No photo uploaded
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Signature card */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-indigo-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      Signature
                    </h4>
                    <p className="mt-1 text-xs text-slate-400">
                      Student's signature
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4 16 9-9 4 4-9 9H4v-4Zm7-7 4 4m2-10 3 3-3 3-3-3 3-3Z"
                      />
                    </svg>
                  </span>
                </div>

                <div className="flex min-h-44 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
                  {selectedStudent.signature ? (
                    <img
                      src={selectedStudent.signature}
                      alt={`${selectedStudent.name} signature`}
                      className="max-h-40 w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        className="h-9 w-9"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4 16 9-9 4 4-9 9H4v-4Zm7-7 4 4"
                        />
                      </svg>
                      <span className="text-xs font-medium">
                        No signature uploaded
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* ID card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-indigo-200 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] md:col-span-2 xl:col-span-1">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      Student ID Card
                    </h4>
                    <p className="mt-1 text-xs text-slate-400">
                      Identity card preview
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <circle cx="8" cy="11" r="2" />
                      <path
                        strokeLinecap="round"
                        d="M5.5 16a3 3 0 0 1 5 0M14 10h4m-4 4h4"
                      />
                    </svg>
                  </span>
                </div>

                <div
                  id="student-id-card"
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 p-4 text-white shadow-[0_8px_20px_rgba(79,70,229,0.20)]"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border-[18px] border-white/5" />
                  <div className="pointer-events-none absolute -bottom-12 -left-8 h-32 w-32 rounded-full border-[18px] border-white/5" />

                  <div className="relative">
                    <div className="flex items-center gap-2 border-b border-white/20 pb-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-4h4v4"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-100">
                          Student Identity Card
                        </p>
                        <p className="mt-0.5 text-[9px] text-white/70">
                          STUDENT INFORMATION
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 py-4">
                      <div className="h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl border-2 border-white/40 bg-white/15 shadow-sm">
                        {selectedStudent.photo ? (
                          <img
                            src={selectedStudent.photo}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-2xl font-bold">
                            {selectedStudent.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="break-words text-sm font-bold leading-5">
                          {selectedStudent.name}
                        </p>
                        <p className="mt-1 text-[11px] text-indigo-100">
                          ID: {selectedStudent.sid}
                        </p>
                        <p className="mt-1 text-[11px] text-indigo-100">
                          Class: {selectedStudent.className || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 border-t border-white/20 pt-3">
                      <div className="min-w-0">
                        <p className="text-[9px] uppercase tracking-wider text-indigo-200">
                          Contact Number
                        </p>
                        <p className="mt-1 break-all text-xs font-semibold">
                          {selectedStudent.mobile || "Not provided"}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-md bg-white/15 px-2 py-1 text-[9px] font-semibold text-indigo-50">
                        STUDENT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer note */}
          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11v5m0-8h.01"
              />
            </svg>
            <p className="text-xs leading-5 text-slate-500">
              Missing information and documents will be displayed as "Not
              provided". Please ensure student records are kept up to date.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
