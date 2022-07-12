import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import cover from '../../assets/images/portada.png';

function Home() {
    const [queryCode, setQueryCode] = useState(``); 
    const index = useRef({array: 0, line: 0});
    const queryArray = useRef([
        "",
        "    query GraphQL ($id: ID = 1) {",
        "        character (id: $id) {",
        "            id",
        "            name",
        "            status",
        "            species",
        "            type",
        "            gender",
        "            origin {",
        "                name",
        "                type",
        "                dimension",
        "            ",
        "            }",
        "            location {",
        "                name",
        "                dimension",
        "                type",
        "                id",
        "            }",
        "            image",
        "            created",
        "            episode {",
        "                name",
        "                id",
        "            }",
        "        }",
        "    }"
    ]);
        
    const typing = () => {
        if (queryArray.current.length > index.current.array) {
            const line = queryArray.current[index.current.array];
            if (line.length > 0 && (line.length) > index.current.line) {
                let blackSpaces = '';
                let letter = line.split('')[index.current.line];
                while (letter === ' ' && line.split('')[index.current.line]) {
                    blackSpaces += letter;
                    index.current.line++;
                    if (line.split('')[index.current.line]) {
                        letter = line.split('')[index.current.line]
                    }
                }
                setQueryCode(queryCode + (blackSpaces + letter));
                index.current.line++;
            }
            else {
                setQueryCode(queryCode + '\n');
                index.current.array++;
                index.current.line = 0;
            } 
        }
    }

    useEffect(() => {
        setTimeout(() => typing(), 100);
    }, [queryCode]);

    return ( 
        <div style={styles.container}>
            <Container>
                <CodeContainer left={false} >
                    <QueryCode>
                        <code>
                            {queryCode}<Loading>▮</Loading> 
                        </code>
                    </QueryCode>

                </CodeContainer>
                
                <CoverImage src={cover}/>
                
                <CodeContainer left={true}>
                    <QueryCode>
                        <code>
                            {queryCode}<Loading>▮</Loading> 
                        </code>
                    </QueryCode>
                </CodeContainer>
            </Container>
        </div>
    );
}

export default Home;

const styles = {
    container: { 
        height: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        overflowY: 'hidden',
    }
}

const Container = styled.div`
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoverImage = styled.img`
    height: 85vh;
    width: auto;
`;

const CodeContainer = styled.div`
    width: 160vh;
    height: 250vh;
    display: flex;
    align-items: center;
    justify-content: ${props => props.left ? 'left' : 'right'};;
    position: relative;
    
`;

const QueryCode = styled.pre`
    margin: 5vw;
    font-size: 1rem;
`;

const animation = keyframes`
    0% {opacity: 0; }
    100% {opacity: 1;}
`;

const Loading = styled.span`
    font-size: 25px;
    animation: ${animation} 0.5s linear infinite;
`;
