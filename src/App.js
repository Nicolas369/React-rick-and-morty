import { Outlet, useLocation } from "@tanstack/react-location";
import styled from "styled-components";
import Navbar from "./global-components/Navbar";
import QueryPanel from "./global-components/QueryPanel";

function App() {
  const showQueryPanel = useLocation().current.pathname !== "/";

  return (
    <Home>
      <Container>
        <Navbar />

        <Content>
          <Outlet />
        </Content>

        {showQueryPanel && <QueryPanel />}
      </Container>
    </Home>
  );
}

export default App;

const Home = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.section`
  height: 95vh;
  width: 95vw;
  margin: auto;
  border: 3px solid #008f11;
`;

const Content = ({ children }) => (
  <Scrollbar>
    <Reverse>{children}</Reverse>
  </Scrollbar>
);

const Scrollbar = styled.section`
  direction: rtl;
  height: 85vh;
  overflow-y: scroll;
  overflow-x: hidden;
  
  &::-webkit-scrollbar {
    width: 10px;
    border: 3px solid #008f11;
    border-width: 0px 3px 0px 0px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #008f11;
  }
`;

const Reverse = styled.section`
  direction: ltr;
`;
