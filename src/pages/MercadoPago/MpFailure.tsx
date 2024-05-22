import React from 'react'

export const MpFailure = () => {
    return (
        <div className="h-screen bg-gradient-to-br from-black to-slate-900">
          <div className="flex justify-center w-screen h-full">
                <div className="align-middle card bg-white shadow-xl items-center justify-center w-1/3 h-28 top-36">
                  <div className="card-body">
                    <h2 className="card-title text-4xl text-black text-pretty font-light">Hubo un error en el pago</h2>
                  </div>
                </div>
              </div>
        </div>
      );
}
