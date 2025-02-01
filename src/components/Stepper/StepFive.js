import React, { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { FaRegFilePdf, FaRegImage, FaTimes, FaVideo } from 'react-icons/fa';
import { RiMovie2Fill } from 'react-icons/ri'
import { BsFiletypePdf } from 'react-icons/bs'
const StepFive = ({ setUploadedPDFs, uploadedPDFs, setUploadedVideos, uploadedVideos, setUploadedImages, uploadedImages, isErrorImg, isError }) => {
    // const [uploadedImages, setUploadedImages] = useState([]);
    // console.log(uploadedImages);
    // -------image --uploader----------
    console.log(uploadedVideos);
    console.log(uploadedVideos,'---video');
    console.log(uploadedPDFs,'======pdf');
    const handleDrop = (acceptedFiles) => {
        // Limit the number of images to 3
        if (uploadedImages.length + acceptedFiles.length > 3) {
            alert('You can upload a maximum of 3 images.');
            return;
        }

        // Process and store the uploaded images
        const updatedImages = [...uploadedImages, ...acceptedFiles];
        setUploadedImages(updatedImages);
    };

    const removeImage = (index) => {
        const updatedImages = uploadedImages.filter((img, i) => i !== index);
        setUploadedImages(updatedImages);
    };
    // -------video --uploader----------
    // const [uploadedVideos, setUploadedVideos] = useState([]);
    // console.log(uploadedVideos);

    const handleDropvideo = (acceptedFiles) => {
        // Limit the number of videos to 3
        if (uploadedVideos.length + acceptedFiles.length > 1) {
            alert('You can upload a maximum of 3 videos.');
            return;
        }

        // Filter out non-video files
        const videoFiles = acceptedFiles.filter(file => file.type.startsWith('video/'));

        // Process and store the uploaded videos
        const updatedVideos = [...uploadedVideos, ...videoFiles];
        setUploadedVideos(updatedVideos);
    };

    const handleRemovevideo = (index) => {
        const updatedVideos = [...uploadedVideos];
        updatedVideos.splice(index, 1);
        setUploadedVideos(updatedVideos);
    };

    // -pdf----------
    // const [uploadedPDFs, setUploadedPDFs] = useState([]);
    // console.log(uploadedPDFs);

    const handleDroppdf = (acceptedFiles) => {
        // Limit the number of PDFs to 3
        if (uploadedPDFs.length + acceptedFiles.length > 2) {
            alert('You can upload a maximum of 3 PDFs.');
            return;
        }

        // Filter out non-PDF files
        const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');

        // Process and store the uploaded PDFs
        const updatedPDFs = [...uploadedPDFs, ...pdfFiles];
        setUploadedPDFs(updatedPDFs);
    };

    const handleRemove = (index) => {
        const updatedPDFs = [...uploadedPDFs];
        updatedPDFs.splice(index, 1);
        setUploadedPDFs(updatedPDFs);
    };
    // ==========
    const [file, setFile] = useState([]);
    return (
        <>
            <div className='StepFive pt-3 pb-4  rounded-3' style={{ backgroundColor: ' #F5F5FF' }}>

                <div className="image-uploader">
                    <div className='d-flex px-4 justify-content-between align-items-center poppins'>

                        <p className="fw-medium blackcolor  poppins mb-2">Upload photos that describe your gig</p>
                        <p className=' font-12 mt-2 takegraycolor mb-2'>{uploadedImages.length} / 3 max</p>
                    </div>
                 
                    <div className="d-flex flex-wrap pb-2 px-3 align-items-center">
                        {uploadedImages.length == 3 ? '' :

                            <Dropzone onDrop={handleDrop} accept="image/*" multiple>
                                {({ getRootProps, getInputProps }) => (
                                    <div className=" image-uploader-card  dropzone   rounded-4" {...getRootProps()}>
                                        <div className='p-2  rounded-3 bg-white d-flex justfy-content-center align-items-center w-100'  >
                                            <div className='w-100 poppins'>
                                                <input {...getInputProps()} />
                                                <FaRegImage className='takegraycolor' size={25} />
                                                <p className='mb-0 font-12'>Drag a Photo or</p>
                                                <p className=' font-12 colororing' >Brows</p>

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Dropzone>


                        }

                        {uploadedImages?.map((file, index) => (
                            <div key={index} className="image-uploader-card image-preview position-relative">
                                <img src={URL.createObjectURL(file)} className='w-100 rounded-3 h-100' alt={`Uploaded ${index + 1}`} />
                                <button className="remove-button" onClick={() => removeImage(index)}>
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                        {uploadedImages?.length <= 1 &&
                            <div className="image-uploader-card">
                                <div className="rounded-3 h-100" style={{ backgroundColor: '#EEEEEE' }}>
                                    <p className="" style={{ visibility: 'hidden' }}>

                                        hyyyyyy
                                    </p>
                                </div>
                            </div>
                        }
                        {uploadedImages?.length <= 0 &&
                            <div className="image-uploader-card">
                                <div className="rounded-3 h-100" style={{ backgroundColor: '#EEEEEE' }}>

                                    <p className="" style={{ visibility: 'hidden' }}>

                                        hyyyyyy
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                    <hr className='my-4' style={{ opacity: '1', backgroundColor: '#667085', height: '1.5px', border: 'none' }} />
                    <div className='mt-3 pb-2 px-4'>
                        <div className='d-flex  justify-content-between align-items-center poppins'>
                            <p className="fw-medium blackcolor  poppins mb-2">Upload Video that describe your gig</p>

                            <p className=' font-12 mt-2 takegraycolor mb-2'>{uploadedVideos.length} / 1 max</p>
                        </div>
                        <div className='video-uploder d-flex flex-wrap align-items-center' style={{}}>
                            {uploadedVideos.length <= 0 && <Dropzone onDrop={handleDropvideo} accept="video/*" multiple>
                                {({ getRootProps, getInputProps }) => (
                                    <div className=" image-uploader-card  dropzone   rounded-4" {...getRootProps()}>
                                        <div className='p-2  rounded-3 bg-white d-flex justfy-content-center align-items-center w-100'  >
                                            <div className='w-100 poppins'>
                                                <input {...getInputProps()} />
                                                <RiMovie2Fill className='takegraycolor' size={25} />
                                                <p className='mb-0 font-12'>Drag a Video or</p>
                                                <p className=' font-12 colororing' >Brows</p>

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Dropzone>}


                            {uploadedVideos.map((file, index) => (
                                <div className='image-uploader-card  dropzone position-relative  rounded-3' style={{ backgroundColor: '#EEEEEE' }}>

                                    <div className='d-flex px-2 align-items-center justify-content-center' key={index}>
                                        <p className='mb-0'><FaVideo size={22} className='colororing'/> </p>
                                        <button className='btn-remove-video' onClick={() => handleRemovevideo(index)}><FaTimes /></button>
                                    </div>
                                </div>

                            ))}


                        </div>
                    </div>
                    <hr className='my-4' style={{ opacity: '1', backgroundColor: '#667085', height: '1.5px', border: 'none' }} />

                    <div className=" mt-3  px-4 ">
                        <div className='d-flex  justify-content-between align-items-center poppins'>
                            <p className="fw-medium blackcolor  poppins mb-2">Upload PDF that describe your gig</p>

                            <p className=' font-12 mt-2 takegraycolor mb-2'>{uploadedPDFs.length} / 2 max</p>
                        </div>
                        <div className="d-flex flex-wrap align-items-center pdf">
                            {uploadedPDFs.length < 2 &&
                                <Dropzone onDrop={handleDroppdf} accept=".pdf" multiple>
                                    {({ getRootProps, getInputProps }) => (
                                        <div className=" image-uploader-card  dropzone   rounded-4" {...getRootProps()}>
                                            <div className='p-2  rounded-3 bg-white d-flex justfy-content-center align-items-center w-100'  >
                                                <div className='w-100 poppins'>
                                                    <input {...getInputProps()} />
                                                    <BsFiletypePdf className='takegraycolor' size={25} />
                                                    <p className='mb-0 font-12'>Drag a PDF or</p>
                                                    <p className=' font-12 colororing' >Brows</p>

                                                </div>
                                            </div>
                                        </div>

                                    )}
                                </Dropzone>
                            }




                            {uploadedPDFs.map((file, index) => (
                                <div className='image-uploader-card   text-center rounded-3 h-100 position-relative d-flex align-items-center px-2  justify-content-center' style={{ backgroundColor: '#EEEEEE' }} key={index}>


                                    <p className='mb-0 poppins colororing'><FaRegFilePdf size={22} /> {index + 1}</p>
                                    {/* <p className='mb-0'>{file.name}</p> */}
                                    <button className='btn-remove-pdf' onClick={() => handleRemove(index)}> <FaTimes /></button>

                                </div>
                            ))}
                            {uploadedPDFs.length <= 0 &&
                                <div className="image-uploader-card ">
                                    <div className="rounded-3 h-100" style={{ backgroundColor: '#EEEEEE' }}>
                                        <p className="" style={{ visibility: 'hidden' }}>

                                            hyyyyyy
                                        </p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>

            </div >
            {isError &&
                <div className="alert alert-danger mt-3 poppins text-center" role="alert">
                    {isErrorImg}
                </div>
            }
        </>
    );
}

export default StepFive;
