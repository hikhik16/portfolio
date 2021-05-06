$(document).ready(function() {
  function open_chatroom() {
    //현재 윈도우 창 사이즈
    var nowHeight = $(window).height();
    var _width = $(window).width();
    var _height = $(window).height();
    console.log(nowHeight);
    $('.slide').css('height', nowHeight);
    $('.mainSlide').css('height', nowHeight);
    $('.slideImg').find('img').css('height', nowHeight);
    if (_width <= 900) {
      $('.slide').css('height', 'auto');
      $('.mainSlide').css('height', '500px');
      $('.slideImg').find('img').css('height', '500px');
      if (_width <= 500) {
        $('.mainSlide').css('height', '350px');
        $('.slideImg').find('img').css('height', '350px');
      }
    } else {
      $('.slide').css('height', _height);
      $('.mainSlide').css('height', _height);
      $('.slideImg').find('img').css('height', _height);
    }


    $(window).resize(function() {
      //윈도우 리사이즈
      var _width = $(window).width();
      var _height = $(window).height();
      console.log(_height);
      console.log(_width);
      if (_width <= 900) {
        $('.slide').css('height', 'auto');
        $('.mainSlide').css('height', '500px');
        $('.slideImg').find('img').css('height', '500px');
        if (_width <= 500) {
          $('.mainSlide').css('height', '350px');
          $('.slideImg').find('img').css('height', '350px');
        }
      } else {
        $('.slide').css('height', _height);
        $('.mainSlide').css('height', _height);
        $('.slideImg').find('img').css('height', _height);
      }

    });
  }
  open_chatroom();
  // skip nav
  function skip() {
    $('.skip-btn a').on("focus", function() {
      $(this).parent().css('top', '0');
    });
    $('.skip-btn a').on("focusout", function() {
      $(this).parent().css('top', '-100%');
    });
  }
  skip();
  //gnb 메뉴
  function gnb() {
    $("nav").hide();
    $(".menu").on("click keyup", function() {
      $(".menu").stop().toggleClass("on")
      $("nav").stop().slideToggle(1000);
      return false;
    });

    $(".gnb li:last-child").on("focusout", function() { // 메뉴 리스트의 마지막 항목에 포커스가 나가면 메뉴가 닫힌다.
      $('.menu').stop().removeClass('on');
      $("nav").stop().slideUp(1000);

    });

    $("nav").find("ul li a").on("click", function() {
      //m_self, m_project, m_web
      var tg = $(this).attr("href");
      var tgPos = $(tg).offset().top-$('#header').height();
      $("html, body").stop().animate({
        scrollTop: tgPos
      });
      $(".menu").stop().toggleClass("on")
      $("nav").stop().slideToggle(1000);

      return false;
    });

  }
  gnb();
  //슬라이드
  slide('.slide');
  function slide(b) {
    var $slide = $(b),
      $sliderZone = $slide.find('.mainSlide'), // 슬라이드 ul 감싸는 div
      $slider = $sliderZone.find('ul'), // 슬라이드 ul
      $list = $sliderZone.find('li'), // 슬라이드 li
      _size = $list.size(), // 슬라이드 사이즈(size=length )
      $btn = $slide.find('.arrowBtn a'), //슬라이드 좌우버튼
      $indicatorBox = $slide.find('.indicator'), //하단 nav div
      $indicator = $indicatorBox.find('ul'), //하단 nav
      _count = 0, //
      _cut = 0, //
      _page = ""; //text 빈함수

    //페이지 하단 nav 생성
    for (var _pSize = 0; _pSize < _size; _pSize++) {
      //반복문 pSize 0 부터 _size(슬라이드 li length값) 보다 작으면 pSize 증가
      if (_pSize == 0) { //만약_pSize= 0일때 _page에 li.on를 넣는다
        _page += "<li class='on'><a href='#' title='" + _pSize + "번 보기'>" + _pSize + "</a></li>";
      } else { //_pSize= 0 아닐경우  _page에 li를 넣는다
        _page += "<li><a href='#' title='" + _pSize + "번 보기'>" + _pSize + "</a></li>";
      }
      $indicator.html(_page); //하단nav 안에 _page(상단 for문에서 if문을 활용해서 넣은것 li)를 넣는다.
    }

    /*$list.each(function(){ //	슬라이드 li 반복해서 돌린다.
    	var	_this = $(this), //현재 슬라이드 li
    			$box = _this.find('.slideImg'), //슬라이드 li 안에 img감싸는 박스
    			_src = _this.find('.slideImg img').attr("src");//슬라이드안에 img 에 속성변경
    	$box.css("background","url("+_src+") no-repeat 0 0");//슬라이드 li 안에 img감싸는 박스 css 백그라운드 추가
    });*/
    // 좌우 버튼
    $btn.on("click", function() {
      var _this = $(this), //슬라이드 좌우버튼
        _cut = _count; //_cut = 0
      if ($slider.find('li:animated').length < 1) { // 슬라이드 ul 안에 li:animated 가 1보다 작다면
        if (_this.hasClass('prev') == true) { //슬라이드 좌우버튼 클래스 prev 가 맞다면
          console.log('이전버튼')
          if (_count <= 0) //_count의 안에 값이 0이랑 같거나 작다면
            _count = _size; //_count 값 안에  슬라이드 사이즈(_size=length ) 의 값을 넣는다.  값 =3
          _count--; // prev 버튼을 누를때마다 _count 값 을 1씩 감소 시킨다. ex)_size값 3에서 -1씩 한다.
          console.log('_size=' + _size);
          console.log('_count=' + _count);
          $list.eq(_count).addClass('show').css('margin-left', '-100%').animate({
            'margin-left': 0
          }, 500); //슬라이드 li의 _count() 번째에  클래스 show를 추가하고, 왼쪽으로 100프로 설정 , 왼쪽 초기값으로 이동 해라
          $list.eq(_cut).animate({
            'margin-left': '100%'
          }, 500, function() { //슬라이드 li의 _cut() 번째를  왼쪽으로 100프로 이동 함수
            console.log('cut=' + _cut);
            $(this).css('margin-left', '0px').removeClass('show'); //슬라이드 li의 _cut()번째를 왼쪽 0으로 만들고 show 클래스를 지워라.
          });
        } else { //슬라이드 좌우버튼 클래스 next라면
          if (_count >= _size - 1) //_count 의 값이 _size-1 보다 크거나 같으면
            _count = -1; //_count 안에 -1을 대입
          _count++; // _count 를 1씩 증가해라
          console.log('_size=' + _size);
          console.log('_count=' + _count);
          $list.eq(_count).addClass('show').css('margin-left', '100%').animate({
            'margin-left': 0
          }, 500); //슬라이드 li의 _count() 번째에  클래스 show를 추가하고, 왼쪽으로 100프로 설정  , 왼쪽 0프로로  이동 해라
          $list.eq(_cut).animate({
            'margin-left': '-100%'
          }, 500, function() { //슬라이드 li의 _cut() 번째를  왼쪽으로 -100프로 이동 함수
            $(this).css('margin-left', '0px').removeClass('show'); ////슬라이드 li의 _cut() 번째를  왼쪽으로 0px로 설정 , show 클래스를 삭제해라.
          });
        }
        $indicator.find('li:eq(' + _count + ')').addClass('on').siblings().removeClass('on'); //하단 nav 부분의 li count 번째에 클래스 on 을 추가하고 형제선택자들의 on 클래스를 삭제하라.
      }
      return false;
    });

    // 하단 nav
    $indicator.find('li a').on("click", function() {
      var _btn = $(this),
        _li = _btn.closest('li'),
        _index = _li.index();
      if (_index < _count) {
        $list.eq(_index).addClass('show').css('margin-left', '-100%').animate({
          'margin-left': 0
        }, 500);
        $list.eq(_count).animate({
          'margin-left': '100%'
        }, 500, function() {
          $(this).css('margin-left', '0px').removeClass('show');
        });
      } else if (_index > _count) {
        $list.eq(_index).addClass('show').css('margin-left', '100%').animate({
          'margin-left': 0
        }, 500);
        $list.eq(_count).animate({
          'margin-left': '-100%'
        }, 500, function() {
          $(this).css('margin-left', '0px').removeClass('show');
        });
      } else {
        console.log('동일');
      }
      $indicator.find('li:eq(' + _index + ')').addClass('on').siblings().removeClass('on');
      _count = _index;

      // 현재 보다 높다면 next   낮다면 prev
      return false;
    });
  }
  //커서 이벤트
  function mouse(){
	var mouseStop = true;
	var $mouse = $('.mousecursor');
	$(document).on('mousemove', function(e){
		if(mouseStop){
			$mouse.stop().animate({'left':e.pageX-10, 'top':e.pageY-10}, 50);
		}
	});
  }
  mouse();
});



// 포트폴리오 list
$(window).load(function(){
	var $container = $('.workList');
		$container.isotope({
			itemSelector: '.list',
			stagger: 100,
		});
		$('.work-filter li').on( 'click', function() {
			var filterValue = $(this).attr('data-filter');
				$container.isotope({ filter: filterValue });
				$(this).addClass('on').siblings().removeClass();
		});
});
