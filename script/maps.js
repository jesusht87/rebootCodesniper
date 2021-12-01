const maps = [
    {
    level: 1,
    enemyRate: [1000, 5000], //1 new enemy between 1 and 5 seconds (random)
    mapTime: 60000, //level timer is 1 minute
    cleared: false,
    levelClass: 'level-one',
    mapLimits: [190, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-1.mp3')
},
{
    level: 2,
    enemyRate: [500, 4500],
    mapTime: 65000,
    cleared: false,
    levelClass: 'level-two',
    mapLimits: [150, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-2.mp3')
},
{
    level: 3,
    enemyRate: [500, 3500],
    mapTime: 70000,
    cleared: false,
    levelClass: 'level-three',
    mapLimits: [260, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-3.mp3')
},
{
    level: 4,
    enemyRate: [500, 2500],
    mapTime: 75000,
    cleared: false,
    levelClass: 'level-four',
    mapLimits: [230, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-4.mp3')
},
{
    level: 5,
    enemyRate: [500, 2000],
    mapTime: 80000,
    cleared: false,
    levelClass: 'level-five',
    mapLimits: [250, 320, 0, 475],
    bgm: new Audio('media/sound/stage-music-3.mp3')
}]

const generateCoordinates = (level) => {
    let limits = maps[level-1].mapLimits
    let x = Math.round(Math.random() * 100) < 50 ? limits[2] : limits[3]
    let y = Math.floor(Math.random() * (limits[1] - limits[0] + 1) + limits[0])

    return {x: x, y: y, limits: limits}
}