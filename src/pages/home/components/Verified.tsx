import intro from "../../../images/workason/intro.png";
import Second from "../../../images/workason/Second.png";
import third from "../../../images/workason/third.png";
import fourth from "../../../images/workason/fourth.png";
import fifth from "../../../images/workason/fifth.png";
import { useNavigate } from "react-router-dom";

const WorkasonSection = () => {

  const navigate = useNavigate();

  const items = [
    {
      id: 1,
      title: "Work With Workason Directly",
      desc: "Dedicated VA or editor assigned to your account",
      btn: "MANAGED SERVICES",
      color: "bg-orange-500 hover:bg-orange-600",
      img: intro,
      route: "/candidate-inhouse",
    },
    {
      id: 2,
      title: "Access the Talent Vault",
      desc: "Workason-managed onboarding and supervision of freelancers.",
      btn: "VIEW FREELANCERS",
      color: "bg-green-600 hover:bg-green-700",
      img: Second,
      route: "/candidate-talentvault",
    },
    {
      id: 3,
      title: "Hire on Our Marketplace",
      desc: "Communication via Workason-approved systems",
      btn: "FIND FREELANCERS",
      color: "bg-purple-600 hover:bg-purple-700",
      img: third,
      route: "/ordinary",
    },
    {
      id: 4,
      title: "SkillStamp Certification",
      desc: "Freelancers upskill, pass exams, and get verified.",
      btn: "LEARN MORE",
      color: "bg-orange-500 hover:bg-orange-600",
      img: fourth,
      route: "/candidate-smartstart",
    },
    {
      id: 5,
      title: "SmartStart Matching",
      desc: "AI finds the best talent based on your needs.",
      btn: "GET MATCHED",
      color: "bg-blue-700 hover:bg-blue-800",
      img: fifth,
      route: "/employers-smartstart",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Hire verified freelancers safely, with or without our help.
        </h2>

        <p className="mt-3 text-gray-600">
          Get the right talent for your business, stress-free.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 bg-green-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800"
        >
          GET STARTED
        </button>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {items.map((item) => (
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
                className={`text-white px-6 py-2 rounded-md font-semibold ${item.color}`}
              >
                {item.btn}
              </button>
            </div>

            <div className="flex justify-center md:justify-end">
              <img
                src={item.img}
                alt={item.title}
                className="max-w-xs md:max-w-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to find the right freelancer?
        </h3>

        <button
          onClick={() => navigate("/login")}
          className="bg-green-700 text-white px-10 py-3 rounded-md font-semibold hover:bg-blue-800"
        >
          GET STARTED NOW
        </button>
      </div>

    </section>
  );
};

export default WorkasonSection;