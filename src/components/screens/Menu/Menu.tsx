import Slider from "../../ui/Slider/Slider"


const Menu = () => {

    const images = ["instrumentos1.jpg", "instrumentos2.jpg", "instrumentos3.jpg"]

    return (
        <div className='top-16 w-full h-screen'>
            <Slider images={images} text={"Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de   experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las mejores elecciones para tu compra musical."}/>
        </div>
    )
}

export default Menu