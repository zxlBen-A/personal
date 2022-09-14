<template>
  <div ref="player"></div>
</template>

<script setup lang="ts">
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';

const player = ref<any>(null)

onMounted(() => {
  const ap = new APlayer({
    container: player.value,
    server: 'netease',
    type: 'song',
    fixed: false,
    mini: false,
    autoplay: false,
    audio: [{
      name: '生活不止眼前的苟且',
      artist: '许巍',
      url: 'src/assets/music/生活不止眼前的苟且.mp3',
      cover: 'http://p2.music.126.net/ADLCWGfsJrbKPCzo79NH0w==/109951167148136866.jpg'
    },
      {
        name: '东西（Cover：林俊呈）',
        artist: '纳豆',
        url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
        cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
        lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
      },]
  });
})

</script>

<style scoped lang="scss">
</style>
