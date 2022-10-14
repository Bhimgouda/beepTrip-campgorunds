import { addCampground } from "../../services/campgroundsService";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const NewCampground = ({}) => {
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { title, location, image, description, price } = e.target;
      const newCamp = {
        title: title.value,
        location: location.value,
        description: description.value,
        image: image.value,
        price: price.value,
      };
      const { data: camp } = await addCampground(newCamp);
      toast.success("Campground Successfully Added", { autoClose: 2500 });
      navigate(`/campgrounds/${camp._id}`);
    } catch (error) {
      toast.error(error.response.data, { autoClose: 2500 });
    }
  };

  return (
    <div className="row">
      <h1 className="text-center">New Campground</h1>
      <div className="col-6 offset-3">
        <form onSubmit={handleSubmit} noValidate action="">
          <div className="mb-2">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input required className="form-control" type="text" id="title" />
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="location">
              Location
            </label>
            <input
              required
              className="form-control"
              type="text"
              id="location"
            />
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="image">
              Image Url
            </label>
            <input required className="form-control" type="text" id="image" />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Campground Price
            </label>
            <div className="input-group">
              <span className="input-group-text" id="price-label">
                $
              </span>
              <input
                id="price"
                type="text"
                className="form-control"
                placeholder="0.00"
                aria-label="price"
                aria-describedby="price-label"
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              className="form-control"
              type="text"
              id="description"
            ></textarea>
          </div>
          <div className="mb-3">
            <button className="btn btn-success">Add Campground</button>
          </div>
        </form>
        <Link to="/campgrounds">
          <button>All Campgrounds</button>
        </Link>
      </div>
    </div>
  );
};

export default NewCampground;
