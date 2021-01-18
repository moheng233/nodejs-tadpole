import { IPlayerData, IPos, IWorldData } from "./interfaces";
import unitimer,{Timer} from "unitimer";

/**
 * 服务器类
 * 
 * 一个服务器可以有多个世界
 */
export class Server {
    worlds: Map<string,World> = new Map();
    OnlinePlayers: Map<string,Player> = new Map();

    mainWorld: World | undefined;

    constructor(){
        
    }

    isWorldInServer(world: World){
        return this.worlds.has(world.data.uuid);
    }

    /**
     * 将世界加入服务器
     * @param world 世界的数据
     */
    joinWorld(world:IWorldData){
        if(this.worlds.has(world.uuid)){
            throw new Error("世界已经被添加到服务器");
        } else {
            let oworld = new World(world,this);
            if(world.mainWorld){
                this.mainWorld = oworld;
            }
            this.worlds.set(world.uuid,oworld);
        }
    }

    getMainWorld(){
        if(this.mainWorld != undefined){
            if(this.worlds.has(this.mainWorld.data.uuid)){
                return this.mainWorld;
            }
        }
        return this.worlds.values().next().value as World;
    }

    /**
     * 玩家加入服务器
     * @param player 玩家的数据
     */
    joinPlayer(player: IPlayerData){
        if(this.OnlinePlayers.has(player.uuid)){
            throw new Error("用户已经登陆");
        } else {
            let OPlayer = new Player(player,this.getMainWorld(),this);

            this.OnlinePlayers.set(player.uuid,OPlayer);
            this.getMainWorld().players.set(player.uuid,OPlayer);
        }
    }

    /**
     * 获得在线的世界
     * 
     * 也就是人数大于0的世界
     */
    getOnlieWorlds(){
        return Array.from(this.worlds).filter(e => {
            if(e[1].players.size > 0){
                return true;
            }
        }).map(e => {
            return e[1]
        })
    }

    /**
     * 每帧的调用
     * @param timer 这里接受的是一个计时器
     */
    tick(timer: Timer){

    }
}

/**
 * 世界类
 * 
 * 每个世界都拥有一个唯一的uuid
 * 
 * 世界是有限大小的
 * 不推荐太大
 */
export class World {
    players: Map<string,Player> = new Map();

    constructor(
        public data: IWorldData,
        public server: Server
    ){

    }
    
    /**
     * 检查玩家是否存在于这个世界
     * @param player 玩家
     */
    isPlayerInWorld(player:Player){
        return this.players.has(player.data.uuid);
    }

    getServer(){
        if(this.server.isWorldInServer(this)){
            return this.server;
        }
    }

    /**
     * 每帧调用
     * @param time 从上一帧到现在的时间
     */
    tick(time:number){

    }
}

/**
 * 玩家类
 * 
 * 一个玩家只可以存在一个世界当中
 * 每个玩家都有一个唯一的uuid
 * 这个uuid根据玩家的名称和密码生成
 */
export class Player {
    public pos:IPos = {
        x: 0,
        y: 0
    }
    public direction:number = 0;

    constructor(
        public data: IPlayerData,
        public world: World,
        public server: Server 
    ){

    }

    getWorld(){
        if(this.world.isPlayerInWorld(this)){
            return this.world;
        }
    }
}