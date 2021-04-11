//kas naudojama
const express = require('express');
const cors = require('cors');

//Authentication naudojamos dalys
const jwt = require('jsonwebtoken');
//Authentication naudojamos dalys

//aplinkos kintamieji DMV faile
require('dotenv').config();

//express serveris
const app = express();
const port = process.env.PORT || 4000;

//galima parsinti json
app.use(cors());
app.use(express.json());



//suveikia, kai pasileidzia serveris
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//Authentication naudojamos dalys
const posts = [
  {
    username: 'Kyle',
    title: 'Post 1'
  },
  {
    username: 'Pete',
    title: 'Post 2'
  }
]

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})

//cia masyve tokenus laikyti nesaugu, nes paleidus serveri is naujo viskas prasivalys. reiketu saugoti duobazeje
let refreshTokens = [];

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken: accessToken})
    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshToken.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/login', (req, res) => {
  //Authenticate user
  const username = req.body.username
  const user = {name: username}

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user.process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({accessToken: accessToken, refreshToken: refreshToken})
})

function generateAccessToken(user ) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}
