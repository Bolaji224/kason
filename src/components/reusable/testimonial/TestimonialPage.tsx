import React from "react";
import Testimonial from "./Testimonial";
import Images from "../../constant/Images";
import FooterSection from "../FooterSection";

const TestimonialsPage: React.FC = () => {
  const testimonials = [
    {
      name: "Cora Shortlet and Lounge",
      image: Images.CoraTestimonialLogo,
      testimonial:
        "Working with Workason has been a game-changer for our Lounge and Shortlets. Their virtual assistant services have streamlined our reservations, managed customer inquiries efficiently, and allowed our staff to focus more on delivering exceptional dining experiences. It is like having an extra set of hands that’s always available and incredibly reliable. Highly recommend!;",
    },
    {
      name: "RedLens Centre",
      image: Images.RedLenceTestimonialLogo,
      testimonial:
        "Since hiring Workason virtual assistant services, our co-working hub has seen a huge boost in efficiency. They manage bookings, handle inquiries, and support our members with anything they need. It's like having an extra team member who's always on top of things. Their help has made our workspace run smoother than ever, and we couldn't; to be happier!",
    },
    {
      name: "Bluway Pharmacy",
      image: Images.BluwayTestimonialLogo,
      testimonial:
        "Partnering with Workason for virtual assistant services has been a tremendous asset to our pharmacy. They handle customer inquiries, manage inventory updates, and assist with scheduling appointments seamlessly. This has allowed our team to focus more on patient care  and less on administrative tasks. Their support has made a noticeable difference in our daily  operations, and we couldn’t be more pleased!",
    },
    {
      name: "Collaborate Africa",
      image: Images.CollaborateAfricaTestimonialLogo,
      testimonial:
        "Bringing Workason on board for our investor’s club has been a remarkable decision. Their virtual assistant services handle member communications, organize events, and keep track  of important schedules flawlessly. It’s like having a dedicated assistant who understands our  needs perfectly. Their professionalism and efficiency have significantly enhanced our operations,  making everything run smoothly. Highly recommend their services!;",
    },

    {
      name: "Leverage Prints",
      image: Images.LeveragePrintTestimonialLogo,
      testimonial:
        "Partnering with Workason for virtual assistant services has been fantastic for our printing and branding business. They've taken over administrative tasks, handled customer orders, and managed our schedule seamlessly. It's freed up our team to concentrate on producing high-quality prints and expanding our services. We';re thrilled with the efficiency and professionalism they bring to the table!;",
    },
 
    // Add more testimonials as needed
  ];

  return (
    <div>
      <div className="bg-gray-100 py-12 mt-[4rem]">
        <h2 className="text-3xl font-bold mt-12 text-center text-green-700 sm:text-3xl md:text-4xl font-sans mb-8">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              name={testimonial.name}
              image={testimonial.image}
              testimonial={testimonial.testimonial}
            />
          ))}
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default TestimonialsPage;
