import React from 'react';
import styled from 'styled-components';

import { Author } from './Author'

const Container = styled.div`
  margin: 100px 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IntroFrame = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Title = styled.div`
  flex: 1;
  font-size: 24px;
  font-weight: bold;
  color: #232162;
  letter-spacing: 1px;
`;

const Description = styled.div`
  flex: 4;
  color: #6E6E6E;
  font-size: 18px;
`;

const StrengthFrame = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 75px;
`;

const StrengthImage = styled.img`
  width: 35vw;
  margin-right: 5vw;
`;

const Strength = styled.div`
  color: #6E6E6E;
  font-size: 18px;
`;

const StrengthDesc = styled.div`

`;

const Li = styled.li`
  margin-bottom: 5px;
`;

const AuthorFrame = styled.div`
  display: flex;
  width: 80vw;
  margin-bottom: 50px;
`;

const Blank = styled.div`
  flex: 2;
`;

export const AboutUs = () => {
  return (
    <Container>
      <IntroFrame>
        <Title>About Us</Title>

        <Description>
        In the booming scientific industry, the scope for growth, for the need to upgrade and the need to care is of utmost importance. The huge population in the country needs equipment that can take care of the needs of doctors and other stakeholders, effectively. Keeping this in mind, caring for millions of unseen faces, AIC constantly strives to serve and make lives better.<br /><br />

        The trust that AIC has garnered over many decades is a consequence of the strong relationships that the company has held with the customers, the manufacturers and every other stakeholder in the line. Such trust has propelled us to provide nothing but the very best for our customers, irrespective of the field of operations.<br /><br />

        We see that the world’s healthcare services need to penetrate the remotest parts of the earth, serving where it’s most essential.  From spreading our wings across the Indian subcontinent, AIC is geared up to service the entire world in the upcoming years.<br /><br />

        Join us in this endeavour of making healthcare accessible to all!
        </Description>
      </IntroFrame>

      <StrengthFrame>
        <StrengthImage src='/images/strength.png'></StrengthImage>

        <Strength>
          <Title style={{ textAlign: 'center' }}>AIC's strength lies in</Title>

          <StrengthDesc>
            <ul>
              <Li>Broadest product range</Li>
              <Li>Individual consultation and on-time delivery</Li>
              <Li>Dedicated marketing and sales network to fulfill customers every requirement</Li>
              <Li>Technical support by qualified and experienced personnel</Li>
              <Li>Integrated ERP Solutions for efficient customer services</Li>
              <Li>Wide accessibility through branches</Li>
              <Li>Well connected dealer network</Li>
            </ul>
          </StrengthDesc>
        </Strength>
      </StrengthFrame>

      {/* <Title style={{ marginBottom: '50px' }}>Meet the Team</Title> */}

      <AuthorFrame>
        <Author 
          name='Shri B N Kapila'
          designation='Founder'
          aboutMe={`Associated Instruments and Chemicals popularly known as AIC, is a Five Decade-old company that was founded in the year 1964 by Shri B.N. Kapila. Pioneers in dedicated service to the scientific community’s necessities by being a one-stop Shoppe for all laboratory requisites.<br/>
          Aptly supported by a talented and dedicated staff, this selfless service has taken AIC to great heights in terms of market share and customer satisfaction. AIC’s customers have been with them since their inception, which clearly indicates the quality of unmatched service provided by AIC. Having offices at Chennai, Pondicherry, and Bangalore the group caters to customers with a personalized touch.`}
        />
      </AuthorFrame>
      
    </Container>
  )
}
