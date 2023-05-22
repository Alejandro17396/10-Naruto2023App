export interface NinjasResponsePaginated {
    number: number;
    ninjas: Ninja[];
}

export interface Ninja {
    name:         string;
    chakraNature: ChakraNature;
    type:         NinjaType;
    sex:          Sex;
    stats:        NinjaStat[];
    skills:       Skill[];
    awakenings:   Awakening[];
    formation:    Formation;
}

export interface Awakening {
    name:      string;
    type:      StatType;
    level:     string;
    skillText: string;
    stats:     AwakeningStat[];
}

export interface AwakeningStat {
    name:          string;
    ninja:         string;
    level:         string;
    attributeName: string;
    type:          StatType;
    action:        string;
    impact:        string;
    value:         number;
    condition:     string;
    time:          string;
}

/*export enum Action {
    Apply = "apply",
    Attack = "attack",
    Decrease = "decrease",
    Increase = "increase",
    Inmune = "inmune",
    Obtain = "obtain",
    Recover = "recover",
    Reduce = "reduce",
}

export enum Condition {
    AfterDeath = "after death",
    AliveInBattle = "alive in battle",
    ConditionWhenAttacked = "When attacked",
    Every10LossInHealth = "Every 10% loss in health",
    NinjaAttack = "ninja attack",
    NinjaIsAlive = "ninja is alive",
    WhenAttacked = "when attacked",
}

export enum Time {
    AttackEnds = "attack ends",
    Battle = "battle",
    BattleEnds = "battle ends",
    For1Round = "for 1 round",
    For2Round = "for 2 round",
    For2Rounds = "for 2 rounds",
    For3Rounds = "for 3 rounds",
    For4Rounds = "for 4 rounds",
    HealthIsStillLosed = "health is still losed",
    MeanwhileAttack = "meanwhile attack",
    OncePerBattle = "once per battle",
}*/


export enum StatType {
    NormalAttack = "NORMAL_ATTACK",
    Skill = "SKILL",
    Talent = "TALENT",
}

export enum ChakraNature {
    Earth = "EARTH",
    Water = "WATER",
}

export enum Formation {
    Assaulter = "ASSAULTER",
    Support = "SUPPORT",
    Vanguard = "VANGUARD",
}

export enum Sex {
    Female = "FEMALE",
    Male = "MALE",
}

export interface Skill {
    nombre:     string;
    type:       StatType;
    skillText:  string;
    attributes: Attribute[];
}

export interface Attribute {
    attributeName: string;
    action:        string;
    impact:        string;
    value:         number;
    condition:     string;
    time:          string;
}

export interface NinjaStat {
    level:           string;
    statsAttributes: StatsAttribute[];
}

export interface StatsAttribute {
    attribute_name: AttributeName;
    value:          number;
}

export enum AttributeName {
    Agility = "agility",
    AgilityGrowthRate = "agility growth rate",
    Chakra = "chakra",
    ChakraGrowthRate = "chakra growth rate",
    Force = "force",
    ForceGrowthRate = "force growth rate",
    Power = "power",
    PowerGrowthRate = "power growth rate",
}

export enum NinjaType {
    Genjutsu = "GENJUTSU",
    Taijutsu = "TAIJUTSU",
}
