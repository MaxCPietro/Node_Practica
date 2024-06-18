const { conn } = require("../db/dbconnect");
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = 10
const secretHash = process.env.SECRETHASH

module.exports = {
  renderHome: (req, res) => {
    res.render("home");
  },
  renderClientes: (req, res) => {
    res.render("clientes");
  },
  renderProductos: (req, res) => {
    res.render("productos");
  },
  renderContacto: (req, res) => {
    res.render("contacto");
  },
  renderQuienessomos: (req, res) => {
    res.render("quienessomos");
  },
  renderUbicacion: (req, res) => {
    res.render("ubicacion");
  },
  renderLogin: (req, res) => {
    res.render("login");
  },
  // crud y render vendedores
  renderAdminUser: async (req, res) => {
    const [users] = await conn.query(`
			   SELECT v.id, v.nombre, v.rol_id, r.rol 
			   FROM Vendedores v 
			   INNER JOIN rol r ON v.rol_id = r.id
			  `);
	const [roles]	= await conn.query(`select * From rol`)	  
	console.log(users)
	console.log(roles)
    res.render("adminUser", { users, rol: roles});
  },
  crearUsuario: async (req, res) => {
	const hashedPassword = await bcrypt.hash(secretHash + req.body.password, saltRounds);
    [nombre, password, rol] = [
      req.body.nombre,
      hashedPassword,
      req.body.rol,
    ];
    const sql = `INSERT INTO Vendedores (nombre,  password, rol_id) VALUES (?,?,?);`;
	const creado = await conn.query(sql, [
		nombre,
		password,
		rol,
	  ]);
	res.redirect("/adminUser");
  },
  actualizarUsuario: async (req, res) => {	
	const hashedPassword = await bcrypt.hash(secretHash + req.body.password, saltRounds);
	const sql = `UPDATE Vendedores SET nombre = ?, password = ?, rol_id = ? WHERE id = ?;`;
	const actualizado = await conn.query(sql, [
		req.body.nombre,
		hashedPassword,
		req.body.rol,
		req.params.id,
	  ]);
	res.redirect("/adminUser");
  },
  eliminarUsuario: async (req, res) => {
	const sql = `DELETE FROM Vendedores WHERE id = ?;`
	const borrado = await conn.query(sql, [req.params.id]);
	res.redirect("/adminUser");
  },

  // crud y render productos
  renderAdminProducto: async (req, res) => {
    try {
      const [products] = await conn.query(`SELECT * FROM Productos`);
      console.log(products)
      res.render("adminProduct", { products });
    } catch (error) {
      throw error;
    } finally {
      conn.releaseConnection();
    }
  },
  
  
  crearProducto: async (req, res) => {
    const sql = `INSERT INTO Productos (nombre, precio, descripcion, stock) VALUES (?,?,?,?);`;
    const creado = await conn.query(sql, [
      req.body.nombre,
      parseFloat(req.body.precio),
      req.body.descripcion,
      req.body.stock,
    ]);
    res.redirect("/adminProduct");
  },

  

  actualizarProducto: async (req, res) => {
    const sql = `UPDATE Productos SET nombre = ?, precio = ?, descripcion = ?, stock = ? WHERE id = ?;`
    const actualizado = await conn.query(sql, [ 
      req.body.nombre,
       parseFloat(req.body.precio),
       req.body.descripcion,
       req.body.stock,
       req.params.id,
    ]);
    res.redirect("/adminProduct");
  },

  eliminarProducto: async (req, res) => {
    try {
      await conn.query('DELETE FROM Productos WHERE id = ?', [req.params.id]);
      res.redirect('/adminProduct');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al eliminar el producto');
    }
  },
  // crud y render clientes
  renderAdminCliente: async (req, res) => {
    try {
      const [clients] = await conn.query(`SELECT * FROM Clientes`);
      res.render("adminClient", { clients });
    } catch (error) {
      throw error;
    } finally {
      conn.releaseConnection();
    }
  },
  crearCliente: async (req, res) => {
    const sql = `INSERT INTO Clientes (nombre, direccion, telefono) VALUES (?,?,?); `;
    const creado = await conn.query(sql, [
      req.body.nombre,
      req.body.direccion,
      req.body.telefono,
    ]);
    res.redirect("/adminClient");
  },
  actualizarCliente: async (req, res) => {  
    const sql = `UPDATE Clientes SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?;`
    const actualizado = await conn.query(sql, [
      req.body.nombre,
      req.body.direccion,
      req.body.telefono,
      req.params.id,
    ]);
    res.redirect("/adminClient");
  },
  eliminarCliente: async (req, res) => {
    const eliminado = await conn.query(
      `DELETE FROM Clientes WHERE id=?`,
      req.params.id
    );
    res.redirect("adminClient");
  },
};

