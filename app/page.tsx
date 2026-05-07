import Banner from "./home/banner/page";
import LookingFor from "./home/LookingFor/page";
import Student from "./home/student/student";
import Mater from "./home/mater/page";
import TrustedStudentsTestimonials from "./components/TrustedStudents";
import TrendingCourses from "./components/TrendingCourses";
import NewHeader from "./components/NewHeader";
import ToperStudents from "./home/ToperStudents/page";

export default function Home() {
  return (
    <div>
      <Banner />
      <Student />
      <Mater />
      <LookingFor />
      <TrendingCourses />
      <TrustedStudentsTestimonials />
    </div>
  );
}
