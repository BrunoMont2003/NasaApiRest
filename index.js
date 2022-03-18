const DEMO_KEY = "XEBPgDPAePP97QjDkGIgDWRZIcKf1rBjnDKVihXj";

const marte = async (rover, sol, camera) => {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=1&${
    camera ? "camera=" + camera : ""
  }&api_key=${DEMO_KEY} `;
  const response = await fetch(url);

  document.getElementById("rover-name").textContent = rover;
  const { photos: fotosMarte } = await response.json();
  if (fotosMarte.length > 0) {
    document.getElementById("landing-date").textContent = await fotosMarte[0]
      .rover.landing_date;
    fotosMarte.forEach((foto) => {
      document.getElementById("galeria").innerHTML += `
      <div class="relative border rounded shadow h-auto">
      <img src=${foto.img_src} alt=${foto.id} class="rounded" />
      <div class="bg-white opacity-70 p-5 absolute right-0 bottom-0 text-black font-bold flex flex-col rounded">
      <span>${foto.earth_date}</span>
      <span>${foto.camera.name}</span>
      
      </div>
  
      </div>
  
      `;
    });
  }
};

marte("curiosity", 0);
var last_rover = "curiosity";
const buscarRover = ({ target }) => {
  document.getElementById("rover-name").textContent = target.value;
  last_rover = target.value;
  return target.value;
};

const buscarCamera = ({ target }) => {
  return target.value;
};

const getSol = (rover) => {
  switch (rover) {
    case "curiosity":
      return 0;
    case "opportunity":
      return 13;
    case "spirit":
      return 6;
  }
};

document
  .getElementById("cboRover")
  .addEventListener("change", async (event) => {
    document.getElementById("cboCamera").value = "";
    const rover = buscarRover(event);
    const sol = getSol(rover);
    document.getElementById("galeria").innerHTML = ``;
    await marte(rover, sol);
  });

document
  .getElementById("cboCamera")
  .addEventListener("change", async (event) => {
    const sol = getSol(last_rover);
    const camara = buscarCamera(event);
    document.getElementById("galeria").innerHTML = ``;

    await marte(last_rover, sol, camara);
  });

