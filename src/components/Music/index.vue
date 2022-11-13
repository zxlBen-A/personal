<template>
  <div ref="player"></div>
</template>

<script setup lang="ts">
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import {songSheet} from '../../api/index'

const player = ref<any>(null)

onMounted(() => {
  new APlayer({
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
    }]
  });
})


// const getSong = async () => {
//   let {data} = await songSheet()
//   new APlayer({
//     container: player.value,
//     server: 'netease',
//     type: 'song',
//     fixed: false,
//     mini: false,
//     autoplay: false,
//     audio: [...data.data]
//   });
// }
// getSong()
</script>

<style scoped lang="scss">
</style>
