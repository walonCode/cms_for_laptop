

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-2">
      <div className="text-center text-white my-2  border-gray-700 ">
        &copy; {new Date().getFullYear()} CMS For Laptop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
