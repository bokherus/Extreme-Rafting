var res = {
    Raft_png : 'res/images/Raft.png',
    Wave_png : 'res/images/Wave.png',
    River_png : 'res/images/River.png',
    Wave2_png : 'res/images/Wave2.png',
    Rock_png: 'res/images/Rock.png',
    Bullet_png: 'res/images/Bullet.png',
    Crash_wav: 'res/effects/crash.wav',
    BGM_mp3: 'res/effects/BGM.mp3',
    stream_mp3: 'res/effects/WaterStream.mp3'
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}