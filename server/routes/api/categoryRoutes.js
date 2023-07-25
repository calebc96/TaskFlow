const router = require("express").Router();

const {
  getCategory,
  deleteCategory,
  createCategory,
} = require("../../controllers/categoryController");

router.route("/").get(getCategory).post(createCategory);

router.route("/:categoryId").delete(deleteCategory);

module.exports = router;
