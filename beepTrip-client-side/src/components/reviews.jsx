import React, { useEffect } from "react";

const Reviews = ({ reviews, onReviewDelete, user }) => {
  useEffect(() => {}, [reviews]);

  if (!reviews) return;

  return reviews.map((review, index) => (
    <div key={index} className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Rating: {review.rating}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          By: {review.author.username}
        </h6>
        <p className="card-text">Review: {review.reviewBody}</p>
        {
          <button
            onClick={() => onReviewDelete(review)}
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        }
      </div>
    </div>
  ));
};

export default Reviews;
