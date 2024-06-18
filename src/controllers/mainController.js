const { conn } = require("../db/dbconnect");
const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = 10;
const secretHash = process.env.SECRETHASH;

module.exports = {
  renderHome: (req, res) => {
    const user = req.session.user;
    console.log(user);
    res.render("home", { user });
  },
  renderClientes: (req, res) => {
    const user = req.session.user;
    res.render("clientes", { user });
  },
  renderProductos: (req, res) => {
    const user = req.session.user;
    res.render("productos", { user });
  },
  renderContacto: (req, res) => {
    const user = req.session.user;
    res.render("contacto", { user });
  },
  renderQuienessomos: (req, res) => {
    const user = req.session.user;
    res.render("quienessomos", { user });
  },
  renderUbicacion: (req, res) => {
    const user = req.session.user;
    res.render("ubicacion", { user });
  },
  renderLogin: (req, res) => {
    const user = req.session.user;
    res.render("login", { user });
  },
  //login
  login: async (req, res) => {
    try {
      const { nombre, password } = req.body;
      const [user] = await conn.query(
        `SELECT * FROM Vendedores WHERE nombre = ?`,
        [nombre]
      );
      console.log(user);
      if (user.length === 0) {
        return res.status(401).send("Nombre o contraseña incorrectos.");
      }
      const validPassword = await bcrypt.compare(
        secretHash + password,
        user[0].password
      );
      console.log(validPassword);
      if (!validPassword) {
        return res.status(401).send("Nombre o contraseña incorrectos.");
      }
      console.log(user)
      req.session.user = {
        id: user[0].id,
        nombre: user[0].nombre,
        rol_id: user[0].rol_id,
      };
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al iniciar sesión.");
    }
  },
  logout: (req, res) => {
    res.clearCookie("connect.sid");
   
    req.session.destroy((err) => {
      if (err) {
        console.error("Error al cerrar sesión:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.redirect("/login");
      }
    });
  },
  // crud y render vendedores
  renderAdminUser: async (req, res) => {
    const user = req.session.user;
    try {
      const [users] = await conn.query(`
        SELECT v.id, v.nombre, v.rol_id, r.rol 
        FROM Vendedores v 
        INNER JOIN rol r ON v.rol_id = r.id
      `);
      const [roles] = await conn.query(`SELECT * FROM rol`);
      res.render("adminUser", { users, rol: roles , user});
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al renderizar usuarios");
    }
  },
  crearUsuario: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(
        secretHash + req.body.password,
        saltRounds
      );
      const [nombre, password, rol] = [
        req.body.nombre,
        hashedPassword,
        req.body.rol,
      ];
      const sql = `INSERT INTO Vendedores (nombre, password, rol_id) VALUES (?,?,?);`;
      await conn.query(sql, [nombre, password, rol]);
      res.redirect("/adminUser");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al crear usuario");
    }
  },
  actualizarUsuario: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(
        secretHash + req.body.password,
        saltRounds
      );
      const sql = `UPDATE Vendedores SET nombre = ?, password = ?, rol_id = ? WHERE id = ?;`;
      await conn.query(sql, [
        req.body.nombre,
        hashedPassword,
        req.body.rol,
        req.params.id,
      ]);
      res.redirect("/adminUser");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al actualizar usuario");
    }
  },
  eliminarUsuario: async (req, res) => {
    try {
      const sql = `DELETE FROM Vendedores WHERE id = ?;`;
      await conn.query(sql, [req.params.id]);
      res.redirect("/adminUser");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al eliminar usuario");
    }
  },

  // crud y render productos
  renderAdminProducto: async (req, res) => {
    const user = req.session.user;
    try {
      const [products] = await conn.query(`SELECT * FROM Productos`);
      res.render("adminProduct", { products, user });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al renderizar productos");
    } finally {
      conn.releaseConnection();
    }
  },
  crearProducto: async (req, res) => {
    try {
      const sql = `INSERT INTO Productos (nombre, precio, descripcion, stock) VALUES (?,?,?,?);`;
      await conn.query(sql, [
        req.body.nombre,
        parseFloat(req.body.precio),
        req.body.descripcion,
        req.body.stock,
      ]);
      res.redirect("/adminProduct");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al crear producto");
    }
  },
  actualizarProducto: async (req, res) => {
    try {
      const sql = `UPDATE Productos SET nombre = ?, precio = ?, descripcion = ?, stock = ? WHERE id = ?;`;
      await conn.query(sql, [
        req.body.nombre,
        parseFloat(req.body.precio),
        req.body.descripcion,
        req.body.stock,
        req.params.id,
      ]);
      res.redirect("/adminProduct");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al actualizar producto");
    }
  },
  eliminarProducto: async (req, res) => {
    try {
      await conn.query("DELETE FROM Productos WHERE id = ?", [req.params.id]);
      res.redirect("/adminProduct");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al eliminar producto");
    }
  },

  // crud y render clientes
  renderAdminCliente: async (req, res) => {
    const user = req.session.user;
    try {
      const [clients] = await conn.query(`SELECT * FROM Clientes`);
      res.render("adminClient", { clients, user });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al renderizar clientes");
    } finally {
      conn.releaseConnection();
    }
  },
  crearCliente: async (req, res) => {
    try {
      const sql = `INSERT INTO Clientes (nombre, direccion, telefono) VALUES (?,?,?);`;
      await conn.query(sql, [
        req.body.nombre,
        req.body.direccion,
        req.body.telefono,
      ]);
      res.redirect("/adminClient");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al crear cliente");
    }
  },
  actualizarCliente: async (req, res) => {
    try {
      const sql = `UPDATE Clientes SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?;`;
      await conn.query(sql, [
        req.body.nombre,
        req.body.direccion,
        req.body.telefono,
        req.params.id,
      ]);
      res.redirect("/adminClient");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al actualizar cliente");
    }
  },
  eliminarCliente: async (req, res) => {
    try {
      await conn.query(`DELETE FROM Clientes WHERE id=?`, [req.params.id]);
      res.redirect("/adminClient");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al eliminar cliente");
    }
  },
};
