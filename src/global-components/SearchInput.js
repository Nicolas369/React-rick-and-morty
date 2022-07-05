import { useRef } from "react";
import styled from "styled-components";

function SearchInput({ emitValue, cleaner }) {
    const inputRef = useRef();

    const emit = (e) => emitValue(e.target.value)
    const cleanInput = () => inputRef.current.value = '' 

    cleaner.subscribe(cleanInput);

    return ( 
        <>
            <InputCOntainer> 
                <label > Nombre: </label>
                <Input ref={inputRef} onChange={emit} />
            </InputCOntainer>
        </> 
    );
}

export default SearchInput;

const InputCOntainer = styled.div`
    width: 25vw;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    border: 3px solid #008f11;
    border-radius: 7px;
    background-color: transparent;
    color: #50FF00;
    outline: none;
    font-family: monospace;
`;
