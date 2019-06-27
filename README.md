# vue-simple-audio-player
音声ファイルをささっと埋め込みたい時に使えるかも。サンプル音声視聴とか。

[DEMO](https://mattune.github.io/vue-simple-audio-player/)

## 導入方法
1. /src/components/simpleAudioPlayer.vue を任意の場所に追加。

## 使用方法
```html
<vaudio :src="音声ファイルのパス" />
```

## その他
複数制御は親コンポーネントからゴニョゴニョしてください。

isPlaying
→再生状態を返す(デフォルトは false )

playSound()
→再生

stopSound()
→停止
