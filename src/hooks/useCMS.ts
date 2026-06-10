import { useSelector } from 'react-redux';
import {
  selectCMSHomepage,
  selectCMSEmployerDashboard,
  selectCMSCandidateDashboard,
  selectCMSFooter,
  selectCMSGlobal,
  selectCMSIsLoaded,
  HomepageCMS,
  EmployerDashboardCMS,
  CandidateDashboardCMS,
  FooterCMS,
  GlobalCMS,
} from '../store/slices/cmsSlice';

interface UseCMSReturn {
  homepage: HomepageCMS;
  employerDashboard: EmployerDashboardCMS;
  candidateDashboard: CandidateDashboardCMS;
  footer: FooterCMS;
  global: GlobalCMS;
  isLoaded: boolean;
}

/**
 * Single access hook for all CMS content.
 *
 * Usage:
 *   const { homepage, footer, global: globalCMS } = useCMS();
 *   <h1>{homepage.hero_title}</h1>
 *
 * Always returns defined values — falls back to CMS_DEFAULTS when the
 * API has not responded yet or has failed.
 *
 * Selectors are memoised by Redux Toolkit so this hook does not cause
 * unnecessary re-renders in components that only consume one module.
 */
export function useCMS(): UseCMSReturn {
  const homepage = useSelector(selectCMSHomepage);
  const employerDashboard = useSelector(selectCMSEmployerDashboard);
  const candidateDashboard = useSelector(selectCMSCandidateDashboard);
  const footer = useSelector(selectCMSFooter);
  const global = useSelector(selectCMSGlobal);
  const isLoaded = useSelector(selectCMSIsLoaded);

  return { homepage, employerDashboard, candidateDashboard, footer, global, isLoaded };
}
