import { motion } from "framer-motion";

const testimonialVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      type: "spring",
    },
  }),
};

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Owner, Bistro 42",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      text: "TasteBuds has completely transformed how our kitchen operates. No more lost orders or miscommunications between our servers and kitchen staff.",
    },
    {
      name: "Michael Chen",
      role: "Manager, Spice Garden",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "The analytics feature has given us incredible insights into our menu performance. We've been able to optimize our offerings and increase profits by 22%.",
    },
    {
      name: "Emily Rodriguez",
      role: "CEO, Taco Express",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "As we expanded to multiple locations, TasteBuds made it seamless to manage all our restaurants from a single dashboard. Customer support is exceptional too!",
    },
  ];

  return (
    <section
      className="flex justify-center items-center bg-white py-20 px-20 max-md:px-10 max-sm:px-5"
      id="testimonials"
    >
      <div className="flex flex-col items-center max-w-screen-xl w-full">
        <div className="flex flex-col items-center gap-6 mb-16">
          <h2 className="text-4xl font-bold text-center">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-[600px]">
            Join thousands of restaurant owners who have transformed their
            operations with TasteBuds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="bg-white border border-gray-100 rounded-xl shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10),0px_10px_15px_0px_rgba(0,0,0,0.10)] p-8"
              variants={testimonialVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <svg
                    key={idx}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-600 mb-6">{testimonial.text}</p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
