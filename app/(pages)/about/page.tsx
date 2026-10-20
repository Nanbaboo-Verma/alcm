"use client";

import StudentInfo from "@/app/_components/StudetnInfo";
import { useState, useRef, useEffect } from "react";

// export const metadata = {
//   title: "About - MyApp",
//   description: "About page",
// };

interface Student {
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
}

const students: Student[] = [
  {
    sid: "101",
    name: "Rahul Sharma",
    className: "10A",
    aadhar: "1234-5678-9012",
    mobile: "9876543210",
    email: "rahul@example.com",
    fatherName: "Amit Sharma",
    motherName: "Sunita Sharma",
    address: "Model Town, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    sid: "102",
    name: "Priya Verma",
    className: "9B",
    aadhar: "2345-6789-0123",
    mobile: "9123456780",
    email: "priya@example.com",
    fatherName: "Rajesh Verma",
    motherName: "Meena Verma",
    address: "Civil Lines, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    sid: "103",
    name: "Aarav Singh",
    className: "8A",
    aadhar: "3456-7890-1234",
    mobile: "9812345670",
    email: "aarav@example.com",
    fatherName: "Harpreet Singh",
    motherName: "Kiran Singh",
    address: "Sarabha Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    sid: "104",
    name: "Ananya Gupta",
    className: "10B",
    aadhar: "4567-8901-2345",
    mobile: "9890123456",
    email: "ananya@example.com",
    fatherName: "Sanjay Gupta",
    motherName: "Pooja Gupta",
    address: "BRS Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    sid: "105",
    name: "Arjun Patel",
    className: "7A",
    aadhar: "5678-9012-3456",
    mobile: "9876012345",
    email: "arjun@example.com",
    fatherName: "Mahesh Patel",
    motherName: "Rekha Patel",
    address: "Dugri Road, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    sid: "106",
    name: "Simran Kaur",
    className: "9A",
    aadhar: "6789-0123-4567",
    mobile: "9811122233",
    email: "simran@example.com",
    fatherName: "Gurpreet Singh",
    motherName: "Jaspreet Kaur",
    address: "Pakhowal Road, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    sid: "107",
    name: "Vivaan Mehta",
    className: "8B",
    aadhar: "7890-1234-5678",
    mobile: "9822233344",
    email: "vivaan@example.com",
    fatherName: "Rohit Mehta",
    motherName: "Neha Mehta",
    address: "Haibowal Kalan, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    sid: "108",
    name: "Isha Malhotra",
    className: "10A",
    aadhar: "8901-2345-6789",
    mobile: "9833344455",
    email: "isha@example.com",
    fatherName: "Vikas Malhotra",
    motherName: "Ritu Malhotra",
    address: "Ferozepur Road, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    sid: "109",
    name: "Aditya Joshi",
    className: "6B",
    aadhar: "9012-3456-7890",
    mobile: "9844455566",
    email: "aditya@example.com",
    fatherName: "Deepak Joshi",
    motherName: "Kavita Joshi",
    address: "Jamalpur, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    sid: "110",
    name: "Meera Kapoor",
    className: "9C",
    aadhar: "1023-4567-8901",
    mobile: "9855566677",
    email: "meera@example.com",
    fatherName: "Anil Kapoor",
    motherName: "Sunita Kapoor",
    address: "Rajguru Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/10.jpg",
  },

  {
    sid: "111",
    name: "Kabir Bansal",
    className: "8A",
    aadhar: "1123-4567-8901",
    mobile: "9866677788",
    email: "kabir@example.com",
    fatherName: "Nitin Bansal",
    motherName: "Shweta Bansal",
    address: "Gill Road, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    sid: "112",
    name: "Saanvi Arora",
    className: "7B",
    aadhar: "1223-4567-8901",
    mobile: "9877788899",
    email: "saanvi@example.com",
    fatherName: "Manoj Arora",
    motherName: "Renu Arora",
    address: "Miller Ganj, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    sid: "113",
    name: "Reyansh Sethi",
    className: "10C",
    aadhar: "1323-4567-8901",
    mobile: "9888899900",
    email: "reyansh@example.com",
    fatherName: "Aakash Sethi",
    motherName: "Divya Sethi",
    address: "Sunder Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    sid: "114",
    name: "Myra Khanna",
    className: "6A",
    aadhar: "1423-4567-8901",
    mobile: "9899900011",
    email: "myra@example.com",
    fatherName: "Karan Khanna",
    motherName: "Radhika Khanna",
    address: "Field Ganj, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    sid: "115",
    name: "Krishna Yadav",
    className: "9A",
    aadhar: "1523-4567-8901",
    mobile: "9800011122",
    email: "krishna@example.com",
    fatherName: "Ramesh Yadav",
    motherName: "Sunita Yadav",
    address: "Shimlapuri, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    sid: "116",
    name: "Aditi Chawla",
    className: "8C",
    aadhar: "1623-4567-8901",
    mobile: "9811123344",
    email: "aditi@example.com",
    fatherName: "Raj Chawla",
    motherName: "Pallavi Chawla",
    address: "New Kundan Puri, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/16.jpg",
  },
  {
    sid: "117",
    name: "Ishaan Gill",
    className: "7A",
    aadhar: "1723-4567-8901",
    mobile: "9822234455",
    email: "ishaan@example.com",
    fatherName: "Baljit Gill",
    motherName: "Harleen Gill",
    address: "Atam Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    sid: "118",
    name: "Pari Sood",
    className: "10B",
    aadhar: "1823-4567-8901",
    mobile: "9833345566",
    email: "pari@example.com",
    fatherName: "Tarun Sood",
    motherName: "Nisha Sood",
    address: "Urban Estate, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    sid: "119",
    name: "Dhruv Thakur",
    className: "6C",
    aadhar: "1923-4567-8901",
    mobile: "9844456677",
    email: "dhruv@example.com",
    fatherName: "Ajay Thakur",
    motherName: "Poonam Thakur",
    address: "Dhandari Kalan, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    sid: "120",
    name: "Navya Jain",
    className: "9B",
    aadhar: "2023-4567-8901",
    mobile: "9855567788",
    email: "navya@example.com",
    fatherName: "Suresh Jain",
    motherName: "Anita Jain",
    address: "Kitchlu Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/20.jpg",
  },

  {
    sid: "121",
    name: "Rudra Oberoi",
    className: "8B",
    aadhar: "2123-4567-8901",
    mobile: "9866678899",
    email: "rudra@example.com",
    fatherName: "Varun Oberoi",
    motherName: "Simmi Oberoi",
    address: "Sahnewal, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    sid: "122",
    name: "Tanya Puri",
    className: "7C",
    aadhar: "2223-4567-8901",
    mobile: "9877789900",
    email: "tanya@example.com",
    fatherName: "Ashok Puri",
    motherName: "Reena Puri",
    address: "Mundian Kalan, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    sid: "123",
    name: "Devansh Rao",
    className: "10A",
    aadhar: "2323-4567-8901",
    mobile: "9888890011",
    email: "devansh@example.com",
    fatherName: "Prakash Rao",
    motherName: "Suman Rao",
    address: "Basti Jodhewal, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    sid: "124",
    name: "Kiara Anand",
    className: "6B",
    aadhar: "2423-4567-8901",
    mobile: "9899901122",
    email: "kiara@example.com",
    fatherName: "Naveen Anand",
    motherName: "Preeti Anand",
    address: "Daresi Road, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  {
    sid: "125",
    name: "Yuvraj Sandhu",
    className: "9C",
    aadhar: "2523-4567-8901",
    mobile: "9800012233",
    email: "yuvraj@example.com",
    fatherName: "Jaswinder Sandhu",
    motherName: "Manpreet Sandhu",
    address: "Moti Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    sid: "126",
    name: "Aanya Bhatia",
    className: "8A",
    aadhar: "2623-4567-8901",
    mobile: "9811124455",
    email: "aanya@example.com",
    fatherName: "Rahul Bhatia",
    motherName: "Shalini Bhatia",
    address: "Chandigarh Road, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/26.jpg",
  },
  {
    sid: "127",
    name: "Atharv Mishra",
    className: "7B",
    aadhar: "2723-4567-8901",
    mobile: "9822235566",
    email: "atharv@example.com",
    fatherName: "Vinod Mishra",
    motherName: "Lata Mishra",
    address: "Giaspura, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/27.jpg",
  },
  {
    sid: "128",
    name: "Diya Grover",
    className: "10C",
    aadhar: "2823-4567-8901",
    mobile: "9833346677",
    email: "diya@example.com",
    fatherName: "Rakesh Grover",
    motherName: "Nidhi Grover",
    address: "Model Gram, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    sid: "129",
    name: "Veer Choudhary",
    className: "6A",
    aadhar: "2923-4567-8901",
    mobile: "9844457788",
    email: "veer@example.com",
    fatherName: "Dinesh Choudhary",
    motherName: "Rekha Choudhary",
    address: "Brown Road, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/29.jpg",
  },
  {
    sid: "130",
    name: "Sara Dhingra",
    className: "9A",
    aadhar: "3023-4567-8901",
    mobile: "9855568899",
    email: "sara@example.com",
    fatherName: "Amit Dhingra",
    motherName: "Poonam Dhingra",
    address: "Bhamian Road, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/30.jpg",
  },

  {
    sid: "131",
    name: "Aryan Kohli",
    className: "8C",
    aadhar: "3123-4567-8901",
    mobile: "9866679900",
    email: "aryan@example.com",
    fatherName: "Sanjiv Kohli",
    motherName: "Ritu Kohli",
    address: "Jagraon Bridge, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    sid: "132",
    name: "Anvi Talwar",
    className: "7A",
    aadhar: "3223-4567-8901",
    mobile: "9877780011",
    email: "anvi@example.com",
    fatherName: "Gaurav Talwar",
    motherName: "Neelam Talwar",
    address: "Dholewal, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    sid: "133",
    name: "Om Prakash",
    className: "10B",
    aadhar: "3323-4567-8901",
    mobile: "9888891122",
    email: "om@example.com",
    fatherName: "Ravi Prakash",
    motherName: "Kamla Prakash",
    address: "Sherpur, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    sid: "134",
    name: "Riya Saini",
    className: "6C",
    aadhar: "3423-4567-8901",
    mobile: "9899902233",
    email: "riya@example.com",
    fatherName: "Pawan Saini",
    motherName: "Sunita Saini",
    address: "Maya Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    sid: "135",
    name: "Manav Ahuja",
    className: "9B",
    aadhar: "3523-4567-8901",
    mobile: "9800013344",
    email: "manav@example.com",
    fatherName: "Deepak Ahuja",
    motherName: "Rachna Ahuja",
    address: "Ghumar Mandi, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/35.jpg",
  },
  {
    sid: "136",
    name: "Zoya Mirza",
    className: "8B",
    aadhar: "3623-4567-8901",
    mobile: "9811125566",
    email: "zoya@example.com",
    fatherName: "Imran Mirza",
    motherName: "Sana Mirza",
    address: "Salem Tabri, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    sid: "137",
    name: "Kartik Bedi",
    className: "7C",
    aadhar: "3723-4567-8901",
    mobile: "9822236677",
    email: "kartik@example.com",
    fatherName: "Rajiv Bedi",
    motherName: "Seema Bedi",
    address: "Bharat Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/37.jpg",
  },
  {
    sid: "138",
    name: "Jiya Walia",
    className: "10A",
    aadhar: "3823-4567-8901",
    mobile: "9833347788",
    email: "jiya@example.com",
    fatherName: "Mandeep Walia",
    motherName: "Gurmeet Walia",
    address: "Sanjay Gandhi Colony, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/38.jpg",
  },
  {
    sid: "139",
    name: "Lakshya Arora",
    className: "6B",
    aadhar: "3923-4567-8901",
    mobile: "9844458899",
    email: "lakshya@example.com",
    fatherName: "Vivek Arora",
    motherName: "Monika Arora",
    address: "Bhai Randhir Singh Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/39.jpg",
  },
  {
    sid: "140",
    name: "Mahi Chawla",
    className: "9C",
    aadhar: "4023-4567-8901",
    mobile: "9855569900",
    email: "mahi@example.com",
    fatherName: "Akhil Chawla",
    motherName: "Sakshi Chawla",
    address: "Rishi Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/40.jpg",
  },

  {
    sid: "141",
    name: "Rohan Grewal",
    className: "8A",
    aadhar: "4123-4567-8901",
    mobile: "9866670011",
    email: "rohan@example.com",
    fatherName: "Amar Grewal",
    motherName: "Jasbir Grewal",
    address: "Dhandari Khurd, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    sid: "142",
    name: "Ira Suri",
    className: "7B",
    aadhar: "4223-4567-8901",
    mobile: "9877781122",
    email: "ira@example.com",
    fatherName: "Kunal Suri",
    motherName: "Richa Suri",
    address: "New Shivaji Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    sid: "143",
    name: "Samarth Batra",
    className: "10C",
    aadhar: "4323-4567-8901",
    mobile: "9888892233",
    email: "samarth@example.com",
    fatherName: "Nikhil Batra",
    motherName: "Anju Batra",
    address: "Rahon Road, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    sid: "144",
    name: "Pihu Tandon",
    className: "6A",
    aadhar: "4423-4567-8901",
    mobile: "9899903344",
    email: "pihu@example.com",
    fatherName: "Vijay Tandon",
    motherName: "Madhu Tandon",
    address: "Chhawani Mohalla, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    sid: "145",
    name: "Neil Khurana",
    className: "9A",
    aadhar: "4523-4567-8901",
    mobile: "9800014455",
    email: "neil@example.com",
    fatherName: "Sahil Khurana",
    motherName: "Ritu Khurana",
    address: "Civil City, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    sid: "146",
    name: "Tara Pahwa",
    className: "8C",
    aadhar: "4623-4567-8901",
    mobile: "9811126677",
    email: "tara@example.com",
    fatherName: "Aman Pahwa",
    motherName: "Naina Pahwa",
    address: "Shastri Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    sid: "147",
    name: "Dev Malhotra",
    className: "7A",
    aadhar: "4723-4567-8901",
    mobile: "9822237788",
    email: "dev@example.com",
    fatherName: "Rajat Malhotra",
    motherName: "Komal Malhotra",
    address: "Prem Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    sid: "148",
    name: "Aarohi Bansal",
    className: "10B",
    aadhar: "4823-4567-8901",
    mobile: "9833348899",
    email: "aarohi@example.com",
    fatherName: "Ankur Bansal",
    motherName: "Shikha Bansal",
    address: "Lajpat Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/48.jpg",
  },
  {
    sid: "149",
    name: "Shaurya Nanda",
    className: "6C",
    aadhar: "4923-4567-8901",
    mobile: "9844459900",
    email: "shaurya@example.com",
    fatherName: "Puneet Nanda",
    motherName: "Ritu Nanda",
    address: "Akash Nagar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/49.jpg",
  },
  {
    sid: "150",
    name: "Ishita Sehgal",
    className: "9B",
    aadhar: "5023-4567-8901",
    mobile: "9855560011",
    email: "ishita@example.com",
    fatherName: "Raman Sehgal",
    motherName: "Pallavi Sehgal",
    address: "Urban Vihar, Ludhiana, Punjab",
    photo: "https://randomuser.me/api/portraits/men/50.jpg",
  },
];

export default function About() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState<string>("");

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeftShadow(el.scrollLeft > 1);

    setShowRightShadow(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    handleScroll();

    const observer = new ResizeObserver(handleScroll);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // search
  const lowerSearch = search.toLowerCase();
  const filteredData = students.filter(
    (item) =>
      item.name?.toLowerCase().includes(lowerSearch) ||
      item.fatherName?.includes(lowerSearch) ||
      item.mobile?.includes(lowerSearch)
  );

  // view click then scroll

  const handleView = (student: Student) => {
    setSelectedStudent(student);

    setTimeout(() => {
      if (detailsRef.current) {
        const top =
          detailsRef.current.getBoundingClientRect().top + window.scrollY - 150;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <div className="">
      <div>
        <div className="h-64 bg-cover bg-[url('https://images.tv9hindi.com/wp-content/uploads/2025/01/kho-kho.jpg')]">
          <h2 className="flex items-center justify-center text-2xl font-bold text-center text-white h-full bg-[#000000b0]">
            About
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Student Information
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Submitted student messages from visitors
            </p>
          </div>
          <div className="w-1/3 flex items-center gap-3">
            <input
              type="text"
              id="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student name or father name or mobile number"
              className="flex-1 h-10 md:h-11 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        {filteredData.length === 0 ? (
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 p-4 rounded-lg">
            ℹ No record found yet.
          </div>
        ) : (
          <div className="w-full rounded-xl border border-slate-200 bg-white">
            {/* Scroll container */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="relative max-h-[600px] overflow-auto rounded-xl"
            >
              <table className="w-full border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr>
                    <th className="sticky left-0 top-0 z-40 w-20 min-w-20 border-b border-r border-slate-200 bg-slate-50 p-4 whitespace-nowrap">
                      ID
                    </th>

                    <th
                      className={`sticky left-20 top-0 z-40 w-52 min-w-52 border-b border-r border-slate-200 bg-slate-50 p-4 whitespace-nowrap ${
                        showLeftShadow
                          ? "shadow-[4px_-4px_8px_-3px_rgba(0,0,0,0.25)]"
                          : ""
                      }`}
                    >
                      Name
                    </th>

                    <th className="sticky top-0 z-30 w-28 min-w-28 border-b border-r border-slate-200 bg-slate-50 p-4 whitespace-nowrap">
                      Class
                    </th>

                    <th className="sticky top-0 z-30 w-40 min-w-40 border-b border-r border-slate-200 bg-slate-50 p-4 whitespace-nowrap">
                      Mobile
                    </th>

                    <th className="sticky top-0 z-30 border-b border-r border-slate-200 bg-slate-50 p-4 whitespace-nowrap">
                      Email
                    </th>

                    <th className="sticky top-0 z-30 border-b border-r border-slate-200 bg-slate-50 p-4 whitespace-nowrap">
                      Aadhaar
                    </th>

                    <th className="sticky top-0 z-30 border-b border-r border-slate-200 bg-slate-50 p-4 whitespace-nowrap">
                      Father Name
                    </th>

                    <th className="sticky top-0 z-30 border-b border-r border-slate-200 bg-slate-50 p-4 whitespace-nowrap">
                      Mother Name
                    </th>

                    <th className="sticky top-0 z-30 border-b border-r border-slate-200 bg-slate-50 p-4 whitespace-nowrap">
                      Address
                    </th>

                    <th
                      className={`sticky right-0 top-0 z-40 border-b border-l border-slate-200 bg-slate-50 p-4 py-3 text-righ whitespace-nowrap ${
                        showRightShadow
                          ? "shadow-[-4px_-4px_8px_-3px_rgba(0,0,0,0.25)]"
                          : ""
                      }`}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.map((student) => (
                    <tr key={student.sid} className="group">
                      {/* Sticky ID */}
                      <td
                        className={`sticky left-0 z-20 border-b border-r border-slate-200  px-4 py-3 font-medium text-slate-500 transition-colors group-hover:bg-slate-50 whitespace-nowrap  ${
                          selectedStudent?.sid === student.sid
                            ? "bg-slate-50"
                            : "bg-white"
                        }`}
                      >
                        {student.sid}
                      </td>

                      {/* Sticky Name */}
                      <td
                        className={`sticky left-20 z-20 border-b border-r border-slate-200 px-4 py-3 font-medium text-slate-900 transition-colors group-hover:bg-slate-50 whitespace-nowrap 
                        ${
                          showLeftShadow
                            ? "shadow-[4px_4px_8px_-3px_rgba(0,0,0,0.25)]"
                            : ""
                        }
                      ${
                        selectedStudent?.sid === student.sid
                          ? "bg-slate-50"
                          : "bg-white"
                      }

                      `}
                      >
                        {student.name}
                      </td>

                      {/* Scrollable columns */}
                      <td
                        className={`border-b border-r border-slate-200 px-4 py-3 text-slate-600 transition-colors group-hover:bg-slate-50 whitespace-nowrap ${
                          selectedStudent?.sid === student.sid
                            ? "bg-slate-50"
                            : "bg-white"
                        }`}
                      >
                        {student.className}
                      </td>

                      <td
                        className={`border-b border-r border-slate-200 px-4 py-3 text-slate-600 transition-colors group-hover:bg-slate-50 whitespace-nowrap ${
                          selectedStudent?.sid === student.sid
                            ? "bg-slate-50"
                            : "bg-white"
                        }`}
                      >
                        {student.mobile}
                      </td>

                      <td
                        className={`border-b border-r border-slate-200 px-4 py-3 text-slate-600 transition-colors group-hover:bg-slate-50 whitespace-nowrap ${
                          selectedStudent?.sid === student.sid
                            ? "bg-slate-50"
                            : "bg-white"
                        }`}
                      >
                        {student.email}
                      </td>

                      <td
                        className={`border-b border-r border-slate-200 px-4 py-3 text-slate-600 transition-colors group-hover:bg-slate-50 whitespace-nowrap ${
                          selectedStudent?.sid === student.sid
                            ? "bg-slate-50"
                            : "bg-white"
                        }`}
                      >
                        {student.aadhar}
                      </td>

                      <td
                        className={`border-b border-r border-slate-200 px-4 py-3 text-slate-600 transition-colors group-hover:bg-slate-50 whitespace-nowrap ${
                          selectedStudent?.sid === student.sid
                            ? "bg-slate-50"
                            : "bg-white"
                        }`}
                      >
                        {student.fatherName}
                      </td>

                      <td
                        className={`border-b border-r border-slate-200 px-4 py-3 text-slate-600 transition-colors group-hover:bg-slate-50 whitespace-nowrap ${
                          selectedStudent?.sid === student.sid
                            ? "bg-slate-50"
                            : "bg-white"
                        }`}
                      >
                        {student.motherName}
                      </td>
                      <td
                        className={`border-b border-slate-200 px-4 py-3 text-slate-600 transition-colors group-hover:bg-slate-50 whitespace-nowrap ${
                          selectedStudent?.sid === student.sid
                            ? "bg-slate-50"
                            : "bg-white"
                        }`}
                      >
                        {student.address}
                      </td>

                      {/* Sticky Action */}
                      <td
                        className={`sticky right-0 z-20 border-b border-l border-slate-200 px-4 py-3 text-right transition-colors group-hover:bg-slate-50 whitespace-nowrap 
                        ${
                          showRightShadow
                            ? "shadow-[-4px_4px_8px_-3px_rgba(0,0,0,0.25)]"
                            : ""
                        }
                        ${
                          selectedStudent?.sid === student.sid
                            ? "bg-slate-50"
                            : "bg-white"
                        }
                      `}
                      >
                        <button
                          onClick={() => handleView(student)}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <br />

        {/* <Modal
          isOpen={selected === null ? false : true}
          onClose={() => setSelected(null)}
          modalSize="xLarge"
          heading="Student Profile Details"
        > */}
        <StudentInfo
          selectedStudent={selectedStudent}
          detailsRef={detailsRef}
        />
        {/* </Modal> */}
      </div>
    </div>
  );
}
