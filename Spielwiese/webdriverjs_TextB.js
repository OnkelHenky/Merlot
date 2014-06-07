/**
 * Created by Henka on 02.06.14.
 */


var webdriverjs = require("webdriverjs");
var wdjsSeleniumBundle = require("webdriverjs-selenium-bundle");

var client = webdriverjs.remote({ desiredCapabilities: { browserName: 'chrome' } });

// autostop makes sure that the selenium server is stopped after
// calling end().
client.use(wdjsSeleniumBundle({autostop: true}));

function f (lnks) {
    for(var link in links){
        links[link].getAttribute('href').then(function(text){
            console.log(text)
        });
    }
    return  lnks;
}

client
    .init()
    .url("http://www.mi.hdm-stuttgart.de/mmb")
    .getTitle(function(err, title) {
        console.log(title);
    }).
    elements('a',function(err, lnks) {
       //console.dir(lnks);
       // console.log(lnks.value.length);
        for (var x in lnks) {
            console.log(lnks[x].getAttribute('href'));
  //          console.log(lnk.getAttribute('href'));
        }
    /*   console.dir(lnks);
       console.dir(lnks.value.length);
        var x = lnks.value;
        for (var lnk in x) {
            console.log(typeof lnk);
            console.log(lnk.getAttribute('href'));
        }
        */
          return lnks
    })
    .end();
