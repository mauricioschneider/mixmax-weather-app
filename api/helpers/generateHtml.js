'use strict'

/**
 * Not pretty, but gets the work done
 */

module.exports = function(weather, days) {

  let content = ''
  for(let i = 0; i < days; i++) {
    let forecast = weather.forecast[i]

    content += `<div class="content">
                  <table bgcolor="">
                      <tbody>
                          <tr>
                              <td class="small" width="20%" style="vertical-align: top; padding-right:10px;"><img src="${forecast.thumbnail}">
                              </td>
                              <td>
                                  <h4> ${forecast.date} <small>${forecast.high}º ${weather.units.temp} / ${forecast.low}º ${weather.units.temp}</small></h4>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                </div>`
  }

  return `
  <link rel="stylesheet" type="text/css" href="http://localhost:1337/css/zurb-email.css">
  <link rel="stylesheet" type="text/css" href="http://localhost:1337/css/email.css">
   <table class="body-wrap" bgcolor="">
    <tbody>
        <tr>
            <td></td>
            <td class="container" align="" bgcolor="#FFFFFF">

                <div class="content">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h1>Weather Forecast for ${weather.city}, ${weather.region ? weather.region + ', ' : ''} ${weather.country}</h1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                ${content}
            </td>
            <td></td>
        </tr>
    </tbody>
  </table>`
}
