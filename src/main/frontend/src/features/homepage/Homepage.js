import React from 'react';

import { SideBarOverlay } from '../cart/SideBarOverlay';
import { CoverImageSlider } from './coverimage/CoverImageSlider';
import { Traits } from './traits/Traits';
import { Applications } from './applications/Applications';
import { OurProducts } from './our-products/OurProducts';
import { FeaturedCarousel } from './featured/FeaturedCarousel';
import { TrustedBy } from './common/TrustedBy';
import { ReviewsComponent } from './reviews/ReviewsComponent';
import { NewsLetter } from './common/NewsLetter';
import { WhyChooseUs } from './common/WhyChooseUs';
import { KeyBenefits } from './common/KeyBenefits';
import { OurCompany } from './common/OurCompany';
import { OurProcess } from './our-process/OurProcess';
import { HomepageIntro } from './common/HomepageIntro';
import { GetInTouch } from './contact/GetInTouch';

export const Homepage = () => {

  return (
    <div>
      <SideBarOverlay />
      <CoverImageSlider />
      <Traits />
      <HomepageIntro />
      <Applications />
      <OurProducts />
      <TrustedBy />
      <OurProcess />
      <WhyChooseUs />
      <ReviewsComponent />
      <GetInTouch />
    </div>
  )
}
