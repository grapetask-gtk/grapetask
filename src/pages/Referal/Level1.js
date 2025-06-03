import { useState } from 'react'
import { BsFacebook, BsMessenger } from 'react-icons/bs'
import { FaEnvelope, FaTwitter } from 'react-icons/fa'
import { MdOutlineContentCopy } from 'react-icons/md'
import Navbar from '../../components/Navbar'

const Level1 = () => {
//   const { userDetail, isLoading, getError } = useSelector((state) => state.profile);
  const [copied, setCopied] = useState(false);

  const userDetail = JSON.parse(localStorage.getItem("UserData") || "{}");
  const referralLink = `http://localhost:3000/signup?referral=${userDetail?.referral_code || ''}`;

  const copyToClipboard = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Social sharing URLs
  const shareEmail = `mailto:?subject=Join GrapeTask and Earn Bonus Bids&body=Join using my referral link to get 50 bonus bids: ${referralLink}`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
  const shareMessenger = `fb-messenger://share?link=${encodeURIComponent(referralLink)}`; 
  // Messenger protocol works on mobile apps, fallback to Facebook share on desktop
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Join GrapeTask and earn bonus bids! Use my referral link: ${referralLink}`)}`;

  return (
    <>
      <Navbar FirstNav='none' />
      <div className="container pt-5 pb-5">
        <div className="row justify-content-center text-center">
          <h3 className='font-36 font-500 cocon Refertextcolor'>
            Refer a Friend and Earn 50 Bonus Bids!
          </h3>
          <div className="col-lg-6 col-md-6 col-12">
            <div className='boxshado rounded-3 p-lg-5 p-md-4 p-4 mt-4'>
              <h6 className='inter font-16 font-500 Refertextcolor'>
                Invite your friends to join GrapeTask and earn a direct bonus of 50 bids for every referral.
                Your friend will also receive a 50 bid sign-up bonus!
              </h6>
              <p className='font-16 font-600 poppins text-decoration-underline tremstextcolor'>
                Terms & Conditions
              </p>
              <div className='mt-lg-4 mt-md-3 mt-2'>
                <h6 className='font-16 font-700 poppins Refertextcolor'>
                  Share your referral link using:
                </h6>
                <div className='d-flex justify-content-center mt-4'>
                  <a href={shareEmail} target="_blank" rel="noopener noreferrer" className="mx-3">
                    <FaEnvelope color='#F16336' size={35} style={{ cursor: 'pointer' }} />
                  </a>
                  <a href={shareFacebook} target="_blank" rel="noopener noreferrer" className="mx-3">
                    <BsFacebook color='#F16336' size={35} style={{ cursor: 'pointer' }} />
                  </a>
                  <a href={shareMessenger} target="_blank" rel="noopener noreferrer" className="mx-3">
                    <BsMessenger color='#F16336' size={35} style={{ cursor: 'pointer' }} />
                  </a>
                  <a href={shareTwitter} target="_blank" rel="noopener noreferrer" className="mx-3">
                    <FaTwitter color='#F16336' size={35} style={{ cursor: 'pointer' }} />
                  </a>
                </div>
              </div>
              <div className='mt-lg-5 mt-md-3 mt-2'>
                <p className='mb-0 font-16 inter Refertextcolor'>
                  Or copy your personal referral link
                </p>
                <div className="input-group mb-3 mt-2">
                  <input 
                    type="text" 
                    className="form-control orderinput p-2 poppins" 
                    value={referralLink} 
                    readOnly 
                  />
                  <div 
                    className="p-2 backgroundoring ms-0 rounded-0" 
                    style={{ cursor: 'pointer' }} 
                    onClick={copyToClipboard}
                    title="Copy referral link"
                  >
                    <MdOutlineContentCopy size={24} />
                  </div>
                </div>
                {copied && <small className="text-success">Copied to clipboard!</small>}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Level1;
