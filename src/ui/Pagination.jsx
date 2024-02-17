import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get('page') ? 1 : parseInt(searchParams.get('page'))

  const pageCount = Math.ceil(count / 10);

  // next page 
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function previousPage() {
    const previous = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', previous);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) {
    return null;
  }

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * 10 + 1}</span> to <span>{currentPage === pageCount ? count : currentPage * 10}</span> of <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton disabled={currentPage === 1} onClick={previousPage}>
          <IoIosArrowBack /> <span>Previous</span>
        </PaginationButton>

        <PaginationButton disabled={currentPage === pageCount} onClick={nextPage}>
          <span>Next</span> <IoIosArrowForward />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;

/*const PageNumbers = () => {
   const pageNumbers = [];
   for (let i = 1; i <= pageCount; i++) {
     pageNumbers.push(
       <PaginationButton key={i} onClick={() => goToPage(i)} active={i === currentPage}>
         {i}
       </PaginationButton>
     );
   }
   return (
     <div>
       {pageNumbers}
     </div>
   );
 };

 function goToPage(pageNumber) {
   const newSearchParams = new URLSearchParams(searchParams);
   newSearchParams.set('page', pageNumber);
   setSearchParams(newSearchParams);
 }*/
