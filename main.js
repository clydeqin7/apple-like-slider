let $images = $("#images")
let $buttons = $("#buttons > button")
let $imagesChildren = $images.children('img')
let current = 0

makeFakeImage()
$('#images').css({transform: `translateX(-400px)`})
bindEvents()

function bindEvents(){
    // TODO why + button?
    $("#buttons").on('click', 'button', function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()
        goSlide(index)
    })
}

function goSlide(index){
    console.log('c='+current + ' i='+index )
    if(current === index) return;
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