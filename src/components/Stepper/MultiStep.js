import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import { useLocation, useNavigate } from "react-router-dom";
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
import { Spinner } from "reactstrap";
import { useState } from "react";

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
  const Navigate = useNavigate();
  const { userDetail, getError } = useSelector((state) => state.gig);
  const [isLoading, setIsLoading] = React.useState(false);
  console.log(isLoading, "-------------loading");
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const location = useLocation();
  const gigData =
    location.state && location.state ? location.state.gigData : "";
  console.log(gigData);
  const UserData = JSON.parse(localStorage.getItem("UserData"));
  // const filterByType = (array, targetType) => {
  //     // return array.filter((obj) => obj.type === targetType);
  //     return array?.filter((obj) => obj.type === targetType) || [];
  //   };

  //   const GigPackegBasic = filterByType(gigData?.package, "basic");
  //   const GigPackegStandard = filterByType(gigData?.package, "standard");
  //   const GigPackegPremium = filterByType(gigData?.package, "premium");
  //   console.log(GigPackegBasic)
  //   console.log(GigPackegStandard)
  //   console.log(GigPackegPremium)
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  // -----------ERROR---CAUGH-------------
  const [isError, setIsError] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState("");
  const [isErrorImg, setIsErrorImg] = useState(false);
  const [isErrorShowImg, setIsErrorShowImg] = useState("");
  // ------------pricing-------------
  const [isErrorPricing, setIisErrorPricing] = useState(false);
  const [isErrorShowPricing, setIsErrorShowPricing] = useState("");
  // --------Description----------
  const [isErrorDescription, setIsErrorDescription] = useState(false);
  const [isErrorShowDescription, setIsErrorShowDescription] = useState("");
  // ------step-----overView---------
  const [gigTitle, setGigTitle] = React.useState("I am really good at");
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const handleInputChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= 80) {
      setGigTitle(inputText);
    } else if (inputText.length > 80) {
      // alert('Maximum 80 character')
    }
  };
  // ------------Overview------response-------

  const handleResponseOverview = (data) => {
    if (data?.status) {
      // navigate('/profile')
      setIsLoading(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // alert(data?.message)
    } else {
      // alert(data?.message)
      setIsLoading(false);
    }
  };
  // ----------------Pricing-Response---------
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
  console.log(sourceFileBasice);
  const [sourceFileStandard, setSourceFileStandard] = useState("no");
  const [sourceFilePremium, setSourceFilePremium] = useState("no");
  const [resolutionFileBasice, setResolutionFileBasice] = useState("no");
  const [resolutionFileStandard, setResolutionFileStandard] = useState("no");
  const [resolutionFilePremium, setResolutionFilePremium] = useState("no");
  const [totalBasic, setTotalBasic] = useState("$");
  const [totalPremium, setTotalPremium] = useState("$");
  const [totalStand, setTotalStand] = useState("$");
  const handleResponsePricing = (data) => {
    if (data?.status) {
      // navigate('/profile')
      setIsLoading(false);

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // alert(data?.message)
    } else {
      // alert(data?.message)
      setIsLoading(false);
    }
  };
  // -------------Description & FAQ------------------
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState([]);
  console.log(faqs, "==============faqs");
  // console.log(faqs.answer,'==============a')
  // console.log(question,'==============q')

  const handleResponseDescription = (data) => {
    if (data?.status) {
      // navigate('/profile')
      setIsLoading(false);

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // alert(data?.message)
      setIsLoading(false);
    } else {
      // alert(data?.message)
    }
  };
  const handleResponseFaqs = (data) => {
    if (data?.status) {
      // navigate('/profile')
      console.log(data?.message, "==============faqs");
    } else {
      console.log(data?.message, "==============faqs");
      // alert(data?.message)
    }
  };
  // ----------Requirments------------
  const [requirmentfields, setRequirmentfields] = useState([""]);
  const [isErrorRequirment, setIsErrorRequirment] = useState(false);
  const [isErrorShowRequirment, setIsErrorShowRequirment] = useState("");
  const handleResponseRequirment = (data) => {
    if (data?.status) {
      // navigate('/profile')
      setIsLoading(false);

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // alert(data?.message)
    } else {
      // alert(data?.message)
      setIsLoading(false);
    }
  };
  // ----------Gallery----------
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [uploadedPDFs, setUploadedPDFs] = useState([]);
  const handleResponseGallery = (data) => {
    if (data?.status) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      console.log(data?.message);
      setIsLoading(false);
    } else {
      console.log(data?.message);
      setIsLoading(false);
    }
  };
  // ==========Gig Publish
  const handleResponsePublish = (data) => {
    if (data?.status) {
      setIsLoading(false);
      Navigate("/" + UserData?.username);
    } else {
      setIsLoading(false);
    }
  };


  // if (gigData) {
  //   setGigTitle(gigData.title);
  //   setCategory(gigData.category_id);
  //   setSubCategory(gigData.subcategory_id);
  //   setTags(gigData.tags);

React.useEffect(() => {
  if (gigData) {
    setGigTitle(gigData.title);
    setCategory(gigData.category_id.toString());
    setSubCategory(gigData.subcategory_id.toString());

    // ✅ Robust tags parser (string, array, or JSON-stringified array)
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

    // ========== Packages ==========
    setBasicPackage(gigData.package[0].title);
    setSourceFileBasice(gigData.package[0].source_file);
    setResolutionFileBasice(gigData.package[0].resulation);
    setRavisionBasic(gigData.package[0].ravision);
    setDeliveryBasic(gigData.package[0].delivery_time);
    setTotalBasic(gigData.package[0].total);

    setStanderdPackage(gigData.package[1].title);
    setSourceFileStandard(gigData.package[1].source_file);
    setResolutionFileStandard(gigData.package[1].resulation);
    setRavisionStadard(gigData.package[1].ravision);
    setDeliveryStadard(gigData.package[1].delivery_time);
    setTotalStand(gigData.package[1].total);

    setPremiumPackage(gigData.package[2].title);
    setSourceFilePremium(gigData.package[2].source_file);
    setResolutionFilePremium(gigData.package[2].resulation);
    setRavisionPremium(gigData.package[2].ravision);
    setDeliveryPremium(gigData.package[2].delivery_time);
    setTotalPremium(gigData.package[2].total);

    // ============Description
    setText(gigData.description);
    setFaqs(gigData.faq);

    // ============Requirements
    setRequirmentfields(gigData?.requirement);

    // ============ Videos & PDFs
    setUploadedVideos([gigData.media.video].filter(video => video !== null));
    setUploadedPDFs([gigData.media.pdf_file1, gigData.media.pdf_file2].filter(pdf => pdf !== null));

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
      if (gigData) {
        if (
          gigTitle.length > 0 &&
          category !== "" &&
          subCategory !== "" &&
          tags.length > 0
        ) {
          let data = {
            gig_id: gigData.id,
            category_id: category,
            subcategory_id: subCategory,
            title: gigTitle,
            tags: tags,
          };

          dispatch(GigOverViewUpdate(data, handleResponseOverview));
          setIsLoading(true);
          setIsErrorShow("");
          setIsError(false);
        } else {
          // alert(' all fields required')
          setIsErrorShow("All Fields are required");
          setIsError(true);
        }
      } else {
        if (
          gigTitle.length > 0 &&
          category !== "" &&
          subCategory !== "" &&
          tags.length > 0
        ) {
          let data = {
            category_id: category,
            subcategory_id: subCategory,
            title: gigTitle,
            tags: tags,
          };

          dispatch(Overview(data, handleResponseOverview));
          setIsLoading(true);
          setIsErrorShow("");
          setIsError(false);
        } else {
          // alert(' all fields required')
          setIsErrorShow("All Fields are required");
          setIsError(true);
        }
      }
    } else if (activeStep == 1) {
      if (gigData) {
        if (
          ravisionBasic.length > 0 &&
          basicPackage.length > 1 &&
          standerdPackage.length > 1 &&
          premiumPackage.length > 1 &&
          totalBasic.length > 1 &&
          ravisionStadard.length > 0 &&
          totalStand.length > 1 &&
          ravisionPremium.length > 0 &&
          totalPremium.length > 1 &&
          deliveryBasic != "" &&
          deliveryStadard != "" &&
          deliveryPremium != ""
        ) {
          let data = {
            gig_id: gigData.id,
            title_basic: basicPackage,
            source_file_basic: sourceFileBasice,
            resulation_basic: resolutionFileBasice,
            ravision_basic: ravisionBasic,
            delivery_time_basic: deliveryBasic,
            total_basic: totalBasic,
            // =========standard
            title_standard: standerdPackage,
            source_file_standard: sourceFileStandard,
            resulation_standard: resolutionFileStandard,
            ravision_standard: ravisionStadard,
            delivery_time_standard: deliveryStadard,
            total_standard: totalStand,
            // ========Premium
            title_premium: premiumPackage,
            source_file_premium: sourceFilePremium,
            resulation_premium: resolutionFilePremium,
            ravision_premium: ravisionPremium,
            delivery_time_premium: deliveryPremium,
            total_premium: totalPremium,
          };

          dispatch(GigPricingUpdate(data, handleResponsePricing));
          setIsErrorShowPricing("");
          setIisErrorPricing(false);
          setIsLoading(true);
        } else {
          // alert(' all fields required')
          setIsErrorShowPricing("All Fields are required");
          setIisErrorPricing(true);
          setIsLoading(false);
        }
      } else {
        if (

          ravisionBasic.length > 0 &&
          basicPackage.length > 1 &&
          standerdPackage.length > 1 &&
          premiumPackage.length > 1 &&
          totalBasic.length > 1 &&
          ravisionStadard.length > 0 &&
          totalStand.length > 1 &&
          ravisionPremium.length > 0 &&
          totalPremium.length > 1 &&
          deliveryBasic != "" &&
          deliveryStadard != "" &&
          deliveryPremium != ""
          
        ) {
          const getId = localStorage.getItem("id");
          let data = {
            gig_id: getId,
            title_basic: basicPackage,
            source_file_basic: sourceFileBasice,
            resulation_basic: resolutionFileBasice,
            ravision_basic: ravisionBasic,
            delivery_time_basic: deliveryBasic,
            total_basic: totalBasic,
            // =========standard
            title_standard: standerdPackage,
            source_file_standard: sourceFileStandard,
            resulation_standard: resolutionFileStandard,
            ravision_standard: ravisionStadard,
            delivery_time_standard: deliveryStadard,
            total_standard: totalStand,
            // ========Premium
            title_premium: premiumPackage,
            source_file_premium: sourceFilePremium,
            resulation_premium: resolutionFilePremium,
            ravision_premium: ravisionPremium,
            delivery_time_premium: deliveryPremium,
            total_premium: totalPremium,
          };

          dispatch(Pricing(data, handleResponsePricing));
          setIsErrorShowPricing("");
          setIisErrorPricing(false);
          setIsLoading(true);
        } else {
          // alert(' all fields required')
          setIsErrorShowPricing("All Fields are required");
          setIisErrorPricing(true);
          setIsLoading(false);
        }
      }
    } else if (activeStep == 2) {
      if (gigData) {
        if (text.length > 0) {
          let data = {
            gig_id: gigData.id,
            description: text,
          };

          dispatch(GigDescriptionUpdate(data, handleResponseDescription));
          setIsErrorShowDescription("");
          setIsErrorDescription(false);
          setIsLoading(true);

          // console.log(question, '=======question');
          // console.log(answer, '=======answer');
        } else {
          // alert(' all fields required')
          setIsErrorShowDescription("All Fields are required");
          setIsLoading(false);

          setIsErrorDescription(true);
        }

        let allQuestion = faqs.map((faq, index) => ({
          question: faq.question,
          answer: faq.answer,
        }));

        let data = {
          gig_id: gigData.id,
          questions: allQuestion,
        };
        {
          faqs.length > 0 &&
            dispatch(GigUserFaqsUpDate(data, handleResponseFaqs));
        }
      } else {
        if (text.length > 0) {
          const getId = localStorage.getItem("id");
          let data = {
            gig_id: getId,
            description: text,
          };

          dispatch(Description(data, handleResponseDescription));
          setIsErrorShowDescription("");
          setIsErrorDescription(false);
          setIsLoading(true);

          // console.log(question, '=======question');
          // console.log(answer, '=======answer');
        } else {
          // alert(' all fields required')
          setIsErrorShowDescription("All Fields are required");
          setIsErrorDescription(true);
          setIsLoading(false);
        }

        const getId = localStorage.getItem("id");
        let allQuestion = faqs.map((faq, index) => ({
          gig_id: getId,
          question: faq.question,
          answer: faq.answer,
        }));

        let data = {
          allquestion: allQuestion,
        };
        {
          faqs.length > 0 && dispatch(userFaqs(data, handleResponseFaqs));
        }
      }
    } else if (activeStep == 3) {
      if (gigData) {
        if (requirmentfields.length > 0) {
          let requirmentStatus = true;
          requirmentfields.map((value) => {
            console.log(value, "========value");
            if (value == "") {
              requirmentStatus = false;
            }
          });
          if (requirmentStatus) {
            let data = {
              gig_id: gigData.id,
              requirement: requirmentfields,
            };

            dispatch(GigRequirmentUpdate(data, handleResponseRequirment));
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
      } else {
        if (requirmentfields.length > 0) {
          let requirmentStatus = true;
          requirmentfields.map((value) => {
            console.log(value, "========value");
            if (value == "") {
              requirmentStatus = false;
            }
          });
          const getId = localStorage.getItem("id");
          if (requirmentStatus) {
            let data = {
              gig_id: getId,
              requirement: requirmentfields,
            };

            dispatch(Requirements(data, handleResponseRequirment));
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
      }
    } else if (activeStep == 4) {
      if (gigData) {
        if (uploadedImages.length > 0) {
          let data = {
            gigID: gigData.id,
            imageFile1: uploadedImages[0],
            imageFile2: uploadedImages[1],
            imageFile3: uploadedImages[2],
            videoFile: uploadedVideos[0],
            pdfFile1: uploadedPDFs[0],
            pdfFile2: uploadedPDFs[1],
          };

          dispatch(GigUserGalleryUpdate(data, handleResponseGallery));
          setIsErrorShowImg("");
          setIsErrorImg(false);
          setIsLoading(true);

          // console.log();
          // console.log(isErrorImg);
        } else {
          setIsErrorShowImg("Please One Image Upload is Required");
          setIsLoading(false);
          setIsErrorImg(true);
        }
      } else {
        if (uploadedImages.length > 0) {
          const getId = localStorage.getItem("id");

          let data = {
            gigID: getId,
            imageFile1: uploadedImages[0],
            imageFile2: uploadedImages[1],
            imageFile3: uploadedImages[2],
            videoFile: uploadedVideos[0],
            pdfFile1: uploadedPDFs[0],
            pdfFile2: uploadedPDFs[1],
          };

          dispatch(userGallery(data, handleResponseGallery));
          setIsErrorShowImg("");
          setIsErrorImg(false);
          setIsLoading(true);
        } else {
          setIsErrorShowImg("Please One Image Upload is Required");
          setIsLoading(false);
          setIsErrorImg(true);
        }
      }
    } else if (activeStep == 5) {
      if (gigData) {
        let data = {
          gig_id: gigData.id,
        };
        dispatch(GigPublishUpdate(data, handleResponsePublish));
        setIsLoading(true);
      } else {
        const getId = localStorage.getItem("id");

        let data = {
          gig_id: getId,
        };
        dispatch(gigPublish(data, handleResponsePublish));
        setIsLoading(true);
      }
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      //   throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  //   const handleReset = () => {
  //     setActiveStep(0);
  //   };
  function _renderStepContent(step) {
    // console.log(step ,'=============step')
    switch (step) {
      case 0:
        // return <Step1 />;
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
                    //   if (isStepOptional(index)) {
                    //     labelProps.optional = (
                    //       <Typography variant="caption">Optional</Typography>
                    //     );
                    //   }
                    //   if (isStepSkipped(index)) {
                    //     stepProps.completed = false;
                    //   }
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
                {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleReset}>Reset</Button>
                                    </Box> */}
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
                    <div style={{ display: activeStep == 0 ? "none" : "" }}>
                      <Button
                        className="btn-stepper poppins px-3  font-16"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      {activeStep == 2 && (
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
                      loading={true}
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
