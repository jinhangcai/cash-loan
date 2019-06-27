export function getString(name) {
  var urlparams = location.search + '&' + (location.hash.split('?')[1]);
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = urlparams.substr(1).match(reg);
  if (r != null) return r[2];
  return '';
}
