
import '../let/style.css'
import { Link } from 'react-router-dom';
import { HiHome } from "react-icons/hi2";
import { PiFunctionBold } from "react-icons/pi";
import { MdOutlineFactCheck } from "react-icons/md";
import { RiLayout4Fill } from "react-icons/ri";
import { MdAbc } from "react-icons/md";
import { FaJava } from "react-icons/fa6";
import { FaPython } from "react-icons/fa6";
import { FaDatabase } from "react-icons/fa6";
import { FaNetworkWired } from "react-icons/fa";
import { HiPuzzle } from "react-icons/hi";

function Sidebar() {
    return (
        <>
            <hr></hr>
            <div className='bg-secondary-subtle sidebar p-2 sidebar-scroll '>
                <div className='m-2'>
                    <i className='bi bi-check2-all me-3 fs-4'></i>
                    <span className='brand-name fs-4'>Lests do it</span>
                </div>
                <hr className='text-dark' />
                <Link to='/home' className='list-group-item py-2 my-1'>
                    <i className='fs-5 me-3'> <HiHome></HiHome></i>
                    <span className='comptext'>HOME</span>
                </Link>
                <hr></hr>
                <div className='list-group list-group-flush'>
                    <Link to='/apti' className='list-group-item py-2' >
                        <i className='fs-5 me-3'><PiFunctionBold /></i>
                        <span className='comptext'>Arithmetic Aptitude</span>
                    </Link>
                    <Link to='/home' className='list-group-item py-2' >
                        <i className='fs-5 me-3'><MdOutlineFactCheck /></i>
                        <span className='comptext'>Verbal Ability</span>
                    </Link>
                    <Link to='/verb' className='list-group-item py-2' >
                        <i className='fs-5 me-3'><MdAbc /></i>
                        <span className='comptext'>Logical Reasoning</span>
                    </Link>
                    <Link to='/verb' className='list-group-item py-2' >
                        <i className='fs-5 me-3'><RiLayout4Fill /></i>
                        <span className='comptext'>NonVerbal Reasoning</span>
                    </Link>
                    <hr></hr>
                    <Link to='/notfound' className='list-group-item py-2'>
                        <i className='fs-5 me-3'><FaPython /></i>
                        <span className='comptext'>Python </span>
                    </Link>
                    <Link to='/notfound' className='list-group-item py-2'>
                        <i className='fs-5 me-3'><FaJava /></i>
                        <span className='comptext'>Java</span>
                    </Link>
                    <Link to='/notfound' className='list-group-item py-2'>
                        <i className='fs-5 me-3'><FaDatabase /></i>
                        <span className='comptext'>Database</span>
                    </Link>
                    <Link to='/notfound' className='list-group-item py-2'>
                        <i className='fs-5 me-3'><FaNetworkWired /></i>
                        <span className='comptext'>Networking</span>
                    </Link>
                    <hr></hr>
                    <Link to='/puzzel' className='list-group-item py-2'>
                        <i className='fs-5 me-3'><HiPuzzle /></i>
                        <span className='comptext'>Puzzeles Quiz</span>
                    </Link>
                    <hr></hr>
                    <div className='m-2'>
                        <i className='bi bi-check2-all me-3 fs-4'></i>
                        <span className='brand-name fs-4'>ContactUs</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;