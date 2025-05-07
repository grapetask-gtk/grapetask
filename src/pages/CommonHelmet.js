import React from "react";
import { Helmet } from "react-helmet-async";

const CommonHelmet = ({ title, description, keywords, canonical }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {/* Meta Tags */}
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="google-site-verification"
        content="Niq1HpCbj3_T3yC-gOlT1Otykze5gRAHmSdr9B2_olU"
      />
         <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,600;1,700&display=swap"
      rel="stylesheet"
    />

    {/* <!-- font-Poppins --> */}
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
      rel="stylesheet"
    />
    {/* <!-- -----inter--font--family---------- --> */}
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    {/* <!-- --------font-awsome---------- --> */}
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
      <meta
        name="google-site-verification"
        content="CEZMzfWOYIXFRnu7qetOPigFCug2cGQN0QJJLA_e7wA"
      />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content="Grapetask|Best Fiverr Alternative for Freelancers in Pakistan"/>
      <meta property="og:description" content="Looking for the best Fiverr alternative? GrapeTask is Pakistan top freelancing platform, offering affordable freelancers for hire & easily project outsourcing"/>
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Grapetask" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.grapetask.co/src/assets/grapetask.jpg"/>
      <meta property="og:url" content="https://www.grapetask.co/"/>

      {/* GTM Meta Tags */}
      <meta name="gtm:layout_service" content="true" />
      <meta name="gtm:country" content="Pakistan" />
      <meta name="gtm:qualtrics_enabled" content="true" />
      {/* Favicon and Icons */}
      <link rel="icon" href="/logo.png" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  );
};

export default CommonHelmet;
