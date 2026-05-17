import { MdExplore } from 'react-icons/md';
import { Link } from 'react-router-dom';

const FeaturesJobSection: React.FC = () => {


  return (
    <section>
        <section>
            <div>
            <div className='pt-[4rem] text-center flex items-center justify-center '>
          <Link to="/">
            <button className="text-sm sm:text-base font-medium text-[#2AA100]  bg-[#D1FFBD] flex items-center gap-2 justify-center py-2 px-[1rem] sm:py-3 sm:px-4 rounded-lg"><MdExplore />Explore Jobs</button>
          </Link>
        </div>
        <div className='text-center'>
        <h1 className='lg:text-[38px] md:text-[28px] text-[20px] mt-[0.5rem] font-sans font-semibold tracking-[1px]' ><span className='text-[#EE009D]' >Featured</span> jobs of the week.</h1>
        <p className='lg:text-[14px] md:text-[16px] text-[10px] text-[#646A73] font-sans font-normal mt-[0.5rem]'>Find more than 500 jobs vacancies of your dreams,<br /> from startup companies, unions, to bonafides</p>
      </div>
            </div>
        </section>
        <section>
            <section>
            </section>
        </section>
    </section>
  );
};

export default FeaturesJobSection;
