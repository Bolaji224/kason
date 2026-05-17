import React, { useState, useEffect } from 'react';
import Images from '../../../../components/constant/Images';
import CareerTipSCardSection from './CareerTipSCardSection';
import CareerPagination from './CareerPagination';

const jobData = [
    {
        sliderImage: Images.CareerCardImageFour,
        sliderTitle: 'Setting Your Rates as a Virtual Assistant',
        sliderDescription: "Determining your rates as a virtual assistant can be challenging, but it's crucial for your business success. Start by researching the average rates for VAs with similar skills and experience in your region. Consider your expertise, the complexity of the tasks, and the time required to complete them. Decide whether to charge hourly or per project, keeping in mind that project-based pricing can often be more beneficial for both parties. Be transparent with clients about your rates and any additional costs. Don't undervalue your services; remember that your skills and time are valuable. As you gain more experience and skills, gradually increase your rates to reflect your growing expertise."
    },
    {
        sliderImage: Images.CareerCardImageFive,
        sliderTitle: 'Building a Client Base as a Virtual Assistant',
        sliderDescription: "Building a solid client base is essential for a successful virtual assistant career. Start by networking within your existing circles, including friends, family, and professional connections, to find potential clients. Utilize social media platforms, particularly LinkedIn, to showcase your services and engage with potential clients. Consider offering a free or discounted initial service to new clients to demonstrate your value. Join online communities and forums related to your niche to connect with business owners in need of assistance. Consistently delivering high-quality work and maintaining good relationships with clients will lead to referrals and a growing client base.",
    },
    {
        sliderImage: Images.CareerCardImageSix,
        sliderTitle: 'Essential Skills for Virtual Assistants',
        sliderDescription: "To thrive as a virtual assistant, certain skills are indispensable. First, strong communication skills are crucial since you often interact with clients remotely. Excellent organizational abilities help manage multiple tasks and deadlines effectively. Familiarize yourself with common digital tools like Microsoft Office, Google Workspace, and project management software such as Trello or Asana. Time management is also vital; using tools like Calendly or Toggl can help you stay on top of your schedule. Lastly, problem-solving skills and adaptability will enable you to handle unexpected challenges efficiently. Continuously improving these skills will enhance your service quality and client satisfaction."
    },
    {
        sliderImage: Images.CareerCardImageSeven,
        sliderTitle: 'Getting Started as a Virtual Assistant',
        sliderDescription: "Starting a career as a virtual assistant (VA) is an excellent option for those seeking flexibility and the opportunity to work from anywhere. To begin, assess your skills and identify the services you can offer, such as administrative support, social media management, or customer service. Create a professional online presence with a well-crafted LinkedIn profile and a simple website highlighting your expertise. Join freelancing platforms like WeWorkPerHour, Upwork or Fiverr to find your first clients. Don't forget to invest in reliable technology, including a good computer and stable internet connection, to ensure you can work efficiently. As you gain experience, ask for testimonials to build credibility and attract more clients."
    },
];

const ITEMS_PER_PAGE = 4;

const PaginationSection: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredArticles, setFilteredArticles] = useState(jobData)
    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (jobData.length > ITEMS_PER_PAGE) {
            setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
        }
    }, [totalPages]);

    const displayedJobs = filteredArticles.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className='lg:p-[4rem]'>
            <section className='py-[2rem]'>
                <div className="flex justify-center">
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 lg:items-center justify-center gap-[1rem] space-y-[2rem] sm:space-y-0 py-[4rem]">
                        {displayedJobs.map((job, index) => (
                            <CareerTipSCardSection
                                key={index}
                                sliderDescription={job.sliderDescription}
                                sliderImage={job.sliderImage}
                                sliderTitle={job.sliderTitle}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <CareerPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default PaginationSection;
