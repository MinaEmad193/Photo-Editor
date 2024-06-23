let saturation = document.querySelector("#saturation")
let contrast = document.querySelector("#contrast")
let brightness = document.querySelector("#brightness")
let sepia = document.querySelector("#sepia")
let grayscale = document.querySelector("#grayscale")
let blur = document.querySelector("#blur")
let hueRotate = document.querySelector("#hue-rotate")
let upload = document.querySelector("#upload")
let download = document.querySelector(".download")
let reset = document.querySelector(".reset")
let img = document.querySelector(".img")
let imgBox = document.querySelector(".img-box")
let canvas = document.querySelector(".canvas")
let ctx = canvas.getContext("2d")

function resetValue() {
    img.style.filter = `none`
    saturation.value = saturation.getAttribute("value")
    contrast.value = contrast.getAttribute("value")
    brightness.value = brightness.getAttribute("value")
    sepia.value = sepia.getAttribute("value")
    grayscale.value = grayscale.getAttribute("value")
    blur.value = blur.getAttribute("value")
    hueRotate.value = hueRotate.getAttribute("value")
}
reset.onclick = function() {
    resetValue()
}

window.onload = function() {
    imgBox.style.display = "none"
    reset.style.display = "none"
    download.style.display = "none"
}


upload.onchange = function() {
    resetValue()
    imgBox.style.display = "flex"
    reset.style.display = "flex"
    download.style.display = "flex"
    let file = new FileReader()
    file.readAsDataURL(upload.files[0])
    file.onload = function() {
        img.src = file.result
    }

    img.onload = function() {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img,0,0,canvas.width,canvas.height)
        img.style.display = "none"
    }
}

let allFilters = document.querySelectorAll("li input")

allFilters.forEach((filter) => {
    filter.addEventListener("input", function() {
        ctx.filter = `
        saturate(${saturation.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img,0,0,canvas.width,canvas.height)
    })
})

download.onclick = function() {
    download.href = canvas.toDataURL()
}

