EasyH20Marker

This is a small web app that lets you upload an image and allows to add overlays to your pictures, it could be for fun or for solidarity with a cause.

You need to have nodejs and npm installed on your local development machine to be able to run the application.

You can install node from https://nodejs.org/en/ Create a folder for the project. Clone the repo Run "node app " or "npm start" in the project directory to start the program. Extending the project

Get your api keys from https://cloudinary.com and insert it in the app.js cloudinary config. 
'''cloudinary.config({ cloud_name : 'the name of the cloud you set in your cloudinary dashboard', api_key: 'apikey here', api_secret: 'api secret' });'''

Get an image you'd love to use as an overlay. Upload it to your cloudinary dashboard. Let's call it mu.png

Go to the views folder and create a file..... with jade extension. we will call this one mu.jade
'''
extends index 
block content

if (images && images.length)

images.forEach(function(image){ .row .col.s12.m2 .card .card-image

img(src=cloudinary.url(image.public_id + '.' + image.format, {overlay:"mu", opacity: 75, width: 160, height: 160, crop:'fill', effect: 'brightness:80', version: image.version }) ) });'''

This will add the image specified as the overlay(mu in this case). The opacity is set to 75, and other parameters, you can lookup the other options from the cloudinary's api docs.

Now we create the routing for the file Open the routes folder and create a file, name it mu.js 6.paste the following code in the mu.js file


exports.index = function(req, res){ res.render('mu', { title: 'Manchester United' }); };


7.To import the routing into the app, go to app.js and add this just under ,gh = require('./routes/gh'). , mu = require('./routes/mu')

This means that we have now added the route to our mu.js as a dependency

Then add this just under the first get method that retrieves data from the api. 
''' 
app.get('/mu', function(req, res, next){ cloudinary.api.resources(function(items){ res.render('mu', { images: items.resources, cloudinary: cloudinary }); }); });
'''

This is the method used to retrieve the images from cloudinary's api.

Then use ''' node app '''to start the app

upload an image and navigate to localhost:3000/mum, you will see that all the photos on that page are covered with the image we uploaded.

Things that could have made it better. 1. Retrieve a person's facebook profile picture 2. There should be a dropdown button on the page for a user to be able to select the overlay they want.
