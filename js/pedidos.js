async function loadOrders() {
    return( await fetch("http://localhost:3000/api/ordenes")).json();  
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    let orders = [];
    try {
      orden = await loadOrders();
    } catch (e) {
      console.log("Error");
      console.log(e);
    }
  
          const elementOrder = stringToHTML(`
      <li data-id="${orden._id}"
          class="list-group-item ordenes-section">
          <div class="d-flex justify-content-between align-items-center">
    <h5>Mesa ${orden.usuario_id}</h5>
    <small>${platilloInfo}</small>
    </div>
          </li>`);
          
  
  const stringToHTML = (str) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(str, "text/html");
      return doc.body.firstChild;
    };
  });
  
  
  
  