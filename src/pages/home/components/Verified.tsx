import { useNavigate } from "react-router-dom";
import { useCMS } from "../../../hooks/useCMS";
import { safeJsonArray } from "../../../utils/cmsUtils";
import intro  from "../../../images/workason/intro.png";
import Second from "../../../images/workason/Second.png";
import third  from "../../../images/workason/third.png";
import fourth from "../../../images/workason/fourth.png";
import fifth  from "../../../images/workason/fifth.png";

interface HiringOption {
  id: number;
  title: string;
  desc: string;
  btn: string;
  imageKey: string;
  route: string;
}

const HIRING_IMAGES: Record<string, string> = {
  intro, Second, third, fourth, fifth,
};

// Colors stay hardcoded — dynamic Tailwind classes don't survive JIT purging
const CARD_COLORS: string[] = [
  "bg-orange-500 hover:bg-orange-600",
  "bg-green-600 hover:bg-green-700",
  "bg-purple-600 hover:bg-purple-700",
  "bg-orange-500 hover:bg-orange-600",
  "bg-blue-700 hover:bg-blue-800",
];

const DEFAULT_OPTIONS: HiringOption[] = [
  { id: 1, title: 'Work With Workason Directly', desc: 'Dedicated VA or editor assigned to your account',            btn: 'MANAGED SERVICES', imageKey: 'intro',  route: '/candidate-inhouse' },
  { id: 2, title: 'Access the Talent Vault',     desc: 'Workason-managed onboarding and supervision of freelancers.', btn: 'VIEW FREELANCERS',  imageKey: 'Second', route: '/candidate-talentvault' },
  { id: 3, title: 'Hire on Our Marketplace',     desc: 'Communication via Workason-approved systems',                btn: 'FIND FREELANCERS',  imageKey: 'third',  route: '/ordinary' },
  { id: 4, title: 'SkillStamp Certification',    desc: 'Freelancers upskill, pass exams, and get verified.',         btn: 'LEARN MORE',        imageKey: 'fourth', route: '/candidate-smartstart' },
  { id: 5, title: 'SmartStart Matching',         desc: 'AI finds the best talent based on your needs.',              btn: 'GET MATCHED',       imageKey: 'fifth',  route: '/employers-smartstart' },
];

const WorkasonSection = () => {
  const { homepage } = useCMS();
  const navigate = useNavigate();
  const options = safeJsonArray<HiringOption>(homepage.hiring_options_json, DEFAULT_OPTIONS);

  return (
    <section className="bg-gray-50 py-20">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {homepage.hiring_heading}
        </h2>
        <p className="mt-3 text-gray-600">{homepage.hiring_subtitle}</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 bg-green-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800"
        >
          {homepage.hiring_cta_primary}
        </button>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {options.map((item, index) => {
          const colorClass = CARD_COLORS[index % CARD_COLORS.length];
          const imgSrc = HIRING_IMAGES[item.imageKey] ?? intro;
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.id}. {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <button
                  onClick={() => navigate(item.route)}
                  className={`text-white px-6 py-2 rounded-md font-semibold ${colorClass}`}
                >
                  {item.btn}
                </button>
              </div>
              <div className="flex justify-center md:justify-end">
                <img src={imgSrc} alt={item.title} className="max-w-xs md:max-w-sm" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {homepage.hiring_bottom_heading}
        </h3>
        <button
          onClick={() => navigate("/login")}
          className="bg-green-700 text-white px-10 py-3 rounded-md font-semibold hover:bg-blue-800"
        >
          {homepage.hiring_bottom_cta}
        </button>
      </div>

    </section>
  );
};

export default WorkasonSection;
