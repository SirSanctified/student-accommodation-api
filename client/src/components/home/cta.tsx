const CTA = () => {
  return (
    <section className="my-8 flex w-full flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center">
      <div className="w-full sm:w-1/2">
        <h3 className="mb-4 text-3xl font-bold capitalize text-indigo-950">
          Find your perfect room with Roomio
        </h3>
        <p className="mb-4 max-w-[80ch] text-indigo-950 opacity-70">
          Roomio is the perfect website for students looking for off-campus
          housing and for landlords looking to rent out their properties. With
          its user-friendly interface, easy-to-use tools, and secure payment
          processing, Roomio makes it easy for students and landlords to connect
          and share their spaces.
        </p>
      </div>
      <button className="justify-self-center rounded-full bg-gradient-to-r from-indigo-950 to-blue-950 px-6 py-3 text-white transition-all duration-500 ease-linear hover:from-blue-950 hover:to-indigo-950 sm:mx-auto">
        Get Started
      </button>
    </section>
  );
};

export default CTA;
