// Description
//   A Hubot script that returns "偉人の名言100" from atsume.goo.ne.jp
//
// Configuration:
//   None
//
// Commands:
//   hubot atsumeigen - retusn "偉人の名言100" from atsume.goo.ne.jp
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var cheerio, request;
  request = require('request-b');
  cheerio = require('cheerio');
  return robot.respond(/atsumeigen$/i, function(res) {
    var url;
    url = 'http://atsume.goo.ne.jp/HxLFhNn4N7Zb';
    return request(url).then(function(r) {
      var $, meigen, meigens;
      $ = cheerio.load(r.body);
      meigens = [];
      $('#atsumeWrapper .section').each(function() {
        var e, name, text;
        e = $(this);
        name = e.find('h2').text().trim();
        text = e.find('p').text().trim();
        return meigens.push({
          name: name,
          text: text
        });
      });
      meigen = res.random(meigens);
      return res.send("" + meigen.name + "「" + meigen.text + "」");
    });
  });
};
