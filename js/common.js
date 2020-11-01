
        var content = document.querySelector('#wrap .content');
        var scrollIn = document.querySelector('#wrap .scrollBar .scrollIn');
        var scrollBar = document.querySelector('#wrap .scrollBar ');
       
       
        // 滚动条高度/屏幕的高度=屏幕高度/内容高度=滚动条移动的距离/内容的滚动距离
        //scale 为屏幕高度/内容高度
        var scale = document.documentElement.clientHeight / content.offsetHeight
        //为了得到滚动条的高度 
        scrollIn.style.height = scale * document.documentElement.clientHeight + 'px'
        //拖拽模板
        scrollIn.onmousedown = function (event) {
            enevt = event || window.event;
            //拿到元素的初始位置
            var eleY = scrollIn.offsetTop;
            //拿到鼠标的初始位置
            var startY = event.clientY;
            scrollIn.setCapture && scrollIn.setCapture();
            document.onmousemove = function (event) {
                event = event || window.event;
                var endY = event.clientY;
                var disY = endY - startY;
                var lastY = eleY + disY; //滚动条移动的距离
                scrollIn.setCapture && scrollIn.setCapture()
                if (lastY < 0) {
                    lastY = 0
                } else if (lastY > document.documentElement.clientHeight - scrollIn.offsetHeight) {
                    lastY = document.documentElement.clientHeight - scrollIn.offsetHeight
                }
                scrollIn.style.top = lastY + 'px';
                var contentTop = -lastY / scale; //内容滚动的距离= 滚动条移动的距离/scale
                content.style.top = contentTop + 'px';
                console.log(contentTop);
            }
            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null;
                scrollIn.releaseCapture && scrollIn.releaseCapture()
            }
            return false;

        }
        /*
     ie/chrome:mouserwheel(dom2的标准)
      event.wheelDelta
      上：120 
      下：-120    
    firefox ：DOMMouseScroll（dom2的标准）
    event.detail
    上：-3
    下：3 
     */
        document.addEventListener('mousewheel', scrollMove)
        document.addEventListener('DOMMouseScroll', scrollMove)
        var flag = true;
          var step = 0;

        function scrollMove(event) {
            if (event.wheelDelta) {
                if (event.wheelDelta > 0) {
                    flag = true;
                        step = -15
                } else if (event.wheelDelta < 0) {
                    flag = false
                  step = 15
                }
            } else if (event.detail) {
                if (event.detail < 0) {
                    flag = true
                    step = -15
                } else if (event.detail > 0) {
                    flag = false
                    step = 15
                }
            }
            var scrollLastTop = scrollIn.offsetTop+step;
            if(scrollLastTop<0){
                scrollLastTop = 0;

            }
            else if(scrollLastTop>document. documentElement.clientHeight-scrollIn.offsetHeight){
                scrollLastTop = document.documentElement.clientHeight-scrollIn.offsetHeight
            }
            scrollIn.style.top = scrollLastTop + 'px'
            // if (flag) {
            //     //往上
            //     scrollIn.style.top = scrollIn.offsetTop - 10 + 'px'
            //     if (scrollIn.style.top < 0 + 'px') {
            //         scrollIn.style.top = 0 + 'px'
            //     }
            // } else {
            //     //往下
            //     scrollIn.style.top = scrollIn.offsetTop + 10 + 'px';
            //     if (scrollIn.style.top >= document.documentElement.clientHeight - scrollIn.offsetHeight + 'px') {
            //         scrollIn.style.top = document.documentElement.clientHeight - scrollIn.offsetHeight + 'px'
            //     }
            // }

            var contentTop = -scrollLastTop / scale; //内容滚动的距离= 滚动条移动的距离/scale
            content.style.top = contentTop + 'px';

        }