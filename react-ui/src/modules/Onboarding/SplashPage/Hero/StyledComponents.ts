import styled from "styled-components";

import { color, fontFamily } from "../../../../theme";

export const Wrapper = styled.div`
    position: relative;
`;

export const Header = styled.div`
    position: relative;
    width: 100%;
`;

export const Slash = styled.img`
    transition: opacity 1s;
    transition-delay: 0.3s;
    position: absolute;
    bottom: -20px;
    width: 32px;
    height: 8px;
`;

export const Section = styled.div`
    width: 100%;
`;

export const SectionDark = styled(Section)`
    color: ${color.white};
    position: absolute;
    top: 280px;
    @media (max-width: 400px) {
        width: 100%;
    }
`;

export const SectionHeader = styled(SectionDark)`
    top: 200px;
    @media (max-width: 400px) {
        top: 150px;
    }
`;

export const Title = styled.div`
    font-family: ${fontFamily.light};
    font-size: 40px;
    margin-bottom: 30px;
    color: ${color.dharmaBlue};
    @media (max-width: 700px) {
        font-size: 30px;
    }
`;

export const SubTitle = styled.div`
    transition: opacity 1s;
    transition-delay: 0.3s;
    font-family: ${fontFamily.bold};
    color: ${color.dharmaGreen};
    font-size: 40px;
    margin-bottom: 40px;
    line-height: 50px;
    @media (max-width: 700px) {
        font-size: 30px;
        line-height: 36px;
        margin-bottom: 30px;
    }
`;

export const Description = styled.div`
    transition: opacity 1s;
    transition-delay: 0.5s;
    font-family: 'Din Regular';
    font-size: 17px;
    margin: 20px 0;
    line-height: 25.5px;
    color: ${color.dharmaGreen};
`;

export const Button = styled.div`
    display: block;
    font-family: 'Din Bold';
    font-size: 15px;
    text-align: center;
    text-transform: uppercase;
    padding: 15px;
    color: ${color.white};
    background: ${color.dharmaGreen};
    margin-right: 5px;
    margin-top: 20px;
    transition: color 0.5s, background 0.5s, border 0.5s;
    &:hover {
        cursor: pointer;
    }
`;

export const BlocksBetweenContainer = styled.div`
  transition: opacity 1s;
  transition-delay: 0.5s;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

export const HeroContainer = styled.div`
    flex: 1;
  
    max-width: 600px;
    position: relative;
    margin: 0 auto;

    @media (max-width: 600px) {
        flex: none;
        width: 100%;
        padding: 0 20px;
        margin: 0;
    }
`;
