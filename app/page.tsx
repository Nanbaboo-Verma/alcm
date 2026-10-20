import Banner from "./(pages)/home/banner/page";
import LookingFor from "./(pages)/home/LookingFor/page";
import Student from "./(pages)/home/student/student";
import Mater from "./(pages)/home/mater/page";
import TrustedStudentsTestimonials from "./_components/TrustedStudents";
import TrendingCourses from "./_components/TrendingCourses";

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
