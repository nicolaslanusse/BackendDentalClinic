const { Usuarios } = require("../models");

const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { hash, compareHash } = require("../_util/hash");
const { generateToken } = require("../_util/token");

const authController = {};

// REGISTRAR USUARIO
authController.register = async (req, res) => {
  const { nombre, email, password, apellidos } = req.body;

  if (password.length < 8) {
    return sendErrorResponse(
      res,
      400,
      "Password must be larger than 8 characters"
    );
  }

  const encryptedPassword = hash(password);

  const newUser = {
    nombre,
    apellidos,
    email,
    password: encryptedPassword,
    id_rol: 1,
  };

  try {
    await Usuarios.create(newUser);
    sendSuccsessResponse(res, 201, "User registered succsessfully");
  } catch (error) {
    sendErrorResponse(res, 500, "Error creating user", error);
  }
};

// LOGIN USUARIO
authController.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendErrorResponse(res, 400, "email and password requiered");
  }

  try {
    const user = await Usuarios.findOne({ email: email });

    if (!user) {
      return sendErrorResponse(res, 404, "User's email not exist");
    }
    const isValidPassword = compareHash(password, user.password);

    if (!isValidPassword) {
      return sendErrorResponse(res, 401, "Bad credentials");
    }

    const token = generateToken({ user_id: user.id, user_role: user.id_rol });
    let role;
    if (user.id_rol == 1) {
      role = "user";
    } else if (user.id_rol == 2) {
      role = "admin";
    }

    sendSuccsessResponse(res, 200, {
      message: "User logged succesfully",
      token: token,
      role: role,
    });
  } catch (error) {
    sendErrorResponse(res, 500, "User login failed", error);
  }
};
module.exports = authController;