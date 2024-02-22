<template>
    <swiper :modules="modules" class="mySwiper" :navigation="navigationEnabled" :pagination="paginationEnabled" @slideChange="onSlideChange">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
            <template v-if="slide.type === 'image'">
                <img :src="slide.src" :alt="slide.alt" />
            </template>
            <template v-else-if="slide.type === 'video'">
                <video ref="videoElements" :src="slide.src" autoplay muted playsinline @loadedmetadata="() => setupVideo(index)"></video>
                <button class="play-button" v-if="showControls" @click="togglePlay(index)">
                    {{ videoStates[index] ? '暂停' : '播放' }}
                </button>
                <slot name="controls"></slot>
            </template>
        </swiper-slide>
    </swiper>
</template>
  
<script setup lang="ts">
import { ref, Ref, watch, reactive, onMounted, nextTick } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const props = withDefaults(defineProps<{
    slides: Array<{ type: string; src: string; alt?: string }>;
    navigationEnabled?: boolean;
    paginationEnabled?: boolean;
    showControls?: boolean; // 控制播放/暂停按钮是否显示
}>(), {
    navigationEnabled: false,
    paginationEnabled: false,
    showControls: true, // 默认值为true
});

const modules = [Navigation, Pagination];

// 明确指定 videoElements 的类型为 HTMLVideoElement[]
const videoElements: Ref<HTMLVideoElement[]> = ref([]);

// 假设所有视频默认状态为播放
const videoStates = reactive<{ [index: number]: boolean }>({});


const setupVideo = () => {
    // 清理前一个状态
    for (const key in videoStates) {
        delete videoStates[key];
    }
    
    // 为当前的视频设置状态
    videoElements.value.forEach((video, index) => {
        if (props.slides[index].type === 'video') {
            // 默认假设视频是播放的，因为有autoplay
            videoStates[index] = true;
            
            video.addEventListener('play', () => videoStates[index] = true);
            video.addEventListener('pause', () => videoStates[index] = false);
            
            // 如果视频因策略无法自动播放，可能需要手动触发播放或设置状态
            video.play().catch(error => {
                console.error("Auto-play was prevented: ", error);
                videoStates[index] = false;
            });
        }
    });
};

const onSlideChange = (swiper: any) => {
  nextTick(() => {
    const activeIndex = swiper.activeIndex; // 获取当前活跃的Swiper Slide索引
    const video = videoElements.value[activeIndex];
    
    if (video && props.slides[activeIndex].type === 'video') {
      // 只更新当前活跃Slide中的视频状态
      alert(videoStates[activeIndex])
      videoStates[activeIndex] = !video.paused;
    }
  });
};


const togglePlay = (index: number) => {
  const swiperSlide = document.querySelectorAll('.swiper-slide')[index];
  const video = swiperSlide ? swiperSlide.querySelector('video') : null;
  if (!video) return;

  if (video.paused || video.ended) {
    video.play();
    videoStates[index] = true; // 标记为播放
  } else {
    video.pause();
    videoStates[index] = false; // 标记为暂停
  }
};

onMounted(() => {
    setupVideo();
});

watch(() => props.slides, (newSlides) => {
    // 每当slides数据变化时重新设置视频
    setupVideo();
}, { deep: true });

</script>

  
  
<style scoped lang="scss">
.mySwiper {
    /* 根据需要调整样式 */
    width: 100%;
    height: 100%;
}

.swiper-slide {
    position: relative; /* 使得 .play-button 可以相对于它定位 */
    img,
    video {
        width: 100%;
        height: auto;
    }
}

.play-button {
    width: 72px;
    height: 34px;
    line-height: 0;
    position: absolute;
    bottom: 30px; /* 或者其他希望按钮出现的位置 */
    right: 40px; /* 根据需要调整 */
    color: #fff;
    border: 1px solid #fff;
    padding: 10px; /* 按钮内边距 */
    cursor: pointer; /* 鼠标悬停时显示手型指针 */
    border-radius: 5px;
    transition: background-color 0.3s;
    background: transparent;
    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
}

</style>

  