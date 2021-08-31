const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
//setting assets location
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

//Traditional way to consume promises
// app.get('/beers', (req, res) => {
//   //Promises
//   //Promises are JavaScript objects that might have or not a value in the near future
//   punkAPI
//   .getBeers()
//   .then(beers => {
//     console.log(beers);
//     res.render('beers', {beers});
//   })
//    .catch(error => {
//       console.log(error);
//     });
// })

//Modern way to consume promises
app.get('/beers', async (req, res) => {
  const beers = await punkAPI.getBeers();
  res.render('beers', {beers})
})

app.get('/random-beer', async (req, res) => {
  const random = await punkAPI.getRandom();
  const randomBeer = random[0];
  console.log(randomBeer);
  res.render('random-beer', randomBeer);
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
