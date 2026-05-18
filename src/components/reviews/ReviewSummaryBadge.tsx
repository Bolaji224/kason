import React, { useEffect, useState } from 'react';
import { httpGetWithoutToken } from '../../utils/http_utils';
import ReviewsModal from './ReviewsModal';

interface ReviewSummaryBadgeProps {
  freelancerId: number | string;
  freelancerName?: string;
  /** 'light' = white card context (default), 'dark' = dark card context */
  theme?: 'light' | 'dark';
  /** Show the review count label. Default true */
  showLabel?: boolean;
}

interface Summary {
  average_rating: number;
  total_reviews: number;
}

const ReviewSummaryBadge: React.FC<ReviewSummaryBadgeProps> = ({
  freelancerId,
  freelancerName,
  theme = 'light',
  showLabel = true,
}) => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!freelancerId) return;
    httpGetWithoutToken(`reviews/freelancer/${freelancerId}/summary`).then((res: any) => {
      if (res?.data) setSummary(res.data);
    });
  }, [freelancerId]);

  // Completely hidden when no reviews
  if (!summary || summary.total_reviews === 0) return null;

  const isDark = theme === 'dark';

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={`inline-flex items-center gap-1.5 rounded-full transition-all group focus:outline-none ${
          isDark
            ? 'bg-amber-400/10 border border-amber-400/25 hover:border-amber-400/50 px-3 py-1'
            : 'bg-amber-50 border border-amber-200 hover:border-amber-400 px-3 py-1'
        }`}
        title="View reviews"
      >
        <span className="text-amber-400 text-sm leading-none">★</span>
        <span
          className={`text-sm font-semibold leading-none ${
            isDark ? 'text-amber-300' : 'text-amber-600'
          }`}
        >
          {summary.average_rating.toFixed(1)}
        </span>
        {showLabel && (
          <span
            className={`text-xs leading-none ${
              isDark
                ? 'text-amber-400/70 group-hover:text-amber-400'
                : 'text-amber-500/80 group-hover:text-amber-600'
            } transition-colors`}
          >
            ({summary.total_reviews}{' '}
            {summary.total_reviews === 1 ? 'Review' : 'Reviews'})
          </span>
        )}
      </button>

      <ReviewsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        freelancerId={freelancerId}
        freelancerName={freelancerName}
      />
    </>
  );
};

export default ReviewSummaryBadge;
