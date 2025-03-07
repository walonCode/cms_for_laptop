import { FaLaptop } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-gray-100 text-gray-900 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Efficient <span className="text-blue-500">Laptop Management</span>
          </h1>
          <p className="text-gray-600 text-lg">
            A modern solution for seamless laptop allocation, tracking, and management.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
              Get Started
            </button>
            <button className="bg-gray-300 text-gray-900 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-400 transition-transform transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image / Icon */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm">
            <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
              <FaLaptop className="text-blue-500 text-6xl mb-4" />
              <h3 className="text-xl font-semibold">Seamless Laptop Tracking</h3>
              <p className="text-gray-500 text-sm text-center">
                Allocate, manage, and track laptops effortlessly with our intuitive platform.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
