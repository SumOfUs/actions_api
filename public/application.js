var $actions = $('.actions');

var template = _.template(
  $('script.template').html()
);

var socket = io();

socket.on('actions', function(msg){
  var data = JSON.parse(msg);
  console.log(data);
  var actionHtml = $(template(data));

  $actions.prepend(actionHtml);
  actionHtml.fadeIn();
});

