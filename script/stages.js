const stages = [
    {
        level: 1,
        enemyRate: [1000, 5000], //1 new enemy between 1 and 5 seconds (random)
        stageTime: 60000, //level timer is 1 minute
        cleared: false,
        class: 'level-one',
        maplimits: [190, 320, 0, 475],
        bgm: new Audio('media/sound/stage-music-1.mp3')
    },
    // {
    //     level: 2,
    //     enemyRate: [500, 4500],
    //     timer: 70000,
    //     cleared: false,
    //     class: 'level-two',
    //     maplimits: [190, 320, 0, 475],
    //     bgm: new Audio('media/sound/stage-music-2.mp3')
    // },
    // {
    //     level: 3,
    //     enemyRate: [500, 4500],
    //     timer: 70000,
    //     cleared: false,
    //     class: 'level-two',
    //     maplimits: [190, 320, 0, 475],
    //     bgm: new Audio('media/sound/stage-music-3.mp3')
    // }
]