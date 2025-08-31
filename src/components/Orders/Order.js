import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownload from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from "../../utils/axios";
import pLimit from 'p-limit';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DefaultImage from '../../assets/default.webp';
import search from '../../assets/searchbar.webp';
import {
  AllBdOrders,
  AllClientOrders,
  AllExpertOrders,
  OrderSubmit,
  ReviewSubmit,
} from '../../redux/slices/allOrderSlice';
import { downloadAuthenticatedFile } from '../../redux/slices/messageSlice';
import Navbar from '../Navbar';

// Constants
const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB
const CONCURRENCY_LIMIT = 4;
const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/zip',
  'application/x-rar-compressed',
];

// Optimized status configuration using Maps
const STATUS_GROUPS = new Map([
  ['Active', new Set(['active', 'Project Started', 'revision_requested', 'In Revision'])],
  ['Delivered', new Set(['delivered', 'Delivered', 'submitted'])],
  ['Completed', new Set(['completed', 'Completed', 'accepted'])],
  ['Pending Verification', new Set(['pending_verification', 'under_review'])],
  ['Disputed', new Set(['Disputed'])],
  ['Cancelled', new Set(['cancelled', 'rejected'])],
]);

const STATUS_DISPLAY = new Map([
  ['active', 'Active'],
  ['Project Started', 'In Progress'],
  ['delivered', 'Delivered'],
  ['submitted', 'Submitted'],
  ['completed', 'Completed'],
  ['accepted', 'Accepted'],
  ['pending_verification', 'Pending Verification'],
  ['under_review', 'Under Review'],
  ['cancelled', 'Cancelled'],
  ['rejected', 'Rejected'],
  ['revision_requested', 'Revision Requested'],
  ['In Revision', 'In Revision'],
  ['Disputed', 'Disputed'],
]);

const STATUS_BADGE_CLASSES = new Map([
  ['active', 'bg-primary'],
  ['Project Started', 'bg-primary'],
  ['delivered', 'bg-info text-dark'],
  ['Delivered', 'bg-info text-dark'],
  ['completed', 'bg-success'],
  ['Completed', 'bg-success'],
  ['pending_verification', 'bg-warning text-dark'],
  ['under_review', 'bg-warning text-dark'],
  ['cancelled', 'bg-danger'],
  ['rejected', 'bg-danger'],
  ['revision_requested', 'bg-secondary'],
  ['In Revision', 'bg-secondary'],
  ['Disputed', 'bg-danger'],
]);

// DownloadAttachments component with optimized event listeners
const DownloadAttachments = ({ offer, hasDeliveryAttachment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();

  // Memoize attachment data
  const attachments = useMemo(() => offer?.delivery_attachments || [], [offer]);
  const multipleFiles = attachments.length > 1;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const downloadFile = useCallback(async (file) => {
    try {
      // Show download started notification
      toast.info(`Starting download: ${file.name}`, {
        autoClose: 2000,
        hideProgressBar: true,
      });

      // First try the authenticated download through Redux
      try {
        await dispatch(downloadAuthenticatedFile({ 
          filePath: file.path, 
          fileName: file.name 
        })).unwrap();
        return; // Success - exit the function
      } catch (authError) {
        console.log('Authenticated download failed, trying direct download:', authError);
      }

      // Fallback to direct download if authenticated fails
      const directDownloadUrl = `/files/${file.path}`;
      const response = await fetch(directDownloadUrl, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

    } catch (error) {
      console.error('Download error:', error);
      toast.error(`Failed to download ${file.name}: ${error.message}`);
    }
  }, [dispatch]);

  const handleDownloadAll = useCallback(async () => {
    if (!attachments.length) {
      toast.error('No files to download');
      return;
    }

    // Sequential download to avoid browser limitations
    for (const file of attachments) {
      try {
        await downloadFile(file);
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Error downloading ${file.name}:`, error);
      }
    }
  }, [downloadFile, attachments]);

  const formatFileName = useCallback((name, maxLength = 30) => {
    if (!name || name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const nameWithoutExt = name.slice(0, name.lastIndexOf('.'));
    const truncated = nameWithoutExt.slice(0, maxLength - extension.length - 4);
    return `${truncated}...${extension}`;
  }, []);

  const getFileIcon = (fileName) => {
    const ext = fileName?.split('.').pop()?.toLowerCase();
    const iconMap = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      txt: '📄',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️',
      gif: '🖼️',
      zip: '📦',
      rar: '📦',
    };
    return iconMap[ext] || '📄';
  };

  if (!hasDeliveryAttachment || !attachments.length) {
    return null;
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Button
        ref={buttonRef}
        variant="outlined"
        size="small"
        startIcon={<FileDownload />}
        endIcon={
          multipleFiles ? (
            <ExpandMoreIcon
              sx={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            />
          ) : null
        }
        onClick={() => {
          if (multipleFiles) {
            setIsOpen(!isOpen);
          } else {
            downloadFile(attachments[0]);
          }
        }}
        sx={{
          borderColor: '#6B7280',
          color: '#374151',
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#F9FAFB',
            borderColor: '#9CA3AF',
            transform: 'translateY(-1px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        }}
        aria-label={
          multipleFiles
            ? 'Download files menu'
            : `Download ${attachments[0]?.name || 'file'}`
        }
        aria-expanded={multipleFiles ? isOpen : undefined}
        aria-haspopup={multipleFiles ? 'true' : undefined}
      >
        Download {multipleFiles ? 'Files' : 'File'}
      </Button>

      {multipleFiles && (
        <Paper
          ref={dropdownRef}
          sx={{
            display: isOpen ? 'block' : 'none',
            position: 'absolute',
            top: '110%',
            left: 0,
            zIndex: 1000,
            backgroundColor: '#ffffff',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            minWidth: '250px',
            maxWidth: '350px',
            maxHeight: '300px',
            overflowY: 'auto',
            padding: 0,
            animation: isOpen ? 'slideDown 0.2s ease' : undefined,
            '@keyframes slideDown': {
              from: { opacity: 0, transform: 'translateY(-10px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
          role="menu"
          aria-label="Download options"
        >
          <Box
            sx={{
              padding: '12px 16px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#374151' }}>
              {attachments.length} File{attachments.length > 1 ? 's' : ''} Available
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                size="small"
                variant="text"
                onClick={handleDownloadAll}
                sx={{
                  fontSize: '0.75rem',
                  textTransform: 'none',
                  color: '#3B82F6',
                  '&:hover': { backgroundColor: '#EFF6FF' },
                }}
              >
                Download All
              </Button>
              <IconButton
                size="small"
                onClick={() => setIsOpen(false)}
                sx={{
                  color: '#6B7280',
                  '&:hover': { backgroundColor: '#F3F4F6' },
                }}
                aria-label="Close menu"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ padding: '8px 0' }}>
            {attachments.map((file, index) => (
              <Box
                key={`${file.name}-${index}`}
                component="button"
                onClick={() => downloadFile(file)}
                role="menuitem"
                tabIndex={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  padding: '10px 16px',
                  fontSize: '0.875rem',
                  color: '#374151',
                  backgroundColor: 'transparent',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    backgroundColor: '#F9FAFB',
                    color: '#1F2937',
                  },
                  '&:focus': {
                    backgroundColor: '#EFF6FF',
                    outline: '2px solid #3B82F6',
                    outlineOffset: '-2px',
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    downloadFile(file);
                  }
                }}
              >
                <span style={{ fontSize: '1.2rem', minWidth: '20px' }}>
                  {getFileIcon(file.name)}
                </span>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {formatFileName(file.name)}
                  </Typography>
                  {file.size && (
                    <Typography
                      variant="caption"
                      sx={{ color: '#6B7280', display: 'block' }}
                    >
                      {(file.size / 1024).toFixed(1)} KB
                    </Typography>
                  )}
                </Box>
                <FileDownload sx={{ fontSize: '1rem', color: '#9CA3AF' }} />
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

// OrderTableTab component with optimized rendering
const OrderTableTab = React.memo(({
  id,
  orders,
  userRole,
  renderOrderRow,
  emptyMessage,
  isActive = false,
}) => {
  const hasDeliveredOrCompleted = useMemo(() => 
    orders.some(order => 
      ['delivered', 'completed'].includes((order.status || '').toLowerCase())
    ),
    [orders]
  );

  return (
    <div
      className={`tab-pane fade ${isActive ? 'show active' : ''}`}
      id={id}
      role="tabpanel"
      aria-labelledby={`${id}-tab`}
      tabIndex={0}
    >
      <div className="container-fluid ProfileVisit order-table my-42">
        <div className="row justify-content-center">
          <div className="col-12 bg-white rounded-3 px-0">
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table sx={{ minWidth: 650 }} aria-label="orders table">
                <TableHead>
                  <TableRow>
                    <TableCell className="font-16 poppins fw-medium ps-4">
                      {userRole === 'Client' ? 'Seller' : 'Buyer'}
                    </TableCell>
                    <TableCell className="font-16 poppins fw-medium" align="center">
                      Gig
                    </TableCell>
                    <TableCell className="font-16 poppins fw-medium" align="center">
                      Due Date
                    </TableCell>
                    <TableCell className="font-16 poppins fw-medium" align="center">
                      Total
                    </TableCell>
                    <TableCell className="font-16 poppins fw-medium" align="center">
                      Status
                    </TableCell>
                    {hasDeliveredOrCompleted && (
                      <TableCell className="font-16 poppins fw-medium" align="center">
                        Files
                      </TableCell>
                    )}
                    <TableCell className="font-16 poppins fw-medium" align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order) => renderOrderRow(order, userRole === 'Client'))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        <Typography variant="body1" color="text.secondary">
                          {emptyMessage}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
});

// ReviewModal component with memoization
const ReviewModal = React.memo(({
  open,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  isSubmitting,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="review-modal-title"
      aria-describedby="review-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '70%', md: '50%' },
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          overflow: 'auto',
          p: 4,
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 font-500 cocon">Write a Review</h5>
          <IconButton onClick={onClose} disabled={isSubmitting}>
            <CloseIcon />
          </IconButton>
        </div>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating (1 to 5) *
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              className="form-control"
              min="1"
              max="5"
              value={formData.rating}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="comment" className="form-label">
              Comment *
            </label>
            <textarea
              id="comment"
              name="comment"
              className="form-control"
              rows="4"
              value={formData.comment}
              onChange={onInputChange}
              placeholder="Share your experience with this order..."
              required
              maxLength={500}
            />
            <small className="text-muted">
              {formData.comment.length}/500 characters
            </small>
          </div>

          <div className="d-flex gap-2">
            <Button
              type="submit"
              variant="contained"
              disabled={
                isSubmitting || !formData.rating || !formData.comment.trim()
              }
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
});

// Optimized Order component with all improvements
const Order = () => {
  const dispatch = useDispatch();
  const { expertOrders, clientOrders, bdOrders, isLoading, getError } =
    useSelector((state) => state.allOrder);

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [orderFiles, setOrderFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [orderCompletionModal, setOrderCompletionModal] = useState(false);
  const [completingOrder, setCompletingOrder] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    rating: 0,
    comment: '',
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [disputeDialogOpen, setDisputeDialogOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [revisionDialogOpen, setRevisionDialogOpen] = useState(false);
  const [revisionInstructions, setRevisionInstructions] = useState('');
  const [downloadingFileId, setDownloadingFileId] = useState(null);

  // Memoized user data
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('UserData') || '{}');
    } catch {
      return {};
    }
  }, []);

  const accessToken = useMemo(() => localStorage.getItem('accessToken'), []);

  // Handlers
  const openReviewModal = useCallback(() => setShowReviewModal(true), []);
  const closeReviewModal = useCallback(() => {
    setReviewFormData({ rating: 0, comment: '' });
    setShowReviewModal(false);
  }, []);

  const handleReviewInputChange = useCallback((e) => {
    setReviewFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // Optimized formatDate function
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
    } catch {
      return 'Invalid Date';
    }
  }, []);

  // Data fetching with cleanup
  useEffect(() => {
    if (!user?.role) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        if (user.role === 'expert/freelancer') {
          await dispatch(AllExpertOrders()).unwrap();
        } else if (user.role === 'Client') {
          await dispatch(AllClientOrders({ client_id: user.id })).unwrap();
        } else if (user.role === 'bidder/company representative/middleman') {
          await dispatch(AllBdOrders()).unwrap();
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching orders:', error);
          toast.error(error.message || 'Failed to load orders');
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [dispatch, user?.role, user?.id]);

  // Get orders based on user role
  const selectedOrders = useMemo(() => {
    if (user?.role === 'expert/freelancer') return expertOrders || [];
    if (user?.role === 'Client') return clientOrders || [];
    if (user?.role === 'bidder/company representative/middleman') return bdOrders || [];
    return [];
  }, [user?.role, expertOrders, clientOrders, bdOrders]);

  // Optimized filter function
  const filterOrders = useCallback(
    (array, statusGroup) => {
      if (!Array.isArray(array)) return [];

      const allowedStatuses = STATUS_GROUPS.get(statusGroup) || new Set();
      const query = searchQuery.toLowerCase().trim();

      return array.filter(order => {
        const matchesStatus = order?.status && allowedStatuses.has(order.status);
        if (!matchesStatus) return false;
        if (!searchQuery) return true;

        return (
          order?.gig?.title?.toLowerCase().includes(query) ||
          order?.client?.fname?.toLowerCase().includes(query) ||
          order?.client?.lname?.toLowerCase().includes(query) ||
          order?.seller?.fname?.toLowerCase().includes(query) ||
          order?.seller?.lname?.toLowerCase().includes(query) ||
          order?.title?.toLowerCase().includes(query) ||
          order?.description?.toLowerCase().includes(query)
        );
      });
    },
    [searchQuery]
  );

  // Memoized filtered orders with optimized filtering
  const activeOrders = useMemo(
    () => filterOrders(selectedOrders, 'Active'),
    [selectedOrders, filterOrders]
  );
  const deliveredOrders = useMemo(
    () => filterOrders(selectedOrders, 'Delivered'),
    [selectedOrders, filterOrders]
  );
  const completedOrders = useMemo(
    () => filterOrders(selectedOrders, 'Completed'),
    [selectedOrders, filterOrders]
  );
  const pendingVerificationOrders = useMemo(
    () => filterOrders(selectedOrders, 'Pending Verification'),
    [selectedOrders, filterOrders]
  );
  const disputedOrders = useMemo(
    () => filterOrders(selectedOrders, 'Disputed'),
    [selectedOrders, filterOrders]
  );
  const cancelledOrders = useMemo(
    () => filterOrders(selectedOrders, 'Cancelled'),
    [selectedOrders, filterOrders]
  );

  // Optimized file upload handling with progress tracking
  const uploadFileInChunks = useCallback(
    async (file, offerId) => {
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      const limit = pLimit(CONCURRENCY_LIMIT);

      // Initialize progress tracking
      setUploadProgress(prev => ({
        ...prev,
        [file.name]: { loaded: 0, total: file.size, percent: 0 }
      }));

      const uploadChunk = async (chunk, index) => {
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('chunk_index', index);
        formData.append('total_chunks', totalChunks);
        formData.append('file_name', file.name);
        formData.append('offer_id', offerId);

        try {
          await axios.post(`/order/submit`, formData, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
            onUploadProgress: (event) => {
              if (event.total > 0) {
                setUploadProgress(prev => {
                  const currentFile = prev[file.name] || { loaded: 0, total: file.size };
                  const newLoaded = currentFile.loaded + event.loaded;
                  const newPercent = Math.round((newLoaded / file.size) * 100);
                  
                  return {
                    ...prev,
                    [file.name]: {
                      loaded: newLoaded,
                      total: file.size,
                      percent: newPercent
                    }
                  };
                });
              }
            },
          });
        } catch (err) {
          console.error(`Error uploading chunk ${index + 1}:`, err);
          throw err;
        }
      };

      const uploadPromises = [];
      for (let index = 0; index < totalChunks; index++) {
        const chunkStart = index * CHUNK_SIZE;
        const chunkEnd = Math.min((index + 1) * CHUNK_SIZE, file.size);
        const chunk = file.slice(chunkStart, chunkEnd);
        uploadPromises.push(limit(() => uploadChunk(chunk, index)));
      }

      await Promise.all(uploadPromises);
    },
    [accessToken]
  );

  // Optimized download handler
  const handleDownload = useCallback(
    async (filePath, fileName, msgId) => {
      setDownloadingFileId(msgId);
      try {
        // Try authenticated download first
        await dispatch(downloadAuthenticatedFile({ filePath, fileName })).unwrap();
      } catch (authError) {
        console.log('Authenticated download failed, trying direct download');
        try {
          // Fallback to direct download
          const link = document.createElement('a');
          link.href = filePath;
          link.download = fileName || filePath.split('/').pop();
          document.body.appendChild(link);
          link.click();
          setTimeout(() => document.body.removeChild(link), 100);
        } catch (error) {
          toast.error('Failed to download file');
        }
      } finally {
        setDownloadingFileId(null);
      }
    },
    [dispatch]
  );

  const handleOrderFileChange = useCallback((e) => {
    const files = Array.from(e.target.files || []);

    // Validate file types
    const invalidFiles = files.filter(
      (file) => !ALLOWED_FILE_TYPES.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      toast.error(
        `Invalid file type: ${invalidFiles
          .map((f) => f.name)
          .join(', ')}. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}`
      );
      return;
    }

    // Validate file sizes
    const oversizedFiles = files.filter((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      toast.error(
        `These files exceed 5GB: ${oversizedFiles
          .map((f) => f.name)
          .join(', ')}`
      );
      return;
    }

    setOrderFiles((prev) => [...prev, ...files]);
  }, []);

  const handleApproveOrder = useCallback(async () => {
    if (!selectedOrder) return;

    setCompletingOrder(true);
    try {
      await axios.post(
        `/order/complete`,
        { order_id: selectedOrder.id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success('Order marked as completed successfully!');
      setOrderCompletionModal(false);

      // Refresh orders
      if (user?.role === 'Client') {
        await dispatch(AllClientOrders({ client_id: user?.id })).unwrap();
      } else if (user?.role === 'bidder/company representative/middleman') {
        await dispatch(AllBdOrders()).unwrap();
      }
    } catch (error) {
      console.error('Error completing order:', error);
      toast.error(error.response?.data?.message || 'Failed to complete order');
    } finally {
      setCompletingOrder(false);
    }
  }, [selectedOrder, accessToken, user?.role, user?.id, dispatch]);

  const handleRequestRevision = useCallback(async () => {
    if (!selectedOrder || !revisionInstructions.trim()) {
      toast.error('Please provide revision instructions');
      return;
    }

    setActionLoading(true);
    try {
      await axios.post(
        `/order/request-revision`,
        {
          order_id: selectedOrder.id,
          revision_notes: revisionInstructions,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success('Revision requested successfully!');
      setRevisionDialogOpen(false);
      setRevisionInstructions('');

      // Refresh orders
      if (user?.role === 'Client') {
        await dispatch(AllClientOrders({ client_id: user?.id })).unwrap();
      } else if (user?.role === 'bidder/company representative/middleman') {
        await dispatch(AllBdOrders()).unwrap();
      }
    } catch (error) {
      console.error('Error requesting revision:', error);
      toast.error(error.response?.data?.message || 'Failed to request revision');
    } finally {
      setActionLoading(false);
    }
  }, [selectedOrder, revisionInstructions, accessToken, user?.role, user?.id, dispatch]);

  const handleDisputeOrder = useCallback(async () => {
    if (!selectedOrder || !disputeReason.trim()) {
      toast.error('Please provide a reason for the dispute');
      return;
    }

    setActionLoading(true);
    try {
      await axios.post(
        `/order/dispute`,
        {
          order_id: selectedOrder.id,
          dispute_reason: disputeReason,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.warning('Order disputed successfully!');
      setDisputeDialogOpen(false);
      setDisputeReason('');

      // Refresh orders
      if (user?.role === 'Client') {
        await dispatch(AllClientOrders({ client_id: user?.id })).unwrap();
      } else if (user?.role === 'bidder/company representative/middleman') {
        await dispatch(AllBdOrders()).unwrap();
      }
    } catch (error) {
      console.error('Error disputing order:', error);
      toast.error(error.response?.data?.message || 'Failed to dispute order');
    } finally {
      setActionLoading(false);
    }
  }, [selectedOrder, disputeReason, accessToken, user?.role, user?.id, dispatch]);

  const removeOrderFile = useCallback(
    (index) => {
      setOrderFiles((prev) => prev.filter((_, i) => i !== index));
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        const fileToRemove = orderFiles[index];
        if (fileToRemove) {
          delete newProgress[fileToRemove.name];
        }
        return newProgress;
      });
    },
    [orderFiles]
  );

  const handleCloseSubmissionDialog = useCallback(() => {
    setSubmissionDialogOpen(false);
    setSubmissionMessage('');
    setOrderFiles([]);
    setUploadProgress({});
    setSelectedOrder(null);
  }, []);

  // Optimized order submission
  const handleSubmitOrder = useCallback(async () => {
    if (!selectedOrder || !submissionMessage.trim()) {
      toast.error('Please provide order description');
      return;
    }

    setSubmittingOrder(true);

    try {
      // Upload files in parallel
      if (orderFiles.length > 0) {
        await Promise.all(
          orderFiles.map(file => uploadFileInChunks(file, selectedOrder.offer_id))
        );
      }

      // Submit order metadata
      const metadataForm = new FormData();
      metadataForm.append('delivery_message', submissionMessage);
      metadataForm.append('offer_id', selectedOrder.offer_id);

      await dispatch(
        OrderSubmit({
          orderId: selectedOrder.id,
          payload: metadataForm,
        })
      ).unwrap();

      toast.success('Order submitted successfully!');
      handleCloseSubmissionDialog();

      // Refresh orders
      if (user?.role === 'expert/freelancer') {
        await dispatch(AllExpertOrders()).unwrap();
      }
    } catch (err) {
      console.error('Submit order error', err);
      toast.error(
        err.response?.data?.message || err.message || 'Error submitting order'
      );
    } finally {
      setSubmittingOrder(false);
    }
  }, [
    selectedOrder,
    submissionMessage,
    orderFiles,
    uploadFileInChunks,
    dispatch,
    user?.role,
    handleCloseSubmissionDialog,
  ]);

  // Optimized UI handlers
  const handleActionMenuOpen = useCallback((event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder({
      id: order.id,
      price: order.price || 0,
      due_date: order.due_date || order.created_at,
      status: order.status,
      description: order.description || '',
      gig: {
        title: order.gig?.title || order.title || 'Custom Order',
        id: order.gig?.id || order.gig_id,
      },
      client: order.client,
      seller: order.seller,
      attachments: order.attachments || [],
      delivery_attachments: order.delivery_attachments || [],
      revision_count: order.revision_count || 0,
      created_at: order.created_at,
      offer_id: order.offer_id,
      ...order,
    });
  }, []);

  const handleActionMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleOpenSubmissionDialog = useCallback(() => {
    if (!selectedOrder) {
      toast.error('No order selected');
      return;
    }

    setSubmissionDialogOpen(true);
    handleActionMenuClose();
  }, [selectedOrder, handleActionMenuClose]);

  // Optimized action buttons
  const renderActionButton = useCallback(
    (order) => {
      if (!order?.status) return null;

      const orderStatus = order.status.toLowerCase();

      if (user?.role === 'expert/freelancer') {
        if (
          ['active', 'project started', 'revision_requested', 'in revision'].includes(
            orderStatus
          )
        ) {
          return (
            <Button
              style={{ backgroundColor: '#f16336', color: 'white' }}
              variant="contained"
              startIcon={<FileUploadIcon style={{ color: 'white' }} />}
              onClick={(e) => handleActionMenuOpen(e, order)}
              size="small"
            >
              Submit
            </Button>
          );
        }
      }

      if (
        user?.role === 'Client' ||
        user?.role === 'bidder/company representative/middleman'
      ) {
        if (['submitted', 'delivered'].includes(orderStatus)) {
          return (
            <Button
              variant="outlined"
              onClick={(e) => handleActionMenuOpen(e, order)}
              size="small"
            >
              Actions
            </Button>
          );
        } else if (['completed', 'accepted'].includes(orderStatus)) {
          return (
            <Button variant="text" color="success" size="small" disabled>
              Completed
            </Button>
          );
        } else if (orderStatus === 'disputed') {
          return (
            <Button variant="outlined" color="error" size="small" disabled>
              Disputed
            </Button>
          );
        }
      }

      return null;
    },
    [user?.role, handleActionMenuOpen]
  );

  // Optimized order row component
  const renderOrderRow = useCallback(
    (order, showSeller = false) => {
      if (!order) return null;

      const orderStatus = (order.status || '').toLowerCase();
      const hasDeliveryAttachment =
        (orderStatus === 'delivered' || orderStatus === 'completed') &&
        (order.attachment || order?.delivery_attachments?.length > 0);

      const statusDisplay = STATUS_DISPLAY.get(order.status) || order.status;
      const statusClass = STATUS_BADGE_CLASSES.get(order.status) || 'bg-light text-dark';

      return (
        <TableRow key={order.id} hover>
          {/* Seller/Buyer column */}
          <TableCell className="ps-4">
            <div className="d-flex align-items-center">
             <img
  src={showSeller
    ? order?.seller?.image || DefaultImage
    : order?.client?.image || DefaultImage
  }
  alt="User"
  width={40}
  height={40}
  className="rounded-circle me-2"
  style={{ objectFit: 'cover' }}
  onError={(e) => {
    if (e.target.src !== DefaultImage) {
      e.target.src = DefaultImage;
    }
  }}
/>
              <span>
                {showSeller
                  ? `${order?.seller?.fname || ''} ${order?.seller?.lname || ''}`.trim() ||
                    'Unknown Seller'
                  : `${order?.client?.fname || ''} ${order?.client?.lname || ''}`.trim() ||
                    'Unknown Buyer'}
              </span>
            </div>
          </TableCell>

          {/* Gig column */}
          <TableCell align="center">
            <div className="d-flex flex-column">
              <strong>{order?.gig?.title || order?.title || 'Custom Order'}</strong>
              {order?.description && (
                <small className="text-muted">
                  {order.description.length > 30
                    ? `${order.description.substring(0, 30)}...`
                    : order.description}
                </small>
              )}
            </div>
          </TableCell>

          {/* Due date column */}
          <TableCell align="center">
            <div className="d-flex flex-column">
              <span>{formatDate(order?.due_date || order?.created_at)}</span>
              {order?.due_date && (
                <small
                  className={
                    new Date(order.due_date) < new Date()
                      ? 'text-danger'
                      : 'text-success'
                  }
                >
                  {new Date(order.due_date) < new Date() ? 'Overdue' : 'On time'}
                </small>
              )}
            </div>
          </TableCell>

          {/* Price */}
          <TableCell align="center">
            <strong>
              ${order?.price ? Number(order.price).toFixed(2) : '0.00'}
            </strong>
          </TableCell>

          {/* Status */}
          <TableCell align="center">
            <Badge
              badgeContent={order.revision_count > 0 ? order.revision_count : null}
              color="secondary"
            >
              <span className={`badge ${statusClass}`}>
                {statusDisplay}
              </span>
            </Badge>
          </TableCell>

          {/* Files column only for Delivered/Completed */}
          {(orderStatus === 'delivered' || orderStatus === 'completed') && (
            <TableCell align="center">
              <div className="d-flex justify-content-center gap-2 flex-wrap">
                {hasDeliveryAttachment ? (
                  <DownloadAttachments
                    offer={order}
                    hasDeliveryAttachment={true}
                  />
                ) : (
                  <span className="text-muted">N/A</span>
                )}
              </div>
            </TableCell>
          )}

          {/* Actions column */}
          <TableCell align="center">
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              {renderActionButton(order)}
            </div>
          </TableCell>
        </TableRow>
      );
    },
    [formatDate, renderActionButton]
  );

  const handleReviewSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (
        !reviewFormData.rating ||
        reviewFormData.rating < 1 ||
        reviewFormData.rating > 5
      ) {
        toast.error('Please provide a valid rating between 1 and 5');
        return;
      }

      if (!reviewFormData.comment.trim()) {
        toast.error('Please provide a comment');
        return;
      }

      setIsSubmittingReview(true);

      const formData = new FormData();
      formData.append('rating', parseInt(reviewFormData.rating, 10));
      formData.append('comment', reviewFormData.comment.trim());
      formData.append('offer_id', selectedOrder?.offer_id);
      formData.append('order_id', selectedOrder?.id);

      try {
        await dispatch(ReviewSubmit(formData)).unwrap();
        toast.success('Review submitted successfully!');
        closeReviewModal();
        setOrderCompletionModal(false);

        // Refresh orders
        if (user?.role === 'Client') {
          await dispatch(AllClientOrders({ client_id: user?.id })).unwrap();
        } else if (user?.role === 'bidder/company representative/middleman') {
          await dispatch(AllBdOrders()).unwrap();
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.message || 'Failed to submit review.');
      } finally {
        setIsSubmittingReview(false);
      }
    },
    [
      reviewFormData,
      selectedOrder,
      dispatch,
      user?.role,
      user?.id,
      closeReviewModal,
    ]
  );

  if (isLoading) {
    return (
      <div className="col-12 text-center py-5">
        <CircularProgress />
        <Typography variant="h6" className="mt-3">
          Loading orders...
        </Typography>
      </div>
    );
  }

  if (getError) {
    return (
      <div className="alert alert-danger mx-3 mt-3">
        <h5>Error</h5>
        <p>Error loading orders: {getError}</p>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          className="mt-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container-fluid p-lg-5 p-md-5 p-sm-4 p-3 pt-5">
        <div className="row">
          <div className="container-fluid">
            <div className="row justify-content-lg-between justify-content-end">
              <div className="col-lg-5 col-12">
                <h5 className="cocon byerLine font-22">Manage Orders</h5>
              </div>
              <div className="col-lg-4 mt-lg-0 mt-4 col-md-6 col-sm-8 col-12">
                <div className="allgigs-field">
                  <div className="input-group p-2 h-100">
                    <span
                      className="input-group-text pt-0 pb-0"
                      id="basic-addon1"
                    >
                      <img src={search} width={16} alt="Search" />
                    </span>
                    <input
                      type="text"
                      className="form-control p-0 font-12"
                      id="floatingInputGroup1"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="boxshado rounded-3 p-3 mt-3 ManageOrders">
            <ul className="nav nav-pills ps-lg-4" id="pills-tab" role="tablist">
              <li className="nav-item mx-2 mt-2" role="presentation">
                <button
                  className="nav-link active font-16 poppins fw-medium"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Active ({activeOrders.length})
                </button>
              </li>
              <li className="nav-item mx-2 mt-2" role="presentation">
                <button
                  className="nav-link font-16 poppins fw-medium"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Delivered ({deliveredOrders.length})
                </button>
              </li>
              <li className="nav-item mx-2 mt-2" role="presentation">
                <button
                  className="nav-link font-16 poppins fw-medium"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Completed ({completedOrders.length})
                </button>
              </li>
              <li className="nav-item mx-2 mt-2" role="presentation">
                <button
                  className="nav-link font-16 poppins fw-medium"
                  id="pills-pending-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-pending"
                  type="button"
                  role="tab"
                  aria-controls="pills-pending"
                  aria-selected="false"
                >
                  Pending ({pendingVerificationOrders.length})
                </button>
              </li>
              <li className="nav-item mx-2 mt-2" role="presentation">
                <button
                  className="nav-link font-16 poppins fw-medium"
                  id="pills-disputed-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-disputed"
                  type="button"
                  role="tab"
                  aria-controls="pills-disputed"
                  aria-selected="false"
                >
                  Disputed ({disputedOrders.length})
                </button>
              </li>
              <li className="nav-item mx-2 mt-2" role="presentation">
                <button
                  className="nav-link font-16 poppins fw-medium"
                  id="pills-order-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-order"
                  type="button"
                  role="tab"
                  aria-controls="pills-order"
                  aria-selected="false"
                >
                  Cancelled ({cancelledOrders.length})
                </button>
              </li>
            </ul>

            <hr
              className="border-0 mt-0 mb-3"
              style={{
                height: '8px',
                opacity: '50%',
                backgroundColor: '#F5F5FF',
              }}
            />

            <div className="tab-content" id="pills-tabContent">
              <OrderTableTab
                id="pills-home"
                orders={activeOrders}
                userRole={user?.role}
                renderOrderRow={renderOrderRow}
                emptyMessage="No active orders found"
                isActive={true}
              />
              <OrderTableTab
                id="pills-profile"
                orders={deliveredOrders}
                userRole={user?.role}
                renderOrderRow={renderOrderRow}
                emptyMessage="No delivered orders found"
                isActive={false}
              />
              <OrderTableTab
                id="pills-contact"
                orders={completedOrders}
                userRole={user?.role}
                renderOrderRow={renderOrderRow}
                emptyMessage="No completed orders found"
                isActive={false}
              />
              <OrderTableTab
                id="pills-pending"
                orders={pendingVerificationOrders}
                userRole={user?.role}
                renderOrderRow={renderOrderRow}
                emptyMessage="No orders pending verification"
                isActive={false}
              />
              <OrderTableTab
                id="pills-disputed"
                orders={disputedOrders}
                userRole={user?.role}
                renderOrderRow={renderOrderRow}
                emptyMessage="No disputed orders found"
                isActive={false}
              />
              <OrderTableTab
                id="pills-order"
                orders={cancelledOrders}
                userRole={user?.role}
                renderOrderRow={renderOrderRow}
                emptyMessage="No cancelled orders found"
                isActive={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {user?.role === 'expert/freelancer' && (
          <MenuItem onClick={handleOpenSubmissionDialog} disabled={actionLoading}>
            <FileUploadIcon fontSize="small" className="me-2" />
            Submit Work
          </MenuItem>
        )}
        {(user?.role === 'Client' ||
          user?.role === 'bidder/company representative/middleman') && (
          <>
            {selectedOrder?.status === 'Disputed' ? (
              <MenuItem disabled>Order is Disputed</MenuItem>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    setOrderCompletionModal(true);
                    handleActionMenuClose();
                  }}
                  disabled={actionLoading}
                >
                  Approve & Complete
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setRevisionDialogOpen(true);
                    handleActionMenuClose();
                  }}
                  disabled={actionLoading}
                >
                  Request Revision
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setDisputeDialogOpen(true);
                    handleActionMenuClose();
                  }}
                  disabled={actionLoading}
                >
                  Dispute Order
                </MenuItem>
              </>
            )}
            <MenuItem onClick={handleActionMenuClose}>Cancel</MenuItem>
          </>
        )}
      </Menu>

      {/* Order Submission Modal */}
      <Dialog
        open={submissionDialogOpen}
        onClose={handleCloseSubmissionDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Submit Order</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <div className="mb-4">
                <h6>Order Details</h6>
                <div className="d-flex justify-content-between">
                  <span>
                    Gig:{' '}
                    <strong>
                      {selectedOrder.gig?.title || 'Custom Order'}
                    </strong>
                  </span>
                  <span>
                    Price:{' '}
                    <strong>
                      $
                      {selectedOrder.price
                        ? Number(selectedOrder.price).toFixed(2)
                        : '0.00'}
                    </strong>
                  </span>
                </div>
                <div className="mt-2">
                  <span>Due Date: </span>
                  <strong
                    className={
                      selectedOrder.due_date &&
                      new Date(selectedOrder.due_date) < new Date()
                        ? 'text-danger'
                        : 'text-success'
                    }
                  >
                    {formatDate(selectedOrder.due_date)}
                    {selectedOrder.due_date &&
                      new Date(selectedOrder.due_date) < new Date() &&
                      ' (Overdue)'}
                  </strong>
                </div>
                {selectedOrder.description && (
                  <div className="mt-2">
                    <span>Description: </span>
                    <small className="text-muted">
                      {selectedOrder.description}
                    </small>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Order Description *</label>
                <textarea
                  value={submissionMessage}
                  onChange={(e) => setSubmissionMessage(e.target.value)}
                  placeholder="Describe your completed work..."
                  rows={4}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Attach Files</label>
                <input
                  type="file"
                  multiple
                  onChange={handleOrderFileChange}
                  className="form-control"
                  accept={ALLOWED_FILE_TYPES.join(',')}
                />
                <small className="text-muted">
                  Upload your deliverables (Max 5GB per file)
                </small>
              </div>

              {orderFiles.length > 0 && (
                <div className="mb-3">
                  <h6>Selected Files ({orderFiles.length}):</h6>
                  {orderFiles.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="d-flex align-items-center justify-content-between p-2 border rounded mb-2"
                    >
                      <span className="me-2 flex-grow-1">
                        {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                      <div className="flex-grow-1 me-2">
                        <LinearProgress
                          variant="determinate"
                          value={uploadProgress[file.name]?.percent || 0}
                        />
                      </div>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => removeOrderFile(index)}
                        disabled={submittingOrder}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseSubmissionDialog}
            disabled={submittingOrder}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitOrder}
            variant="contained"
            disabled={
              submittingOrder ||
              !submissionMessage.trim() ||
              !selectedOrder
            }
          >
            {submittingOrder ? (
              <>
                <CircularProgress size={20} className="me-2" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Completion Modal */}
      <Dialog
        open={orderCompletionModal}
        onClose={() => setOrderCompletionModal(false)}
      >
        <DialogTitle>Complete Order</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to mark this order as completed?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This action will complete the order and prompt you to leave a review.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOrderCompletionModal(false)}
            disabled={completingOrder}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setSelectedOffer(selectedOrder?.offer_id);
              openReviewModal();
            }}
            variant="contained"
            disabled={completingOrder}
          >
            {completingOrder ? (
              <>
                <CircularProgress size={20} className="me-2" />
                Completing...
              </>
            ) : (
              'Complete & Review'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Request Revision Modal */}
      <Dialog
        open={revisionDialogOpen}
        onClose={() => setRevisionDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Request Revision</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please provide detailed instructions for the revision:
          </Typography>
          <textarea
            value={revisionInstructions}
            onChange={(e) => setRevisionInstructions(e.target.value)}
            placeholder="What changes are needed? Be specific about what you'd like to see different..."
            rows={4}
            className="form-control"
            required
            maxLength={500}
          />
          <small className="text-muted">
            {revisionInstructions.length}/500 characters
          </small>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setRevisionDialogOpen(false);
              setRevisionInstructions('');
            }}
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRequestRevision}
            variant="contained"
            disabled={actionLoading || !revisionInstructions.trim()}
          >
            {actionLoading ? (
              <>
                <CircularProgress size={20} className="me-2" />
                Requesting...
              </>
            ) : (
              'Request Revision'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dispute Order Modal */}
      <Dialog
        open={disputeDialogOpen}
        onClose={() => setDisputeDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Dispute Order</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please provide the reason for disputing this order:
          </Typography>
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            Warning: Disputing an order will require admin intervention to
            resolve.
          </Typography>
          <textarea
            value={disputeReason}
            onChange={(e) => setDisputeReason(e.target.value)}
            placeholder="Why are you disputing this order? Please be specific about the issues..."
            rows={4}
            className="form-control"
            required
            maxLength={500}
          />
          <small className="text-muted">
            {disputeReason.length}/500 characters
          </small>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDisputeDialogOpen(false);
              setDisputeReason('');
            }}
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDisputeOrder}
            variant="contained"
            color="error"
            disabled={actionLoading || !disputeReason.trim()}
          >
            {actionLoading ? (
              <>
                <CircularProgress size={20} className="me-2" />
                Submitting...
              </>
            ) : (
              'Submit Dispute'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Review Modal */}
      <ReviewModal
        open={showReviewModal}
        onClose={closeReviewModal}
        onSubmit={handleReviewSubmit}
        formData={reviewFormData}
        onInputChange={handleReviewInputChange}
        isSubmitting={isSubmittingReview}
      />
    </>
  );
};

export default Order;
