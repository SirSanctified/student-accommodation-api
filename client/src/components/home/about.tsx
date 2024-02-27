import Image from "next/image";

const About = () => {
  return (
    <section className="my-8 w-full px-4 md:px-8">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row ">
        <div className="w-full sm:w-1/2">
          <h1 className="font-medium opacity-50">About Us</h1>
          <h2 className="mt-2 text-3xl font-semibold capitalize text-indigo-950 sm:text-4xl">
            Helping you focus on what matters - your studies!
          </h2>
          <p className="mt-4 text-lg text-indigo-950 sm:text-xl">
            We understand that finding off-campus housing can be stressful, so
            we&rsquo;ve made our website as easy to use as possible. You can
            search for rooms by location, price, and amenities, and we even have
            a roommate matching service to help you find the perfect people to
            live with. We&rsquo;re here to help you find the perfect place to
            live, so you can focus on what&rsquo;s important to you.
          </p>
        </div>

        <div className="w-full sm:w-1/2">
          <Image
            src="/about.jpg"
            alt="About Us"
            width={500}
            height={500}
            className="w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
