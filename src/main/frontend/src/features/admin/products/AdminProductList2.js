import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import Select from 'react-select';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClear } from 'react-icons/md';
import debounce from 'lodash.debounce';

import { device } from '../../utils/viewport';
import { 
  changeAdminProductList, 
  updateAdminProductList, 
  updateHasMore, 
  updateSearch, 
  getNextPageAsync,
  updateIsLoading,
  selectAdminHasMore,
  selectAdminSearchValue,
  selectAdminProducts } from './adminProductListSlice2';

const Container = styled.div`
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  flex-direction: column;
  align-items: center;
  
  @media ${device.laptop} { 
    align-items: flex-end;
    flex-direction: row;
  }
`;

const NewProductLink = styled(Link)`
  color: #232162;
  margin-right: 10px;
  text-decoration: underline;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    margin-bottom: 0;
  }
`;

const ProductListWrapper = styled.div`
  width: 100%;
  overflow: scroll;
  white-space: nowrap;
`;

const Header = styled.div`
  display: flex;
  background-color: #232162;
  color: #FFF;
  padding: 15px 20px;
  border-radius: 3px;
  font-weight: bold;
  min-width: 700px;
`;

const SmallColumn = styled.div`
  flex: 1;
  white-space: normal;
`;

const MediumColumn = styled.div`
  flex: 2;
  white-space: normal;
`;

const BigColumn = styled.div`
  flex: 3;
  white-space: normal;
`;

const EditLink = styled(Link)`
  background-color: green;
  border: none;
  border-radius: 3px;
  padding: 8px 24px;
  color: #FFF;
  cursor: pointer;
  margin-right: 20px;
`;

const DeleteButton = styled.button`
  background-color: #ff0000d1;
  border: none;
  border-radius: 3px;
  padding: 10px 30px;
  color: #FFF;
  cursor: pointer;
  margin-right: 20px;
`;

const DeleteButtonPop = styled.button`
  background-color: #ff0000d1;
  border: none;
  border-radius: 3px;
  padding: 10px 30px;
  color: #FFF;
  cursor: pointer;
  margin-right: 0;
  margin-bottom: 20px;

  @media ${device.tablet} { 
    margin-right: 20px;
    margin-bottom: 0;
  }
`;

const CloseButton = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px 30px;
  cursor: pointer;
`;

const ProductRow = styled.div`
  display: flex;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0 5px 1px rgba(188,188,188,0.3);
  padding: 10px 20px;
  margin: 5px 0;
  min-width: 700px;
`;


const Search = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  height: 38px;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    width: 225px;
    margin-bottom: 0;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 10px 30px 10px 30px;
  border: 1px solid #CCC;
  font-size: 14px;
`;

const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  color: #848484;
  top: 10px;
  left: 10px;
`;

const CancelIcon = styled(MdClear)`
  position: absolute;
  color: #848484;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Dummy = styled.div`
  display: inline-block;
  position: absolute
`;

const ScrollObserver = styled.div`
  padding: 15px 25px;
  text-align: center;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${device.laptop} { 
    width: auto;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const BrandFilterWrapper = styled.div`
  width: 100%;
  margin-right: 20px;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    width: 225px;
    margin-bottom: 0;
  }
`;

const ALL_BRANDS = {
  label: 'All Brands',
  value: null
}

const categoryOptions = [
  {label: 'Analytical', value: 'Analytical'}
]

export const AdminProductList2 = () => {
  const dispatch = useDispatch();
  const productList = useSelector(selectAdminProducts);
  const hasMore = useSelector(selectAdminHasMore);
  const searchValue = useSelector(selectAdminSearchValue);

  const [category, setCategory] = useState('Analytical');
  const [pageNo, setPageNo] = useState(0);
  const [placeholder, setPlaceholder] = useState('Search by Products name');

  const [brand, setBrand] = useState(null);
  const [brandList, setBrandList] = useState([]);

  const dummyRef = useRef(null);

  const updateProductListOnSearchOrFilter = async () => {
    try {
      const queryParams = {
        searchValue: ((searchValue === '' || searchValue.length < 3) ? null : searchValue), 
        brand,
        pageNo: 0, 
        limit: 20
      }
      if (searchValue === '' || searchValue.length >= 3) {
        const url = (category === 'Analytical') ? '/api/analytical-products' : '/api/featured-products';
        const adminProductsResponse = await axios.get(url, { params: queryParams });
        dispatch(changeAdminProductList(adminProductsResponse.data.payload));
      }
    } catch (err) {
      console.log('Exception while fetching filtered admin product list: ', err.message);
    }
  }

  useEffect(() => {
    updateProductListOnSearchOrFilter();
  }, [searchValue]);

  
  const handleOnSearch = searchValue => {
    dispatch(updateSearch(searchValue));
  }



  useEffect(() => {
    if (hasMore) {
      dispatch(getNextPageAsync({ category, brand, searchValue, pageNo })); 
    }
  }, [dispatch, hasMore, category, brand, pageNo]);


  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) { 
      setPageNo((page) => page + 1)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(debounce(handleObserver, 2000), { threshold: 1.0 });

    (hasMore || pageNo === 0) && dummyRef.current && observer.observe(dummyRef.current);
  }, [hasMore, pageNo]);

  
  const handleOnDelete = async productId => {
    const headers = { 'Content-Type': 'application/json' };

    try {
      const url = (category === 'Analytical') ? '/api/analytical-products/delete' : '/api/featured-products/delete';
      const productDeleteResponse = await axios.post(url, { productId }, headers);
      
      if (productDeleteResponse.data.payload) {
        toast.success(`Product deleted successfully`, { variant: 'success'});
        setTimeout(() => window.location.reload(), 5000);
      } else {
        toast.error(`Product deletion failed`, { variant: 'error'});
      }
    } catch (err) {
      console.log('Error while deleting product: ', err.message);
      toast.error(`Product deletion failed`, { variant: 'error'});
    }
  }

  const fetchBrandList = async () => {
    try {
      const brandListResponse = await axios.get('/api/brands');
      setBrandList(brandListResponse.data.payload.map(curBrandObj => curBrandObj.name));
    } catch(err) {
      console.log('Error while fetching brands: ', err.message);
      setBrandList([]);
    }
  }

  useEffect(() => {
    fetchBrandList();
  }, []);

  const handleCategoryChange = e => {
    setCategory(e.value);

    dispatch(updateHasMore(true));
    setBrand(null); 
    setPageNo(0);
  }

  const handleBrandChange = e => {
    dispatch(updateHasMore(true)); 
    setPageNo(0);
    setBrand(e.value); 
  }

  return (
    <Container>
      <MenuWrapper>
        <NewProductLink to='/admin/products2/new' >Add a new product</NewProductLink>

        <FilterWrapper>
          <BrandFilterWrapper>
            <Select
              value={{label: category, value: category}}
              options={categoryOptions} 
              onChange={handleCategoryChange} 
            />
          </BrandFilterWrapper>
          
          <BrandFilterWrapper>
            <Select
              isSearchable={true}
              placeholder='Brand filter'
              value={brand ? {label: brand, value: brand} : null}
              options={[ALL_BRANDS, ...brandList.map(curBrand => ({label: curBrand, value: curBrand}))]} 
              onChange={handleBrandChange} 
            />
          </BrandFilterWrapper>

          <Search>
            <SearchInput 
              value={searchValue}
              placeholder={placeholder} 
              onChange={e => handleOnSearch(e.target.value)}
              onBlur={() => setPlaceholder('Search by Products name')} 
              onFocus={() => setPlaceholder('Type at least 3 characters')} 
            />

            <SearchIcon size='1.2em'/>
            <CancelIcon onClick={() => handleOnSearch('')} size='1.2em' />
          </Search>
        </FilterWrapper>
      </MenuWrapper>


      <ProductListWrapper>
        <Header>
          <MediumColumn>Product Id</MediumColumn>
          <BigColumn>Name</BigColumn>
          <MediumColumn>Brand</MediumColumn>
          <MediumColumn>Action</MediumColumn>
        </Header>

        {productList.map((curProduct, index) => 
          <ProductRow key={index} >
            <MediumColumn>{curProduct.productId}</MediumColumn>
            
            <BigColumn>{curProduct.name}</BigColumn>

            <MediumColumn>{curProduct.brand}</MediumColumn>
            
            <MediumColumn style={{ display: 'flex' }}>
              <EditLink to={{ pathname: `/admin/products2/edit/${curProduct.productId}`}}>Edit</EditLink>
              <Popup
                trigger={<DeleteButton style={{ padding: '8px 24px' }}>Delete</DeleteButton>}
                modal
              >
                {close => (
                  <div className="admin-modal">
                    <button className="close" onClick={close}>&times;</button>

                    <div className="content">Are you sure you want to delete the product {curProduct.name}?</div>

                    <div className="actions">
                      <DeleteButtonPop onClick={() => handleOnDelete(curProduct.productId)} >Yes, delete</DeleteButtonPop>
                      
                      <CloseButton autoFocus className="button" onClick={() => close()} >Close</CloseButton>
                    </div>
                  </div>
                )}
              </Popup>
            </MediumColumn>
          </ProductRow>)
        }
        {hasMore ?
          <div>
            <ScrollObserver colSpan='5'>
              <Dummy ref={dummyRef}>&nbsp;</Dummy>Loading more products...
            </ScrollObserver>
          </div> : null}
      </ProductListWrapper>
    </Container>
  )
}
