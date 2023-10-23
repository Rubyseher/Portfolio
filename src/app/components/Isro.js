import Background from "./StarBackground";
import Image from 'next/image'
import './components.css'

const Isro = () => {
    return (
        <div className='starbg '>

            <Background />
            <Image src="/img/isroLogo2.png" width={400} height={400} />
            {/* <h1 style={{ color: 'white',fontSize:'10vh',letterSpacing:10 }}>Isro </h1> */}
            {/* <p style={{fontSize:'3vh',letterSpacing:10 }}>National Institute of Advanced Studies </p> */}
        </div>
    );
}
export default Isro