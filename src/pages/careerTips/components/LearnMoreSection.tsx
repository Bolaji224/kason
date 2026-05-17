import React from "react";
import Images from "../../../components/constant/Images";
import { BiChevronRight } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import LearnMoreCard from "./LearnMoreCard";
import FooterSection from "../../../components/reusable/FooterSection";
import ComeJoinUsSection from "../../home/components/ComeJoinUsSection";

const jobData = [
  {
    personImage: Images.SliderImageOne,
    sliderImage: Images.CareerCardImageFour,
    sliderTitle: "4 Pieces of the best career advice",
    sliderDescription:
      "When we are young, we spend so much time thinking about what we will become when we grow up. We imagined what is would be like to work in various fields. We dream of difference we want to make....",
    personName: "John Daniel",
    lastUpdated: "March 2024",
  },
  {
    personImage: Images.SliderImageOne,
    sliderImage: Images.CareerCardImageFive,
    sliderTitle: "4 Pieces of the best career advice",
    sliderDescription:
      "When we are young, we spend so much time thinking about what we will become when we grow up. We imagined what is would be like to work in various fields. We dream of difference we want to make....",
    personName: "Harrison Jean",
    lastUpdated: "April 2023",
  },
  {
    personImage: Images.SliderImageOne,
    sliderImage: Images.CareerCardImageSix,
    sliderTitle: "4 Pieces of the best career advice",
    sliderDescription:
      "When we are young, we spend so much time thinking about what we will become when we grow up. We imagined what is would be like to work in various fields. We dream of difference we want to make....",
    personName: "Marie Johnson",
    lastUpdated: "Jan 2024",
  },
];

const LearnMoreSection: React.FC = () => {
  return (
    <section>
      <div className="flex gap-[1.5rem] xl:ml-[8rem] lg:ml-[8rem] md:ml-[2rem] ml-[2rem] mt-[8rem]">
        <h2 className="flex gap-[2px] font-sans lg:text-[18px] md:text-[16px] sm:text-[12px] justify-center items-center text-[#2aa100]">
          Home <BiChevronRight size={25} />
        </h2>
        <h2 className="flex gap-[2px] font-sans lg:text-[18px] md:text-[16px] sm:text-[12px] justify-center items-center text-[#2aa100]">
          Career Tips <BiChevronRight size={25} />
        </h2>
        <h2 className="lg:text-[18px] md:text-[16px] sm:text-[12px] text-[#646A73]">
          Articles Career Tips
        </h2>
      </div>
      <section>
        <div className="xl:max-w-[1200px] lg:max-w-[900px] md:max-w-[700px] max-w-[350px] mx-auto py-[2rem]">
          <img
            src={Images.CareerSliderImageOne}
            alt="slider"
            className="w-full h-[100%] rounded-md"
          />
        </div>
      </section>
      <section className="flex items-center justify-center xl:space-x-[50rem] lg:space-x-[28rem] md:space-x-[20rem] space-x-[2rem]"></section>
      <section className="flex items-center justify-center">
        <div className="mt-4 xl:max-w-[1200px] lg:max-w-[900px] md:max-w-[700px] max-w-[350px] mx-auto  ">
          <h1 className="text-[16px] sm:text-[24px] font-sans font-semibold tracking-wide">
            CAREER TIPS ON BECOMING VIRTUAL ASSISTANT
          </h1>
          <p className="text-xs sm:text-[14px] leading-[20px] text-gray-500 mt-2 tracking-[0.5px]">
            Becoming a virtual assistant (VA) offers flexibility, a diverse
            workload, the opportunity to manage a variety of tasks, and the
            potential to carve out a rewarding career in a growing field.
            Whether you're starting out or enhancing your skills, these tips can
            help you succeed as a virtual assistant.
          </p>
        </div>
      </section>
      <section className="">
        {/* create vision section */}
        <div className="mt-4 xl:max-w-[1200px] lg:max-w-[900px] md:max-w-[700px] max-w-[350px] mx-auto">
          <h1 className="text-[16px] sm:text-[22px] font-sans font-medium tracking-wide">
            1. Identify Your Niche
          </h1>
          <p className="text-xs sm:text-[14px] leading-[20px] xl:w-[60%] lg:w-[60%] text-gray-500 mt-2 tracking-[0.5px]">
            Virtual assistants can perform a broad range of tasks, from
            administrative duties to specialized services like social media
            management, bookkeeping, or customer support. Identifying a niche
            allows you to target your marketing efforts and build a reputation
            as an expert in a specific area.
          </p>
        </div>
        {/* Plan ahead section */}
        <div className="mt-4 xl:max-w-[1200px] lg:max-w-[900px] md:max-w-[700px] max-w-[350px] mx-auto">
          <h1 className="text-[16px] sm:text-[22px] font-sans font-medium tracking-wide">
            2. Develop Essential Skills
          </h1>
          <p className="text-xs sm:text-[14px] leading-[20px] xl:w-[60%] lg:w-[60%] text-gray-500 mt-2 tracking-[0.5px]">
            To thrive as a VA, you need a mix of hard and soft skills.
            Proficiency in office software (like Microsoft Office or Google
            Workspace), strong communication abilities, and excellent time
            management are crucial. Additionally, familiarity with project
            management tools (such as Trello or Asana), social media platforms,
            and basic graphic design can give you an edge. Soft skills like
            reliability, adaptability, and a proactive attitude are equally
            important.
          </p>
        </div>
        {/* Learn as much as you can section */}
        <div className="mt-4 xl:max-w-[1200px] lg:max-w-[900px] md:max-w-[700px] max-w-[350px] mx-auto">
          <h1 className="text-[16px] sm:text-[22px] font-sans font-medium tracking-wide">
            3. Set Up a Professional Workspace
          </h1>
          <p className="text-xs sm:text-[14px] leading-[20px] xl:w-[60%] lg:w-[60%] text-gray-500 mt-2 tracking-[0.5px]">
            Even though you're working remotely, having a dedicated, quiet
            workspace is essential. Invest in a comfortable chair, a reliable
            computer, high-speed internet, and any other tools you might need. A
            professional environment boosts productivity and helps you maintain
            a work-life balance.
          </p>
        </div>
        <div className="mt-4 xl:max-w-[1200px] lg:max-w-[900px] md:max-w-[700px] max-w-[350px] mx-auto">
          <h1 className="text-[16px] sm:text-[22px] font-sans font-medium tracking-wide">
            4. Market Yourself Effectively
          </h1>
          <p className="text-xs sm:text-[14px] leading-[20px] xl:w-[60%] lg:w-[60%] text-gray-500 mt-2 tracking-[0.5px]">
            Marketing is key to growing your VA business. Develop a compelling
            elevator pitch and craft a professional portfolio that highlights
            your expertise. Use social media, blogging, and email newsletters to
            reach potential clients. Don’t be afraid to ask for referrals from
            satisfied clients—word of mouth can be incredibly powerful.
          </p>
        </div>
        <div className="mt-4 xl:max-w-[1200px] lg:max-w-[900px] md:max-w-[700px] max-w-[350px] mx-auto">
          <h1 className="text-[16px] sm:text-[22px] font-sans font-medium tracking-wide">
            5. Set Clear Boundaries
          </h1>
          <p className="text-xs sm:text-[14px] leading-[20px] xl:w-[60%] lg:w-[60%] text-gray-500 mt-2 tracking-[0.5px]">
            Working remotely can blur the lines between work and personal life.
            Set clear boundaries to avoid burnout. Establish specific working
            hours and communicate them to your clients. Take regular breaks and
            ensure you have time for personal activities to maintain a healthy
            work-life balance.
          </p>
        </div>
        <div className="mt-4 xl:max-w-[1200px] lg:max-w-[900px] md:max-w-[700px] max-w-[350px] mx-auto">
          <h1 className="text-[16px] sm:text-[22px] font-sans font-medium tracking-wide">
            6. Provide Exceptional Service
          </h1>
          <p className="text-xs sm:text-[14px] leading-[20px] xl:w-[60%] lg:w-[60%] text-gray-500 mt-2 tracking-[0.5px]">
            Providing exceptional service is the best way to retain clients and
            attract new ones. Be responsive, meet deadlines, and go the extra
            mile to exceed client expectations. Building a reputation for
            reliability and quality work will help you stand out in a
            competitive market.
          </p>
          <p className="text-xs sm:text-[14px] leading-[20px] xl:w-[60%] lg:w-[60%] text-gray-500 py-[2rem] mt-2 tracking-[0.5px]">
            In conclusion, Becoming a successful virtual assistant requires a
            blend of skill, strategy, and perseverance. By identifying your
            niche, continually improving your skills, and building strong client
            relationships, you can create a thriving VA career. Remember,
            success doesn’t happen overnight, but with dedication and hard work,
            you can achieve your goals and enjoy a fulfilling career as a
            virtual assistant.
          </p>
        </div>
        <div className=" ml-[7.5rem] w-[50%]   border-[1px] border-[#2AA100] mt-[2rem]" />
        <div className="mt-4 xl:max-w-[1200px] lg:max-w-[900px] md:max-w-[700px] max-w-[350px] mx-auto">
          <h1 className="text-[16px] sm:text-[20px] font-sans font-medium tracking-wide">
            Related Tips:
          </h1>
        </div>
        <div className="lg:px-[4rem] ">
          <section className="py-[1rem]">
            <div className="flex justify-center">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:items-center justify-center gap-[1rem] space-y-[2rem] sm:space-y-0 py-[2rem]">
                {jobData.map((job, index) => (
                  <LearnMoreCard
                    key={index}
                    sliderDescription={job.sliderDescription}
                    sliderImage={job.sliderImage}
                    sliderTitle={job.sliderTitle}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
        <ComeJoinUsSection />
        <FooterSection />
      </section>
    </section>
  );
};

export default LearnMoreSection;
