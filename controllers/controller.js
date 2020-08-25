var currentId = "#draggable1"
var dragging = false
function getCurrentId(event) {
    if (!dragging) {
        currentId = event.target.id
    }
}

// var pageHeight = document.getElementById("page")
// pageHeight.style.height = window.innerHeight

var url = "../assets/data/product.json";         
$.getJSON(url, function (data) {
    $.each(data, function (key, model) {
        console.log(model._id) 
        var rack = document.getElementById("rack-container")
        var productContainer = document.createElement("DIV")
        productContainer.classList.add("product-container");
        productContainer.classList.add("container-draggable"+model._id);
        var product =  document.createElement("IMG")
        product.classList.add("product")
        product.classList.add("draggable"+model._id)
        product.id = "draggable"+model._id
        product.setAttribute("draggable", true)
        product.setAttribute("onmouseover", "getCurrentId(event)")
        product.setAttribute("ontouchstart", "getCurrentId(event)")
        product.setAttribute("saltLevel", model.saltLevel)
        product.setAttribute("riskFactor", model.riskFactor)
        product.setAttribute("image", model.image)
        product.setAttribute("name", model.name)
        product.src = model.image
        productContainer.appendChild(product)
        rack.appendChild(productContainer)

    $("#" + "draggable"+model._id).draggable({
        scroll: false,
        start: function (event) {
            var stylesheet = document.styleSheets[0]
            stylesheet.insertRule(`.${"draggable"+model._id} { top:0px !important; left:0px !important;}`, 0);
        },
        stop: function (event, ui) {
            var x = event.clientX;
            var y = event.clientY;
            elementMouseIsOver = document.elementFromPoint(x, y);
            if (elementMouseIsOver.id !== "drop-target") {
                var container = document.getElementsByClassName("container-" + "draggable"+model._id);
                container[0].appendChild(document.getElementById("draggable"+model._id))
            }
            var target = document.getElementById("draggable"+model._id);
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
            target.appendChild(document.getElementById("draggable"+model._id))
            var product = document.getElementsByClassName("draggable"+model._id)
            product[0].style.transform = `translate(${event.clientX - product[0].offsetWidth / 2}px,${event.clientY - product[0].offsetHeight / 2}px)`
            dragging = true
        }
    });


    $("#drop-target").droppable({
        drop: function (event, ui) {
            var target = document.getElementById(currentId);
            var child = document.getElementById("drop-target").firstChild
            var name = document.getElementById("name") 
            var image = document.getElementById("productImage") 
            var saltLevel = document.getElementById("saltLevel") 
            var mg = document.getElementById("mg") 
            var high = document.getElementById("high")
            var medium = document.getElementById("medium")
            var low = document.getElementById("low")
            if(target.getAttribute("riskFactor")=="high"){
                high.style.opacity = 1
                medium.style.opacity = 0.3
                low.style.opacity = 0.3
            }else if(target.getAttribute("riskFactor")=="medium"){
                high.style.opacity = 0.3
                medium.style.opacity = 1
                low.style.opacity = 0.3
            }else if(target.getAttribute("riskFactor")=="low"){
                high.style.opacity = 0.3
                medium.style.opacity = 0.3
                low.style.opacity = 1
            }
            mg.style.opacity =1
            saltLevel.innerHTML =  target.getAttribute("saltLevel")
            image.src =  target.getAttribute("image")
            image.style.opacity = 1
            name.innerHTML =  target.getAttribute("name")
            event.target.removeChild(child)
            event.target.appendChild(target);
            target.style.display = "none"
            target.style.top = 0
            target.style.left = 0
            target.style.right = 0
            target.style.bottom = 0
        }
    });

})
});


// $("#" + currentId).draggable({
//     scroll: false,
//     cursor: "move",
//     start: function (event) {
//         var stylesheet = document.styleSheets[0]
//         stylesheet.insertRule(`.${currentId} { top:0px !important; left:0px !important;}`, 0);
//     },
//     stop: function (event, ui) {
//         var x = event.clientX;
//         var y = event.clientY;
//         elementMouseIsOver = document.elementFromPoint(x, y);

//         if (elementMouseIsOver.id !== "drop-target") {
//             var container = document.getElementsByClassName("container-" + currentId);
//             container[0].appendChild(document.getElementById(currentId))
//         }
//         var target = document.getElementById(currentId);
//         target.style.transform = `translate(0px,0px)`
//         target.style.top = 0
//         target.style.left = 0
//         target.style.right = 0
//         target.style.bottom = 0
//         target.style.opacity = 1
//         dragging = false
//     },
//     drag: function (event, ui) {
//         var target = document.getElementById("page");
//         target.appendChild(document.getElementById(currentId))
//         var product = document.getElementsByClassName(currentId)
//         product[0].style.transform = `translate(${event.clientX - product[0].offsetWidth / 2}px,${event.clientY - product[0].offsetHeight / 2}px)`
//         dragging = true
//     }
// });


// $("#drop-target").droppable({
//     drop: function (event, ui) {
//         var target = document.getElementById(currentId);
//         event.target.appendChild(target);
//         target.style.top = 0
//         target.style.left = 0
//         target.style.right = 0
//         target.style.bottom = 0
//     }
// });

