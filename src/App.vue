<template>
  <div id="app">
    <dl class="sample">
      <dt>サンプルボイス視聴的なの</dt>
      <dd>
        <div class="size" :class="random()" v-for='(value, index) in voice' :key='index' @click="voiceResetState(index)">
          <vaudio :ref="'voice_'+index" :src="require('@/assets/audio/'+ value)" />
        </div>
      </dd>
    </dl>

    <dl class="sample">
      <dt>BGM視聴的なの</dt>
      <dd>
        <div class="size" :class="random()" v-for='(value, index) in bgm' :key='index' @click="bgmResetState(index)">
          <vaudio :ref="'bgm_'+index" :src="require('@/assets/audio/'+ value)" />
        </div>
      </dd>
    </dl>

    <small class="copyright">フリー音楽素材/魔王魂 <a href="https://maoudamashii.jokersounds.com/" target="_blank">https://maoudamashii.jokersounds.com/</a></small>
  </div>
</template>

<script>
import vaudio from './components/simpleAudioPlayer.vue'

export default {
  name: 'app',
  components: {
    vaudio
  },
  data: function() {
    return {
      bgmState: [],
      voiceState: [],
      size: [
        's','m','l'
      ],
      bgm: [
        'bgm_maoudamashii_fantasy13.mp3',
        'game_maoudamashii_4_field07.mp3',
        'game_maoudamashii_1_battle15.mp3',
        'game_maoudamashii_2_boss08.mp3',
      ],
      voice: [
        'nc62044.wav',
        'nc109428.wav',
        'nc110546.wav',
        'nc115686.wav',
      ]
    }
  },
  methods: {
    random() {
      const rnd = Math.floor(Math.random() * this.size.length);
      return this.size[rnd];
    },
    bgmResetState(id) {
      this.bgm.forEach((item, i) => {
        const _target = this.$refs['bgm_'+i]['0'];

        if(id == i) {
          if(!_target.isPlaying) {
            _target.stopSound();
          }
          else {
            _target.playSound();
          }
        }
        else {
          _target.stopSound();
        }
      });


    },
    voiceResetState(id) {
      this.voice.forEach((item, i) => {
        const _target = this.$refs['voice_'+i]['0'];

        if(id == i) {
          if(!_target.isPlaying) {
            _target.stopSound();
          }
          else {
            _target.playSound();
          }
        }
        else {
          _target.stopSound();
        }
      });
    }
  }
}
</script>

<style lang="scss">
#app {
  padding: 100px;

  .copyright {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    color: #ccc;
  }

  .sample {
    border-bottom: 1px solid #000;
    padding-bottom: 30px;
    margin-bottom: 30px;

    dt {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 30px;
    }

    dd {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  .size {
    margin: 0 30px 0 0;

    &.l {
      width: 200px;
      height: 200px;
    }
    &.m {
      width: 100px;
      height: 100px;
    }
    &.s {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
