const express = require("express");
const router = express.Router();

const {
  createArtist,
  getArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
} = require("../controllers/artistsControllers");

router.route("/")
  .post(createArtist)
  .get(getArtists);

router.route("/:id")
  .get(getArtistById)
  .put(updateArtist)
  .delete(deleteArtist);

module.exports = router;