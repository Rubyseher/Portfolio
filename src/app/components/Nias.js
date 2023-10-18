import Background from "./StarBackground";
import './components.css'

const Nias = () => {
    return (
        <div className='starbg'>

            <Background />
            <h1 style={{ color: 'white',fontSize:'10vh',letterSpacing:10 }}>NIAS </h1>
            {/* <p style={{fontSize:'3vh',letterSpacing:10 }}>National Institute of Advanced Studies </p> */}
        </div>
    );
}
export default Nias