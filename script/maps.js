const stages = [{
    level: 1,
    enemyRate: [1000, 5000], //1 new enemy between 1 and 5 seconds (random)
    timer: 3000, //level timer is 1 minute
    cleared: false,
    class: 'level-one',
    mapLimits: [190, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-1.mp3')
},
{
    level: 2,
    enemyRate: [500, 4500],
    timer: 70000,
    cleared: false,
    class: 'level-two',
    mapLimits: [150, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-2.mp3')
},
{
    level: 3,
    enemyRate: [500, 3500],
    timer: 80000,
    cleared: false,
    class: 'level-three',
    mapLimits: [190, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-3.mp3')
},

{
    level: 4,
    enemyRate: [500, 2500],
    timer: 90000,
    cleared: false,
    class: 'level-four',
    mapLimits: [190, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-3.mp3')
},

{
    level: 5,
    enemyRate: [500, 2000],
    timer: 100000,
    cleared: false,
    class: 'level-five',
    mapLimits: [190, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-3.mp3')
}]

const generateCoordinates = (level) => {
    let limits = stages.filter(e => e.level === level)[0].mapLimits
    let x = Math.round(Math.random() * 100) < 50 ? limits[2] : limits[3]
    let y = Math.floor(Math.random() * (limits[1] - limits[0] + 1) + limits[0])

    return [x, y]
}