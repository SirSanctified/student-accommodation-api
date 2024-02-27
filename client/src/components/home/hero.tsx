const Hero = () => {
  return (
    <section className="w-full pt-32">
      <div className="relative mx-auto h-[80vh] w-[95%] rounded-lg bg-[url('/hero1.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 flex h-full w-full flex-col items-start justify-center rounded-lg bg-black bg-opacity-50 px-4 sm:px-8 md:px-16">
          <h1 className="flex flex-col gap-4 text-4xl font-bold text-white">
            The Number One <br />
            <span className="text-5xl text-indigo-300">
              Off-Campus Room Finder
            </span>
          </h1>
          <p className="mt-8 text-lg text-white">
            Your easiest way to find off-campus housing.
          </p>
          <div className="mt-8 flex gap-8">
            <button className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-2 text-white transition-all duration-500 ease-linear hover:from-blue-500 hover:to-indigo-500">
              Get Started
            </button>
            <button className="rounded-full border border-white px-6 py-2 text-white transition-all duration-500 ease-linear hover:bg-white hover:text-indigo-600">
              Learn More
            </button>
          </div>
        </div>

        <div className="absolute bottom-0  right-0 flex h-max w-max items-center justify-between gap-8 rounded-t bg-white px-6 py-3 sm:right-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-3xl font-bold text-indigo-950">25+</p>
            <p className="text-sm font-semibold text-indigo-950">Locations</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-3xl font-bold text-indigo-950">1753+</p>
            <p className="text-sm font-semibold text-indigo-950">Students</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-3xl font-bold text-indigo-950">250+</p>
            <p className="text-sm font-semibold text-indigo-950">
              Boarding Houses
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
