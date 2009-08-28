function fixture(element) {
  $('<div id="fixtures"/>').append(element).appendTo("body");
}

function teardownFixtures() {
  $("#fixtures").remove();
}

function createDescribeDiv(name){
  return $('<li class="describe"/>').append('<h1>' + name + '</h1>');
}

function createNestedDescribeDiv(name, body, count){
  if(count == 1) {
    return createDescribeDiv(name + " " + count).append(body);
  }
  else {
    var div = createDescribeDiv(name + " " + count);
    div.append(createNestedDescribeDiv(name, body, count-1));
    return div;
  }
}

