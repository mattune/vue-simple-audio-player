<template>
  <div class="sap">
    <div class="circle">
      <svg class="progress" width="200" height="200" viewBox="0 0 200 200">
        <circle class="progress__meter" cx="100" cy="100" r="90" />
        <circle class="progress__value" cx="100" cy="100" r="90" />
      </svg>
      <svg class="progress__play__button" width="200" height="200" viewBox="0 0 200 200" @click="playSound" :class="{active : !isPlaying}">
        <polygon points="70, 55 70, 145 145, 100" />
      </svg>
      <svg class="progress__stop__button" width="200" height="200" viewBox="0 0 200 200" @click="stopSound" :class="{active : isPlaying}">
        <rect x="62" y="62" width="75" height="75" />
      </svg>
    </div>
    <div class="audio_time">
      <small class="start-time">00:00:00</small> / <small class="end-time">00:00:00</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'simpleAudioPlayer',
  props: {
    src : String
  },
  data () {
    return {
      isPlaying: false,
      loadState: false,
      audio: ''
    }
  },
  methods: {
    playSound() {
      if(this.audio == '' && this.src && !this.isPlaying) { // 初回
        this.audio = new Audio();
        this.audio.src = this.src;

        this.audio.addEventListener('loadedmetadata', ()=> {
          this.audio.play();
          this.startProgress();
        });

        this.isPlaying = true;
      }
      else { // 再プレイ
        this.audio.play();
        this.isPlaying = true;
      }
    },

    stopSound() {
      if(this.audio != '' && this.isPlaying) {
        this.audio.pause();
        this.audio.currentTime = 0;

        this.setProgress(0);
        this.isPlaying = false;
      }
    },

    resetSound() {
      this.setProgress(0);
      this.isPlaying = false;
      this.audio = '';
    },

    startProgress() {
      this.audio.addEventListener('timeupdate', (e)=> {
        const length = this.audio.duration
        const current_time = this.audio.currentTime;
        const totalLength = this.calculateTime(length);
        const currentTime = this.calculateTime(current_time);

        this.$el.querySelector('.start-time').innerHTML = currentTime;
        this.$el.querySelector('.end-time').innerHTML = totalLength;
        this.setProgress((this.audio.currentTime / this.audio.duration)*100);

        if (this.isPlaying && this.audio.currentTime == this.audio.duration) {
          this.resetSound();
        }
      });
    },

    setProgress(value) {
      const progressValue = this.$el.querySelector('.progress__value');
      const RADIUS = progressValue.getAttribute('r');
      const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
      const progress = value / 100;
      const dashoffset = CIRCUMFERENCE * (1 - progress);

      progressValue.style.strokeDashoffset = dashoffset;
      progressValue.style.strokeDasharray = CIRCUMFERENCE;
    },

    calculateTime(length) {
      const hour = Math.floor(length / 3600 | 0);
      const minute = Math.floor(length % 3600 / 60 | 0);
      const seconds = Math.floor(length % 60);

      const time = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (seconds < 10 ? "0" + seconds : seconds);

      return time;
    }
  },

  mounted() {
    this.setProgress(0);
  }
}
</script>


<style scoped lang="scss">
$activeColor : #33d496;
$deactiveColor : #e6e6e6;
$easeInOutExpo : cubic-bezier(1, 0, 0, 1);

.sap {
  position: relative;
  width: 100%;
  height: 100%;

  &:hover {
    .audio_time {
      transform: translate(-50%,0);
      opacity: 1;
      visibility: visible;
    }
  }
}

.circle {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;

  svg {
    width: 100%;
    height: 100%;
  }
}

.progress {
  transform: rotate(-90deg);

  .progress__meter,
  .progress__value {
    // transition: all 0.2s linear;
    fill: none;
    stroke-width: 15px;
  }

  .progress__meter {
    stroke: #e6e6e6;
  }

  .progress__value {
    stroke: $activeColor;
    stroke-linecap: round;
  }
}

.progress__play__button {
  transition: all 0.4s ease;
  transform: translate(-50%,-50%) scale(0.5) rotate(90deg);
  position: absolute; top: 50%; left: 50%;
  width: 100%; height: 100%;
  fill: $activeColor;
  opacity: 0;
  visibility: hidden;

  &.active {
    transform: translate(-50%,-50%) scale(1) rotate(0deg);
    opacity: 1;
    visibility: visible;
  }

  &:hover {
    transform: translate(-50%,-50%) scale(1.2) rotate(0deg);
  }
}

.progress__stop__button {
  transition: all 0.4s ease;
  transform: translate(-50%,-50%) scale(0.5) rotate(90deg);
  position: absolute; top: 50%; left: 50%;
  width: 100%; height: 100%;
  fill: $deactiveColor;
  opacity: 0;
  visibility: hidden;

  &.active {
    transform: translate(-50%,-50%) scale(1) rotate(0deg);
    opacity: 1;
    visibility: visible;
  }

  &:hover {
    transform: translate(-50%,-50%) scale(1.2) rotate(0deg);
  }
}

.audio_time {
  transition: all 0.2s ease;
  transform: translate(-50%, 10px);
  background-color: #fff;
  position: absolute; bottom: 0; left: 50%;
  border-radius: 10px;
  box-shadow: 0 1px 0 1px rgba(0,0,0,0.1);
  font-size: 1rem;
  padding: 5px;
  display: flex;
  opacity: 0;
  visibility: hidden;

  .start-time {
    margin-right: 5px;
  }
  .end-time {
    margin-left: 5px;
  }
}

</style>
