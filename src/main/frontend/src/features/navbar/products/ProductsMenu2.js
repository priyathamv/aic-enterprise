import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  top: 75px;
  position: absolute;
  display: none;
  border-radius: 3px;
  margin-bottom: 50px;
  background-color: #FFF;
  z-index: 10000;
  box-shadow: 0 0 10px 1px rgba(188,188,188,0.3);
`;

const ProductMenuWrapper = styled.div`
  display: flex;
`;

const ApplicationBox = styled.div`
  background-color: #232162;
  height: 70vh;
  width: 20vw;
  color: #FFFFFF;
  text-align: left;
  overflow: scroll;
`;

const Heading = styled.div`
  font-size: 22px;
  padding: 30px 30px 15px 30px;
`;


const ApplicationItem = styled.div`
  padding: 15px 60px;
  font-size: 16px;
`;

const CategoriesBox = styled.div`
  background-color: #0000001a;
  height: 70vh;
  width: 20vw;
  text-align: left;
  display: none;
  overflow: scroll;
`;

const BrandsBox = styled.div`
  background-color: #FFFFF;
  height: 70vh;
  width: 20vw;
  text-align: left;
  display: none;
  overflow: scroll;
`;

const BrandItem = styled.a`
  text-decoration: none;
  color: black;
  padding: 15px 60px;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const applicationsArr = ['Analytical', 'Life Science', 'Instrumentation', 'Industrial Safety and Clean room'];

const appToCatMap = {
  'Analytical': ['Chromatography', 'Solvents', 'Buffers & Standards', 'Laboratory Filtration', 'Laboratory Glassware'], 
  'Life Science': ['Genomics', 'Proteomics', 'Antibodies', 'Cell Culture', 'Cryoware', 'Liquid Handling', 'Microbiology', 'Storage Bottles & Carboys', 'General Labware'], 
  'Instrumentation': ['Laboratory Instruments', 'Centruifuge', 'Electrophoresis', 'PCR', 'Western Blotting'], 
  'Industrial Safety and Clean room': ['Wipers', 'Safety Products', 'Clean Room Sanitization Solution', 'Clean Room Apparel', 'Floor Cleaning', 'Housekeeping Solution']
}

const catToBrandMap = {
  'Chromatography': [
    {name: 'Thermo Scientific Column & Vial', value: 'Thermo Fisher Scientific'},
    {name: 'Merck Columns', value: 'Merck'},
    {name: 'Borosil Vials', value: 'Borosil'},
    {name: 'Hamilton Syringe', value: 'HAMILTON'}
  ],
  'Solvents': [
    {name: 'Honeywell', value: 'Honeywell'},
    {name: 'Merck', value: 'Merck'},
    {name: 'Sigma', value: 'SIGMA-ALDRICH'},
  ], 
  'Buffers & Standards': [
    {name: 'Eutech', value: 'Eutech'},
    {name: 'Reagecon', value: 'Reagecon'},
    {name: 'Hamilton', value: 'HAMILTON'},
    {name: 'Merck', value: 'Merck'}
  ], 
  'Laboratory Filtration': [
    {name: 'Merck Millipore', value: 'Merck'},
    {name: 'Whatman', value: 'Whatman'}, 
    {name: 'Thermo Fisher', value: 'Thermo Fisher Scientific'},
    {name: 'AIC', value: 'AIC'}
  ], 
  'Laboratory Glassware': [
    {name: 'Borosil', value: 'Borosil'},
    {name: 'Duran', value: 'Duran'},
    {name: 'Rivera', value: 'RIVIERA'},
    {name: 'Merck', value: 'Merck'},
  ],
 

  'Genomics': [
    {name: 'Abgene Flnzymes', value: 'Abgene Flnzymes'},
    {name: 'Invitrogen', value: 'Invitrogen'}
  ], 
  'Proteomics': [
    {name: 'Invitrogen', value: 'Invitrogen'},
    {name: 'Pierce', value: 'Pierce'}
  ], 
  'Antibodies': [
    {name: 'Ebioscience', value: 'Ebioscience'},
    {name: 'Pierce', value: 'Pierce'}
  ], 
  'Cell Culture': [
    {name: 'Nunc, Nalgene', value: 'Nunc, Nalgene'},
    {name: 'Gibco Media & Serum', value: 'Gibco Media & Serum'},
    {name: 'Genaxy', value: 'Genaxy'},
    {name: 'Abdos', value: 'Abdos'}
  ], 
  'Cryoware': [
    {name: 'Nunc, Nalgene', value: 'Nunc, Nalgene'},
    {name: 'Genaxy', value: 'Genaxy'},
    {name: 'Abdos', value: 'Abdos'}
  ], 
  'Liquid Handling': [
    {name: 'Thermo Finn Pipette & Tips', value: 'Thermo Finn Pipette & Tips'},
    {name: 'Genaxy Nichiro Pitelles & Tips', value: 'Genaxy Nichiro Pitelles & Tips'},
    {name: 'Abdos Tips', value: 'Abdos'},
    {name: 'AIC student Pipetttes', value: 'AIC student Pipetttes'}
  ], 
  'Microbiology': [
    {name: 'Genaxy/Abdos Petridishes', value: 'Genaxy/Abdos Petridishes'}, 
    {name: 'Conda Media', value: 'Conda'}, 
    {name: 'SRL Media', value: 'SRL'}
  ], 
  'Storage Bottles & Carboys': [
    {name: 'Nalgene', value: 'Nalgene'},
    {name: 'Abdos', value: 'Abdos'}
  ], 
  'General Labware': [
    {name: 'Thermo Fisher', value: 'Thermo Fisher Scientific'},
    {name: 'Abdos', value: 'Abdos'}
  ],


  'Laboratory Instruments': [
    {name: 'AIC', value: 'AIC'},
    {name: 'Neuation', value: 'Neuation'},
    {name: 'Borosil', value: 'Borosil'}
  ], 
  'Centruifuge': [
    {name: 'Neuation', value: 'Neuation'},
    {name: 'Thermo Fisher', value: 'Thermo Fisher Scientific'}
  ], 
  'Electrophoresis': [
    {name: 'AIC', value: 'AIC'},
    {name: 'Thermo Fisher', value: 'Thermo Fisher Scientific'}
  ], 
  'PCR': [
    {name: 'Thermo Fisher', value: 'Thermo Fisher Scientific'}
  ], 
  'Western Blotting': [
    {name: 'Thermo Fisher', value: 'Thermo Fisher Scientific'},
    {name: 'AIC', value: 'AIC'}
  ],


  'Wipers': [
    {name: 'Kimtech from Kiberly Clark', value: 'Kimberly-Clark'}, 
    {name: 'Wypall from Kiberly Clark', value: 'Kimberly-Clark'}, 
    {name: 'Ergo clean', value: 'Ergoclean'}
  ], 
  'Safety Products': [
    {name: 'Kleenguard from Kiberly Clark', value: 'Kimberly-Clark'}, 
    {name: 'Honeywell', value: 'Honeywell'}
  ], 
  'Clean Room Sanitization Solution': [
    {name: 'Ergo clean', value: 'Ergoclean'},
    {name: 'Kiberly Clark', value: 'Kimberly-Clark'}
  ], 
  'Clean Room Apparel': [
    {name: 'Kiberly Clark', value: 'Kimberly-Clark'},
    {name: 'Honeywell', value: 'Honeywell'}
  ], 
  'Floor Cleaning': [
    {name: 'Tuskey from Diversey', value: 'Tuskey from Diversey'}
  ], 
  'Housekeeping Solution': [
    {name: 'Scott from Kiberly Clark', value: 'Kimberly-Clark'}, 
    {name: 'Soft touch from Diversey', value: 'Soft touch from Diversey'}
  ]
}

export const ProductsMenu2 = () => {
  const [application, setApplication] = useState(null);
  const [category, setCategory] = useState(null);
  


  const displayProductsMenu = displayFlag => {
    document.getElementById('products_menu_id2').style.display = displayFlag ? 'block' : 'none';
  }
  
  const displayCategories = displayFlag => {
    document.getElementById('categories_menu_id2').style.display = displayFlag ? 'block' : 'none';
  }

  const displayBrands = displayFlag => {
    document.getElementById('brands_menu_id2').style.display = displayFlag ? 'block' : 'none';
  }

  return (
    <Container id='products_menu_id2'>
      <ProductMenuWrapper>
        <ApplicationBox>
          <Heading>Applications</Heading>

          {applicationsArr.map((curApplication, index) => 
            <ApplicationItem 
              key={index}
              style={curApplication == application ? {fontWeight: 'bold'} : null}
              onMouseEnter={() => {displayCategories(true); setApplication(curApplication)}} 
              onMouseLeave={() => displayCategories(false)}
            >{curApplication}</ApplicationItem>  
          )}
        </ApplicationBox>

        <CategoriesBox 
          id='categories_menu_id2'
          onMouseEnter={() => displayCategories(true)} 
          onMouseLeave={() => displayCategories(false)}
        >
          <Heading>Categories</Heading>

          {appToCatMap[application] && 
            appToCatMap[application].map((curCategory, index) => 
            <ApplicationItem
              key={index}
              style={curCategory == category ? {fontWeight: 'bold', color: 'black'} : {color: 'black'}}
              onMouseEnter={() => {displayBrands(true); setCategory(curCategory)}} 
              onMouseLeave={() => displayBrands(false)}
            >{curCategory}</ApplicationItem>)}
        </CategoriesBox>

        <BrandsBox 
          id='brands_menu_id2'
          onMouseEnter={() => {displayCategories(true); displayBrands(true)}} 
          onMouseLeave={() => {displayCategories(false); displayBrands(false)}}
        >
          <Heading>Brands</Heading>

          {catToBrandMap[category] && 
            catToBrandMap[category].map((curBrand, index) => 
              <BrandItem 
                key={index}
                href={`/product-list?brand=${curBrand.value}`} 
                onClick={() => displayProductsMenu(false)}
              >
                {curBrand.name}
              </BrandItem>
            )}
        </BrandsBox>
      </ProductMenuWrapper>
    </Container>
  )
}
