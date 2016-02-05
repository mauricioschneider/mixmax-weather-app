[![Code Climate](https://codeclimate.com/github/lemavri/mixmax-weather-app/badges/gpa.svg)](https://codeclimate.com/github/lemavri/mixmax-weather-app)  

# Mixmax Weather Enhancement
Embed weather forecast into emails sent with Mixmax

## How does it look

### Single day
![](https://raw.githubusercontent.com/lemavri/mixmax-weather-app/master/docs/single.png)

### Multiple days
![](https://raw.githubusercontent.com/lemavri/mixmax-weather-app/master/docs/multiple.png)

### Inserted into email
![](https://raw.githubusercontent.com/lemavri/mixmax-weather-app/master/docs/inserted.png)


## Usage
### Add enhancement
Go to [Mixmax Integrations dashboard](https://app.mixmax.com/dashboard/integrations) and add an enhancement with the following information:
![](https://raw.githubusercontent.com/lemavri/mixmax-weather-app/master/docs/config.png)

### Setup your environment
#### Install dependencies
Run `npm install` and `bower install`


#### Run the server
- nodemon: `npm start`
- custom port: `PORT=80 npm start` or `PORT=80 node index.js`

#### Run insecure chrome for dev

Run Google Chrome from the terminal: `open -a Google\ Chrome --args --allow-running-insecure-content --ignore-certificate-errors`

Enjoy!
