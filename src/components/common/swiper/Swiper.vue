<template>
    <div class="small-swiper">
        <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <slot></slot>
        </div>
        <div class="indicator">
            <div class="indi-item" :class="{active:carouselIndex==i+1}" v-for="(s,i) in slideLen" :key="i"></div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'swiper',
        props: {
            carouselTime: {  // 设置翻页间隔时间
                type: Number,
                default: 3000,
            },
            transformTime: {  // 设置动画时间
                type: Number,
                default: 300,
            },
            dragRatio: {  // 设置移动百分比为多少就翻一页
                type: Number,
                default: 0.3
            }
        },
        mounted () {
            setTimeout(() => {  // 这里用定时器的原因是让dom加载
                this.swiperInit() // 轮播图初始化

                this.swiperCarousel() // 轮播图开始轮播
            },100)
            
        },
        data() {
            return {
                slideLen: 0,  // 记录图片的数量
                dispayWidth: 0, // 记录显示宽度
                swiperStyle: {}, // 记录swiper的样式对象
                carouselIndex: 1, // 设置每次轮播几张图片
                carouselTimer: '', // 记录轮播图定时器
                scrolling: false, // 记录是否在滚动 true--滚动， false--没有滚动
                startX: '',  // 触摸的x轴坐标
                endX: '',    // 移动后的x轴坐标
                moveWidth: '',  // 移动的距离
            }
        },
        methods:{

            swiperCarousel() { // 轮播图片
                this.carouselTimer = setInterval(() => {

                    this.carouselIndex++
                    this.swiperscroll(this.carouselIndex*this.dispayWidth)
                    
                },this.carouselTime)  // 设置每次轮播时间
            },
            swiperscroll(position){  // 滚动

                this.scrolling = true  // 设置滚动状态
                this.swiperStyle['transition'] = `transform ${this.transformTime}ms` // 设置动画时长
                this.swiperTransform(position)  // 移动到新位置
                this.swiperCorrect()  // 位置矫正

                this.scrolling = false  // 设置结束滚动状态
            },
            swiperCorrect(){  // 位置矫正
                setTimeout(()=>{
                    this.swiperStyle['transition'] = '0ms' // 设置动画时长为0
                    if(this.carouselIndex >= this.slideLen+1){
                        this.carouselIndex = 1
                        this.swiperTransform(this.carouselIndex*this.dispayWidth)
                    }else if(this.carouselIndex <= 0){
                        this.carouselIndex = this.slideLen
                        this.swiperTransform(this.carouselIndex*this.dispayWidth)
                    }
                },this.transformTime)  // 执行延时就是动画的时长,避免还没动画完成就矫正了，没有动画效果
            },
            swiperInit(){ // 轮播图初始化
                
                const swiperElt = document.querySelector('.swiper') // 获取swiper的元素
                const slideElts = swiperElt.getElementsByClassName('slide') // 获取swiper所有的slide子元素
                this.slideLen = slideElts.length  // 获取图的长度
                console.log('slideLen:', this.slideLen)

                if (this.slideLen>1){
                    const oneNode = slideElts[0].cloneNode(true)  // 获取slideElts第一个元素及其子元素的副本 如果没有上面这个判断  这里有一个坑获取这里的节点是swiper-item 而这个标签是根据请求数据生成的，由于请求数据是异步的，如果服务器响应慢，数据还没有过来，就执行到这里，将会获取不到节点导致报错（问题待解决）
                                                                 // 怎么解决这个问题  1 等请求回来在执行这个函数
                    const lastNode = slideElts[this.slideLen-1].cloneNode(true)  // 获取slideElts最后一个元素及其子元素的副本

                    swiperElt.insertBefore(lastNode,slideElts[0]) // 向swiperElt最前面插入slideElts最后一个元素
                    swiperElt.appendChild(oneNode)  // 向swiperElt最后面添加slideElts第一个元素
                    
                    this.dispayWidth = swiperElt.offsetWidth  // 获取轮播图的显示宽度
                    this.swiperStyle = swiperElt.style  // 获取swiperElt的样式对象
                }
                

                this.swiperTransform(this.dispayWidth) // 显示第一张图片

            },
            swiperTransform (position) {  // 设置轮播图的显示位置
                this.swiperStyle['transform'] = `translate3d(${-position}px,0,0)`
                this.swiperStyle['-webkit-transform'] = `translate3d(${-position}px,0,0)`  // 考虑浏览器兼容
                this.swiperStyle['-ms-transform'] = `translate3d(${-position}px,0,0)`     // 考虑浏览器兼容
            },
            touchStart(e){  // 触摸显示屏
                // 判断是否在滚动
                if(this.scrolling) return
                // 没有在滚动则继续执行
                clearInterval(this.carouselTimer)// 停止定时器

                this.startX = e.touches[0].pageX// 获取触点的x轴位置
            },
            touchMove(e){ // 拖动显示屏
                this.endX = e.touches[0].pageX  // 获取拖动后的x轴位置
                this.moveWidth = this.endX - this.startX // 计算移动的距离
                this.swiperTransform(this.carouselIndex * this.dispayWidth - this.moveWidth)  // 移动到拖动的位置
            },
            touchEnd(e){  // 离开显示屏
                let mathWidth = Math.abs(this.moveWidth)
                if(this.moveWidth===0){
                     return
                }else if(this.moveWidth > 0 && mathWidth > this.dispayWidth * this.dragRatio){
                    this.carouselIndex --
                }else if (this.moveWidth < 0 && mathWidth > this.dispayWidth * this.dragRatio){
                    this.carouselIndex ++
                }
                
                this.swiperscroll(this.carouselIndex * this.dispayWidth)// 设置位置
                
                this.swiperCarousel() // 开始滚动
            },
        }
    }
</script>

<style>
    .small-swiper {
        overflow: hidden;
        position: relative;
        /* background-color: antiquewhite; */
    }
    .swiper {
        display: flex;
    }
    
    .indicator{
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 8px
    }
    .indi-item {
        background: #fff;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        margin: 0 5px;
        
    }
    .indi-item.active{
        background-color: rgba(212,62,46,1.0);
    }
</style>