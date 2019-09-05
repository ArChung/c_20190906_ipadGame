var ans = [0, 1, 2, 0, 2];
var q_now = 0;
var user_ans = [];
var user_score = 0;
var q_slider ;


$(document).ready(function () {

    initStartBtn();
    initHomeBtn();

    initSwiper();
    initQA();
})
function initStartBtn(){
    TweenMax.to($(".index .btn"),.3,{yoyo:true,repeat:-1,scale:.95})

    $(".index .btn").click(function(){
        TweenMax.to($(".index"),.8,{left:'-100%'})
        TweenMax.to($(".qaChannel"),.8,{left:'0%'})
    })

}
function initHomeBtn(){


    $(".qaChannel .home").click(function(){
        TweenMax.to($(".index"),.8,{left:'0%'})
        TweenMax.to($(".qaChannel"),.8,{left:'100%'})
        TweenMax.delayedCall(.8,function(){
           
            q_now = 0;
            user_ans = [];
            user_score = 0;
            q_slider.slideTo(0,0)
            $('.aTxt').removeClass('a_correct');
            $('.aTxt').removeClass('a_wrong');
            checkNext();
        })
    })

    

}

function initSwiper() {
    q_slider = new Swiper('.swiper-container', {
        speed: 400,
        spaceBetween: 100,
        allowTouchMove: false,
        on: {
            transitionStart: function () {
                console.log(q_slider.activeIndex);
                
                checkNext();
            },
          },
    });

    $('.pre').click(function(){
        q_slider.slidePrev();
    });

    $('.next').click(function(){
        q_slider.slideNext();
    });

    // q_slider.slideTo(5)

    $(window).on('resize',function(){
        console.log(456);
        
        q_slider.update();
    });
}

function initQA() {
    $('.aTxt').click(function(){
        
         

        var t =  $(this);
        var qid = q_slider.activeIndex;
        var answer = ans[qid];
        var user_ans_now = $(this).index();
        
        if(!user_ans[qid]){
            user_ans[qid] = user_ans_now;
        }else{
           return; 
        }
 
        TweenMax.to(t,.08,{yoyo:true,repeat:1,y:3})


        
        if( user_ans_now === answer){
            t.addClass('a_correct');
            user_score+=20;
        }else{
            t.addClass('a_wrong');
            t.parent().find('.aTxt').eq(answer).addClass('a_correct')
        }

        if(user_ans.length>=5){
            console.log('score!');
            prepareScore();
        }

        checkNext();
    });

}

function checkNext(){
    if(q_slider.activeIndex==0){
        $('.pre').addClass('disable');
    }else{
        $('.pre').removeClass('disable');
    }

    if(q_slider.activeIndex < user_ans.length ){
        $('.next').removeClass('disable');
    }else{
        
        $('.next').addClass('disable');
    }

    
}

function prepareScore(){
    if(user_score==100){
        $('.correctBox').removeClass('hide');
        $('.wrongBox').addClass('hide');
    }else{
        $('.correctBox').addClass('hide');
        $('.wrongBox').removeClass('hide');
        $('.wrongBox .score').text(user_score);
    }
}