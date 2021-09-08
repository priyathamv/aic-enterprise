import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { device } from '../../utils/viewport';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { Collapse } from 'react-collapse';

import { ReactComponent as AnalyticsSvg } from './noun_analytics.svg';
import { ReactComponent as LifeScienceSvg } from './noun_Life_Science.svg';
import { ReactComponent as SafetySvg } from './noun_Safety.svg';
import { ReactComponent as ScienceLabSvg } from './noun_science_lab.svg';

import { ReactComponent as AnalyticsInversionSvg } from './noun_analytics_inversion.svg';
import { ReactComponent as LifeScienceInversionSvg } from './noun_Life_Science_inversion.svg';
import { ReactComponent as SafetyInversionSvg } from './noun_Safety_inversion.svg';
import { ReactComponent as ScienceLabInversionSvg } from './noun_science_lab_inversion.svg';


const Container = styled.div`
  padding: 20px;

  @media ${device.laptop} {
    padding: 100px 0;
  }
`;

const Head = styled.div`
  text-align: center;

  @media ${device.laptop} {
    margin: 0 30vw 50px 30vw;
  }
`;

const Heading = styled.div`
  font-weight: bold;
  color: #010867;
  font-size: 36px;
  margin-bottom: 20px;

  @media ${device.laptop} {
  }
`;

const SubHeading = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  color: #888888;

  @media ${device.laptop} {
  }
`;

const AppFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 9px 64px #3B3B3B42;
  margin: 20px 0 0 0;
  padding: 10px;
  cursor: pointer;

  @media ${device.tablet} {
    margin: 20px 50px 0 50px;
    padding: 30px;
  }

  @media ${device.laptop} {
    flex-direction: row;
    margin: 40px 200px 0 200px;
    padding: 50px;
  }
`;

const Name = styled.div`
  flex: 1;
  color: #010867;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  padding: 0 10px;
  margin-bottom: 20px;

  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;

const Description = styled.div`
  flex: 3;
  color: #888888;
  padding: 0 10px;

  margin-bottom: 20px;

  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;

const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;

  box-shadow: 0px 9px 64px #3B3B3B42;
  padding: 10px;
  font-weight: bold;

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
    margin: 20px 50px 0 50px;
    padding: 20px;
  }

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0 200px 20px 200px;
    padding: 100px;
  }

  @media ${device.laptop15} {
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0 300px 20px 300px;
    padding: 100px;
  }
`;

const Category = styled(Link)`
  text-decoration: none;
  color: #484848;
`;

const DownIcon = styled(AiFillCaretDown)`
  flex: 1;
  width: 3em;
  height: 3em;
  color: #EBEBEB;
`;

const UpIcon = styled(AiFillCaretUp)`
  flex: 1;
  width: 3em;
  height: 3em;
  color: #EBEBEB;
`;

const AnalyticsIcon = styled(AnalyticsSvg)`
  flex: 1;
  padding: 0 10px;
  margin-bottom: 20px;

  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;

const AnalyticsInversionIcon = styled(AnalyticsInversionSvg)`
  flex: 1;
  padding: 0 10px;
  margin-bottom: 20px;

  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;

const LifeScienceIcon = styled(LifeScienceSvg)`
  flex: 1;
  padding: 0 10px;
  margin-bottom: 20px;

  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;

const LifeScienceInversionIcon = styled(LifeScienceInversionSvg)`
  flex: 1;
  padding: 0 10px;
  margin-bottom: 20px;

  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;

const SafetyIcon = styled(SafetySvg)`
  flex: 1;
  padding: 0 10px;
  margin-bottom: 20px;

  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;

const SafetyInversionIcon = styled(SafetyInversionSvg)`
  flex: 1;
  padding: 0 10px;
  margin-bottom: 20px;

  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;

const ScienceLabIcon = styled(ScienceLabSvg)`
  flex: 1;
  padding: 0 10px;
  margin-bottom: 20px;

  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;

const ScienceLabInversionIcon = styled(ScienceLabInversionSvg)`
  flex: 1;
  padding: 0 10px;
  margin-bottom: 20px;

  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;


export const applicationObjs = [
  {
    name: 'Analytical',
    image: AnalyticsInversionIcon,
    invertedImage: AnalyticsIcon,
    isActive: false,
    // onHover: false,
    description: 'Meeting efficiency and productivity standards in the scientific industry is always the talk of the hour. Tools are needed to achieve these in the given time. We ensure these tools are handy and exceptional to use for all our stakeholders'
  },
  {
    name: 'Life Science',
    image: LifeScienceInversionIcon,
    invertedImage: LifeScienceIcon,
    isActive: false,
    // onHover: false,
    description: 'The delicate aspect of dealing with micro-biological aspects of life need care in the laboratories too. To facilitate the same, the equipment from AIC for life sciences is ensured to be of the highest quality.'
  },
  {
    name: 'Instrumentation',
    image: ScienceLabInversionIcon,
    invertedImage: ScienceLabIcon,
    isActive: false,
    // onHover: false,
    description: 'A pivotal part of the trade that deals with indicating, measuring and recording physical quantities. Adopted by a large range of industries including laboratories, factories, automotive etc.'
  },
  {
    name: 'Industrial Safety and Clean room',
    image: SafetyInversionIcon,
    invertedImage: SafetyIcon,
    isActive: false,
    // onHover: false,
    description: 'Hygiene and cleanliness are of the utmost importance in a medical setup. Enhancement of life largely depends on its ambience, and the best ambience is one that\'s clean. AIC has you back in enabling that to happen!'
  }
];

export const Applications = () => {

  const [applications, setApplications] = useState(applicationObjs);

  const [categoryList, setCategoryList] = useState([]);

  // Fetching category list from backend on page
  useEffect(() => {
    axios.get('/api/category')
      .then(response => {
        setCategoryList(response.data.payload);
      })
      .catch(function (error) {
        console.log('Error while fetching categories', error);
      })
  }, []);


  const handleOnClick = (obj, index) => {
    const applicationsUpdated = applications.map((curApplication, curIndex) => {
      return curIndex === index ?
        {...curApplication, isActive: !curApplication.isActive} :
        curApplication;
    });

    setApplications(applicationsUpdated);
  }

  // const handleMouseEnter = (isEnter, index) => {
  //   const applicationsUpdated = applications.map((curApplication, curIndex) => {
  //     return curIndex === index ?
  //       {...curApplication, onHover: isEnter} :
  //       {...curApplication, onHover: false};
  //   });

  //   setApplications(applicationsUpdated);
  // }

  return (
    <Container>
      <Head>
        <Heading>APPLICATIONS</Heading>

        {/* <SubHeading>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        </SubHeading> */}
      </Head>

      {applications.map((curApplicationObj, index) => (
        <div key={index}>
          <AppFrame
            style={ curApplicationObj.isActive ? { backgroundColor: '#D99107' } : null }
            key={index}
            onClick={e => handleOnClick(curApplicationObj, index)}
            // onMouseEnter={e => handleMouseEnter(true, index)}
            // onMouseLeave={e => handleMouseEnter(false, index)}
          >
            {curApplicationObj.isActive ? <curApplicationObj.invertedImage /> : <curApplicationObj.image />}
            <Name style={ curApplicationObj.isActive ? { color: '#FFF' } : null }>{curApplicationObj.name}</Name>
            <Description style={ curApplicationObj.isActive ? { color: '#FFF' } : null }>{curApplicationObj.description}</Description>
            {curApplicationObj.isActive ? <UpIcon /> : <DownIcon />}
          </AppFrame>

          <Collapse isOpened={curApplicationObj.isActive}>
            <CategoryWrapper>
              {categoryList
                .filter(curCategoryObj => curCategoryObj.application === curApplicationObj.name)
                .map((curCategoryObj, innerIndex) =>
                  <Category
                    key={innerIndex}
                    to={`/productlist?application=${curApplicationObj.name}&category=${encodeURIComponent(curCategoryObj.name)}`}
                  >
                    {curCategoryObj.name}
                  </Category>)
              }
            </CategoryWrapper>
          </Collapse>
        </div>
      ))}


    </Container>
  )
}
