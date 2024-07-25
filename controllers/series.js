const catch_async_err = require("../middlewares/async-err");
const de_tokenize_data = require('../middlewares/de-tokenize-data');
const User = require("../models/user");
const Series = require('../models/series');
const Art = require("../models/art");

exports.create_series = catch_async_err(async (req,res) => {
    const {token} = req.cookies
    const data = await de_tokenize_data({token : token})
    const id = data._id
    const find_user = await User.findById(id)
    const created_series = await Series.create({...req.body , owner : find_user._id})
    res.json({
        data : created_series
    })
})

exports.add_art_to_series = catch_async_err(async (req,res) => {
    const find_art = await Art.findById(req.body.art_id)
    const find_series = await Series.findById(req.body.series_id)
    find_art.series.push(find_series._id)
    find_series.art.push(find_art._id)
    await find_art.save()
    await find_series.save()
    res.json({
        message : `Added to ${find_series.title}!`
    })
})

exports.delete_art_from_series = catch_async_err(async (req,res) => {
    const find_art = await Art.findById(req.body.art_id)
    const find_series = await Series.findById(req.body.series_id)
    find_art.series.pop(find_series._id)
    find_series.art.pop(find_art._id)
    await find_art.save()
    await find_series.save()
    res.json({
        message : `Deleted from ${find_series.title}!`
    })
})

exports.get_all_series = catch_async_err(async (req,res) => {
    const series_found = await Series.find({}).populate("owner")
    return res.json({
        data : series_found
    })
})

exports.get_series_by_id = catch_async_err(async (req,res) => {
    const {id} = req.params
    const found_series = await Series.findById(id).populate("art").populate("owner")
    return res.json({
        data : found_series
    })
})