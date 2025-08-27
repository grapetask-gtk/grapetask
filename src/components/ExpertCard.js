import { MdLocationOn } from "react-icons/md";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../style/imgSlider.scss";

const ExpertCard = ({ user, showExpertDetail }) => {
  // Safe fallbacks based on actual API response structure
  const fullName =
    `${user?.fname ?? ""} ${user?.lname ?? ""}`.trim() || "Unnamed Expert";
  const role = user?.role || "Freelancer";
  const country = user?.country || "Location not specified";
  const city = user?.city || "";
  
  // Format location display
  const location = city && country ? `${city}, ${country}` : country;

  // Get description from first gig or use placeholder
  const description = user?.gigs?.[0]?.description 
    ? user.gigs[0].description.replace(/<[^>]+>/g, "").substring(0, 120) + "..." 
    : "No description available.";

  // Extract hourly rate from gig packages - FIXED
  const getHourlyRate = () => {
    if (!user?.gigs?.[0]?.packages?.length) return "Rate not set";
    
    // Find the first package with a valid price
    const packageWithPrice = user.gigs[0].packages.find(pkg => 
      pkg.total && pkg.total !== "$0" && pkg.total !== "0"
    );
    
    if (!packageWithPrice) return "Rate not set";
    
    // Clean and format the price (remove $ sign if present)
    const price = packageWithPrice.total.replace('$', '');
    return `$${price}`;
  };

  const hourlyRate = getHourlyRate();

  // Extract skills from user skills array (not from gig tags) - FIXED
  const skills = Array.isArray(user?.skills) ? user.skills : [];
  const uniqueSkills = skills.filter(skill => typeof skill === "string" && skill.trim() !== "");

  // Extract categories from gigs - FIXED
  const categories =
    user?.gigs?.map((g) => g?.category?.name).filter(Boolean) || [];
  const uniqueCategories = [...new Set(categories)];

  // Orders & stats - FIXED field names to match API
  const totalOrders = user?.total_orders ?? 0;
  const completeOrders = user?.complete_orders ?? 0;
  const activeOrders = user?.active_orders ?? 0;
  const successRatio = user?.success_ratio ?? 0;

  // Get user level/status - FIXED
  const userLevel = user?.level || "New";
  const userStatus = user?.status || "Unknown";

  return (
    <div
      className="expert-card mt-3 p-3 shadow-sm rounded-3 bg-white"
      onClick={() => showExpertDetail(user)}
      style={{ cursor: "pointer" }}
    >
      {/* Top: Image + Info */}
      <div className="d-flex align-items-center">
        <img
          src={user?.image || "https://portal.grapetask.co/user.png"}
          alt={`${fullName}'s profile`}
          width={70}
          height={70}
          className="rounded-circle border object-fit-cover"
          onError={(e) => {
            e.target.src = "https://portal.grapetask.co/user.png";
          }}
        />
        <div className="ms-3 flex-grow-1">
          <h6 className="colororing font-18 fw-semibold poppins mb-1">
            {fullName}
          </h6>
          <p className="colororing mb-0 font-14 poppins">{role}</p>
          <p className="font-12 poppins d-flex align-items-center mb-0">
            <MdLocationOn className="me-1 text-muted" />
            {location}
          </p>
          <p className="font-12 text-muted mb-0">
            Level: {userLevel} | {userStatus}
          </p>
        </div>
      </div>

      {/* Middle: Availability + Rate */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span className={`badge rounded-pill px-3 py-2 font-12 ${
          user?.status === "Active" ? "bg-success" : "bg-secondary"
        }`}>
          {user?.status === "Active" ? "Available Now" : "Unavailable"}
        </span>
        <p className="font-15 fw-bold poppins text-dark mb-0">{hourlyRate}</p>
      </div>

      {/* Orders & Success ratio */}
      <div className="mt-2 d-flex flex-wrap gap-3 text-muted font-12">
        <span>📦 {totalOrders} orders</span>
        <span>✅ {completeOrders} completed</span>
        {activeOrders > 0 && <span>🟢 {activeOrders} active</span>}
        <span>🏆 {successRatio}% success</span>
      </div>

      {/* Skills - FIXED: Using actual skills array instead of gig tags */}
      {uniqueSkills.length > 0 && (
        <div className="mt-2">
          <p className="font-12 text-muted mb-1">Skills:</p>
          <div className="d-flex flex-wrap gap-2">
            {uniqueSkills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2 py-1 font-12"
              >
                {skill}
              </span>
            ))}
            {uniqueSkills.length > 4 && (
              <span className="badge bg-light text-muted border rounded-pill px-2 py-1 font-12">
                +{uniqueSkills.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Categories */}
      {uniqueCategories.length > 0 && (
        <div className="mt-2">
          <p className="font-12 text-muted mb-1">Categories:</p>
          <div className="d-flex flex-wrap gap-2">
            {uniqueCategories.map((cat, idx) => (
              <span
                key={idx}
                className="badge bg-warning-subtle text-dark border rounded-pill px-2 py-1 font-12"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="mt-3">
        <p className="font-14 text-dark mb-0">{description}</p>
      </div>

      {/* Gig title if available */}
      {user?.gigs?.[0]?.title && (
        <div className="mt-2">
          <p className="font-12 text-muted mb-0">
            <strong>Service:</strong> {user.gigs[0].title}
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpertCard;