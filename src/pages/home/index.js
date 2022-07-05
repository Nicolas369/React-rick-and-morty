import styled, { keyframes } from 'styled-components';
import cover from '../../assets/images/portada.png';
import portal from '../../assets/images/portal.png';

function Home() {
    return ( 
        <div style={styles.containerOrbit}>
            <Container>
                <OrbitContainer>
                    <OrbitBig>
                        <PortalImage src={portal}/>
                    </OrbitBig>
                    <OrbitSmall>
                        <PortalImage margin={'-35'} src={portal}/>
                    </OrbitSmall>
                </OrbitContainer>
                
                <CoverImage src={cover}/>
                
                <OrbitContainer>
                    <OrbitBig>
                        <PortalImage src={portal}/>
                    </OrbitBig>
                    <OrbitSmall>
                        <PortalImage margin={'-35'} src={portal}/>
                    </OrbitSmall>
                </OrbitContainer>
            </Container>
        </div>
    );
}

export default Home;




const styles = {
    containerOrbit: { 
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
const PortalImage = styled.img`
    height: 30vh;
    width: auto;
    margin: ${props => props.margin}px;
`;

const animation1 = keyframes`
    0%{transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
`;
const animation2 = keyframes`
    0%{transform: rotate(0deg);}
    100%{transform: rotate(-360deg);}
`;

const OrbitContainer = styled.div`
    width: 160vh;
    height: 250vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const OrbitBig = styled.div`
    height: 110vh;
    width: 110vh;
    border-radius: 50%;
    margin-right: 150px;
    margin-left: 150px;
    border: 3px solid #50FF00;  
    animation: ${animation1} 7s linear infinite;
`;
const OrbitSmall = styled.div`
    height: 55vh;
    width: 55vh;
    border-radius: 50%;
    border: 3px solid #50FF00;
    position: absolute;
    display: flex;
    justify-content: space-between;
    animation: ${animation2} 3s linear infinite;
`;