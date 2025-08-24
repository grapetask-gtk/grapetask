import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
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
import { useDispatch, useSelector } from "../../redux/store/store";
import StepFive from "./StepFive";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepSix from "./StepSix";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const steps = [
  "Overview",
  "Pricing",
  "Description & FAQ",
  "Requirements",
  "Gallery",
  "Publish",
];

export default function MultiStep() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetail, getError } = useSelector((state) => state.gig);
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading, "-------------loading");
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const location = useLocation();
  const gigData = location.state && location.state.gigData ? location.state.gigData : null;
  
  const UserData = JSON.parse(localStorage.getItem("UserData") || "{}");

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  
  // Error states
  const [isError, setIsError] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState("");
  const [isErrorImg, setIsErrorImg] = useState(false);
  const [isErrorShowImg, setIsErrorShowImg] = useState("");
  const [isErrorPricing, setIsErrorPricing] = useState(false);
  const [isErrorShowPricing, setIsErrorShowPricing] = useState("");
  const [isErrorDescription, setIsErrorDescription] = useState(false);
  const [isErrorShowDescription, setIsErrorShowDescription] = useState("");
  const [isErrorRequirment, setIsErrorRequirment] = useState(false);
  const [isErrorShowRequirment, setIsErrorShowRequirment] = useState("");

  // Step 1: Overview state
  const [gigTitle, setGigTitle] = useState("I am really good at");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [tags, setTags] = useState([]);

  // Step 2: Pricing state
  const [basicPackage, setBasicPackage] = useState("");
  const [standerdPackage, setStanderdPackage] = useState("");
  const [premiumPackage, setPremiumPackage] = useState("");
  const [ravisionBasic, setRavisionBasic] = useState("");
  const [ravisionStadard, setRavisionStadard] = useState("");
  const [ravisionPremium, setRavisionPremium] = useState("");
  const [deliveryBasic, setDeliveryBasic] = useState("");
  const [deliveryStadard, setDeliveryStadard] = useState("");
  const [deliveryPremium, setDeliveryPremium] = useState("");
  const [sourceFileBasice, setSourceFileBasice] = useState("no");
  const [sourceFileStandard, setSourceFileStandard] = useState("no");
  const [sourceFilePremium, setSourceFilePremium] = useState("no");
  const [resolutionFileBasice, setResolutionFileBasice] = useState("no");
  const [resolutionFileStandard, setResolutionFileStandard] = useState("no");
  const [resolutionFilePremium, setResolutionFilePremium] = useState("no");
  const [totalBasic, setTotalBasic] = useState("$");
  const [totalPremium, setTotalPremium] = useState("$");
  const [totalStand, setTotalStand] = useState("$");

  // Step 3: Description & FAQ state
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState([]);

  // Step 4: Requirements state
  const [requirmentfields, setRequirmentfields] = useState([""]);

  // Step 5: Gallery state
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [uploadedPDFs, setUploadedPDFs] = useState([]);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= 80) {
      setGigTitle(inputText);
    }
  };

  // Response handlers
  const handleResponseOverview = (data) => {
    if (data?.status) {
      setIsLoading(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setIsLoading(false);
    }
  };

  const handleResponsePricing = (data) => {
    if (data?.status) {
      setIsLoading(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setIsLoading(false);
    }
  };

  const handleResponseDescription = (data) => {
    if (data?.status) {
      setIsLoading(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setIsLoading(false);
    }
  };

  const handleResponseFaqs = (data) => {
    // No action needed after FAQ submission
  };

  const handleResponseRequirment = (data) => {
    if (data?.status) {
      setIsLoading(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setIsLoading(false);
    }
  };

  const handleResponseGallery = (data) => {
    if (data?.status) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const handleResponsePublish = (data) => {
    if (data?.status) {
      setIsLoading(false);
      navigate("/gig");
    } else {
      setIsLoading(false);
    }
  };

  // Initialize form data if editing an existing gig
  useEffect(() => {
    if (gigData) {
      setGigTitle(gigData.title || "I am really good at");
      setCategory(gigData.category_id?.toString() || "");
      setSubCategory(gigData.subcategory_id?.toString() || "");

      // Parse tags
      let tags = [];
      const rawTags = gigData.tags;
      if (rawTags) {
        if (Array.isArray(rawTags)) {
          tags = rawTags;
        } else if (typeof rawTags === 'string') {
          try {
            const parsed = JSON.parse(rawTags);
            tags = Array.isArray(parsed) ? parsed : rawTags.split(',').map(t => t.trim());
          } catch (e) {
            tags = rawTags.split(',').map(t => t.trim());
          }
        }
      }
      setTags(tags);

      // Initialize package data if available
      if (gigData.packages  && Array.isArray(gigData.packages ) && gigData.packages .length >= 3) {
        // Find packages by type or use index as fallback
        const basicPkg = gigData.packages .find(p => p.type === "basic") || gigData.packages [0];
        const standardPkg = gigData.packages .find(p => p.type === "standard") || gigData.packages [1];
        const premiumPkg = gigData.packages .find(p => p.type === "premium") || gigData.packages [2];

        if (basicPkg) {
          setBasicPackage(basicPkg.title || "");
          setSourceFileBasice(basicPkg.source_file || "no");
          setResolutionFileBasice(basicPkg.resulation || "no");
          setRavisionBasic(basicPkg.ravision || "");
          setDeliveryBasic(basicPkg.delivery_time || "");
          setTotalBasic(basicPkg.total || "$");
        }

        if (standardPkg) {
          setStanderdPackage(standardPkg.title || "");
          setSourceFileStandard(standardPkg.source_file || "no");
          setResolutionFileStandard(standardPkg.resulation || "no");
          setRavisionStadard(standardPkg.ravision || "");
          setDeliveryStadard(standardPkg.delivery_time || "");
          setTotalStand(standardPkg.total || "$");
        }

        if (premiumPkg) {
          setPremiumPackage(premiumPkg.title || "");
          setSourceFilePremium(premiumPkg.source_file || "no");
          setResolutionFilePremium(premiumPkg.resulation || "no");
          setRavisionPremium(premiumPkg.ravision || "");
          setDeliveryPremium(premiumPkg.delivery_time || "");
          setTotalPremium(premiumPkg.total || "$");
        }
      } else {
        // Initialize with empty values if package data is not available
        setBasicPackage("");
        setStanderdPackage("");
        setPremiumPackage("");
        setRavisionBasic("");
        setRavisionStadard("");
        setRavisionPremium("");
        setDeliveryBasic("");
        setDeliveryStadard("");
        setDeliveryPremium("");
        setTotalBasic("$");
        setTotalStand("$");
        setTotalPremium("$");
      }

      // Initialize description and FAQs
      setText(gigData.description || "");
      setFaqs(gigData.faq || []);

      // Initialize requirements
      setRequirmentfields(gigData?.requirement || [""]);

      // Initialize media
      setUploadedVideos(gigData.media?.video ? [gigData.media.video] : []);
      setUploadedPDFs([
        gigData.media?.pdf_file1, 
        gigData.media?.pdf_file2
      ].filter(pdf => pdf !== null && pdf !== undefined));
    // ============ Images
    function addImagesFromPaths(imagePaths) {
      if (uploadedImages.length < 3) {
        const newFiles = [];
        imagePaths.forEach((path, index) => {
          if (uploadedImages.length + index < 3) {
            fetch(path)
              .then(response => response.blob())
              .then(blob => {
                const newFile = new File([blob], `image${index + 1}.webp`, {
                  type: "image/jpeg",
                });
                newFiles.push(newFile);
                if (newFiles.length === imagePaths.length) {
                  setUploadedImages([...uploadedImages, ...newFiles]);
                }
              })
              .catch(error => {
                console.error("Error fetching image:", error);
              });
          }
        });
      }
    }

    const imagePaths = [
      gigData.media.image1,
      gigData.media.image2,
      gigData.media.image3,
    ];
    addImagesFromPaths(imagePaths);
  }
}, []);

  const handleNext = (e) => {
    e.preventDefault();

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setSkipped(newSkipped);

    if (activeStep === 0) {
      if (gigTitle.length > 0 && category !== "" && subCategory !== "" && tags.length > 0) {
        let data = gigData ? {
          gig_id: gigData.id,
          category_id: category,
          subcategory_id: subCategory,
          title: gigTitle,
          tags: tags,
        } : {
          category_id: category,
          subcategory_id: subCategory,
          title: gigTitle,
          tags: tags,
        };

        if (gigData) {
          dispatch(GigOverViewUpdate(data, handleResponseOverview));
        } else {
          dispatch(Overview(data, handleResponseOverview));
        }
        setIsLoading(true);
        setIsErrorShow("");
        setIsError(false);
      } else {
        setIsErrorShow("All Fields are required");
        setIsError(true);
      }
    } else if (activeStep === 1) {
      const pricingFieldsValid = (
        ravisionBasic.length > 0 &&
        basicPackage.length > 1 &&
        standerdPackage.length > 1 &&
        premiumPackage.length > 1 &&
        totalBasic.length > 1 &&
        ravisionStadard.length > 0 &&
        totalStand.length > 1 &&
        ravisionPremium.length > 0 &&
        totalPremium.length > 1 &&
        deliveryBasic !== "" &&
        deliveryStadard !== "" &&
        deliveryPremium !== ""
      );

      if (pricingFieldsValid) {
        let data = {
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
        };

        if (gigData) {
          data.gig_id = gigData.id;
          dispatch(GigPricingUpdate(data, handleResponsePricing));
        } else {
          data.gig_id = localStorage.getItem("id");
          dispatch(Pricing(data, handleResponsePricing));
        }
        
        setIsErrorShowPricing("");
        setIsErrorPricing(false);
        setIsLoading(true);
      } else {
        setIsErrorShowPricing("All Fields are required");
        setIsErrorPricing(true);
        setIsLoading(false);
      }
    } else if (activeStep === 2) {
      if (text.length > 0) {
        let data = gigData ? {
          gig_id: gigData.id,
          description: text,
        } : {
          gig_id: localStorage.getItem("id"),
          description: text,
        };

        if (gigData) {
          dispatch(GigDescriptionUpdate(data, handleResponseDescription));
        } else {
          dispatch(Description(data, handleResponseDescription));
        }
        
        setIsErrorShowDescription("");
        setIsErrorDescription(false);
        setIsLoading(true);

        // Handle FAQs if any
        if (faqs.length > 0) {
          let allQuestion = faqs.map((faq) => ({
            question: faq.question,
            answer: faq.answer,
          }));

          let faqData = gigData ? {
            gig_id: gigData.id,
            questions: allQuestion,
          } : {
            allquestion: allQuestion.map(q => ({...q, gig_id: localStorage.getItem("id")}))
          };

          if (gigData) {
            dispatch(GigUserFaqsUpDate(faqData, handleResponseFaqs));
          } else {
            dispatch(userFaqs(faqData, handleResponseFaqs));
          }
        }
      } else {
        setIsErrorShowDescription("All Fields are required");
        setIsErrorDescription(true);
        setIsLoading(false);
      }
    } else if (activeStep === 3) {
      if (requirmentfields.length > 0) {
        let requirmentStatus = true;
        requirmentfields.forEach((value) => {
          if (value === "") {
            requirmentStatus = false;
          }
        });
        
        if (requirmentStatus) {
          let data = gigData ? {
            gig_id: gigData.id,
            requirement: requirmentfields,
          } : {
            gig_id: localStorage.getItem("id"),
            requirement: requirmentfields,
          };

          if (gigData) {
            dispatch(GigRequirmentUpdate(data, handleResponseRequirment));
          } else {
            dispatch(Requirements(data, handleResponseRequirment));
          }
          
          setIsErrorShowRequirment("");
          setIsErrorRequirment(false);
          setIsLoading(true);
        } else {
          setIsErrorShowRequirment("Requirment Field is required");
          setIsErrorRequirment(true);
          setIsLoading(false);
        }
      } else {
        setIsErrorShowRequirment("Requirment Field is required");
        setIsErrorRequirment(true);
        setIsLoading(false);
      }
    } else if (activeStep === 4) {
      if (uploadedImages.length > 0) {
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
          dispatch(GigUserGalleryUpdate(data, handleResponseGallery));
        } else {
          data.gigID = localStorage.getItem("id");
          dispatch(userGallery(data, handleResponseGallery));
        }
        
        setIsErrorShowImg("");
        setIsErrorImg(false);
        setIsLoading(true);
      } else {
        setIsErrorShowImg("Please One Image Upload is Required");
        setIsLoading(false);
        setIsErrorImg(true);
      }
    } else if (activeStep === 5) {
      let data = gigData ? {
        gig_id: gigData.id,
      } : {
        gig_id: localStorage.getItem("id"),
      };
      
      if (gigData) {
        dispatch(GigPublishUpdate(data, handleResponsePublish));
      } else {
        dispatch(gigPublish(data, handleResponsePublish));
      }
      
      setIsLoading(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  function _renderStepContent(step) {
    switch (step) {
      case 0:
        return (
          <StepOne
            handleInputChange={handleInputChange}
            gigTitle={gigTitle}
            subCategory={subCategory}
            category={category}
            setSubCategory={setSubCategory}
            setCategory={setCategory}
            setTags={setTags}
            tags={tags}
            isError={isError}
            isErrorShow={isErrorShow}
          />
        );
      case 1:
        return (
          <StepTwo
            basicPackage={basicPackage}
            setBasicPackage={setBasicPackage}
            standerdPackage={standerdPackage}
            setStanderdPackage={setStanderdPackage}
            premiumPackage={premiumPackage}
            setPremiumPackage={setPremiumPackage}
            sourceFileBasice={sourceFileBasice}
            setSourceFileBasice={setSourceFileBasice}
            sourceFileStandard={sourceFileStandard}
            setSourceFileStandard={setSourceFileStandard}
            sourceFilePremium={sourceFilePremium}
            setSourceFilePremium={setSourceFilePremium}
            resolutionFileBasice={resolutionFileBasice}
            setResolutionFileBasice={setResolutionFileBasice}
            resolutionFileStandard={resolutionFileStandard}
            setResolutionFileStandard={setResolutionFileStandard}
            resolutionFilePremium={resolutionFilePremium}
            setResolutionFilePremium={setResolutionFilePremium}
            totalBasic={totalBasic}
            setTotalBasic={setTotalBasic}
            setTotalStand={setTotalStand}
            totalStand={totalStand}
            totalPremium={totalPremium}
            setTotalPremium={setTotalPremium}
            ravisionBasic={ravisionBasic}
            setRavisionBasic={setRavisionBasic}
            ravisionStadard={ravisionStadard}
            setRavisionStadard={setRavisionStadard}
            ravisionPremium={ravisionPremium}
            setRavisionPremium={setRavisionPremium}
            deliveryBasic={deliveryBasic}
            setDeliveryBasic={setDeliveryBasic}
            deliveryStadard={deliveryStadard}
            setDeliveryStadard={setDeliveryStadard}
            deliveryPremium={deliveryPremium}
            setDeliveryPremium={setDeliveryPremium}
            isErrorPricing={isErrorPricing}
            isErrorShowPricing={isErrorShowPricing}
          />
        );
      case 2:
        return (
          <StepThree
            text={text}
            setText={setText}
            showModal={showModal}
            setShowModal={setShowModal}
            question={question}
            setQuestion={setQuestion}
            answer={answer}
            setAnswer={setAnswer}
            faqs={faqs}
            setFaqs={setFaqs}
            isErrorDescription={isErrorDescription}
            isErrorShowDescription={isErrorShowDescription}
          />
        );
      case 3:
        return (
          <StepFour
            requirmentfields={requirmentfields}
            setRequirmentfields={setRequirmentfields}
            isErrorShowRequirment={isErrorShowRequirment}
            isErrorRequirment={isErrorRequirment}
          />
        );
      case 4:
        return (
          <StepFive
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            uploadedVideos={uploadedVideos}
            setUploadedVideos={setUploadedVideos}
            uploadedPDFs={uploadedPDFs}
            setUploadedPDFs={setUploadedPDFs}
            isError={isErrorImg}
            isErrorImg={isErrorShowImg}
          />
        );
      case 5:
        return <StepSix />;
      default:
        return <div>Not Found</div>;
    }
  }

  return (
    <div className="">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-12 mt-5 steppers rounded-3 px-lg-5 pt-4 pb-4 mb-4 ">
          <div className="">
            <div className="container">
              <div className="steppers-header px-lg-3 px-2 pt-4 pb-4 rounded-3 poppiins">
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </div>
            </div>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
              </React.Fragment>
            ) : (
              <div className="stepper-body  mt-4">
                <div className="container-fluid ">
                  <div className="allStepps">
                    {_renderStepContent(activeStep)}
                  </div>

                  <Box
                    sx={{ display: "flex", flexDirection: "row", pt: 2, mt: 3 }}
                  >
                    <div style={{ display: activeStep === 0 ? "none" : "" }}>
                      <Button
                        className="btn-stepper poppins px-3  font-16"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      {activeStep === 2 && (
                        <Button
                          className="btn-stepper poppins px-3  font-16"
                          onClick={handleSkip}
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
                      className="btn-stepper poppins px-3  font-16"
                    >
                      {isLoading ? (
                        <Spinner size="sm" color="light" />
                      ) : activeStep === steps.length - 1 ? (
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
    </div>
  );
}