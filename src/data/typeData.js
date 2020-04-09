let typeData = [
    {
        id: 0,
        name: '广告传媒',
        children: [
            {
                id: 1,
                name: '广告位招租',
                child: [
                    1, 2, 3, 4//每个数字必须保证唯一
                ],
            },
            {
                id: 2,
                name: '移动互联网广告',
                child: [
                    5, 6, 7, 8
                ]
            },
        ]
    },
    {
        id: 1,
        name: '喷绘招牌',
        children: [
            {
                id: 1,
                name: '灯箱/招牌',
                child: [
                    5, 6, 7, 8
                ]
            },
            {
                id: 2,
                name: '户外广告',
                child: [
                    5, 6, 7, 8
                ]
            },
            {
                id: 3,
                name: '条幅/锦旗/奖牌',
                child: [
                    5, 6, 7, 8
                ]
            },
        ]
    },
    {
        id: 2,
        name: '印刷包装',
        children: [
            {
                id: 1,
                name: '宣传资料印刷',
                child: [
                    211, 212, 213
                ]
            },
            {
                id: 2,
                name: '名片印刷',
                child: [
                    221, 222, 223,
                ]
            },
            {
                id: 3,
                name: '办公室礼品印刷',
                child: [
                    231, 232, 233
                ]
            },
        ]
    },
    {
        id: 3,
        name: '展会服务',
        children: [
            {
                id: 1,
                name: '展会布置/搭建',
                child: [
                    311, 312, 313
                ]
            },
            {
                id: 2,
                name: '摄像摄影',
                child: [
                    321, 322, 323
                ]
            },
            {
                id: 3,
                name: '展位设计',
                child: [
                    331, 332, 333
                ]
            },
        ]
    },
]
export default typeData;