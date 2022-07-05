import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCharacters } from '../state/queriesSlice';
import { Link } from "@tanstack/react-location";
import styled from "styled-components";
import Search from "./Search";

function Navbar() {
  const [searchPanel, setSearchPanel] = useState(false);
  const dispatch = useDispatch();

  const openSearch = () => setSearchPanel(!searchPanel);

  const resetCharacterQuery = () => dispatch(getCharacters());

  return (
    <StyledNavbar>
      <Nav>
        <NavBtn>
          <Link to="/characters" onClick={resetCharacterQuery}>Characters </Link>
        </NavBtn>
        <NavBtn>
          <Link to="/locations"> Locations </Link>
        </NavBtn>
        <NavBtn>
          <Link to="/episodes"> Episodes </Link>
        </NavBtn>
        <NavBtn onClick={openSearch}>  Search </NavBtn>
      </Nav>
      { searchPanel && <Search /> }
    </StyledNavbar>
  );
}

export default Navbar;

const NavBtn = styled.div`
  height: 35px;
  width: 150px;
  border: 3px solid #008f11;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #03c71a;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  a {
    color: #03c71a;
    text-decoration: none;
  }

  &:hover {
    background-color: #008f11;
    color: #000000;

    a {
      color: #000000;
    }
  }
`;

const Nav = styled.nav`
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledNavbar = styled.section`
  width: 95vw;
  height: 10vh;
  border: solid #008f11;
  border-width: 0px 0px 3px 0px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;
