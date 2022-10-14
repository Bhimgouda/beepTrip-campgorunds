import React from "react";

const ReviewsForm = ({ handleReviewSubmit }) => {
  return (
    <React.Fragment>
      <h2 className="mt-3">Leave a Review</h2>
      <form className="mb-3" onSubmit={handleReviewSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="rating">
            Rating
          </label>
          <input
            min="1"
            max="5"
            id="rating"
            className="form-range"
            name="rating"
            type="range"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="body">
            Review
          </label>
          <textarea
            className="form-control"
            name="reviewBody"
            id="body"
            cols="30"
            rows="3"
          ></textarea>
        </div>
        <button className="btn btn-success">Submit</button>
      </form>
    </React.Fragment>
  );
};

export default ReviewsForm;
