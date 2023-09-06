const router = require("express").Router();

const {
  getCategory,
  deleteCategory,
  createCategory,
  getSingleCategory,
} = require("../../controllers/categoryController");

router.route("/").get(getCategory).post(createCategory);

router.route("/:categoryId").delete(deleteCategory).get(getSingleCategory);

module.exports = router;
