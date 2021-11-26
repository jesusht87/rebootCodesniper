const stages = [{
    level: 1,
    enemyRate: [1000, 5000], //1 new enemy between 1 and 5 seconds (random)
    timer: 60000, //level timer is 1 minute
    cleared: false,
    class: 'level-one',
    maplimits: [190, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-1.mp3')
},
{
    level: 2,
    enemyRate: [500, 4500],
    timer: 3000,
    cleared: false,
    class: 'level-two',
    maplimits: [150, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-2.mp3')
},
{
    level: 3,
    enemyRate: [500, 3500],
    timer: 3000,
    cleared: false,
    class: 'level-three',
    maplimits: [190, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-3.mp3')
},

{
    level: 4,
    enemyRate: [500, 2500],
    timer: 3000,
    cleared: false,
    class: 'level-four',
    maplimits: [190, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-3.mp3')
},

{
    level: 5,
    enemyRate: [500, 1000],
    timer: 3000,
    cleared: false,
    class: 'level-five',
    maplimits: [190, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-3.mp3')
}]