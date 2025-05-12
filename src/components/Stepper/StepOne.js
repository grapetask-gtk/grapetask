import { Autocomplete, Chip, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "../../redux/store/store";
import { getCategory, getSubCategory } from "../../redux/slices/gigsSlice";
// import "../style/userByer.scss";

const StepOne = ({
  gigTitle,
  handleInputChange,
  setSubCategory,
  setCategory,
  subCategory,
  category,
  setTags,
  tags,
  isErrorShow,
  isError,
}) => {
  const dispatch = useDispatch();
  const { userCategory, userSubCategory } = useSelector((state) => state.gig);

  // If you plan to use a local state to filter subcategories, you can use:
  // const [subSubCategory, setSubSubCategory] = useState([]);
 
  // Update subcategory state and filter subcategories based on selected category
  const handleChangeSubCategory = (e) => {
    const selected = e.target.value;
    setSubCategory(selected);
    // Optional: If you want to maintain a separate state for sub-subcategories
    // setSubSubCategory(userSubCategory.filter((sub) => sub.parent_id === selected));
  };

  // Filter subcategories based on the selected category
  const filteredSubCategories = userSubCategory.filter(
    (sub) => parseInt(sub.category_id) === parseInt(category)
  );
  
  useEffect(() => {
    console.log("gigTitle:", gigTitle, "category is:", category, "subCategory is:", subCategory, "tags are:", tags);
  });

  useEffect(() => {
  
    dispatch(getCategory());
    dispatch(getSubCategory());
  }, [dispatch]);

  if (userCategory.loading || userSubCategory.loading) {
    return <div>Loading categories...</div>;
  }
  return (
    <>
      <div
        className="stepOne px-lg-3 pt-4 pb-4 rounded-3"
        style={{ backgroundColor: "#F5F5FF" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="mb-3 poppins">
                <label htmlFor="gig" className="form-label fw-medium font-20">
                  Gig title
                </label>
                <input
                  onChange={handleInputChange}
                  value={gigTitle}
                  className="form-control fw-medium font-18 p-4 px-3 mt-2"
                  id="gig"
                  placeholder=""
                  defaultValue=""
                />
                <p className="text-end font-12 mt-2 takegraycolor">
                  {gigTitle.length} / 80 max
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <p className="blackcolor font-18 poppins fw-medium">Category</p>
          <div className="row">
            <div className="col-lg-5 col-12">
              <p className="font-14 takegraycolor poppins">
                Choose the category and sub-category most suitable for your Gig.
              </p>
            </div>
            <div className="col-lg-7 col-12 pe-lg-0">
              <div className="container-fluid">
                <div className="row poppins">
                  <div className="col-lg-4 col-12 ps-0 pe-lg-2 pe-0">
                  <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="form-select takegraycolor font-14 pt-2 pb-2"
>
  <option value="">Select A Category</option>
  {userCategory.map((cat) => (
    <option key={cat.id} value={cat.id.toString()}> {/* Convert to string */}
      {cat.name}
    </option>
  ))}
</select>
                  </div>
                  <div className="col-lg-4 col-12 pe-0 ps-lg-2 ps-0 mt-lg-0 mt-3">
                    <select
                      value={subCategory}
                      onChange={handleChangeSubCategory}
                      className="form-select"
                      required
                      disabled={!category}
                    >
                      <option value="">Select Subcategory</option>
                      {filteredSubCategories.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-4 col-12 pe-0 ps-lg-2 ps-0 mt-lg-0 mt-3">
                    {/* You can use this third column for additional selection if needed */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="blackcolor font-18 poppins fw-medium">Search Tags</p>
          <div className="row">
            <div className="col-lg-5 col-12">
              <p className="font-14 takegraycolor inter">
                Enter search terms you feel your buyers will use when looking
                for your service.
              </p>
            </div>
            <div className="col-lg-7 col-12 poppins pe-lg-0">
              <div className="devices-tag-add">
              <Autocomplete
  multiple
  freeSolo
  id="tags"
  options={[]}
  value={tags}
  onChange={(e, newValue) => {
    console.log("onChange newValue:", newValue);
    setTags(newValue.slice(0, 5));
  }}
  onBlur={(e) => {
    // Optionally, if the user leaves the field, commit the current input if it’s non-empty
    if (e.target.value && !tags.includes(e.target.value)) {
      setTags([...tags, e.target.value].slice(0, 5));
    }
  }}
  renderInput={(params) => (
    <TextField {...params} variant="outlined" placeholder="Add tags..." />
  )}
/>

              </div>
              <p className="mb-0 font-12 takegraycolor mt-2">
                5 tags maximum. Use letters and numbers only.
              </p>
            </div>
          </div>
        </div>
      </div>
      {isError && (
        <div className="alert alert-danger mt-3 poppins text-center" role="alert">
          {isErrorShow}
        </div>
      )}
    </>
  );
};

export default StepOne;
