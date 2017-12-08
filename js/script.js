var canvas = document.getElementById('viewpoint'),
  ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 210;

function getQuote() {
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/?",
    dataType: "jsonp",
    data: "method=getQuote&format=jsonp&lang=ru&jsonp=?",
    success: function(response) {
      make_base(response.quoteText, response.quoteAuthor);
    }
  });
}

function make_base(text, author) {
  var base_image = new Image();
  base_image.src = 'https://picsum.photos/1920/720/?random&blur=true';
  base_image.onload = function() {
    ctx.drawImage(base_image, 0, 0);
    insertTextIntoCanvas(text);
    ctx.fillText(author, 1100, 600);
  }
}

function insertTextIntoCanvas(text) {
  var marginLeft = 50;
  var marginTop = 300;
  ctx.font = "20pt Roboto";
  ctx.fillStyle = "white";
  ctx.shadowColor = "#000000";
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 3;

  wrapText(ctx, text, marginLeft, marginTop, 900, 30);
}

function wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight) {
  var words = text;
  var line = "";
  var countWords = words.length;

  for (var n = 0; n < countWords; n++) {
    var testLine = line + words[n];
    var testWidth = context.measureText(testLine).width;
    if (testWidth > maxWidth) {
      context.fillText(line, marginLeft, marginTop);
      line = words[n];
      marginTop += lineHeight;

    } else {
      line = testLine;
    }
  }
  context.fillText(line, marginLeft, marginTop);
}
