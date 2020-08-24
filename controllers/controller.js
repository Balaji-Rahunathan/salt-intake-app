var currentId = "#draggable1"
var dragging = false
function getCurrentId(event) {
    if (!dragging) {
        currentId = event.target.id
    }

    $("#" + currentId).draggable({
        scroll: false,
        cursor: "move",
        start: function (event) {
            var stylesheet = document.styleSheets[0]
            stylesheet.insertRule(`.${currentId} { top:0px !important; left:0px !important;}`, 0);
        },
        stop: function (event, ui) {
            var x = event.clientX;
            var y = event.clientY;
            elementMouseIsOver = document.elementFromPoint(x, y);
            
            if (elementMouseIsOver.id !== "drop-target") {
                var container = document.getElementsByClassName("container-" + currentId);
                container[0].appendChild(document.getElementById(currentId))
            }
            var target = document.getElementById(currentId);
            target.style.transform = `translate(0px,0px)`
            target.style.top = 0
            target.style.left = 0
            target.style.right = 0
            target.style.bottom = 0
            target.style.opacity = 1
            dragging = false
        },
        drag: function (event, ui) {
            var target = document.getElementById("page");
            target.appendChild(document.getElementById(currentId))
            var product = document.getElementsByClassName(currentId)
            product[0].style.transform = `translate(${event.clientX - product[0].offsetWidth / 2}px,${event.clientY - product[0].offsetHeight / 2}px)`
            dragging = true
        }
    });


    $("#drop-target").droppable({
        drop: function (event, ui) {
            var target = document.getElementById(currentId);
            event.target.appendChild(target);
            target.style.top = 0
            target.style.left = 0
            target.style.right = 0
            target.style.bottom = 0
        }
    });
}
