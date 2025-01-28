import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center bg-gray-100">
        {/* Content Section */}
        <div className="flex-1 text-center lg:text-left px-6 sm:px-8 lg:px-12 space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Empowering Care <br />
            <span className="text-blue-600">Tailored for You</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl">
            At MediShift Align, we believe in empowering healthcare
            professionals with precision scheduling and inclusive care
            solutions. Our platform is designed to streamline shift allocation,
            ensuring personalized attention for patients and an improved quality
            of life for medical staff. Together, we aim to foster a system that
            values compassion, inclusion, and excellence in healthcare. Let
            MediShift Align be your trusted partner in optimizing care delivery.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all">
              Get Started
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md shadow-md hover:bg-gray-300 transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center px-6 sm:px-8">
          <img
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-lg shadow-lg"
            src="https://images.pexels.com/photos/29941469/pexels-photo-29941469/free-photo-of-healthcare-professionals-conducting-an-ultrasound.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Healthcare Professionals"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

