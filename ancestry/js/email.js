var username = "amatus";
var hostname = "wisc.edu";
var mystring = escape(" ");
var space = unescape("-");
var linktext = username + "@" + hostname ;
document.write("<a href='" + "mail" + "to:" + username + "@" + hostname + "'>" + linktext + "</a>");