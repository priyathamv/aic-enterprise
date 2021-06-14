import React, { useState } from 'react';
import styled from 'styled-components';
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
  margin: 0 30vw 100px 30vw;
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
  align-items: center;
  box-shadow: 0px 9px 64px #3B3B3B42;
  margin: 20px 300px;
  padding: 50px;
  cursor: pointer;

  &:hover {
    background-color: #D99107;
  }
`;

const Name = styled.div`
  flex: 1;
  color: #010867;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  padding: 0 10px;
`;

const Description = styled.div`
  flex: 3;
  color: #888888;
  padding: 0 10px;
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
`;

const AnalyticsInversionIcon = styled(AnalyticsInversionSvg)`
  flex: 1;
  padding: 0 10px;
`;

const LifeScienceIcon = styled(LifeScienceSvg)`
  flex: 1;
  padding: 0 10px;
`;

const LifeScienceInversionIcon = styled(LifeScienceInversionSvg)`
  flex: 1;
  padding: 0 10px;
`;

const SafetyIcon = styled(SafetySvg)`
  flex: 1;
  padding: 0 10px;
`;

const SafetyInversionIcon = styled(SafetyInversionSvg)`
  flex: 1;
  padding: 0 10px;
`;

const ScienceLabIcon = styled(ScienceLabSvg)`
  flex: 1;
  padding: 0 10px;
`;

const ScienceLabInversionIcon = styled(ScienceLabInversionSvg)`
  flex: 1;
  padding: 0 10px;
`;

export const applicationObjs = [
  {
    name: 'Analytical',
    image: AnalyticsInversionIcon,
    invertedImage: AnalyticsIcon,
    isActive: false,
    onHover: false,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim'
  },
  {
    name: 'Life Science',
    image: LifeScienceInversionIcon,
    invertedImage: LifeScienceIcon,
    isActive: false,
    onHover: false,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim'
  },
  {
    name: 'Instrumentation',
    image: ScienceLabInversionIcon,
    invertedImage: ScienceLabIcon,
    isActive: false,
    onHover: false,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim'
  },
  {
    name: 'Industrial Safety and Clean room',
    image: SafetyInversionIcon,
    invertedImage: SafetyIcon,
    isActive: false,
    onHover: false,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim'
  }
];

export const Applications = () => {

  const [applications, setApplications] = useState(applicationObjs);

  const handleOnClick = (obj, index) => {
    const applicationsUpdated = applications.map((curApplication, curIndex) => {
      return curIndex === index ?
        {...curApplication, isActive: !curApplication.isActive} :
        curApplication;
    });

    setApplications(applicationsUpdated);
  }

  const handleMouseEnter = (isEnter, index) => {
    const applicationsUpdated = applications.map((curApplication, curIndex) => {
      return curIndex === index ?
        {...curApplication, onHover: isEnter} :
        {...curApplication, onHover: false};
    });

    setApplications(applicationsUpdated);
  }

  return (
    <Container>
      <Head>
        <Heading>APPLICATIONS</Heading>

        <SubHeading>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        </SubHeading>
      </Head>

      {applications.map((curApplicationObj, index) => (
        <AppFrame
          key={index}
          onClick={e => handleOnClick(curApplicationObj, index)}
          onMouseEnter={e => handleMouseEnter(true, index)}
          onMouseLeave={e => handleMouseEnter(false, index)}
        >
          {curApplicationObj.onHover ? <curApplicationObj.invertedImage /> : <curApplicationObj.image />}
          <Name style={ curApplicationObj.onHover ? { color: '#FFF' } : null }>{curApplicationObj.name}</Name>
          <Description style={ curApplicationObj.onHover ? { color: '#FFF' } : null }>{curApplicationObj.description}</Description>
          {curApplicationObj.isActive ? <UpIcon /> : <DownIcon />}
        </AppFrame>
      ))}

      <Collapse isOpened={true}>


      </Collapse>

    </Container>
  )
}
