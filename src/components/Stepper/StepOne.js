import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useMemo } from "react";
import { getCategory, getSubCategory } from "../../redux/slices/gigsSlice";
import { useDispatch, useSelector } from "../../redux/store/store";

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
  const { userCategory, userSubCategory, loading } = useSelector((state) => state.gig);

  // Fetch categories and subcategories
  useEffect(() => {
    if (!userCategory?.length) dispatch(getCategory());
    if (!userSubCategory?.length) dispatch(getSubCategory());
  }, [dispatch, userCategory, userSubCategory]);

  // Memoize filtered subcategories
  const filteredSubCategories = useMemo(() => {
    if (!category) return [];
    return userSubCategory.filter(
      (sub) => parseInt(sub.category_id) === parseInt(category)
    );
  }, [userSubCategory, category]);

  // Handlers
  const handleChangeSubCategory = (e) => {
    const selected = e.target.value;
    setSubCategory(selected);
  };

  const handleTagsChange = (event, newValue) => {
    const updatedTags = newValue.slice(0, 5);
    setTags(updatedTags);
  };

  const handleTagBlur = (e) => {
    const val = e.target.value?.trim();
    if (val && !tags.includes(val)) {
      setTags([...tags, val].slice(0, 5));
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <CircularProgress />
      </div>
    );
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
                  placeholder="I will..."
                />
                <p className="text-end font-12 mt-2 takegraycolor">
                  {gigTitle.length} / 80 max
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Section */}
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
                  <div className="col-lg-4 col-12 ps-0 pe-lg-2 pe-0 mb-3 mb-lg-0">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-select takegraycolor font-14 pt-2 pb-2"
                      aria-label="Select category"
                    >
                      <option value="">Select A Category</option>
                      {userCategory.map((cat) => (
                        <option key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-4 col-12 pe-0 ps-lg-2 ps-0">
                    <select
                      value={subCategory}
                      onChange={handleChangeSubCategory}
                      className="form-select takegraycolor font-14 pt-2 pb-2"
                      disabled={!category}
                      aria-label="Select subcategory"
                    >
                      <option value="">Select Subcategory</option>
                      {filteredSubCategories.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <p className="blackcolor font-18 poppins fw-medium mt-4">
            Search Tags
          </p>
          <div className="row">
            <div className="col-lg-5 col-12">
              <p className="font-14 takegraycolor inter">
                Enter search terms you feel your buyers will use when looking
                for your service.
              </p>
            </div>
            <div className="col-lg-7 col-12 poppins pe-lg-0">
              <Autocomplete
                multiple
                freeSolo
                id="tags"
                options={[]}
                value={tags}
                onChange={handleTagsChange}
                onBlur={handleTagBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Add tags..."
                    fullWidth
                  />
                )}
              />
              <p className="mb-0 font-12 takegraycolor mt-2">
                5 tags maximum. Use letters and numbers only.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isError && (
        <div
          className="alert alert-danger mt-3 poppins text-center"
          role="alert"
        >
          {isErrorShow}
        </div>
      )}
    </>
  );
};

export default StepOne;