const { conn } = require("../db/dbconnect");

require("dotenv").config();
const saltRounds = 10;
const secretHash = process.env.SECRETHASH;

module.exports = {
  renderHome: (req, res) => {
    const user = req.session.user;
    
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
     
      if (user.length === 0) {
        return res.status(401).send("Nombre o contraseña incorrectos.");
      }
      const validPassword = (req.body.password === user[0].password)
       
    
   
      if (!validPassword) {
        return res.status(401).send("Nombre o contraseña incorrectos.");
      }
     
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
      
      const [nombre, password, rol] = [
        req.body.nombre,
        req.body.password,
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
      
      const sql = `UPDATE Vendedores SET nombre = ?, password = ?, rol_id = ? WHERE id = ?;`;
      await conn.query(sql, [
        req.body.nombre,
        req.body.password,
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
  // crud y render ventas
  renderNewOrder: async (req, res) => {
    try {
      const [clients] = await conn.query(`SELECT id, nombre FROM Clientes`);
      const [products] = await conn.query(`SELECT id, nombre, precio, stock FROM Productos`);
      const user = req.session.user; // Obtener el ID del vendedor desde la sesión
      res.render("newOrder", { clients, products, user });
    } catch (error) {
      console.error("Error al obtener datos:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  createOrder: async (req, res) => {
    const { cliente_id, productos, vendedor_id } = req.body;
    console.log(req.body)
    let total = 0;

    try {
      // Crear el pedido
      const [result] = await conn.query(`INSERT INTO Pedidos (cliente_id, vendedor_id, total) VALUES (?, ?, ?)`, [cliente_id, vendedor_id, total]);
      const pedido_id = result.insertId;

      // Crear detalles del pedido
      for (const producto of JSON.parse(productos)) {
        const { producto_id, cantidad, precio_unitario } = producto;
        const subtotal = cantidad * precio_unitario;
        total += subtotal;
        await conn.query(`INSERT INTO DetallePedidos (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)`, [pedido_id, producto_id, cantidad, precio_unitario, subtotal]);
      }

      // Actualizar el total del pedido
      await conn.query(`UPDATE Pedidos SET total = ? WHERE id = ?`, [total, pedido_id]);

      res.redirect("/orders");
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
};
