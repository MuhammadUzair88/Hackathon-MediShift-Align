const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mission Statement */}
        <div className="text-center md:text-left">
          <p className="text-sm md:text-base">
            Our mission is to provide personalized compassionate care that
            promotes inclusion and enhances the quality of life for individuals
            with disabilities.
          </p>
        </div>

        {/* Placeholder for Logo */}
        <div className="text-center">
          <span className="text-lg font-bold">MediShift-Align</span>
        </div>

        {/* Contact Information */}
        <div className="text-center md:text-right">
          <p>03323655349</p>
          <p>info@MediShift@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
