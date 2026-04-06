export const metadata = {
  title: "About - MyApp",
  description: "About page",
};


interface Student {
  sid: string;
  name: string;
  className: string;
  aadhar: string;
  mobile: string;
  email: string;
  fatherName: string;
  motherName: string;
}

const students: Student[] = [
  {
    sid: "101",
    name: "Rahul Sharma",
    className: "10A",
    aadhar: "1234-5678-9012",
    mobile: "9876543210",
    email: "rahul@example.com",
    fatherName: "Mr. Sharma",
    motherName: "Mrs. Sharma",
  },
  {
    sid: "102",
    name: "Priya Verma",
    className: "9B",
    aadhar: "2345-6789-0123",
    mobile: "9123456780",
    email: "priya@example.com",
    fatherName: "Mr. Verma",
    motherName: "Mrs. Verma",
  },
    {
    sid: "103",
    name: "Priya Verma",
    className: "9B",
    aadhar: "2345-6789-0123",
    mobile: "9123456780",
    email: "priya@example.com",
    fatherName: "Mr. Verma",
    motherName: "Mrs. Verma",
  },
    {
    sid: "104",
    name: "Priya Verma",
    className: "9B",
    aadhar: "2345-6789-0123",
    mobile: "9123456780",
    email: "priya@example.com",
    fatherName: "Mr. Verma",
    motherName: "Mrs. Verma",
  },
];

export default function About() {
  return (
    <div className="max-w-[1200] mx-auto p-5">
      <div>
        <h1 className="text-2xl font-semibold mb-4">About MyApp</h1>
        <p className="text-zinc-700 dark:text-zinc-300">
          This is the About page. Click the header or sidebar links to navigate
          between routes.
        </p>
      </div>



      <div className="overflow-x-auto relative">
      <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border whitespace-nowrap sticky left-0 bg-gray-100">SID</th>
            <th className="px-4 py-2 border whitespace-nowrap sticky left-16 bg-gray-100">Name</th>
            <th className="px-4 py-2 border whitespace-nowrap">Class</th>
            <th className="px-4 py-2 border whitespace-nowrap">Aadhar Number</th>
            <th className="px-4 py-2 border whitespace-nowrap">Mobile Number</th>
            <th className="px-4 py-2 border whitespace-nowrap">Email</th>
            <th className="px-4 py-2 border whitespace-nowrap">Father Name</th>
            <th className="px-4 py-2 border whitespace-nowrap">Mother Name</th>
            <th className="px-4 py-2 border whitespace-nowrap sticky right-0 bg-gray-100">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr
              key={student.sid}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              <td className="px-4 py-2 border sticky left-0 bg-inherit whitespace-nowrap">
                {student.sid}
              </td>
              <td className="px-4 py-2 border sticky left-16 bg-inherit whitespace-nowrap">
                {student.name}
              </td>
              <td className="px-4 py-2 border whitespace-nowrap">
                {student.className}
              </td>
              <td className="px-4 py-2 border whitespace-nowrap">
                {student.aadhar}
              </td>
              <td className="px-4 py-2 border whitespace-nowrap">
                {student.mobile}
              </td>
              <td className="px-4 py-2 border whitespace-nowrap">
                {student.email}
              </td>
              <td className="px-4 py-2 border whitespace-nowrap">
                {student.fatherName}
              </td>
              <td className="px-4 py-2 border whitespace-nowrap">
                {student.motherName}
              </td>
              <td className="px-4 py-2 border sticky right-0 bg-inherit whitespace-nowrap">
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
