var pageMod = require("sdk/page-mod");
var self = require("sdk/self");


pageMod.PageMod({
  include: "https://www.pinterest.com/",
  contentScriptFile: self.data.url('pins.js')
});

pageMod.PageMod({
  include: "https://www.pinterest.com/search/*",
  contentScriptFile: self.data.url('pins.js')
});

pageMod.PageMod({
  include: "https://www.pinterest.com/pin/*",
  contentScriptFile: self.data.url('pin_detail.js')
});
