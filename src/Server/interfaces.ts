export interface IWorldData {
    uuid: string,
    width: number,
    height: number,
    worldname: string,

    /**
     * 是否是主世界
     * 
     * 登陆的玩家会传送到主世界
     */
    mainWorld: boolean
}

export interface IPlayerData {
    /**
     * 唯一标识符
     */
    uuid: string,
    /**
     * 用户名
     */
    playername: string,
    /**
     * 蝌蚪的颜色
     */
    color: number,
    /**
     * 蝌蚪的移动速度
     */
    speed: number,
}

export enum PlayerStatus {
    stop = "STOP",
    run = "RUN"
}

export interface IPos {
    x: number,
    y: number
}