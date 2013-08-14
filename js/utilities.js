function initialize() {
}
function CapturePlusCallback(uid, response) {
  window.pcaLocation = (response[3].FormattedValue);
  var context = $('a', '.active').attr('href')
  $('[data-trigger]', context).trigger('update');
}
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  $('[data-trigger]').trigger('showmap');
  return false;
})
