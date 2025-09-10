import {
  Alert,
  Box,
  Button,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  Typography
} from "@mui/material";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "../../redux/store/store";

// Redux actions
import {
  Description,
  GigDescriptionUpdate,
  GigOverViewUpdate,
  GigPricingUpdate,
  GigPublishUpdate,
  GigRequirmentUpdate,
  GigUserFaqsUpDate,
  GigUserGalleryUpdate,
  Overview,
  Pricing,
  Requirements,
  gigPublish,
  userFaqs,
  userGallery,
} from "../../redux/slices/gigsSlice";

// Components
import StepFive from "./StepFive";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepSix from "./StepSix";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

// Constants
const STEPS = [
  "Overview",
  "Pricing & Details", 
  "Description & FAQ",
  "Requirements",
  "Gallery",
  "Publish",
];

const INITIAL_STEP_STATE = {
  // Step 1
  gigTitle: "I am really good at",
  category: "",
  subCategory: "",
  tags: [],
  // Step 2
  basicPackage: "",
  standerdPackage: "",
  premiumPackage: "",
  ravisionBasic: "",
  ravisionStadard: "",
  ravisionPremium: "",
  deliveryBasic: "",
  deliveryStadard: "",
  deliveryPremium: "",
  sourceFileBasice: "no",
  sourceFileStandard: "no",
  sourceFilePremium: "no",
  resolutionFileBasice: "no",
  resolutionFileStandard: "no",
  resolutionFilePremium: "no",
  totalBasic: "$",
  totalPremium: "$",
  totalStand: "$",
   // New additional package details
  experienceLevel: "intermediate",
  languages: [{ language: "English", proficiency: "Fluent" }],
  skills: [],
  availability: "within_3_days",
  responseTime: "within_1_hour",
  supportedFormats: [],
  usageRights: "personal_use",
  revisionsIncluded: true,
  supportIncluded: true,
  // Step 3
  text: "",
  faqs: [],
  // Step 4
  requirmentfields: [""],
  // Step 5
  uploadedImages: [],
  uploadedVideos: [],
  uploadedPDFs: [],
};

// Reducer function
function stepReducer(state, action) {
  if (action.type === "RESET") {
    return { ...INITIAL_STEP_STATE };
  }
  return { ...state, ...action.payload };
}

// Custom hook for step management
const useStepState = (initialState) => {
  const [state, dispatch] = useReducer(stepReducer, initialState);
  
  const setState = useCallback((updates) => {
    dispatch({ payload: updates });
  }, []);
  
  const resetState = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);
  
  return [state, setState, resetState];
};

export default function MultiStepForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { getError } = useSelector((state) => state.gig);
  
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });
  
  const [stepState, setStepState, resetStepState] = useStepState(INITIAL_STEP_STATE);
  const gigData = location.state?.gigData || null;
const [showModal, setShowModal] = useState(false);
const [question, setQuestion] = useState('');
const [answer, setAnswer] = useState('');
  // Error states
  const [error, setError] = useState({
    overview: "",
    pricing: "",
    description: "",
    requirement: "",
    gallery: "",
  });

  // Helpers
  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

  // Show snackbar notification
  const showSnackbar = useCallback((message, severity = "error") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  // Close snackbar
  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  // Unified response handler
  const handleResponse = useCallback((nextStep, errorKey) => (data) => {
    setIsLoading(false);
    if (data?.status) {
      setActiveStep((prev) => prev + 1);
      setError((e) => ({ ...e, [errorKey]: "" }));
    } else {
      showSnackbar(data?.message || "An error occurred", "error");
    }
  }, [showSnackbar]);

  // Initialize form data if editing
  useEffect(() => {
    if (!gigData) return;
    
    const initializeFormData = async () => {
      const {
        title,
        category_id,
        subcategory_id,
        tags: rawTags,
        packages,
        description,
        faq,
        requirement,
        media,
      } = gigData;

      // Process tags
      let tags = [];
      if (rawTags) {
        if (Array.isArray(rawTags)) {
          tags = rawTags;
        } else if (typeof rawTags === "string") {
          try {
            const parsed = JSON.parse(rawTags);
            tags = Array.isArray(parsed) ? parsed : rawTags.split(",").map((t) => t.trim());
          } catch {
            tags = rawTags.split(",").map((t) => t.trim());
          }
        }
      }

      // Process packages
      let basic = {}, standard = {}, premium = {};
      if (Array.isArray(packages) && packages.length >= 3) {
        basic = packages.find((p) => p.type === "basic") || packages[0] || {};
        standard = packages.find((p) => p.type === "standard") || packages[1] || {};
        premium = packages.find((p) => p.type === "premium") || packages[2] || {};
      }

      // Process PDFs
      const uploadedPDFs = [media?.pdf_file1, media?.pdf_file2].filter(Boolean);

      // Process images
      const imagePaths = [media?.image1, media?.image2, media?.image3].filter(Boolean);
      let uploadedImages = [];
      
      if (imagePaths.length) {
        try {
          const files = await Promise.all(
            imagePaths.map(async (path, idx) => {
              try {
                const res = await fetch(path);
                const blob = await res.blob();
                return new File([blob], `image${idx + 1}.webp`, { type: "image/jpeg" });
              } catch {
                return null;
              }
            })
          );
          uploadedImages = files.filter(Boolean);
        } catch (error) {
          console.error("Error loading images:", error);
        }
      }

      setStepState({
        gigTitle: title || "I am really good at",
        category: category_id?.toString() || "",
        subCategory: subcategory_id?.toString() || "",
        tags,
        basicPackage: basic.title || "",
        sourceFileBasice: basic.source_file || "no",
        resolutionFileBasice: basic.resulation || "no",
        ravisionBasic: basic.ravision || "",
        deliveryBasic: basic.delivery_time || "",
        totalBasic: basic.total || "$",
        standerdPackage: standard.title || "",
        sourceFileStandard: standard.source_file || "no",
        resolutionFileStandard: standard.resulation || "no",
        ravisionStadard: standard.ravision || "",
        deliveryStadard: standard.delivery_time || "",
        totalStand: standard.total || "$",
        premiumPackage: premium.title || "",
        sourceFilePremium: premium.source_file || "no",
        resolutionFilePremium: premium.resulation || "no",
        ravisionPremium: premium.ravision || "",
        deliveryPremium: premium.delivery_time || "",
        totalPremium: premium.total || "$",
        text: description || "",
        faqs: faq || [],
        requirmentfields: requirement || [""],
        uploadedVideos: media?.video ? [media.video] : [],
        uploadedPDFs,
        uploadedImages,
      });
    };

    initializeFormData();
  }, [gigData, setStepState]);

  // Input change for gig title
  const handleInputChange = useCallback((e) => {
    const inputText = e.target.value;
    if (inputText.length <= 80) {
      setStepState({ gigTitle: inputText });
    }
  }, [setStepState]);

  // Navigation handlers
  const handleBack = useCallback(() => {
    setActiveStep((prev) => prev - 1);
  }, []);

  const handleSkip = useCallback(() => {
    if (!isStepOptional(activeStep)) return;
    
    setActiveStep((prev) => prev + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  }, [activeStep, isStepOptional]);

  // Validation functions
  const validateOverview = useCallback(() => {
    const { gigTitle, category, subCategory, tags } = stepState;
    return gigTitle && category && subCategory && tags.length > 0;
  }, [stepState]);

  const validatePricing = useCallback(() => {
    const {
      basicPackage, standerdPackage, premiumPackage,
      ravisionBasic, ravisionStadard, ravisionPremium,
      totalBasic, totalStand, totalPremium,
      deliveryBasic, deliveryStadard, deliveryPremium,
    } = stepState;
    
    return (
      basicPackage.length > 1 && 
      standerdPackage.length > 1 && 
      premiumPackage.length > 1 &&
      ravisionBasic && 
      ravisionStadard && 
      ravisionPremium &&
      totalBasic.length > 1 && 
      totalStand.length > 1 && 
      totalPremium.length > 1 &&
      deliveryBasic && 
      deliveryStadard && 
      deliveryPremium
    );
  }, [stepState]);

  const validateDescription = useCallback(() => {
    return stepState.text.length > 0;
  }, [stepState]);

  const validateRequirements = useCallback(() => {
    return stepState.requirmentfields.length > 0 && 
           stepState.requirmentfields.every((v) => v.trim().length > 0);
  }, [stepState]);

  const validateGallery = useCallback(() => {
    return stepState.uploadedImages.length > 0;
  }, [stepState]);

  // Next step handler
  const handleNext = useCallback((e) => {
    e.preventDefault();
    
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setSkipped(newSkipped);

    // Step-specific validation and submission
    switch (activeStep) {
      case 0: // Overview
        if (validateOverview()) {
          const { gigTitle, category, subCategory, tags } = stepState;
          const data = gigData
            ? { gig_id: gigData.id, category_id: category, subcategory_id: subCategory, title: gigTitle, tags }
            : { category_id: category, subcategory_id: subCategory, title: gigTitle, tags };
          
          setIsLoading(true);
          setError((e) => ({ ...e, overview: "" }));
          
          gigData
            ? dispatch(GigOverViewUpdate(data, handleResponse(1, "overview")))
            : dispatch(Overview(data, handleResponse(1, "overview")));
        } else {
          setError((e) => ({ ...e, overview: "All fields are required" }));
          showSnackbar("Please complete all overview fields", "error");
        }
        break;
// In the handleNext function, update the Pricing case (activeStep === 1):
case 1: // Pricing
  if (validatePricing()) {
    const {
      basicPackage, standerdPackage, premiumPackage,
      ravisionBasic, ravisionStadard, ravisionPremium,
      totalBasic, totalStand, totalPremium,
      deliveryBasic, deliveryStadard, deliveryPremium,
      sourceFileBasice, sourceFileStandard, sourceFilePremium,
      resolutionFileBasice, resolutionFileStandard, resolutionFilePremium,
      // Additional details
      experienceLevel, languages, skills, availability,
      responseTime, supportedFormats, usageRights,
      revisionsIncluded, supportIncluded
    } = stepState;
    
    const data = {
      // Package fields
      title_basic: basicPackage,
      source_file_basic: sourceFileBasice,
      resulation_basic: resolutionFileBasice,
      ravision_basic: ravisionBasic,
      delivery_time_basic: deliveryBasic,
      total_basic: totalBasic,
      
      title_standard: standerdPackage,
      source_file_standard: sourceFileStandard,
      resulation_standard: resolutionFileStandard,
      ravision_standard: ravisionStadard,
      delivery_time_standard: deliveryStadard,
      total_standard: totalStand,
      
      title_premium: premiumPackage,
      source_file_premium: sourceFilePremium,
      resulation_premium: resolutionFilePremium,
      ravision_premium: ravisionPremium,
      delivery_time_premium: deliveryPremium,
      total_premium: totalPremium,
      
      // Additional service details
      experience_level: experienceLevel,
      languages: languages,
      skills: skills,
      availability: availability,
      response_time: responseTime,
      supported_formats: supportedFormats,
      usage_rights: usageRights,
      revisions_included: revisionsIncluded,
      support_included: supportIncluded,
      
      // Gig ID
      gig_id: gigData ? gigData.id : localStorage.getItem("id")
    };
    
    if (gigData) {
      dispatch(GigPricingUpdate(data, handleResponse(2, "pricing")));
    } else {
      dispatch(Pricing(data, handleResponse(2, "pricing")));
    }
    
    setError((e) => ({ ...e, pricing: "" }));
    setIsLoading(true);
  } else {
    setError((e) => ({ ...e, pricing: "All required fields are needed" }));
    showSnackbar("Please complete all required pricing fields", "error");
  }
  break;

      case 2: // Description & FAQ
        if (validateDescription()) {
          const { text, faqs } = stepState;
          let data = gigData
            ? { gig_id: gigData.id, description: text }
            : { gig_id: localStorage.getItem("id"), description: text };
          
          setIsLoading(true);
          setError((e) => ({ ...e, description: "" }));
          
          gigData
            ? dispatch(GigDescriptionUpdate(data, handleResponse(3, "description")))
            : dispatch(Description(data, handleResponse(3, "description")));
          
          // Submit FAQs if any
          if (faqs.length) {
            let allQuestion = faqs.map((faq) => ({ question: faq.question, answer: faq.answer }));
            let faqData = gigData
              ? { gig_id: gigData.id, questions: allQuestion }
              : { allquestion: allQuestion.map((q) => ({ ...q, gig_id: localStorage.getItem("id") })) };
            
            gigData
              ? dispatch(GigUserFaqsUpDate(faqData, () => {}))
              : dispatch(userFaqs(faqData, () => {}));
          }
        } else {
          setError((e) => ({ ...e, description: "Description is required" }));
          showSnackbar("Please add a description", "error");
        }
        break;

      case 3: // Requirements
        if (validateRequirements()) {
          const { requirmentfields } = stepState;
          let data = gigData
            ? { gig_id: gigData.id, requirement: requirmentfields }
            : { gig_id: localStorage.getItem("id"), requirement: requirmentfields };
          
          setIsLoading(true);
          setError((e) => ({ ...e, requirement: "" }));
          
          gigData
            ? dispatch(GigRequirmentUpdate(data, handleResponse(4, "requirement")))
            : dispatch(Requirements(data, handleResponse(4, "requirement")));
        } else {
          setError((e) => ({ ...e, requirement: "At least one requirement is needed" }));
          showSnackbar("Please add at least one requirement", "error");
        }
        break;

      case 4: // Gallery
        if (validateGallery()) {
          const { uploadedImages, uploadedVideos, uploadedPDFs } = stepState;
          let data = {
            imageFile1: uploadedImages[0],
            imageFile2: uploadedImages[1],
            imageFile3: uploadedImages[2],
            videoFile: uploadedVideos[0],
            pdfFile1: uploadedPDFs[0],
            pdfFile2: uploadedPDFs[1],
          };
          
          if (gigData) {
            data.gigID = gigData.id;
            dispatch(GigUserGalleryUpdate(data, handleResponse(5, "gallery")));
          } else {
            data.gigID = localStorage.getItem("id");
            dispatch(userGallery(data, handleResponse(5, "gallery")));
          }
          
          setError((e) => ({ ...e, gallery: "" }));
          setIsLoading(true);
        } else {
          setError((e) => ({ ...e, gallery: "Please upload at least one image" }));
          showSnackbar("Please upload at least one image", "error");
        }
        break;

      case 5: // Publish
        let data = gigData
          ? { gig_id: gigData.id }
          : { gig_id: localStorage.getItem("id") };
        
        setIsLoading(true);
        gigData
          ? dispatch(GigPublishUpdate(data, (res) => {
              setIsLoading(false);
              if (res?.status) {
                showSnackbar("Gig published successfully!", "success");
                setTimeout(() => navigate("/gig"), 1500);
              }
            }))
          : dispatch(gigPublish(data, (res) => {
              setIsLoading(false);
              if (res?.status) {
                showSnackbar("Gig published successfully!", "success");
                setTimeout(() => navigate("/gig"), 1500);
              }
            }));
        break;

      default:
        break;
    }
  }, [
    activeStep, skipped, stepState, gigData, dispatch, 
    validateOverview, validatePricing, validateDescription, 
    validateRequirements, validateGallery, handleResponse, 
    showSnackbar, isStepSkipped
  ]);

  // Step props
  const stepProps = useMemo(() => ({
    0: {
      handleInputChange,
      gigTitle: stepState.gigTitle,
      subCategory: stepState.subCategory,
      category: stepState.category,
      setSubCategory: (v) => setStepState({ subCategory: v }),
      setCategory: (v) => setStepState({ category: v }),
      setTags: (v) => setStepState({ tags: v }),
      tags: stepState.tags,
      isError: !!error.overview,
      isErrorShow: error.overview,
    },
    1: {
      ...stepState,
      setBasicPackage: (v) => setStepState({ basicPackage: v }),
      setStanderdPackage: (v) => setStepState({ standerdPackage: v }),
      setPremiumPackage: (v) => setStepState({ premiumPackage: v }),
      setSourceFileBasice: (v) => setStepState({ sourceFileBasice: v }),
      setSourceFileStandard: (v) => setStepState({ sourceFileStandard: v }),
      setSourceFilePremium: (v) => setStepState({ sourceFilePremium: v }),
      setResolutionFileBasice: (v) => setStepState({ resolutionFileBasice: v }),
      setResolutionFileStandard: (v) => setStepState({ resolutionFileStandard: v }),
      setResolutionFilePremium: (v) => setStepState({ resolutionFilePremium: v }),
      setTotalBasic: (v) => setStepState({ totalBasic: v }),
      setTotalStand: (v) => setStepState({ totalStand: v }),
      setTotalPremium: (v) => setStepState({ totalPremium: v }),
      setRavisionBasic: (v) => setStepState({ ravisionBasic: v }),
      setRavisionStadard: (v) => setStepState({ ravisionStadard: v }),
      setRavisionPremium: (v) => setStepState({ ravisionPremium: v }),
      setDeliveryBasic: (v) => setStepState({ deliveryBasic: v }),
      setDeliveryStadard: (v) => setStepState({ deliveryStadard: v }),
      setDeliveryPremium: (v) => setStepState({ deliveryPremium: v }),

      
    // Additional package details
    experienceLevel: stepState.experienceLevel,
    setExperienceLevel: (v) => setStepState({ experienceLevel: v }),
    languages: stepState.languages,
    setLanguages: (v) => setStepState({ languages: v }),
    skills: stepState.skills,
    setSkills: (v) => setStepState({ skills: v }),
    availability: stepState.availability,
    setAvailability: (v) => setStepState({ availability: v }),
    responseTime: stepState.responseTime,
    setResponseTime: (v) => setStepState({ responseTime: v }),
    supportedFormats: stepState.supportedFormats,
    setSupportedFormats: (v) => setStepState({ supportedFormats: v }),
    usageRights: stepState.usageRights,
    setUsageRights: (v) => setStepState({ usageRights: v }),
    revisionsIncluded: stepState.revisionsIncluded,
    setRevisionsIncluded: (v) => setStepState({ revisionsIncluded: v }),
    supportIncluded: stepState.supportIncluded,
    setSupportIncluded: (v) => setStepState({ supportIncluded: v }),
    
      isErrorPricing: !!error.pricing,
      isErrorShowPricing: error.pricing,
    },
2: {
  text: stepState.text,
  setText: (v) => setStepState({ text: v }),
  showModal: showModal,
  setShowModal: setShowModal,
  question: question,
  setQuestion: setQuestion,
  answer: answer,
  setAnswer: setAnswer,
  faqs: stepState.faqs,
  setFaqs: (v) => setStepState({ faqs: v }),
  isErrorDescription: !!error.description,
  isErrorShowDescription: error.description,
},
    3: {
      requirmentfields: stepState.requirmentfields,
      setRequirmentfields: (v) => setStepState({ requirmentfields: v }),
      isErrorShowRequirment: error.requirement,
      isErrorRequirment: !!error.requirement,
    },
    4: {
      uploadedImages: stepState.uploadedImages,
      setUploadedImages: (v) => setStepState({ uploadedImages: v }),
      uploadedVideos: stepState.uploadedVideos,
      setUploadedVideos: (v) => setStepState({ uploadedVideos: v }),
      uploadedPDFs: stepState.uploadedPDFs,
      setUploadedPDFs: (v) => setStepState({ uploadedPDFs: v }),
      isError: !!error.gallery,
      isErrorImg: error.gallery,
    },
    5: {},
  }), [stepState, error, handleInputChange, setStepState]);

  // Render step content
  const renderStepContent = useCallback((step) => {
    switch (step) {
      case 0: return <StepOne {...stepProps[0]} />;
      case 1: return <StepTwo {...stepProps[1]} />;
      case 2: return <StepThree {...stepProps[2]} />;
      case 3: return <StepFour {...stepProps[3]} />;
      case 4: return <StepFive {...stepProps[4]} />;
      case 5: return <StepSix />;
      default: return <div>Not Found</div>;
    }
  }, [stepProps]);

  return (
    <div className="multi-step-form">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-12 mt-5 steppers rounded-3 px-lg-5 pt-4 pb-4 mb-4">
          <div className="container">
            <div className="steppers-header px-lg-3 px-2 pt-4 pb-4 rounded-3 poppiins">
              <Stepper activeStep={activeStep}>
                {STEPS.map((label, index) => (
                  <Step key={label} completed={isStepSkipped(index) ? false : undefined}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            
            {activeStep === STEPS.length ? (
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
            ) : (
              <div className="stepper-body mt-4">
                <div className="container-fluid">
                  <div className="allStepps">
                    {renderStepContent(activeStep)}
                  </div>
                  
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2, mt: 3 }}>
                    <div style={{ display: activeStep === 0 ? "none" : "" }}>
                      <Button
                        className="btn-stepper poppins px-3 font-16"
                        disabled={activeStep === 0 || isLoading}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      {isStepOptional(activeStep) && (
                        <Button
                          className="btn-stepper poppins px-3 font-16"
                          onClick={handleSkip}
                          disabled={isLoading}
                          sx={{ mr: 1 }}
                        >
                          Skip
                        </Button>
                      )}
                    </div>
                    
                    <Box sx={{ flex: "1 1 auto" }} />
                    
                    <Button
                      onClick={handleNext}
                      disabled={isLoading}
                      className="btn-stepper poppins px-3 font-16"
                      variant="contained"
                    >
                      {isLoading ? (
                        <Spinner size="sm" color="light" />
                      ) : activeStep === STEPS.length - 1 ? (
                        "Publish Gig"
                      ) : (
                        "Save & Continue"
                      )}
                    </Button>
                  </Box>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}