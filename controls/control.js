var oXHR = window.XMLHttpRequest
  ? new XMLHttpRequest()
  : new ActiveXObject("Microsoft.XMLHTTP");
function reportStatus() {
  if (oXHR.readyState == 4) showTheList(this.responseText);
}
oXHR.onreadystatechange = reportStatus;
oXHR.open("GET", "data/product.json", true);
oXHR.send();
function showTheList(json) {
  var arrItems = [];
  arrItems = JSON.parse(json);
  var li = document.getElementById("product_list");
  li.innerHTML = "";
  for (i = 0; i <= arrItems.length - 1; i++) {
    var img = document.createElement("img");

    img.src = arrItems[i].Image;
    img.setAttribute("draggable", true);

    img.className = "ui-draggable ui-draggable-handle draggable drag";
    var divRight = document.createElement("li");
    divRight.appendChild(img);
    li.appendChild(divRight);
  }
  var numberOfResults = $("li").length;
  var numberPerRow = 4;
  var $firstUL = $(" .box_container ul");
  var numberOfRows = Math.ceil(numberOfResults / numberPerRow);

  var maxWidth = Math.max.apply(
    null,
    $("li")
      .map(function () {
        return $(this).outerWidth(true);
      })
      .get()
  );

  $(".draggable").draggable({
    stop: function (event, ui) {
      var target = document.querySelector(".draggable");
      target.style.top = 0;
      target.style.left = 0;
      target.style.right = 0;
      target.style.bottom = 0;
      target.style.opacity = 1;
    },
  });

  $(".drag").draggable({
    drag: function (event, ui) {
      var target = document.querySelector(".draggable");
      target.style.opacity = 0.5;
    },
  });
  $(".droppable").droppable({
    drop: function (ui, event) {
      var target = document.querySelector(".draggable");
      event.target.appendChild(document.getElementById(".draggable"));
      target.style.opacity = 0.5;
      target.style.top = 0;
      target.style.left = 0;
      target.style.right = 0;
      target.style.bottom = 0;
    },
  });

  $(".box_container").css({ width: maxWidth * numberOfRows + "px" });

  for (var i = 1; i <= numberOfRows; i++) {
    $(".box_container").append("<ul></ul>");
  }
  for (var i = 1; i <= numberOfRows; i++) {
    $firstUL.find("li:lt(" + numberPerRow + ")").appendTo("ul:eq(" + i + ")");
  }

  $("li").each(function () {
    $(this).css({ width: maxWidth + "px" });
  });
}
