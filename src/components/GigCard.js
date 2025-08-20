import { useNavigate } from "react-router-dom";
import { titleToSlug } from "../utils/helpers";
import Card from "./Card";

const GigCard = ({ gig }) => {
  const navigate = useNavigate();
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-4">
      <div
        onClick={() =>
          navigate(
            `/g/${titleToSlug(gig?.title)}/${gig?.seller?.fname}/${gig?.id}`
          )
        }
        className="cursor-pointer h-100"
        key={gig.id}
      >
        <div className="h-100">
          <Card
            gigsImg={
              gig?.media?.image1 ||
              gig?.media?.image2 ||
              gig?.media?.image3 ||
              "/placeholder.png"
            }
            heading={gig?.title || "Untitled Gig"}
            projectNumber="0"
            price={gig?.package?.[0]?.total || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default GigCard;
