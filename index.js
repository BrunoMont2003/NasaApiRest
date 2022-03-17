// import fetch from "node-fetch";
const DEMO_KEY = "XEBPgDPAePP97QjDkGIgDWRZIcKf1rBjnDKVihXj";

const marte = async () => {
  const response = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${DEMO_KEY} `
  );

  const { photos: fotosMarte } = await response.json();
  console.log(fotosMarte);
  document.getElementById("galeria").innerHTML += `
    <div class=" col-span-full">
      <h2 class="text-2xl text-white">Rover:
      ${fotosMarte[0].rover.name} </h2>
      <span class="text-slate-200">Landing date: ${fotosMarte[0].rover.landing_date} </span>
    </div>
  `;
  fotosMarte.forEach((foto) => {
    document.getElementById("galeria").innerHTML += `
    <div class="relative border rounded shadow">
    <img src=${foto.img_src} alt=${foto.id} class="rounded " />
    <div class="bg-white opacity-70 p-5 absolute bottom-0 text-black font-bold flex flex-col">
    <span>${foto.earth_date}</span>
    <span>${foto.camera.name}</span>
    
    </div>

    </div>

    `;
  });
};

marte();
