var currentId = "#draggable1"
var dragging = false
function getCurrentId(event) {
    if (!dragging) {
        currentId = event.target.id
    }
}

var _iOSDevice = !!navigator.platform.match(/iPhone|iPod/);
var pageHeight = document.getElementById("page")

if (_iOSDevice) {
    pageHeight.style.height = "85vh"
} else {
    pageHeight.style.height = window.innerHeight
}
var input = document.getElementById("search");
var parent = document.getElementById("rack-container");
var mg = document.getElementById("mg")
var high = document.getElementById("high")
var medium = document.getElementById("medium")
var low = document.getElementById("low")
var saltLevel = document.getElementById("saltLevel")
var image = document.getElementById("productImage")
var info = document.getElementById("info-container");

var url = "../data/product.json";

onSearch()

function onSearch() {
    removeAllChildNodes(parent);
    $.getJSON(url, function (data) {
        var filteredData = data.filter(filter => {
            if (input.value === "") {
                return filter
            }
            else {
                return filter.name.toUpperCase().includes(input.value.toUpperCase())
            }
        })

        $.each(filteredData, function (key, model) {
            var rack = document.getElementById("rack-container")
            var productContainer = document.createElement("DIV")
            productContainer.classList.add("product-container");
            productContainer.classList.add("container-draggable" + model._id);
            productContainer.id = "container-draggable" + model._id;
            var product = document.createElement("IMG")
            product.classList.add("product")
            product.classList.add("draggable" + model._id)
            product.id = "draggable" + model._id
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

            $("#" + "draggable" + model._id).draggable({
                scroll: false,
                start: function (event) {
                    var stylesheet = document.styleSheets[0]
                    stylesheet.insertRule(`.${"draggable" + model._id} { top:0px !important; left:0px !important;}`, 0);
                },
                stop: function (event, ui) {
                    var x = event.clientX;
                    var y = event.clientY;
                    elementMouseIsOver = document.elementFromPoint(x, y);
                    if (elementMouseIsOver.id !== "drop-target") {
                        var container = document.getElementsByClassName("container-" + "draggable" + model._id);
                        container[0].appendChild(document.getElementById("draggable" + model._id))
                    }
                    var target = document.getElementById("draggable" + model._id);
                    target.style.transform = `translate(0px,0px)`
                    target.style.top = 0
                    target.style.left = 0
                    target.style.right = 0
                    target.style.bottom = 0
                    dragging = false
                },
                drag: function (event, ui) {
                    var target = document.getElementById("page");
                    target.appendChild(document.getElementById("draggable" + model._id))
                    var product = document.getElementsByClassName("draggable" + model._id)
                    product[0].style.transform = `translate(${event.clientX - product[0].offsetWidth / 2}px,${event.clientY - product[0].offsetHeight / 2}px)`
                    dragging = true
                }
            });

        })
    });

}


$("#drop-target").droppable({
    drop: function (event, ui) {
        var target = document.getElementById(currentId);
        var child = document.getElementById("drop-target").firstChild
        var name = document.getElementById("name")

        if (target.getAttribute("riskFactor") == "high") {
            high.style.opacity = 1
            medium.style.opacity = 0.3
            low.style.opacity = 0.3
        } else if (target.getAttribute("riskFactor") == "medium") {
            high.style.opacity = 0.3
            medium.style.opacity = 1
            low.style.opacity = 0.3
        } else if (target.getAttribute("riskFactor") == "low") {
            high.style.opacity = 0.3
            medium.style.opacity = 0.3
            low.style.opacity = 1
        }
        info.style.display = "none"
        mg.style.opacity = 1
        // name.style.opacity = 0
        saltLevel.style.opacity = 1
        saltLevel.innerHTML = target.getAttribute("saltLevel")
        image.src = target.getAttribute("image")
        image.style.opacity = 1
        name.innerHTML = target.getAttribute("name")
        if (child.nextSibling) {
            var productContainer = document.getElementById("container-" + child.nextSibling.getAttribute("id"))
            child.nextSibling.style.display = "block"
            productContainer.appendChild(child.nextSibling)
        }
        event.target.appendChild(target);
        target.style.display = "none"
        target.style.top = 0
        target.style.left = 0
        target.style.right = 0
        target.style.bottom = 0
    }
});


function removeAllChildNodes(parent) {
    var child = document.getElementById("drop-target").firstChild
    var name = document.getElementById("name")

    if(child.nextSibling) {
        document.getElementById("drop-target").removeChild(child.nextSibling)
    }
    high.style.opacity = 0
    medium.style.opacity = 0
    low.style.opacity = 0
    mg.style.opacity = 0
    saltLevel.style.opacity = 0
    image.style.opacity = 0
    name.innerHTML = ""
    info.style.display = "flex"
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}