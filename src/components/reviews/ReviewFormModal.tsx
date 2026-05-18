import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { httpPostWithToken } from '../../utils/http_utils';

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  freelancerId: number | string;
  jobId?: number | string | null;
  freelancerName?: string;
  onSuccess?: () => void;
}

const STAR_LABELS = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'];

const ReviewFormModal: React.FC<ReviewFormModalProps> = ({
  isOpen,
  onClose,
  freelancerId,
  jobId,
  freelancerName,
  onSuccess,
}) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const activeStar = hoveredStar || selectedStar;

  const reset = () => {
    setHoveredStar(0);
    setSelectedStar(0);
    setReviewText('');
    setError('');
    setSuccess(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (selectedStar === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (reviewText.trim().length < 10) {
      setError('Review must be at least 10 characters.');
      return;
    }

    setSubmitting(true);
    const payload: Record<string, any> = {
      freelancer_id: freelancerId,
      rating: selectedStar,
      review: reviewText.trim(),
    };
    if (jobId) payload.job_id = jobId;

    const res: any = await httpPostWithToken('employer/reviews', payload);
    setSubmitting(false);

    if (res?.status === 'success') {
      setSuccess(true);
      onSuccess?.();
    } else {
      setError(res?.message || res?.error || 'Failed to submit review. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {freelancerName ? `Review ${freelancerName}` : 'Leave a Review'}
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {success ? (
            <div className="flex flex-col items-center py-8 gap-4">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-2xl text-[#2aa100]">✓</span>
              </div>
              <p className="text-gray-900 font-semibold text-lg">Review submitted!</p>
              <p className="text-sm text-gray-500 text-center">
                Thank you for your feedback. Your review helps others find great talent.
              </p>
              <button
                onClick={handleClose}
                className="mt-2 px-6 py-2 bg-[#2aa100] text-white rounded-lg font-medium hover:bg-[#248f00] transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Star picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onMouseEnter={() => setHoveredStar(s)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setSelectedStar(s)}
                      className="focus:outline-none transition-transform hover:scale-110"
                      aria-label={`${s} star`}
                    >
                      <Star
                        size={32}
                        className="transition-colors"
                        style={{
                          color: s <= activeStar ? '#f59e0b' : '#d1d5db',
                          fill: s <= activeStar ? '#f59e0b' : 'transparent',
                        }}
                      />
                    </button>
                  ))}
                  {activeStar > 0 && (
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      {STAR_LABELS[activeStar - 1]}
                    </span>
                  )}
                </div>
              </div>

              {/* Review text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your review <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience working with this freelancer..."
                  rows={5}
                  maxLength={2000}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2aa100]/30 focus:border-[#2aa100] resize-none transition-colors"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">Minimum 10 characters</span>
                  <span className="text-xs text-gray-400">{reviewText.length}/2000</span>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-2.5 px-4 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 px-4 bg-[#2aa100] text-white rounded-xl text-sm font-semibold hover:bg-[#248f00] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting…
                    </span>
                  ) : (
                    'Submit Review'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewFormModal;
