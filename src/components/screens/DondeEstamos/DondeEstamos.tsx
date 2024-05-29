export const DondeEstamos = () => {
  return (
    <div className="relative flex flex-col items-center bg-gradient-to-br from-black to-slate-900 h-screen">
      <div className="top-16 mockup-window border bg-base-300 mt-10">
        <div className="flex justify-center px-4 py-6 bg-base-200 text-2xl">Nuestra ubicación!</div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.429503988687!2d-68.83958662094294!3d-32.88681069191336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091ed2dd83f7%3A0xf41c7ab7e3522157!2sAv.%20San%20Mart%C3%ADn%20%26%20Av.%20Las%20Heras%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1713493648034!5m2!1ses!2sar"
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};
