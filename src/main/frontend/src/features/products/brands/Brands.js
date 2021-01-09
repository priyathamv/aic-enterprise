import React from 'react';
// import { useDispatch} from 'react-redux';
import styled from 'styled-components';
import { device } from '../../utils/viewport';
import { brandList } from '../../utils/brands';
// import { fetchBrandsAsync, selectBrands } from './brandsSlice';


const Container = styled.div`
  margin: 30px 20px 100px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;

  @media ${device.tablet} { 
    margin: 30px 100px 100px 100px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  
  @media ${device.laptop} { 
    margin: 30px 15vw 100px 15vw;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`;

const BrandLogo = styled.img`
  width: 40px;
`;

const Brand = styled.a`
  text-decoration: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #000;
  border: 1px solid #CCC;
  padding: 10px;
  border-radius: 15px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  min-width: 100px;
  min-height: 70px;
  &:hover {
    margin: -10px;
    height: 90px;
    font-size: 16px;
  }
`;

const BrandName = styled.div`
  
`;


export const Brands = () => {
  // const dispatch = useDispatch();

  // Removed Brands '3M', 'Acme', 'Erma', 'Thermo CCP', 'Blue Star', 'VELTEK', 'Merck Biomonitoring'

  // const brandsObj = {
  //   isLoading: false,
  //   brandList: ['Abdos', 'AXIVA', 'CDH', 'Conda', 'Dupont', 'Difco', 'Eutech', 'Exmire', 'Thermo TPP', 'Invitrogen', 'Orion', 'Oxoid', 'Thermo chromatography', 'Thermo LPE', 'Fisher Scientific', 'Fisher Bio Reagents', 'Fisherbrand', 'Genaxy', 'HAMILTON', 'HIMEDIA', 'Honeywell', 'Kimberly-Clark', 'LOBA', 'MagGenome', 'Merck', 'SIGMA-ALDRICH', 'Millipore', 'NEB', 'NICE', 'Nupore', 'Polylab', 'Qiagen', 'Reagecon', 'RIVIERA', 'Spectrochem', 'SRL', 'Waters', 'Whatman']
  // };
  // const brandsObj = useSelector(selectBrands);
  
  // useEffect(() => {
  //   dispatch(fetchBrandsAsync());
  // }, []);

  return (
    <Container>
      {brandList.map((curBrand, index) => 
        <Brand href={`/product-list?brand=${curBrand.name}`} key={index}>
          <BrandLogo src={`/images/brand_logos2/${curBrand.imageName}.png`} />
          {/* <BrandName>{curBrand.name}</BrandName> */}
        </Brand>
        )
      }
    </Container>
  )
}
