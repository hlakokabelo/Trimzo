import { urlModel } from "../models/urlModel.js";
import { userModel } from "../models/userModel.js";

/* CREATE SHORT URL - public route */
const createUrl = async (req, res) => {
  try {
    const { fullUrl, alias } = req.body;

    if (!fullUrl) {
      return res.status(400).json({ message: "fullUrl is required" });
    }

    // check if alias already exists
    if (alias) {
      const aliasFound = await urlModel.findOne({ shortId: alias });

      if (aliasFound) {
        return res.status(400).json({ message: "Alias already exists" });
      }
    }

    // if user not logged in and fullUrl already has shortened version, return that version
    if (!req.user) {
      const urlFound = await urlModel.findOne({ fullUrl });

      if (urlFound) {
        return res.status(200).json({ ...urlFound });
      }
    }

    const newUrl = await urlModel.create({
      fullUrl,
      shortId: alias || undefined,
      user: req.user?._id || null, // attach user if logged in
    });

    const link = `http://localhost:5000/api/shortenUrl/${newUrl.shortId}`;
    const token = req?.token||"none";

    res.status(201).json({
      ...newUrl._doc,
      apiLink: link,
      token
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

/* GET LOGGED-IN USER URLS */
const getMyUrls = async (req, res) => {
  try {
    const urls = await urlModel
      .find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await urlModel.findOne({ shortId: id });
    if (!url) {
      return res.status(404).json({ data: {}, error: "URL not found" });
    }
    url.clicks += 1;
    await url.save();
    res.status(200).json({ ...url._doc });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await urlModel.findOne({ _id: id });

    if (!exists) {
      return res.status(404).json({ error: "URL not found" });
    }
    const deletedUrl = await urlModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: "URL deleted successfully", data: deletedUrl });
  } catch (error) {
    const { message, name } = error;

    if (name === "CastError") {
      return res.status(400).json({
        message: "Invalid URL ID :" + error.value,
      });
    }
    res.status(500).json({
      message: "Internal server error",
      error: message,
      name: name,
    });
  }
};
const updateUrlAlias = async (req, res) => {
  try {
    const { oldAlias, newAlias } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!oldAlias || !newAlias) {
      return res.status(400).json({
        message: "Both oldAlias and newAlias are required",
      });
    }

    // find the url belonging to this user
    const url = await urlModel.findOne({
      shortId: oldAlias,
      user: req.user._id,
    });

    if (!url) {
      return res.status(404).json({
        message: "URL not found or does not belong to user",
      });
    }

    // check if new alias already exists
    const aliasExists = await urlModel.findOne({ shortId: newAlias });

    if (aliasExists) {
      return res.status(409).json({
        message: "Alias already in use",
      });
    }

    url.shortId = newAlias;

    await url.save();

    res.status(200).json({
      message: "Alias updated successfully",
      url,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { createUrl, getMyUrls, updateUrlAlias, getUrl, deleteUrl };
