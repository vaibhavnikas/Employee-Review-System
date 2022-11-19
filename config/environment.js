// file to import environment variables 

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'xhnadnagdkabzdiw',
    db: 'employee-review-system-development'
}

const production = {
    name: 'production',
    asset_path: process.env.ers_asset_path,
    session_cookie_key: process.env.ers_session_cookie_key,
    db: process.env.ers_db,
    mongodb_url: process.env.ers_mongodb_url
}

module.exports = production;