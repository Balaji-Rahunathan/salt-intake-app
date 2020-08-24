var currentId = "#draggable1"
var dragging = false
function getCurrentId(event) {
    if (!dragging) {
        currentId = event.target.id
    }

    $("#" + currentId).draggable({ 
         scroll: false ,
        start: function (event) {
            var stylesheet = document.styleSheets[0]
            stylesheet.insertRule(`.${currentId} { top:0px !important; left:0px !important;}`, 0);
            // disableScroll();
        },
        stop: function (event, ui) {
            var target = document.getElementById(currentId);
            target.style.top = 0
            target.style.left = 0
            target.style.right = 0
            target.style.bottom = 0
            target.style.opacity = 1
            target.style.transform = `translate(0px,0px)`
            var container = document.getElementsByClassName("a" + currentId);
            container[0].appendChild(document.getElementById(currentId))
            dragging = false
        },
        drag: function (event, ui) {
            // event.preventDefault()
            console.log(event)
            var target = document.getElementById("page");
            target.appendChild(document.getElementById(currentId))
            var product = document.getElementsByClassName(currentId)
            console.log(product[0].style.height)
            product[0].style.transform = `translate(${event.clientX - 50}px,${event.clientY - 50}px)`
            dragging = true
        }
    });


    $("#drop-target").droppable({
        drop: function (event, ui) {
            var target = document.getElementById("draggable");
            event.target.appendChild(document.getElementById("draggable"));
            target.style.top = 0
            target.style.left = 0
            target.style.right = 0
            target.style.bottom = 0
            target.style.opacity = 1
        }
    });
}
