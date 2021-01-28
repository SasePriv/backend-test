const mongoose = require('mongoose');
const PagesNames = require('../models/pagesName')
const Axios = require('axios')

exports.createPageName = async (req, res) => {

    let name = req.body.name;

    name = name.toLowerCase();

    console.log(req.body)

    const sameName = await PagesNames.find({namePage: name})

    console.log(sameName)

    if (sameName.length != 0) {
        return res.status(200).json({status: '200', message: 'Name already created'})
    }

    const newPage = new PagesNames({namePage: name});

    const result = await newPage.save();

    if(!result){
        return res.status(400).json({status: '400',message: "Unable to create a page"})
    }

    return res.status(200).json({
        status: '200',
        message: 'Page Created',
        data: result
    })
    
}

exports.getName = async (req, res) => {

    let name = req.body.name;

    name = name.toLowerCase();

    console.log(req.body);

    const findName = await PagesNames.findOne({namePage: name})

    console.log(findName)

    if(!findName){
        return res.status(200).json({status: '200', message: 'Name not found'})
    }

    return res.status(200).json({status: '200', data: findName});
}

exports.getAllNamesClicked = async (req, res) => {

    try {
        const findNames = await PagesNames.find({clicked: true});
        res.status(200).json({status: '200', data: findNames});   
    } catch (error) {
        console.log(error)
        res.status(400).json({status: '400', message: "Problem with the server"})
    }

}

exports.changeStatus = async (req, res) => {

    let name = req.body.name;
    name = name.toLowerCase();

    console.log(name)

    const filter = {namePage: name}
    const update = {clicked: true}

    const doc = await PagesNames.findOneAndUpdate(filter, update, {
        new: true
    })

    if(doc.clicked){
        res.status(200).json({status: '200', message: "Status changed"})
    }else{
        res.status(400).json({status: '400', message: "Problem doing the update"})
    }
}

exports.generateDynamicLink = async (req, res) => {
    let name = req.body.name;
    name = name.toLowerCase();

    console.log(req.body)

    const data = {
        dynamicLinkInfo: {
            "domainUriPrefix": "https://test.amagpieinthesky.com",
            "link": `http://amagpieinthesky/${name}`,
            "androidInfo": {
              "androidPackageName": "com.donetest",
              "androidFallbackLink": "https://play.google.com/store/apps/details?id=com.instagram.android"
            },
            "iosInfo": {
              "iosBundleId": "com.example.ios",
              "iosFallbackLink" : "https://apps.apple.com/us/app/instagram/id389801252"
            }
        }
    }

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const resp = await Axios.post(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${"AIzaSyATK2Yg635tmmbdIBt2UrBLf847WdCx0l8"}`, data, axiosConfig)
        console.log(resp.data)
        res.status(200).json({status: '200',data: resp.data.shortLink})
    } catch (error) {
        console.log(error)
        res.status(400).json({status: '400', message: 'error with the server'})
    }

}