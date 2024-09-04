export type Project={
    name:String,
    logo:String,
    description:String
}

export type tiers="UNRATED" | "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND";

export type Contributor={
    name:String,
    points:number,
    rank:number,
    tier:tiers,
    profile:string
}

export type Task={
    title:string,
    description:string,
    difficultyLevel:string,
    deadline:number,

}