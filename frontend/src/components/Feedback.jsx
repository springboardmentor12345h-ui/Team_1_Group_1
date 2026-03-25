// Feedback.jsx
// Merged file containing:
//   - Stars          — shared star renderer
//   - RatingBar      — shared rating bar (admin use)
//   - FeedbackSection — admin analytics + per-event drill-down (no props needed)
//   - ReviewsSection  — student submit/edit/delete feedback on an event

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiStar, FiEdit2, FiTrash2,
  FiChevronLeft, FiChevronRight,
  FiSearch, FiX, FiBarChart2, FiAlertCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  submitFeedback,
  getMyFeedback,
  updateFeedback,
  deleteFeedback,
  getAdminFeedbackAnalytics,
  getEventFeedback,
  getEventFeedbackAnalytics,
} from "../services/api";

/* ─────────────────────────────────────────────
   Shared: Star renderer
───────────────────────────────────────────── */
function Stars({ value, interactive = false, onChange, size = 20 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onClick={() => interactive && onChange?.(s)}
          onMouseEnter={() => interactive && setHovered(s)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={interactive ? "transition-transform hover:scale-110" : "cursor-default"}
        >
          <FiStar
            size={size}
            className={
              s <= (interactive ? hovered || value : value)
                ? "fill-amber-400 text-amber-400"
                : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared: Rating bar (admin breakdown)
───────────────────────────────────────────── */
function RatingBar({ count, total, star }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-3 text-right">{star}</span>
      <FiStar size={10} className="fill-amber-400 text-amber-400 flex-shrink-0" />
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-400 w-5 text-right">{count}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FeedbackSection — admin analytics view
   No props needed (uses auth token from API interceptor)
───────────────────────────────────────────── */
export function FeedbackSection() {
  const [analytics,        setAnalytics]        = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  const [selectedEvent,  setSelectedEvent]  = useState(null);
  const [eventAnalytics, setEventAnalytics] = useState(null);
  const [feedbacks,      setFeedbacks]      = useState([]);
  const [fbTotal,        setFbTotal]        = useState(0);
  const [fbPage,         setFbPage]         = useState(1);
  const [fbTotalPages,   setFbTotalPages]   = useState(1);
  const [fbLoading,      setFbLoading]      = useState(false);
  const [fbSort,         setFbSort]         = useState("latest");
  const [fbRatingFilter, setFbRatingFilter] = useState(null);
  const [fbSearch,       setFbSearch]       = useState("");
  const [eventSearch,    setEventSearch]    = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoadingAnalytics(true);
        const { data } = await getAdminFeedbackAnalytics();
        setAnalytics(data.data);
      } catch { /* silent */ } finally {
        setLoadingAnalytics(false);
      }
    })();
  }, []);

  const loadEventFeedback = useCallback(async () => {
    if (!selectedEvent) return;
    setFbLoading(true);
    try {
      const [analyticRes, feedbackRes] = await Promise.all([
        getEventFeedbackAnalytics(selectedEvent.eventId),
        getEventFeedback(selectedEvent.eventId, {
          page: fbPage, limit: 5,
          sort: fbSort === "top" ? "top" : undefined,
          rating: fbRatingFilter || undefined,
        }),
      ]);
      setEventAnalytics(analyticRes.data.data);
      setFeedbacks(feedbackRes.data.data.feedbacks || []);
      setFbTotal(feedbackRes.data.data.totalReviews || 0);
      setFbTotalPages(feedbackRes.data.data.totalPages || 1);
    } catch { /* silent */ } finally {
      setFbLoading(false);
    }
  }, [selectedEvent, fbPage, fbSort, fbRatingFilter]);

  useEffect(() => { loadEventFeedback(); }, [loadEventFeedback]);
  useEffect(() => { setFbPage(1); }, [fbSort, fbRatingFilter]);

  const perEvent       = analytics?.perEvent || [];
  const filteredEvents = perEvent.filter((e) =>
    e.eventTitle?.toLowerCase().includes(eventSearch.toLowerCase())
  );

  // ── Drill-down view ──────────────────────────────────────────
  if (selectedEvent) {
    const bd             = eventAnalytics?.ratingBreakdown || {};
    const totalForEvent  = eventAnalytics?.totalFeedbacks  || 0;
    const visibleFeedbacks = fbSearch
      ? feedbacks.filter((f) => f.userId?.name?.toLowerCase().includes(fbSearch.toLowerCase()))
      : feedbacks;

    return (
      <div>
        <button
          onClick={() => { setSelectedEvent(null); setEventAnalytics(null); setFeedbacks([]); setFbPage(1); setFbRatingFilter(null); setFbSearch(""); }}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 mb-5 transition"
        >
          <FiChevronLeft size={16} /> Back to all events
        </button>

        <h3 className="text-base font-bold text-gray-800 mb-1 truncate">{selectedEvent.eventTitle}</h3>
        <p className="text-xs text-gray-400 mb-5">Feedback received for this event</p>

        {eventAnalytics && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-gray-800">{totalForEvent}</p>
              <p className="text-xs text-gray-400 mt-0.5">Total Responses</p>
            </div>
            <div className="bg-amber-50 rounded-xl border border-amber-100 shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">{eventAnalytics.averageRating.toFixed(1)}</p>
              <div className="flex justify-center mt-0.5">
                <Stars value={Math.round(eventAnalytics.averageRating)} size={12} />
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Average Rating</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold text-gray-500 mb-2">Breakdown</p>
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((r) => (
                  <RatingBar key={r} star={r} count={bd[r] || 0} total={totalForEvent} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
          <div className="relative flex-1">
            <FiSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text" placeholder="Search by student name…" value={fbSearch}
              onChange={(e) => setFbSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 bg-gray-50"
            />
            {fbSearch && (
              <button onClick={() => setFbSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                <FiX size={13} />
              </button>
            )}
          </div>
          <div className="flex gap-1">
            {[{ key: "latest", label: "Latest" }, { key: "top", label: "Top" }].map((s) => (
              <button key={s.key} onClick={() => setFbSort(s.key)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${fbSort === s.key ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {[5, 4, 3, 2, 1].map((r) => (
              <button key={r} onClick={() => setFbRatingFilter(fbRatingFilter === r ? null : r)}
                className={`px-2.5 py-2 rounded-xl text-xs font-bold border transition ${fbRatingFilter === r ? "bg-amber-500 text-white border-amber-500" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}>
                {r}★
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {fbLoading ? (
            <div className="divide-y divide-gray-50">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-4 animate-pulse">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                    <div className="h-2.5 bg-gray-100 rounded w-2/4" />
                  </div>
                  <div className="h-4 w-16 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          ) : visibleFeedbacks.length === 0 ? (
            <div className="py-14 text-center">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <FiStar size={20} className="text-gray-300" />
              </div>
              <p className="text-sm text-gray-400">No feedback found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {visibleFeedbacks.map((fb, i) => (
                <div key={fb._id || i} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {fb.userId?.name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{fb.userId?.name || "Student"}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Stars value={fb.rating} size={11} />
                          <span className="text-xs text-gray-400">
                            {new Date(fb.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                          {fb.isEdited && <span className="text-[10px] text-gray-400 italic">(edited)</span>}
                        </div>
                      </div>
                    </div>
                    <span className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${fb.rating >= 4 ? "bg-green-50 text-green-700 border-green-200" : fb.rating === 3 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-600 border-red-200"}`}>
                      {fb.rating}/5
                    </span>
                  </div>
                  {fb.comment && (
                    <p className="text-sm text-gray-500 mt-2.5 leading-relaxed pl-12">{fb.comment}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {fbTotalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <button onClick={() => setFbPage((p) => Math.max(1, p - 1))} disabled={fbPage === 1}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
              <FiChevronLeft size={14} />
            </button>
            <span className="text-xs font-semibold text-gray-500">{fbPage} / {fbTotalPages}</span>
            <button onClick={() => setFbPage((p) => Math.min(fbTotalPages, p + 1))} disabled={fbPage === fbTotalPages}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
              <FiChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Overview: all-events list ────────────────────────────────
  return (
    <div>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-800">Feedback & Ratings</h3>
        <p className="text-sm text-gray-400 mt-0.5">Student feedback across all your events</p>
      </div>

      {loadingAnalytics ? (
        <div className="grid grid-cols-2 gap-3 mb-6 animate-pulse">
          <div className="h-20 bg-gray-100 rounded-xl" />
          <div className="h-20 bg-gray-100 rounded-xl" />
        </div>
      ) : analytics ? (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-3xl font-bold text-gray-800">{analytics.overall.totalFeedbacks}</p>
            <p className="text-xs text-gray-400 mt-1">Total Responses</p>
          </div>
          <div className="bg-amber-50 rounded-xl border border-amber-100 shadow-sm p-4 text-center">
            <p className="text-3xl font-bold text-amber-600">{analytics.overall.averageRating.toFixed(1)}</p>
            <div className="flex justify-center mt-1">
              <Stars value={Math.round(analytics.overall.averageRating)} size={13} />
            </div>
            <p className="text-xs text-gray-400 mt-1">Overall Rating</p>
          </div>
        </div>
      ) : null}

      <div className="mb-3">
        <div className="relative">
          <FiSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
          <input type="text" placeholder="Search events…" value={eventSearch}
            onChange={(e) => setEventSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 bg-gray-50"
          />
          {eventSearch && (
            <button onClick={() => setEventSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
              <FiX size={13} />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loadingAnalytics ? (
          <div className="divide-y divide-gray-50">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-4 animate-pulse">
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-2/5" />
                  <div className="h-2.5 bg-gray-100 rounded w-1/4" />
                </div>
                <div className="h-6 w-20 bg-gray-100 rounded-full" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-14 text-center">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <FiBarChart2 size={20} className="text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">
              {eventSearch ? "No events match your search" : "No feedback received yet"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredEvents.map((ev) => (
              <button key={ev.eventId}
                onClick={() => setSelectedEvent({ eventId: ev.eventId, eventTitle: ev.eventTitle })}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 hover:bg-gray-50/70 transition-colors text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">{ev.eventTitle}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {ev.totalFeedbacks} response{ev.totalFeedbacks !== 1 ? "s" : ""}
                    {ev.eventEndDate && ` · Ended ${new Date(ev.eventEndDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`}
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-1.5">
                  <span className="text-sm font-bold text-amber-600">{ev.averageRating.toFixed(1)}</span>
                  <FiStar size={13} className="fill-amber-400 text-amber-400" />
                  <FiChevronRight size={14} className="text-gray-300 ml-1" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ReviewsSection — student submit/edit/delete
   Props:
     eventId            – ObjectId of the event
     eventStatus        – "Upcoming" | "Ongoing" | "Past"
     registrationStatus – student's registration object (or null)
───────────────────────────────────────────── */
export function ReviewsSection({ eventId, eventStatus, registrationStatus }) {
  const { user } = useAuth();
  const isStudent = user?.role === "student";

  const [myFeedback,   setMyFeedback]   = useState(null);
  const [checkingMine, setCheckingMine] = useState(true);
  const [formRating,   setFormRating]   = useState(5);
  const [formComment,  setFormComment]  = useState("");
  const [submitting,   setSubmitting]   = useState(false);
  const [editMode,     setEditMode]     = useState(false);

  useEffect(() => {
    if (!isStudent) { setCheckingMine(false); return; }
    (async () => {
      try {
        const { data } = await getMyFeedback();
        const mine = (data.data || []).find(
          (f) => f.eventId?._id === eventId || f.eventId === eventId
        );
        setMyFeedback(mine || null);
        if (mine) { setFormRating(mine.rating); setFormComment(mine.comment || ""); }
      } catch { /* silent */ } finally {
        setCheckingMine(false);
      }
    })();
  }, [eventId, isStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formRating < 1) { toast.error("Please select a rating"); return; }
    try {
      setSubmitting(true);
      await submitFeedback({ eventId, rating: formRating, comment: formComment });
      toast.success("Feedback submitted!");
      const { data } = await getMyFeedback();
      const mine = (data.data || []).find((f) => f.eventId?._id === eventId || f.eventId === eventId);
      setMyFeedback(mine || null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await updateFeedback(myFeedback._id, { rating: formRating, comment: formComment });
      toast.success("Feedback updated!");
      setEditMode(false);
      const { data } = await getMyFeedback();
      const mine = (data.data || []).find((f) => f.eventId?._id === eventId || f.eventId === eventId);
      setMyFeedback(mine || null);
      if (mine) { setFormRating(mine.rating); setFormComment(mine.comment || ""); }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete your feedback?")) return;
    try {
      await deleteFeedback(myFeedback._id);
      toast.success("Feedback deleted");
      setMyFeedback(null); setFormRating(5); setFormComment(""); setEditMode(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  const eventEnded      = eventStatus === "Past";
  const studentAttended = registrationStatus?.status === "approved" && registrationStatus?.attended === true;
  const canSubmit       = isStudent && eventEnded && studentAttended && !myFeedback;

  return (
    <div className="space-y-5">
      {/* Already submitted */}
      {!checkingMine && myFeedback && !editMode && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-bold text-green-800">Your Feedback</p>
                {myFeedback.isEdited && (
                  <span className="text-[10px] font-semibold bg-green-100 text-green-600 px-2 py-0.5 rounded-full border border-green-200">Edited</span>
                )}
              </div>
              <Stars value={myFeedback.rating} size={15} />
              {myFeedback.comment && <p className="text-sm text-gray-700 mt-2 leading-relaxed">{myFeedback.comment}</p>}
              <p className="text-xs text-gray-400 mt-2">
                Submitted {new Date(myFeedback.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
            {(Date.now() - new Date(myFeedback.createdAt)) / 36e5 < 24 && (
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setEditMode(true)}
                  className="p-2 rounded-lg bg-white border border-green-200 text-green-700 hover:bg-green-100 transition" title="Edit">
                  <FiEdit2 size={14} />
                </button>
                <button onClick={handleDelete}
                  className="p-2 rounded-lg bg-white border border-red-200 text-red-500 hover:bg-red-50 transition" title="Delete">
                  <FiTrash2 size={14} />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Edit form */}
      {!checkingMine && myFeedback && editMode && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-blue-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Edit Your Feedback</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Rating</label>
              <Stars value={formRating} interactive onChange={setFormRating} size={26} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Comment <span className="font-normal normal-case text-gray-400">(optional)</span>
              </label>
              <textarea value={formComment} onChange={(e) => setFormComment(e.target.value)}
                maxLength={1000} rows={3} placeholder="Share your experience..."
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{formComment.length}/1000</p>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={submitting}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold text-sm rounded-xl transition">
                {submitting ? "Saving…" : "Save Changes"}
              </button>
              <button type="button"
                onClick={() => { setEditMode(false); setFormRating(myFeedback.rating); setFormComment(myFeedback.comment || ""); }}
                className="px-4 py-2.5 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-50 transition">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Submit form */}
      {!checkingMine && canSubmit && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-amber-400 inline-block" />
            Share Your Experience
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Rating *</label>
              <Stars value={formRating} interactive onChange={setFormRating} size={28} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Comment <span className="font-normal normal-case text-gray-400">(optional)</span>
              </label>
              <textarea value={formComment} onChange={(e) => setFormComment(e.target.value)}
                maxLength={1000} rows={3} placeholder="How was the event? What did you enjoy?"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{formComment.length}/1000</p>
            </div>
            <button type="submit" disabled={submitting}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-semibold text-sm rounded-xl transition">
              {submitting ? "Submitting…" : "Submit Feedback"}
            </button>
          </form>
        </motion.div>
      )}

      {/* Ineligibility notice */}
      {isStudent && !checkingMine && !myFeedback && !canSubmit && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex items-start gap-3">
          <FiAlertCircle size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-500">
            {!eventEnded
              ? "Feedback can be submitted after the event ends."
              : !studentAttended
              ? "Only students who attended this event can leave feedback."
              : "You have already submitted feedback for this event."}
          </p>
        </motion.div>
      )}

      {/* Not logged in */}
      {!user && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
          <p className="text-sm font-semibold text-amber-800 mb-3">Sign in to leave feedback</p>
          <button onClick={() => (window.location.href = "/login")}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm rounded-lg transition">
            Sign In
          </button>
        </motion.div>
      )}
    </div>
  );
}
