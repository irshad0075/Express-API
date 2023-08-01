const Brand = require('./BrandModel');
const { connect } = require('mongoose');
require('dotenv').config();

const createBrand = async (req, res) => {
    const { Name } = req.body;

    if (!Name) {
        res.status(403).json({
            message: "Missing Required Field"
        });
    } else {
        try {
            await connect(process.env.MONGO_URI);
            const checkExisting = await Brand.exists({ Name });

            if (checkExisting) {
                res.status(400).json({
                    message: "Brand Already Exists"
                });
            } else {
                await Brand.create({ Name });
                const allBrands = await Brand.find();

                res.json({
                    message: "Brand Created Successfully",
                    brands: allBrands
                });
            }
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
};

const getBrandByName = async (req, res) => {
    const { name } = req.query;

    try {
        await connect(process.env.MONGO_URI);
        const brand = await Brand.findOne({ Name: name });
        res.json({ brand });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getBrandByID = async (req, res) => {
    const { brandId } = req.params;

    try {
        await connect(process.env.MONGO_URI);
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.json({ brand });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const updateBrand = async (req, res) => {
    const { brandId } = req.params;
    const { Name } = req.body;

    try {
        await connect(process.env.MONGO_URI);
        const updatedBrand = await Brand.findByIdAndUpdate(
            brandId,
            { Name },
            { new: true }
        );
        if (!updatedBrand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.json({ brand: updatedBrand });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deleteBrand = async (req, res) => {
    const { brandId } = req.params;

    try {
        await connect(process.env.MONGO_URI);
        const deletedBrand = await Brand.findByIdAndDelete(brandId);
        if (!deletedBrand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.json({ message: "Brand deleted successfully" });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    createBrand,
    getBrandByName,
    getBrandByID,
    updateBrand,
    deleteBrand
};
