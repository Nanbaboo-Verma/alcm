import Banner from "./home/banner/page";
import LookingFor from "./home/LookingFor/page";
import Student from "./home/student/student";
import Mater from "./home/mater/page";
import TrustedStudentsTestimonials from "./components/TrustedStudents";
import TrendingCourses from "./components/TrendingCourses";

export default function Home() {
  return (
    <div>
      <Banner />
      <Mater />
      <LookingFor />
      <TrendingCourses />
      <Student />
      <TrustedStudentsTestimonials />
      
    </div>
  );
}
