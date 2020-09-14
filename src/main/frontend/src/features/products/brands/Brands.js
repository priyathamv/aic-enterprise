import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// import { fetchBrandsAsync, selectBrands } from './brandsSlice';


const Container = styled.div`
  margin: 50px 15vw 100px 15vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
`;

const Brand = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #232162;
  cursor: pointer;
  border: 1px solid #CCC;
  padding: 0 15px;
  border-radius: 15px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  min-width: 100px;
  min-height: 70px;
  &:hover {
    color: #F2F2F2;
    background-color: #232162;
    margin: -10px;
    height: 90px;
    font-size: 16px;
  }
`;

export const Brands = () => {
  // const dispatch = useDispatch();

  const brandsObj = {
    isLoading: false,
    brandList: ['3M', 'Abdos', 'Acme', 'AXIVA', 'Blue Star', 'CDH', 'Conda', 'Dupont', 'Difco', 'Erma', 'Eutech', 'Exmire', 'Thermo TPP', 'Thermo Invitrogen', 'Thermo Orion', 'Thermo oxoid', 'Thermo chromatography', 'Thermo CCP', 'Thermo LPE', 'Fisher Scientific', 'Fisher Bio Reagents', 'Fisherbrand', 'genaxy', 'Hamilton Buffer', 'Hamilton-Syringes', 'HIMEDIA', 'Honeywell Safety Products', 'Kimberly-Clark', 'LOBA', 'MagGenome', 'Merck chemicals', 'Merck Biomonitoring ', 'SIGMA-ALDRICH', 'millipore', 'NEB', 'NICE', 'Nupore', 'polylab', 'Qiagen', 'Reagecon', 'RIVIERA', 'SPECTROCHEM', 'SRL', 'VELTEK', 'Waters', 'whatman']
  };
  // const brandsObj = useSelector(selectBrands);
  
  // useEffect(() => {
  //   dispatch(fetchBrandsAsync());
  // }, []);

  return (
    <Container>
      {!brandsObj.isLoading && brandsObj.brandList.length > 30 ?
        brandsObj.brandList.map((curBrand, index) => <Brand key={index}><span>{curBrand}</span></Brand>) : 
        null
      }
    </Container>
  )
}
