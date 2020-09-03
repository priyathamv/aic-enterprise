import React from 'react';
import { useSelector } from 'react-redux';

import { GLogin } from '../auth/GLogin';
import { GLogout } from '../auth/GLogout';
import { selectGoogleAuth } from '../auth/authSlice';
import { SeeOurProducts } from '../common/SeeOurProducts';
import { TrustedBy } from '../common/TrustedBy';
import { ReviewsComponent } from '../reviews/ReviewsComponent';
import { NewsLetter } from '../common/NewsLetter';
import { WhyChooseUs } from '../common/WhyChooseUs';
import { KeyBenefits } from '../common/KeyBenefits';
import { OurCompany } from '../common/OurCompany';
import { HomepageIntro } from '../common/HomepageIntro';

export const Homepage = () => {
  const googleAuth = useSelector(selectGoogleAuth);

  return (
    <div>
      {/* {googleAuth.token ? <GLogout /> : <GLogin />} */}
      <HomepageIntro />
      <SeeOurProducts />
      <WhyChooseUs />
      <KeyBenefits />
      <OurCompany />
      <ReviewsComponent />
      <NewsLetter />
      <TrustedBy />
    </div>
  )
}
