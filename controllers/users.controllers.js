const { AppError } = require("../middlewares/errorHandler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const userSchema = require("../model/userSchema");

const getAll = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
const getOne = async (req, res, next) => {
  try {
    const requestedUserId = req.params.id;
    const userToBeFound = await prisma.user.findUnique({
      where: {
        user_id: parseInt(requestedUserId),
      },
    });

    if (!userToBeFound)
      throw new AppError("Not Found", 404, "User not found", true);

    return res.status(200).json(userToBeFound);
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) throw new AppError("Bad Request", 400, error.message, true);
    const isDuplicate = await prisma.user.findUnique({
      where: {
        user_id: parseInt(req.body.user_id),
      },
    });

    if (isDuplicate)
      throw new AppError("Conflict", 409, "Credentials already taken", true);

    await prisma.user.create({ data: req.body });

    return res.status(201).json(req.body);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const requestedUserId = req.params.id;
    const { error } = userSchema.validate(req.body);
    if (error) throw new AppError("Bad Request", 404, error.message, true);

    const userToBeUpdated = await prisma.user.findUnique({
      where: {
        user_id: parseInt(requestedUserId),
      },
    });

    if (!userToBeUpdated)
      throw new AppError("Not Found", 404, "User does not exist", true);

    await prisma.user.update({
      where: {
        user_id: parseInt(requestedUserId),
      },
      data: req.body,
    });

    return res.status(201).json(req.body);
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res, next) => {
  try {
    const requestedUserId = req.params.id;
    const userToBeDeleted = await prisma.user.findFirst({
      where: {
        user_id: parseInt(requestedUserId),
      },
    });

    if (!userToBeDeleted)
      throw new AppError("Not Found", 404, "User does not exist", true);

    await prisma.user.delete({
      where: {
        user_id: parseInt(requestedUserId),
      },
    });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
