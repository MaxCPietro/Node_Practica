console.log("Estoy funcionando");

document.querySelector('body').onload = async () => {
	const res = await fetch(`http://localhost:3000/listado`)
	const datos = await res.json()
	let listaHTML = document.querySelector(`#listado`)
	listaHTML.innerHTML = ''
	datos.forEach(registro => {
		listaHTML.innerHTML += `
		<form method="POST" action="/listado?_metodo=DELETE" style="display:flex">
			<h4>${registro.nombre}</h4>
			<h4>${registro.precio}</h4>
			<h4>${registro.descripcion}</h4>
			<h4>${registro.stock}</h4>
			<input type="hidden" name="idEliminar" value="${registro.id}">
			<h4><button><a href="/modificar/${registro.id}">Modificar</a></h4>
			<h4><input type="submit" value="Eliminar"></h4>
		</form>`
	})
}