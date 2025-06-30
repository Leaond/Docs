## joplayer 使用

引入 joplayer 之后使用 createPlayer 创建 player 实例

```js
const player = joplayer.createPlayer(mediaDataSource:MediaDataSource, config:Config);
```

mediaDataSource 的类型

```js
interface MediaSegment {
  duration: number;
  filesize?: number;
  url: string;
}
interface MediaDataSource {
  type: string; //视频资源类型，mp4、flv、webrtc等
  isLive?: boolean; //是否实时流
  cors?: boolean; //是否跨域
  withCredentials?: boolean;

  hasAudio?: boolean; //是否有音频
  hasVideo?: boolean; //是否有视频

  duration?: number; //持续时间
  filesize?: number; //文件大小
  url?: string; //视频的url

  segments?: MediaSegment[]; //片段
}
```

config 的类型

```js
    interface Config {
        /**
         * @desc Enable separated thread for transmuxing (unstable for now)
         * @defaultvalue false
         */
        enableWorker?: boolean;
        /**
         * @desc Enable IO stash buffer. Set to false if you need realtime (minimal latency) for live stream
         *          playback, but may stalled if there's network jittering.
         * @defaultvalue true
         */
        enableStashBuffer?: boolean;
        /**
         * @desc Indicates IO stash buffer initial size. Default is `384KB`. Indicate a suitable size can
         *          improve video load/seek time.
         */
        stashInitialSize?: number;

        /**
         * @desc Same to `isLive` in **MediaDataSource**, ignored if has been set in MediaDataSource structure.
         * @defaultvalue false
         */
        isLive?: boolean;

        /**
         * @desc Chasing the live stream latency caused by the internal buffer in HTMLMediaElement
         *       `isLive` should also be set to `true`
         * @defaultvalue false
         */
        liveBufferLatencyChasing?: boolean;

        /**
         * @desc Maximum acceptable buffer latency in HTMLMediaElement, in seconds
         *       Effective only if `isLive: true` and `liveBufferLatencyChasing: true`
         * @defaultvalue 1.5
         */
        liveBufferLatencyMaxLatency?: number;

        /**
         * @desc Minimum buffer latency to be keeped in HTMLMediaElement, in seconds
         *       Effective only if `isLive: true` and `liveBufferLatencyChasing: true`
         * @defaultvalue 0.5
         */
        liveBufferLatencyMinRemain?: number;

        /**
         * @desc Abort the http connection if there's enough data for playback.
         * @defaultvalue true
         */
        lazyLoad?: boolean;
        /**
         * @desc Indicates how many seconds of data to be kept for `lazyLoad`.
         * @defaultvalue 3 * 60
         */
        lazyLoadMaxDuration?: number;
        /**
         * @desc Indicates the `lazyLoad` recover time boundary in seconds.
         * @defaultvalue 30
         */
        lazyLoadRecoverDuration?: number;
        /**
         * @desc Do load after MediaSource `sourceopen` event triggered. On Chrome, tabs which
         *          be opened in background may not trigger `sourceopen` event until switched to that tab.
         * @defaultvalue true
         */
        deferLoadAfterSourceOpen?: boolean;

        /**
         * @desc Do auto cleanup for SourceBuffer
         * @defaultvalue false (from docs)
         */
        autoCleanupSourceBuffer?: boolean;
        /**
         * @desc When backward buffer duration exceeded this value (in seconds), do auto cleanup for SourceBuffer
         * @defaultvalue 3 * 60
         */
        autoCleanupMaxBackwardDuration?: number;
        /**
         * @desc Indicates the duration in seconds to reserve for backward buffer when doing auto cleanup.
         * @defaultvalue 2 * 60
         */
        autoCleanupMinBackwardDuration?: number;

        /**
         * @defaultvalue 600
         */
        statisticsInfoReportInterval?: number;

        /**
         * @desc Fill silent audio frames to avoid a/v unsync when detect large audio timestamp gap.
         * @defaultvalue true
         */
        fixAudioTimestampGap?: boolean;

        /**
         * @desc Accurate seek to any frame, not limited to video IDR frame, but may a bit slower.
         *          Available on Chrome > 50, FireFox and Safari.
         * @defaultvalue false
         */
        accurateSeek?: boolean;
        /**
         * @desc 'range' use range request to seek, or 'param' add params into url to indicate request range.
         * @defaultvalue 'range'
         */
        seekType?: 'range' | 'param' | 'custom';
        /**
         * @desc Indicates seek start parameter name for seekType = 'param'
         * @defaultvalue 'bstart'
         */
        seekParamStart?: string;
        /**
         * @desc Indicates seek end parameter name for seekType = 'param'
         * @defaultvalue 'bend'
         */
        seekParamEnd?: string;
        /**
         * @desc Send Range: bytes=0- for first time load if use Range seek
         * @defaultvalue false
         */
        rangeLoadZeroStart?: boolean;
        /**
         * @desc Indicates a custom seek handler
         * @desc Should implement `SeekHandler` interface
         */
        customSeekHandler?: CustomSeekHandlerConstructor;
        /**
         * @desc Reuse 301/302 redirected url for subsequence request like seek, reconnect, etc.
         * @defaultvalue false
         */
        reuseRedirectedURL?: boolean;
        /**
         * @desc Indicates the Referrer Policy when using FetchStreamLoader
         * @defaultvalue 'no-referrer-when-downgrade' (from docs)
         */
        referrerPolicy?: ReferrerPolicy;
        /**
         * @desc Indicates additional headers that will be added to request
         */
        headers?: {
            [k: string]: string
        }
        /**
         * @desc Should implement `BaseLoader` interface
         */
        customLoader?: CustomLoaderConstructor;
    }
```

获取到实例之后，常用到的就是使用 on 方法来监听 player 资源的状态，触发回调：

```js
player.on(joplayer.Events.ERROR, function (errorType, errorDetials, errorInfo) {
  (logbox.value = logbox.value + "player error: error type: " + errorType),
    " + error detials: " + errorDetials,
    " + error info: " + errorInfo;
  logbox.scrollTop = logbox.scrollHeight;
});
```

joplayer.Events 包括下面几种：

```js
ERROR: "error";
LOADING_COMPLETE: "loading_complete";
MEDIA_INFO: "media_info";
METADATA_ARRIVED: "metadata_arrived";
PES_PRIVATE_DATA_ARRIVED: "pes_private_data_arrived";
PES_PRIVATE_DATA_DESCRIPTOR: "pes_private_data_descriptor";
RECOVERED_EARLY_EOF: "recovered_early_eof";
SCRIPTDATA_ARRIVED: "scriptdata_arrived";
STATISTICS_INFO: "statistics_info";
TIMED_ID3_METADATA_ARRIVED: "timed_id3_metadata_arrived";
WEBRTC_CONNECTED: "webrtc_connected";
WEBRTC_CONNECT_FAILED: "webrtc_connect_failed";
WEBRTC_DATA_ARRIVED: "webrtc_data_arrived";
WEBRTC_DATA_CHANNEL_CLOSED: "webrtc_datachannel_closed";
WEBRTC_DATA_CHANNEL_OPENED: "webrtc_datachannel_opened";
WEBRTC_DATA_CHANNEL_OPEN_FILED: "webrtc_datachannel_open_filed";
WEBRTC_DISCONNECTED: "webrtc_disconnected";
WEBRTC_NO_TRACK: "webrtc_no_track";
```

上面的`WEBRTC_DATA_ARRIVED`这个类型是最常用的，我们可以根据回调参数来获取实时流的数据。

查看 Player 实例的类型，可以看到实例身上的一些方法

```js
interface Player {
  destroy(): void;
  on(event: string, listener: (...args: any[]) => void): void;
  off(event: string, listener: (...args: any[]) => void): void;
  attachMediaElement(mediaElement: HTMLMediaElement): void;
  detachMediaElement(): void;
  load(): void;
  unload(): void;
  play(): Promise<void> | void;
  pause(): void;
  type: string;
  buffered: TimeRanges;
  duration: number;
  volume: number;
  muted: boolean;
  currentTime: number;
  /**
   * @deprecated MSEPlayer/NativePlayer have its own `mediaInfo` field.
   * @desc Keep it for backwards compatibility
   * @since 1.4
   */
  mediaInfo: NativePlayerMediaInfo | MSEPlayerMediaInfo;
  /**
   * @deprecated MSEPlayer/NativePlayer have its own `statisticsInfo` field.
   * @desc Keep it for backwards compatibility
   * @since 1.4
   */
  statisticsInfo: NativePlayerStatisticsInfo | MSEPlayerStatisticsInfo;
}
```

## jodvf/cesium
