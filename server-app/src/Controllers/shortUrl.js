import { urlModel } from "../model/urlModel.js";

const createUrl = async (req, res) => {
  try {
    const { fullUrl, alias } = req.body;
    if (!fullUrl) {
      return res.status(200).json(req.body);
    }
    const urlFound = await urlModel.findOne({ fullUrl });

    if (urlFound) {
      return res.status(201).json({ ...urlFound });
    } else {
      if (alias !== "") {
        // check if shortId with alias already exists
        const aliasFound = await urlModel.findOne({ shortId: alias });
        if (aliasFound) {
          return res.status(400).json({ message: "Alias already exists" });
        }
        const newUrl = await urlModel.insertOne({ fullUrl, shortId: alias });
        return res.status(201).json({ ...newUrl });
      }
      const newUrl = await urlModel.insertOne({ fullUrl });
      return res.status(201).json({ ...newUrl });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getAllUrl = async (req, res) => {
  try {
    let allUrls = await urlModel.find({});

    allUrls = allUrls.map((url) => {
      const link = `http://localhost:5000/api/shortenUrl/${url.shortId}`;

      return { ...url._doc, apiLink: link };
    });

    res.status(200).json([...allUrls]);
  } catch (error) {
    res

      .status(500)
      .json({ message: "Internal server error", error: error.message });
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

const updateUrl = async (req, res) => {
  const { oldAlias, alias } = req.body;
  if (oldAlias !== "" && alias !== "") {
    // check if shortId with alias already exists
    const aliasFound = await urlModel.findOne({ shortId: oldAlias });
    if (!aliasFound) {
      return res
        .status(400)
        .json({ message: "Link with alias does not exist" });
    }
    aliasFound.shortId = alias;
    await aliasFound.save();
    return res.status(204).json({ ...newUrl });
  }
  return res.status(400).json({ message: "alias must have a value" });
};

export { createUrl, getAllUrl, getUrl, deleteUrl };
