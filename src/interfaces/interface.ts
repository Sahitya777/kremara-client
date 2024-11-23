export type Project={
    name:string,
    logo:string,
    description:string,
}

export type tiers="UNRATED" | "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND";

export type userType ="Moderator" | "Normal" | "Owner" | "RougeDevs-Core" | "RougeDevs-Support"

export type Notification={
    id:number,
    text:string,
    link?:string
}

export type Token = "BTC" | "ETH" | "DAI" | "USDC" | "USDT" | "STRK";

export type Contributor={
    name:string,
    points:number,
    rank:number,
    tier:tiers,
    profile:string,
    profileIcon:string
}

export type Task={
    title:string,
    description:string,
    difficultyLevel:string,
    deadline:number,

}