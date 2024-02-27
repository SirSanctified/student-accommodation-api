const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-t from-blue-900 to-indigo-900">
      <div className="container mx-auto px-6 py-8">
        <p className="text-center text-gray-300">
          &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
