const { conn } = require('../db/dbconnect')

module.exports = {
	renderHome:  (req, res) => {
		res.render('home')
	},
	renderClientes: (req, res) => {	
		res.render('clientes')
	},
	renderProductos: (req, res) => {
		res.render('productos')
	},
	renderContacto: (req, res) => {
		res.render('contacto')
	},
	renderQuienessomos: (req, res) => {
		res.render('quienessomos')
	},
	renderUbicacion: (req, res) => {
		res.render('ubicacion')
	},
	rendergspedidos: async (req, res) => {	try{
		const [ productos ] = await conn.query(`SELECT * FROM Productos`)
		res.render('gspedidos', {productos})
	} catch (error) {
		throw error
	} finally{
		conn.releaseConnection()
	}	
	},
	
	getListado: async (req, res) => {
		try{
			const [ registros ] = await conn.query(`SELECT * FROM Productos`)
			res.json(registros)
		} catch (error) {
			throw error
		} finally{
			conn.releaseConnection()
		}
	},

	crearRegistro: async (req, res)=>{
		const sql = `INSERT INTO Productos (nombre, precio, descripcion, stock) VALUES (?,?,?,?);`
		const creado = await conn.query(sql, [req.body.item, parseFloat(req.body.precio), req.body.descripcion, req.body.stock])
		const [ productos ] = await conn.query(`SELECT * FROM Productos`)
		res.render('gspedidos', {productos})
		
	},

	getModificar: async (req, res) =>{

	},

	actualizar: async (req, res)=>{
		res.send(`<h2>Se hizo algo con ${req.body.actualizar} en el update</h2><a href="/dinamic/1">Regresar a la página anterior</a>`)
	},

	eliminar: async (req, res)=>{
		const eliminado = await conn.query(`DELETE FROM Productos WHERE id=?`, req.body.idEliminar)
		res.redirect('/html/listado.html')
		//res.send(`<h2>Se hizo algo con ${req.body.eliminar} en el delete</h2><a href="/dinamic/1">Regresar a la página anterior</a>`)
	},

}