require("dotenv").config();
const jwt =require("jsonwebtoken") 

const refreshTokens = []

function addToken(token){
    this.refreshTokens.push(token)
}

function containsToken(token) {
    return this.refreshTokens.includes(token);
}


function accessToken(user){
 return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
}

function getRefreshToken(user){
    return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2h' });
}

function getUserByToken(token) {
    let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!user) {
        return res.status(403).send("Token is not valid!");
    }
    return user;
}

function getUserByRefreshToken(token) {
    let user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    if (!user) return res.status(403).send("Token is not valid!");
    return user;
}


function authenticateToken(req, res, next) {
    let authHeader = req.headers['authorization'];
    if (authHeader) {
        let token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).send("Token is not valid!");
            req.user = user;
            next();
        })
    } else return res.status(401).send("You are not authenticated!");1
}


module.exports= {
    refreshTokens,
    accessToken,
    getRefreshToken,
    getUserByToken,
    getUserByRefreshToken,
    authenticateToken,
    addToken,
    containsToken
}