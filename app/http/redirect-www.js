const url = require('url')

const NOW_HOST = url.parse(process.env.NOW_URL||'').host
const EXPECTED_HOSTS = [
    NOW_HOST,
    'vistaentrada.com',
    'localhost',
    '127.0.0.1'
]

module.exports = function redirect(req, res, next) {
    let host = req.host || req.hostname

    // if the request doesn't come from vistaentrada.com or from the deployment URL
    if (EXPECTED_HOSTS.indexOf(host) === -1) {
        let ogUrl = req.originalUrl
        // redirect to mycompany.com keeping the pathname and querystring
        return res.redirect(`https://vistaentrada.com${ogUrl}`);
    }
    return next(); // call the next middleware (or route)
}
