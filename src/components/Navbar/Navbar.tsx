import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
      <div className="fixed top-0 right-0 left-0 z-50 bg-black h-16 flex flex-row justify-between items-center text-white text-xl">
          <div className="px-40">
            <h1>Tienda Hendrix</h1>
          </div>
          <div className="flex flex-row space-x-10 font-bold px-10 text-black">
            <Link to={"/"}><button className="btn border-neutral-200 bg-neutral-950 text-xl text-white hover:bg-white hover:text-black">Inicio</button></Link>
            <Link to={"/productos"}><button className="btn border-neutral-200 bg-neutral-950 text-xl text-white hover:bg-white hover:text-black">Productos</button></Link>
            <Link to={"/ubicacion"}><button className="btn border-neutral-200 bg-neutral-950 text-xl text-white hover:bg-white hover:text-black">Donde Estamos</button></Link>
            <Link to={"/grilla"}><button className="btn border-neutral-200 bg-neutral-950 text-xl text-white hover:bg-white hover:text-black">Grilla</button></Link>
          </div>
      </div>
    )
  }