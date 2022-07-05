import { useState } from "react";
import styled from "styled-components";

function ExpansionPanel({ children }) {
    const [open, setOpen] = useState(false);

    const openPanel = () => setOpen(!open);

    return ( 
        <>
            <Panel>
                <OpenClosePanel onClick={openPanel}> {open ? 'Close' : 'Options'} </OpenClosePanel>
                <ExpansionPanelContent open={open} >
                    { children }
                </ExpansionPanelContent>
            </Panel> 
        </>
    );
}

export default ExpansionPanel;

const Panel = styled.div`
    height:  40px;
    width: 10vw;
    margin-right: 15px;
    position: relative;
`;

const ExpansionPanelContent = styled.div`
    z-index: 100;
    width: 18.5vw;
    border-radius: 7px;
    overflow: scroll;
    margin-top: 10px;
    box-sizing: border-box;
    background-color: #003300;
    cursor: pointer;

    transition: all 0.5s ease-in;
    max-height: ${props => props.open ? '85vh' : '0px'};
    border: ${props => props.open ? '3px solid #50FF00' : 'none'};
    box-shadow: ${props => props.open ? '0px 0px 20px 3px #005200' : 'none'};

    &::-webkit-scrollbar {
        display: none;
    }
`;

const OpenClosePanel = styled.button`
    border: 2px solid #50FF00;
    border-radius: 7px;
    background-color: #003300;
    color: #50FF00;
    font-size: 18px;
    width: 100%;
    height: 40px;
    cursor: pointer;
`;