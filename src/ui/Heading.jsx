import styled from "styled-components";

const Heading = styled.div`
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    @media screen and (max-width: 500px) {
        font-size: 18px;
   }
   @media screen and (max-width: 400px) {
        font-size: 16px;
   }
`
export default Heading;