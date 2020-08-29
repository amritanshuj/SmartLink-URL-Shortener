//import Url model
const Url = require('../models/url.model.js');

//This is basically our domain name
const baseUrl = process.env.BASE_URL;

const createShortLink = async (req, res) => {
    //get the originalUrl and unique_name from the request's body 
    let { originalUrl, unique_name } = req.body;  

    try {
        //check if unique_name alredy exists
        let nameExists = await Url.findOne({ unique_name });
        /** if unique_name already exists, send a response with an
        error message, else save the new unique_name and originalUrl */
        if(nameExists){
            return res.status(403).json({
                error: "Unique name already exists, please choose another",
                ok : false
            }) 
        }
        else {
            const shortUrl = baseUrl + '/' + unique_name;
            console.log('*******: ',shortUrl);
            url = new Url({
                originalUrl,
                shortUrl,
                unique_name
            });
            //save
            const saved = await url.save();
            //return success message shortUrl
            return res.json({
                message : 'success',
                ok : true,
                shortUrl: shortUrl
            });
        }
    } catch (error) {
        ///catch any error, and return server error
        return res.status(500).json({ok : false, error : 'Server error'});
    }
};

const openShortLink = async (req, res) => {
    //get the unique name from the req params 
    const { unique_name } = req.params;

    try{
      //find the Url model that has that unique_name
      let url = await Url.findOne({ unique_name });

       /** if such Url exists, redirect the user to the originalUrl 
       of that Url Model, else send a 404 Not Found Response */
        if(url){
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({error : 'Not found'});
        }  
    } catch(err) {
       //catch any error, and return server error to user
        console.log(err);
        res.status(500).json({error : 'Server error'});
    } 
};

module.exports = {
    createShortLink, openShortLink
}