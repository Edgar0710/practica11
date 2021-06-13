platillosState = [];
ordenesState = [];

window.onload = () => {
  fetch("http://localhost:3000/api/platillos")
    .then((res) => res.json())
    .then((data) => {
      platillosState = data;
      const listaPlatillos = document.getElementById("platillos");
      const plantilla = data.map(renderItem);
      listaPlatillos.removeChild(listaPlatillos.firstElementChild);
      plantilla.forEach((element) => listaPlatillos.appendChild(element));
      console.log(platillosState);
    });

    

  fetch("http://localhost:3000/api/ordenes")
    .then((res) => res.json())
    .then((data) => {
      ordenesState = data;
      const listaOrdenes = document.getElementById("ordenes");
      const plantillaOrdenes = data.map(renderOrder);
      listaOrdenes.removeChild(listaOrdenes.firstElementChild);
      plantillaOrdenes.forEach((element) => listaOrdenes.appendChild(element));
    });
};

const renderItem = (item) => {
  const element = stringToHTML(`
  <li data-id="${item._id}"
      class="list-group-item drinks-section">
      <div class="d-flex justify-content-between align-items-center">
<h5>${item.nombre}</h5>
<small>${item.desc}</small>
<span class="badge badge-success">$${item.precio}</span>
</div>
      </li>`);
  element.addEventListener("click", () => {
    const listaPlatillos = document.getElementById("platillos");
    Array.from(listaPlatillos.children).forEach((item) =>
      item.classList.remove("seleccionado")
    );
    element.classList.add("seleccionado");
    localStorage.setItem("id", item._id);
  });
  return element;
};

const renderOrder = (orden) => {
  function getInfo(id) {
    return platillosState.filter(function (data) {
      return data._id == id;
    });
  }

  var found = getInfo(orden.platillo_id);
  var platilloInfo = found[0].nombre;
  const elementOrder = stringToHTML(`
  <li data-id="${orden._id}"
      class="list-group-item ordenes-section">
      <div class="d-flex justify-content-between align-items-center">
<h5>Mesa ${orden.usuario_id}</h5>
<small>${platilloInfo}</small>
</div>
      </li>`);
  return elementOrder;
};

const stringToHTML = (str) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body.firstChild;
};

function sendOrder() {
  const mesa = document.getElementById("mesa").value;
  const platilloID = localStorage.getItem("id");
  if (!platilloID) {
    alert("Selecciona un platillo");
    return;
  }
  if (!mesa) {
    alert("Ingresa tu # de mesa");
    return;
  }

  const orden = {
    platillo_id: platilloID,
    usuario_id: mesa,
  };

  fetch("http://localhost:3000/api/ordenes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(orden),
  })
    .then((result) => result.json())
    .then((data) => console.log("data", data));
  localStorage.clear();
  $('input[type="text"], textarea').val("");
  alert("Orden enviada");
  $(document).ready(function () {
    $(this).scrollTop(0);
  });
}
