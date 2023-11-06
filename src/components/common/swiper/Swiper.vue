<template>
    <div class="small-swiper">
        <div class="swiper">
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
            carouselTime: {
                type: Number,
                default: 3000,
            },
            transformTime: {
                type: Number,
                default: 300,
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
                carouselIndex: 1 // 设置每次轮播几张图片
            }
        },
        methods:{

            swiperCarousel() { // 轮播图片
                setInterval(() => {

                    this.carouselIndex++
                    this.swiperStyle['transition'] = `transform ${this.transformTime}ms` // 设置动画时长
                    this.swiperTransform(this.carouselIndex*this.dispayWidth)  // 移动到新位置
                    this.swiperCorrect()  // 位置矫正
                },this.carouselTime)  // 设置每次轮播时间
            },
            swiperCorrect(){  // 位置矫正
                setTimeout(()=>{
                    this.swiperStyle['transition'] = '0ms' // 设置动画时长为0
                    if(this.carouselIndex >= this.slideLen+1){
                        this.carouselIndex = 1
                        this.swiperTransform(this.carouselIndex*this.dispayWidth)
                    }
                },this.transformTime)  // 执行延时就是动画的时长,避免还没动画完成就矫正了，没有动画效果
            },
            swiperInit(){ // 轮播图初始化
                
                const swiperElt = document.querySelector('.swiper') // 获取swiper的元素
                const slideElts = swiperElt.getElementsByClassName('slide') // 获取swiper所有的slide子元素
                this.slideLen = slideElts.length  // 获取图的长度
                console.log('slideLen:', this.slideLen)

                const oneNode = slideElts[0].cloneNode(true)  // 获取slideElts第一个元素及其子元素的副本
                const lastNode = slideElts[this.slideLen-1].cloneNode(true)  // 获取slideElts最后一个元素及其子元素的副本

                swiperElt.insertBefore(lastNode,slideElts[0]) // 向swiperElt最前面插入slideElts最后一个元素
                swiperElt.appendChild(oneNode)  // 向swiperElt最后面添加slideElts第一个元素
                
                this.dispayWidth = swiperElt.offsetWidth  // 获取轮播图的显示宽度
                this.swiperStyle = swiperElt.style  // 获取swiperElt的样式对象

                this.swiperTransform(this.dispayWidth) // 显示第一张图片

            },
            swiperTransform (position) {  // 设置轮播图的显示位置
                this.swiperStyle['transform'] = `translate3d(${-position}px,0,0)`
                this.swiperStyle['-webkit-transform'] = `translate3d(${-position}px,0,0)`  // 考虑浏览器兼容
                this.swiperStyle['-ms-transform'] = `translate3d(${-position}px,0,0)`     // 考虑浏览器兼容
            }
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
    .active{
        background-color: rgba(212,62,46,1.0);
    }
</style>