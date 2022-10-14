import React, { useEffect, useState } from "react";
import {
  showCampground,
  updateCampground,
} from "../../services/campgroundsService";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const EditCampground = ({ user }) => {
  const [campground, setcampground] = useState({
    description: "",
    image: "",
    location: "",
    price: "",
    title: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function get() {
      const { data: campgroundData } = await showCampground(id);
      setcampground(campgroundData);
    }
    get();
  }, []);

  useEffect(() => {
    if (user._id && campground.author) {
      if (user._id !== campground.author._id) {
        toast.error("You are not Authorized to do that", {
          autoClose: 2000,
        });
        navigate(`/campgrounds/${campground._id}`);
      }
    }
  });

  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      const { title, location, image, price, description } = e.target;
      const editedCampground = {
        title: title.value,
        location: location.value,
        image: image.value,
        description: description.value,
        price: price.value,
      };
      await updateCampground(id, editedCampground);
      toast.success("Campground Updated Successfully", { autoClose: 2500 });
      navigate(`/campgrounds/${id}`);
    } catch (error) {
      toast.error(error.response.data, { autoClose: 2500 });
      navigate(`/campgrounds/${id}`);
    }
  };

  const handleChange = (e) => {
    const c = { ...campground };
    c[e.currentTarget.name] = e.currentTarget.value;
    setcampground(c);
  };

  return (
    <div className="row">
      <h1 className="text-center">Edit Campground</h1>
      <div className="col-6 offset-3">
        <form onSubmit={handleEdit} action="">
          <div className="mb-2">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              name="title"
              value={campground.title}
              onChange={handleChange}
              className="form-control"
              type="text"
              id="title"
            />
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="location">
              Location
            </label>
            <input
              onChange={handleChange}
              value={campground.location}
              className="form-control"
              type="text"
              id="location"
              name="location"
            />
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="image">
              className Image Url
            </label>
            <input
              onChange={handleChange}
              value={campground.image}
              className="form-control"
              type="text"
              id="image"
              name="image"
            />
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
                name="price"
                onChange={handleChange}
                value={campground.price}
                id="price"
                type="text"
                className="form-control"
                placeholder="0.00"
                aria-label="price"
                aria-describedby="price-label"
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              value={campground.description}
              onChange={handleChange}
              className="form-control"
              type="text"
              id="description"
            ></textarea>
          </div>
          <div className="mb-3">
            <button className="btn btn-info">Update Campground</button>
          </div>
        </form>
        <Link to={`/campgrounds/${id}`}>Back to campground</Link>
      </div>
    </div>
  );
};

export default EditCampground;
