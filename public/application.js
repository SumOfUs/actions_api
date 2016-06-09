

var $actions = $('.actions');

var template = _.template(
  $('script.template').html()
);


var actionHtml = $(template({name: 'omar'}));
$actions.prepend(actionHtml);
actionHtml.fadeIn();


var socket = io();

socket.on('actions', function(msg){
  console.log(JSON.parse(msg));
  console.log(msg);
});

