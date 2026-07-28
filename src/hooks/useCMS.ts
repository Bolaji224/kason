import { useSelector } from 'react-redux';
import {
  selectCMSHomepage,
  selectCMSAbout,
  selectCMSEmployers,
  selectCMSEmployersOrdinary,
  selectCMSEmployersSmartStart,
  selectCMSFreelancersOrdinary,
  selectCMSFreelancersSmartStart,
  selectCMSFreelancersTalentVault,
  selectCMSFreelancersInHouse,
  selectCMSEmployerDashboard,
  selectCMSEmployerDashboardPostJob,
  selectCMSEmployerDashboardTalentVault,
  selectCMSEmployerDashboardSmartStart,
  selectCMSCandidateDashboard,
  selectCMSCandidateDashboardSmartStart,
  selectCMSCandidateDashboardSmartGuide,
  selectCMSFooter,
  selectCMSGlobal,
  selectCMSIsLoaded,
  HomepageCMS,
  AboutCMS,
  EmployersCMS,
  EmployersOrdinaryCMS,
  EmployersSmartStartCMS,
  FreelancersOrdinaryCMS,
  FreelancersSmartStartCMS,
  FreelancersTalentVaultCMS,
  FreelancersInHouseCMS,
  EmployerDashboardCMS,
  EmployerDashboardPostJobCMS,
  EmployerDashboardTalentVaultCMS,
  EmployerDashboardSmartStartCMS,
  CandidateDashboardCMS,
  CandidateDashboardSmartStartCMS,
  CandidateDashboardSmartGuideCMS,
  FooterCMS,
  GlobalCMS,
} from '../store/slices/cmsSlice';

interface UseCMSReturn {
  homepage: HomepageCMS;
  about: AboutCMS;
  employers: EmployersCMS;
  employersOrdinary: EmployersOrdinaryCMS;
  employersSmartStart: EmployersSmartStartCMS;
  freelancersOrdinary: FreelancersOrdinaryCMS;
  freelancersSmartStart: FreelancersSmartStartCMS;
  freelancersTalentVault: FreelancersTalentVaultCMS;
  freelancersInHouse: FreelancersInHouseCMS;
  employerDashboard: EmployerDashboardCMS;
  employerDashboardPostJob: EmployerDashboardPostJobCMS;
  employerDashboardTalentVault: EmployerDashboardTalentVaultCMS;
  employerDashboardSmartStart: EmployerDashboardSmartStartCMS;
  candidateDashboard: CandidateDashboardCMS;
  candidateDashboardSmartStart: CandidateDashboardSmartStartCMS;
  candidateDashboardSmartGuide: CandidateDashboardSmartGuideCMS;
  footer: FooterCMS;
  global: GlobalCMS;
  isLoaded: boolean;
}

/**
 * Single access hook for all CMS content.
 *
 * Usage:
 *   const { homepage, about, employers, employerDashboard } = useCMS();
 *   <h1>{employerDashboard.page_heading}</h1>
 *
 * Always returns defined values — falls back to CMS_DEFAULTS when the
 * API has not responded yet or has failed.
 */
export function useCMS(): UseCMSReturn {
  const homepage                   = useSelector(selectCMSHomepage);
  const about                      = useSelector(selectCMSAbout);
  const employers                  = useSelector(selectCMSEmployers);
  const employersOrdinary          = useSelector(selectCMSEmployersOrdinary);
  const employersSmartStart        = useSelector(selectCMSEmployersSmartStart);
  const freelancersOrdinary        = useSelector(selectCMSFreelancersOrdinary);
  const freelancersSmartStart      = useSelector(selectCMSFreelancersSmartStart);
  const freelancersTalentVault     = useSelector(selectCMSFreelancersTalentVault);
  const freelancersInHouse         = useSelector(selectCMSFreelancersInHouse);
  const employerDashboard          = useSelector(selectCMSEmployerDashboard);
  const employerDashboardPostJob   = useSelector(selectCMSEmployerDashboardPostJob);
  const employerDashboardTalentVault = useSelector(selectCMSEmployerDashboardTalentVault);
  const employerDashboardSmartStart  = useSelector(selectCMSEmployerDashboardSmartStart);
  const candidateDashboard         = useSelector(selectCMSCandidateDashboard);
  const candidateDashboardSmartStart = useSelector(selectCMSCandidateDashboardSmartStart);
  const candidateDashboardSmartGuide = useSelector(selectCMSCandidateDashboardSmartGuide);
  const footer                     = useSelector(selectCMSFooter);
  const global                     = useSelector(selectCMSGlobal);
  const isLoaded                   = useSelector(selectCMSIsLoaded);

  return {
    homepage,
    about,
    employers,
    employersOrdinary,
    employersSmartStart,
    freelancersOrdinary,
    freelancersSmartStart,
    freelancersTalentVault,
    freelancersInHouse,
    employerDashboard,
    employerDashboardPostJob,
    employerDashboardTalentVault,
    employerDashboardSmartStart,
    candidateDashboard,
    candidateDashboardSmartStart,
    candidateDashboardSmartGuide,
    footer,
    global,
    isLoaded,
  };
}
