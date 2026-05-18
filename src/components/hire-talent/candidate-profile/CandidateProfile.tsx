import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { httpGetWithToken, httpGetWithoutToken } from "./../../../utils/http_utils";
import ReviewFormModal from "../../reviews/ReviewFormModal";
import ReviewsModal from "../../reviews/ReviewsModal";

interface ReviewItem {
  id: number;
  rating: number;
  review: string;
  created_at: string;
  client_name: string;
  client_avatar: string | null;
  job_title: string | null;
}

interface BreakdownEntry { count: number; percentage: number }

interface ReviewsData {
  reviews: ReviewItem[];
  average_rating: number;
  total_reviews: number;
  breakdown: Record<string, BreakdownEntry>;
}

function StarDisplay({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ fontSize: size, color: s <= rating ? '#f59e0b' : '#d1d5db' }}>★</span>
      ))}
    </span>
  );
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
}

const AVATAR_COLORS = [
  'bg-violet-100 text-violet-700', 'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',   'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',     'bg-cyan-100 text-cyan-700',
];
function avatarColor(name: string) {
  const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}
function initials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');
}

const CandidateProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const initialApplicant = location.state?.applicant || null;
  const [applicant, setApplicant] = useState<any>(initialApplicant);
  const [loading, setLoading] = useState(!initialApplicant);
  const [error, setError] = useState<string | null>(null);

  // Reviews state
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [reviewsExpanded, setReviewsExpanded] = useState(false);

  useEffect(() => {
    if (applicant) return;

    const fetchApplicant = async () => {
      setLoading(true);
      try {
        const response = await httpGetWithToken(`employer/applications/${id}`);
        if (response?.data) {
          setApplicant(response.data);
        } else {
          setError("Applicant not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch applicant data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchApplicant();
    else { setError("Invalid applicant ID."); setLoading(false); }
  }, [id, applicant]);

  const freelancerId = applicant?.user?.id || applicant?.id;

  // Fetch reviews + can-review once we know the freelancer id
  useEffect(() => {
    if (!freelancerId) return;

    setReviewsLoading(true);
    httpGetWithoutToken(`reviews/freelancer/${freelancerId}`)
      .then((res: any) => { if (res?.data) setReviewsData(res.data); })
      .finally(() => setReviewsLoading(false));

    httpGetWithToken(`employer/reviews/can-review/${freelancerId}`)
      .then((res: any) => { if (res?.data?.can_review) setCanReview(true); });
  }, [freelancerId]);

  if (loading) return <div className="ml-60 mt-12 p-6">Loading applicant data...</div>;
  if (error)   return <div className="ml-60 mt-12 p-6">{error}</div>;
  if (!applicant) return <div className="ml-60 mt-12 p-6">No applicant data available</div>;

  const user = applicant.user || applicant;
  const isBrowseCandidate = !applicant.job;
  const cvLink = applicant.smartcv || applicant.cv || null;
  const freelancerName = user?.name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Freelancer';

  const hasReviews = reviewsData && reviewsData.total_reviews > 0;
  const displayedReviews = reviewsExpanded
    ? (reviewsData?.reviews ?? [])
    : (reviewsData?.reviews ?? []).slice(0, 3);

  return (
    <div className="ml-60 mt-12 p-6 bg-gray-100 min-h-screen py-[8rem]">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Candidate Profile</h1>
        <p className="text-gray-600">{freelancerName}</p>
      </header>

      {/* ── Profile info card ── */}
      <div className="bg-white p-6 rounded shadow space-y-4">

        {isBrowseCandidate && user?.email && (
          <p><strong>Email:</strong> {user.email}</p>
        )}

        {user?.bio && (
          <p><strong>Bio:</strong> {user.bio}</p>
        )}

        {applicant?.experience_years && (
          <p>
            <strong>Experience:</strong> {applicant.experience_years}{' '}
            {applicant.experience_years === 1 ? 'year' : 'years'}
          </p>
        )}

        {cvLink && (
          <p>
            <strong>{applicant.smartcv ? 'SmartCV' : 'CV'}:</strong>{' '}
            <a href={cvLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {applicant.smartcv ? 'View SmartCV' : 'View CV'}
            </a>
          </p>
        )}

        {!isBrowseCandidate && applicant?.job && (
          <p><strong>Job:</strong> {applicant.job.title}</p>
        )}

        {!isBrowseCandidate && applicant?.reason && (
          <p><strong>Reason for applying:</strong> {applicant.reason}</p>
        )}

        {!isBrowseCandidate && applicant?.status && (
          <p><strong>Status:</strong> {applicant.status}</p>
        )}

      </div>

      {/* ── Reviews section ── */}
      <section className="mt-6 bg-white rounded shadow overflow-hidden">
        {/* Section header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-800">Reviews</h2>
            {hasReviews && (
              <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-600 text-sm font-semibold px-3 py-1 rounded-full">
                <span className="text-amber-400">★</span>
                {reviewsData!.average_rating.toFixed(1)}
                <span className="font-normal text-amber-500/80">
                  ({reviewsData!.total_reviews}{' '}
                  {reviewsData!.total_reviews === 1 ? 'review' : 'reviews'})
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {hasReviews && (
              <button
                onClick={() => setReviewsModalOpen(true)}
                className="text-sm text-[#2aa100] font-medium hover:underline"
              >
                View all
              </button>
            )}
            {canReview && (
              <button
                onClick={() => setReviewFormOpen(true)}
                className="text-sm font-semibold bg-[#2aa100] text-white px-4 py-1.5 rounded-lg hover:bg-[#248f00] transition-colors"
              >
                + Leave Review
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {reviewsLoading && (
            <div className="flex justify-center py-8">
              <div className="w-7 h-7 border-2 border-[#2aa100] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!reviewsLoading && !hasReviews && !canReview && (
            <p className="text-gray-400 text-sm py-4 text-center">No reviews yet.</p>
          )}

          {!reviewsLoading && !hasReviews && canReview && (
            <div className="py-6 text-center space-y-3">
              <p className="text-gray-500 text-sm">Be the first to review this freelancer.</p>
              <button
                onClick={() => setReviewFormOpen(true)}
                className="text-sm font-semibold bg-[#2aa100] text-white px-5 py-2 rounded-lg hover:bg-[#248f00] transition-colors"
              >
                Leave a Review
              </button>
            </div>
          )}

          {!reviewsLoading && hasReviews && (
            <>
              {/* Summary row */}
              <div className="flex flex-col sm:flex-row gap-5 p-5 bg-gray-50 rounded-xl border border-gray-100 mb-5">
                {/* Big score */}
                <div className="flex flex-col items-center justify-center min-w-[90px]">
                  <span className="text-4xl font-extrabold text-gray-900 leading-none">
                    {reviewsData!.average_rating.toFixed(1)}
                  </span>
                  <StarDisplay rating={Math.round(reviewsData!.average_rating)} size={16} />
                  <span className="text-xs text-gray-500 mt-1">
                    {reviewsData!.total_reviews}{' '}
                    {reviewsData!.total_reviews === 1 ? 'review' : 'reviews'}
                  </span>
                </div>
                {/* Breakdown bars */}
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const entry = reviewsData!.breakdown[star] ?? { count: 0, percentage: 0 };
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-3 text-right">{star}</span>
                        <span className="text-amber-400 text-sm">★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-2 rounded-full bg-amber-400 transition-all duration-500"
                            style={{ width: `${entry.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-6 text-right">{entry.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review cards */}
              <div className="space-y-4">
                {displayedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${avatarColor(review.client_name)}`}
                      >
                        {initials(review.client_name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <span className="font-semibold text-gray-900 text-sm">{review.client_name}</span>
                          <span className="text-xs text-gray-400">{formatDate(review.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <StarDisplay rating={review.rating} size={12} />
                          {review.job_title && (
                            <>
                              <span className="text-gray-300 text-xs">·</span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full truncate max-w-[180px]">
                                {review.job_title}
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm mt-2 leading-relaxed">{review.review}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show more / less toggle */}
              {reviewsData!.reviews.length > 3 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setReviewsExpanded((v) => !v)}
                    className="text-sm text-[#2aa100] font-medium hover:underline"
                  >
                    {reviewsExpanded
                      ? 'Show less'
                      : `Show all ${reviewsData!.total_reviews} reviews`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Modals */}
      {freelancerId && (
        <>
          <ReviewFormModal
            isOpen={reviewFormOpen}
            onClose={() => setReviewFormOpen(false)}
            freelancerId={freelancerId}
            jobId={applicant?.job?.id ?? null}
            freelancerName={freelancerName}
            onSuccess={() => {
              setCanReview(false);
              setReviewFormOpen(false);
              // Refresh reviews
              setReviewsLoading(true);
              httpGetWithoutToken(`reviews/freelancer/${freelancerId}`)
                .then((res: any) => { if (res?.data) setReviewsData(res.data); })
                .finally(() => setReviewsLoading(false));
            }}
          />
          <ReviewsModal
            isOpen={reviewsModalOpen}
            onClose={() => setReviewsModalOpen(false)}
            freelancerId={freelancerId}
            freelancerName={freelancerName}
          />
        </>
      )}
    </div>
  );
};

export default CandidateProfile;
