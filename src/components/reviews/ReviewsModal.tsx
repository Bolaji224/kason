import React, { useEffect, useState } from 'react';
import { X, Star } from 'lucide-react';
import { httpGetWithoutToken } from '../../utils/http_utils';

interface ReviewItem {
  id: number;
  rating: number;
  review: string;
  created_at: string;
  client_name: string;
  client_avatar: string | null;
  job_title: string | null;
}

interface BreakdownEntry {
  count: number;
  percentage: number;
}

interface ReviewsData {
  reviews: ReviewItem[];
  average_rating: number;
  total_reviews: number;
  breakdown: Record<string, BreakdownEntry>;
}

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  freelancerId: number | string;
  freelancerName?: string;
}

function StarDisplay({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{ fontSize: size, color: s <= rating ? '#f59e0b' : '#d1d5db' }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

const AVATAR_COLORS = [
  'bg-violet-100 text-violet-700',
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
];

function avatarColor(name: string) {
  const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  freelancerId,
  freelancerName,
}) => {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    httpGetWithoutToken(`reviews/freelancer/${freelancerId}`)
      .then((res: any) => {
        if (res?.data) setData(res.data);
      })
      .finally(() => setLoading(false));
  }, [isOpen, freelancerId]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {freelancerName ? `Reviews for ${freelancerName}` : 'Freelancer Reviews'}
            </h2>
            {data && data.total_reviews > 0 && (
              <p className="text-sm text-gray-500 mt-0.5">
                {data.total_reviews} verified {data.total_reviews === 1 ? 'review' : 'reviews'}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-[#2aa100] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && data && data.total_reviews === 0 && (
            <div className="text-center py-16">
              <Star size={40} className="mx-auto text-gray-200 mb-3" />
              <p className="text-gray-500 font-medium">No reviews yet</p>
              <p className="text-sm text-gray-400 mt-1">Reviews will appear here after work is completed.</p>
            </div>
          )}

          {!loading && data && data.total_reviews > 0 && (
            <>
              {/* Summary block */}
              <div className="flex flex-col sm:flex-row gap-6 p-5 bg-gray-50 rounded-xl border border-gray-100">
                {/* Average score */}
                <div className="flex flex-col items-center justify-center min-w-[100px]">
                  <span className="text-5xl font-extrabold text-gray-900 leading-none">
                    {data.average_rating.toFixed(1)}
                  </span>
                  <StarDisplay rating={Math.round(data.average_rating)} size={18} />
                  <span className="text-xs text-gray-500 mt-1">
                    {data.total_reviews} {data.total_reviews === 1 ? 'review' : 'reviews'}
                  </span>
                </div>

                {/* Breakdown bars */}
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const entry = data.breakdown[star] ?? { count: 0, percentage: 0 };
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-3 text-right">{star}</span>
                        <span className="text-amber-400 text-sm leading-none">★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-2 rounded-full bg-amber-400 transition-all duration-500"
                            style={{ width: `${entry.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-8 text-right">{entry.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review cards */}
              <div className="space-y-4">
                {data.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${avatarColor(review.client_name)}`}
                      >
                        {initials(review.client_name)}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Row: name + date */}
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <span className="font-semibold text-gray-900 text-sm">{review.client_name}</span>
                          <span className="text-xs text-gray-400">{formatDate(review.created_at)}</span>
                        </div>

                        {/* Stars + job title */}
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <StarDisplay rating={review.rating} size={13} />
                          {review.job_title && (
                            <>
                              <span className="text-gray-300 text-xs">·</span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full truncate max-w-[200px]">
                                {review.job_title}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Review text */}
                        <p className="text-gray-700 text-sm mt-2 leading-relaxed">{review.review}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
