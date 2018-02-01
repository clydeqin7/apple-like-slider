let $images = $("#images")
let $buttons = $("#buttons > button")
let $imagesChildren = $images.children('img')
let current = 0
let timer = {}

makeFakeImage()
$('#images').css({transform: `translateX(-400px)`})
bindEvents()
autoSlide()

function autoSlide(){
    timer = setInterval(()=>{
        goSlide(current + 1)
    }, 3000)
    $('#container').on('mouseenter', ()=>{
        window.clearInterval(timer)
    }).on('mouseleave', ()=>{
        timer = setInterval(()=>{
        goSlide(current + 1)
    }, 3000)
    })
}

function bindEvents(){
    // TODO why + button?
    $("#buttons").on('click', 'button', function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()
        goSlide(index)
    })
    $('#previous').on('click', function(){
        goSlide(current - 1)
    })
    $('#next').on('click', function(){
        goSlide(current + 1)
    })
}



function goSlide(index){
    if(current === index)return;
    if(index > $imagesChildren.length -1){
        index = 0
    }else if(index < 0){
        index = $imagesChildren.length -1
    }

    if(current === 0 && index === $imagesChildren.length -1){
    // 第一张 >> 最后一张 
        $('#images').css({transform: `translateX(0px)`})
        .one(`transitionend`, function(){
            $('#images').hide().offset()
            $('#images').css({transform: `translateX(${-(index+1)*400}px)`}).show()
        })     
    }else if(current === $imagesChildren.length -1 && index === 0){
    // 最后一张 >> 第一张
       $('#images').css({transform: `translateX(${-(current+2)*400}px)`})
       .one(`transitionend`, function(){
           $('#images').hide().offset()
           $('#images').css({transform: `translateX(-400px)`}).show()
       })
    }else{
        $('#images').css({transform: `translateX(${-(index+1)*400}px)`})
    }
    current = index
    // $('#images').css({transform: `translateX(${-(index*400)}px)`})
}

function makeFakeImage(){
    let $firstcopy = $imagesChildren.eq(0).clone(true)
    let $lastcopy = $imagesChildren.eq($imagesChildren.length-1).clone(true)

    $images.append($firstcopy)
    $images.prepend($lastcopy)
}

var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

document.addEventListener("visibilitychange", function() {
    if(document[hidden]){
        window.clearInterval(timer)
    }else{
        timer = setInterval(()=>{
        goSlide(current + 1)
        }, 3000)
    }
});