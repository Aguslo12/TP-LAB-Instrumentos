import { useState } from 'react';
import { FaArrowAltCircleRight } from "react-icons/fa";


const Slider = ({ images, text }) => {
    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        setIndex((oldIndex) => {
            let index = oldIndex + 1;
            if (index > images.length - 1) {
                index = 0;
            }
            return index;
        });
    };

    const prevSlide = () => {
        setIndex((oldIndex) => {
            let index = oldIndex - 1;
            if (index < 0) {
                index = images.length - 1;
            }
            return index;
        });
    };
    console.log(text)

    return (
        <div className='flex relative'>
            <button className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full opacity-100 z-10 mx-4 hover:scale-110 transition-all' onClick={prevSlide}>
                <FaArrowAltCircleRight className='rotate-180 text-5xl' />
            </button>
            <img src={`/${images[index]}`} className='w-full h-screen transition-all' alt={`/${images[index]}`} />
            <button className='absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full mx-4 hover:scale-110 transition-all p-1' onClick={nextSlide}>
                <FaArrowAltCircleRight className='text-5xl' />
            </button>

            <div className='absolute top-2/3  bg-gradient-to-t from-black to-transparent w-full text-white text-xl text-center h-1/3  '>
                <h1 className='absolute bottom-10 bg-white p-2 m-5 rounded-xl bg-opacity-15 font-extrabold'>{text}</h1>
            </div>
        </div>
    );
};

export default Slider;