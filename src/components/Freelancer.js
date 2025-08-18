import { useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import { FiClock, FiHeart } from 'react-icons/fi';
import DefaultImage from '../assets/default.webp';

const Freelancer = (props) => {
  const [imgSrc, setImgSrc] = useState(props.imges);
  const [error, setError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleImageError = () => {
    if (!error) {
      setImgSrc(DefaultImage);
      setError(true);
    }
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return 'N/A';
    const numericPrice = typeof price === 'string'
      ? parseFloat(price.replace(/[^0-9.-]+/g, ''))
      : Number(price);
    if (isNaN(numericPrice)) return 'N/A';
    return numericPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const displayPrice = formatPrice(props.price);
  const rating = props.rating || 0;

  return (
    <div 
      className="card h-100 border-0 shadow-sm hover-shadow transition-all"
      onClick={props.handleNavigate}
    >
      {/* Image */}
      <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
        <img 
          className="img-fluid w-100 h-100 object-fit-cover" 
          onError={handleImageError} 
          src={props.imges || imgSrc} 
          alt={props.heading}
        />
        <div className="position-absolute top-0 start-0 end-0 d-flex justify-content-between p-2">
          <button 
            className="btn btn-sm btn-light rounded-circle p-1 bg-opacity-75 bg-dark border-0"
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <FaHeart className="text-danger" /> : <FiHeart className="text-white" />}
          </button>
          {props.arrow && <div className="bg-white rounded-circle p-1">{props.arrow}</div>}
        </div>
        {displayPrice !== 'N/A' && (
          <div className="position-absolute bottom-0 start-0 m-2 bg-white rounded px-2 py-1 shadow-sm">
            <small className="text-muted">Starting at </small>
            <strong className="text-success">{displayPrice}</strong>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="card-body">
        {/* Seller */}
        <div className="d-flex align-items-center mb-2">
          <img 
            src={props.sellerAvatar || DefaultImage} 
            alt="Seller" 
            className="rounded-circle me-2" 
            width="24" 
            height="24"
          />
          <div className="d-flex align-items-center">
            <small className="text-muted me-1">{props.seller || 'Top Rated Seller'}</small>
            {props.isPro && <span className="badge bg-success ms-1">Pro</span>}
          </div>
        </div>

        {/* Title */}
        <h5 
          className="card-title fs-6 text-dark mb-2" 
          style={{
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.8em'
          }}
        >
          {props.heading}
        </h5>

        {/* Rating */}
        <div className="d-flex align-items-center mb-2">
          {[props.star1, props.star2, props.star3, props.star4, props.star5].map((color, i) => (
            <FaStar key={i} style={{ color, marginRight: '2px' }} />
          ))}
          <small className="text-warning fw-bold ms-1">{rating.toFixed(1)}</small>
          <small className="text-muted ms-1">{props.ratingCount}</small>
        </div>

        {/* Meta */}
        <div className="d-flex justify-content-between">
          <small className="text-muted">
            <FiClock className="align-middle me-1" />
            4 Day Delivery
          </small>
        </div>
      </div>
    </div>
  );
};

export default Freelancer;
