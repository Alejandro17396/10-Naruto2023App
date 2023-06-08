import { ICreateUserAccesorieSet, UserAccesorieSetDTO } from "src/app/accesories/interfaces/accesories.interfaces";
import { UserSetDTOResponse } from "src/app/sets/interfaces/set.interfaces";
import { ICreateUserSet } from '../../sets/interfaces/set.interfaces';


export interface NinjasResponsePaginated {
    number: number;
    ninjas: Ninja[];
}

export interface NinjaResponsePageable {
    content:          Ninja[];
    pageable:         Pageable;
    totalElements:    number;
    last:             boolean;
    totalPages:       number;
    sort:             Sort;
    numberOfElements: number;
    first:            boolean;
    size:             number;
    number:           number;
    empty:            boolean;
}

export interface Pageable {
    sort:       Sort;
    pageSize:   number;
    pageNumber: number;
    offset:     number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    sorted:   boolean;
    unsorted: boolean;
    empty:    boolean;
}

export interface Awakening {
    name:      string;
    type:      SkillType;
    level:     string;
    skillText: string;
    stats:     AwakeningStat[];
}

export interface AwakeningStat {
    name:          string;
    ninja:         string;
    level:         string;
    attributeName: string;
    type:          SkillType;
    action:        string;
    impact:        string;
    value:         number;
    condition:     string;
    time:          string;
}

export enum SkillType {
    NormalAttack = "NORMAL_ATTACK",
    Skill = "SKILL",
    Talent = "TALENT",
}

export enum ChakraNature {
    Earth = "EARTH",
    Water = "WATER",
    Unactivated = "UNACTIVATED",
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

export enum Action {
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

export interface Skill {
    nombre:     string;
    type:       SkillType;
    skillText:  string;
    attributes: Attribute[];
}

export class Attribute {

    //@JsonProperty('attributeName')
    attributeName: string;
    action:        string;
    impact:        string;
    value:         number;
    condition:     string;
    time?:          string;
    color?:        string;

    constructor(){
        this.attributeName= "";
        this.action= "";
        this.impact= "";
        this.value= 0;
        this.condition= "";
        this.time= "";
        this.color="green";
    }
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

/*export interface NinjaUserFormationDTO {
    id:                 number;
    nombre:             string;
    accesories:         UserAccesorieSetDTO | null;
    equipment:          UserSetDTOResponse | null;
    ninja:              Ninja;
    skill:              Skill;
    formation:          Formation;
    chakraNature:       ChakraNature;
    sex:                Sex | null;
    username:           string;
    selfBonusWithItems: StatsFinalResult |null;
    formationBonuses:   StatsFinalResult |null;
    totallyBonus:       StatsFinalResult |null;
}*/
export class NinjaUserFormationDTO {
    id?:                 number;
    nombre:             string;
    accesories:         UserAccesorieSetDTO ;
    equipment:          UserSetDTOResponse ;
    ninja:              Ninja ;
    skill?:              string;
    formation?:          Formation;
    chakraNature?:       string;
    sex?:                string;
    username?:           string;
    selfBonusWithItems: BonusWithItems[];
    formationBonuses?:   null;
    totallyBonus?:       null;

    constructor(){
        this.nombre = "";
        this.accesories ={
            nombre :"",
            partes:[],
            bonuses:[]
        }
        this.equipment = {
            nombre :"",
            partes:[],
            bonuses:[]
        }
        this.ninja = Ninja.createNinja();
        this.selfBonusWithItems = [];
    }
}

export interface DeleteNinjaUserDTO {
    code:       number;
    message:   string;
}

export interface ICreateUserNinja{
    id?:            number;
    name:           string;
    ninja:          string | undefined;
    skilltype?:     SkillType;
    chakraNature?:  string;
    accesories?:     ICreateUserAccesorieSet |undefined;
    set?:            ICreateUserSet |undefined;
}

export class NinjaFilter {
    filters:            Filter[];
    attributeFilters:   Filter[];
    order:              any[];
    ninjas:             any[];
    all:                boolean;
    formationNumNinjas: number;
    constructor(){
        this.filters = [];
        this.attributeFilters = [];
        this.order = [];
        this.ninjas = [];
        this.all=false;
        this.formationNumNinjas = 2;
    }
}

export interface Filter {
    type:          string;
    action:        string;
    impact:        string;
    attributeName: string;
    value:         number | undefined;
    time?:         string |null;
    self:          boolean;
    condition:     string | undefined;
    mandatory:     boolean;
}


export interface BonusWithItems {
    nombre:     string;
    listaBonus: Attribute2[];
}

export class Attribute2 {

    //@JsonProperty('attributeName')
    nombreAtributo: string;
    action:        string;
    impact:        string;
    valor:         number;
    condition:     string;
    time:          string;

    constructor(){
        this.nombreAtributo= "";
        this.action= "";
        this.impact= "";
        this.valor= 0;
        this.condition= "";
        this.time= "";
    }
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

export interface WrapEnumsDropdown{
    value:string;
}

export enum Target {
    AllEnemies = 'all enemies',
    AllAllies = 'all allies',
    EnemyLightningChakraNature = 'enemy lightning chakra nature',
    EnemyUnactivatedChakraNature = 'enemy unactivated chakra nature',
    EnemyWaterChakraNature = 'enemy water chakra nature',
    AllyLightningChakraNature = 'ally lightning chakra nature',
    AllAlliesExceptSelf = 'all allies (except self)',
    AllyWaterChakraNature = 'ally water chakra nature',
    EnemyFireChakraNature = 'enemy fire chakra nature',
    AllyFireChakraNature = 'ally fire chakra nature',
    EnemiesEarthChakraNature = 'enemies earth chakra nature',
    EnemiesFireChakraNature = 'enemies fire chakra nature',
    EnemiesWaterChakraNature = 'enemies water chakra nature',
    AllyAssaulters = 'ally Assaulters',
    AllyVanguard = 'ally Vanguard',
    Self = 'self',
    EnemyEarthChakraNature = 'enemy earth chakra nature',
    AllyEarthChakraNature = 'ally earth chakra nature',
    AllyWindChakraNature = 'ally wind chakra nature',
    EnemyWindChakraNature = 'enemy wind chakra nature',
    EnemySupport = 'enemy Support',
    EnemyVanguard = 'enemy vanguard',
    EnemyAssaulters = 'enemy assaulters',
    RandomEnemy = '1 random enemy',
    RandomEnemyDuplicate = '1 random enemy',
    EnemySupports = 'enemy Supports',
    TwoRandomEnemies = '2 random enemies',
    ThreeRandomAllies = '3 random allies',
    AllySupports = 'ally Supports',
    EnemieAssaulters = 'enemie Assaulters',
    EnemieSupports = 'enemie Supports',
    EnemieVanguard = 'enemie Vanguard',
    Attacker = 'attacker',
    HighestEnemyHP = 'highes enemy HP',
    AllAlliesExceptSelfDuplicate = 'all allies (except self)',
    ThreeRandomEnemies = '3 random enemies',
    EnemyUnactivedChakraNature = 'enemy unactived chakra nature',
    OneRandomEnemy = '1 random enemies',
    EnemysFireChakraNature = 'enemys fire chakra nature',
    EnemyMale = 'enemy male',
    EnemyLowestHP = 'enemy lowest HP',
    TwoRandomAllies = '2 random allies',
    AllEnemiesWithUnactivatedChakraNature = 'all enemies who have unactivated chakra nature',
    EnemiesSupports = 'enemies Supports'
  }
  

export class Ninja implements Ninja {
    constructor(
        public name: string,
        public chakraNature: ChakraNature,
        public type: NinjaType,
        public sex: Sex,
        public stats: NinjaStat[],
        public skills: Skill[],
        public awakenings: Awakening[],
        public formation: Formation
      ) {}

      static createNinja(){
        let url = {
            "name": "Animal Path",
            "chakraNature": "WATER",
            "type": "TAIJUTSU",
            "sex": "MALE",
            "stats": [
                {
                    "level": "120",
                    "statsAttributes": [
                        {
                            "attribute_name": "agility",
                            "value": 40000
                        },
                        {
                            "attribute_name": "agility growth rate",
                            "value": 40
                        },
                        {
                            "attribute_name": "chakra",
                            "value": 38000
                        },
                        {
                            "attribute_name": "chakra growth rate",
                            "value": 38
                        },
                        {
                            "attribute_name": "force",
                            "value": 25000
                        },
                        {
                            "attribute_name": "force growth rate",
                            "value": 25
                        },
                        {
                            "attribute_name": "power",
                            "value": 420000
                        },
                        {
                            "attribute_name": "power growth rate",
                            "value": 42
                        }
                    ]
                }
            ],
            "skills": [
                {
                    "nombre": "Psychic: Chameleon",
                    "type": "NORMAL_ATTACK",
                    "skillText": "Attack all enemis with 150% growth rate,recover all allies health rate by 120%,and triggers the following effects:1.Triggers following effects to enemy soil chakra ninja:Double attack with 400% rate(Physical attacks),100% chance to makes him enter seal state and upwind state for 2 round,disperse his other buff;2.Triggers following effects to enemy fire chakre ninja:Make physical penetrating damage with 100% rate,100% chance to makes him enter wind bond state and incinerate state with 120% rate for 2 round,decrease immune control rate by 30% for 2 round;3.Triggers following effects to enemy wind chakra ninja:Make strategy penetrating damage with 100% rate,100% chance to makes him enter freeze state and weak state for 2 round,decrease control rate by 30% for 2 round;4.Triggers following effects to enemy ray chakra ninja,water chakre ninja and no chakra ninja:Double attack with 400% rate(Strategy attacks),100% chance to makes him enter bind state for 2 round,decrease attack and denfense by 30% for 2 round;5.Triggers following effects to ally ray chakre ninja:Add upwind state for 2 round, increase crit rate by 30%(can be break), disperse debuff;6.Triggers following effects to ally water chakre ninja:Add bond state for 2 round,enter wind shield state for 2 round (10% rate).Increase 200% defense for 2 round;",
                    "attributes": [
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "enemy lightning chakra nature",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "enemy unactivated chakra nature",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "enemy water chakra nature",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "bind state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "bind state",
                            "action": "apply",
                            "impact": "enemy unactivated chakra nature",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "bind state",
                            "action": "apply",
                            "impact": "enemy water chakra nature",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "bond state",
                            "action": "apply",
                            "impact": "ally water chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "cc resistance",
                            "action": "decrease",
                            "impact": "enemy fire chakra nature",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "cc succes rate",
                            "action": "decrease",
                            "impact": "enemy wind chakra nature",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "critical chance(can surpass limit)",
                            "action": "increase",
                            "impact": "ally lightning chakra nature",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "decrease",
                            "impact": "enemy lightning chakra nature",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "decrease",
                            "impact": "enemy unactivated chakra nature",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "decrease",
                            "impact": "enemy water chakra nature",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally water chakra nature",
                            "value": 200,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freeze state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury shield",
                            "action": "apply",
                            "impact": "ally water chakra nature",
                            "value": 10,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 150,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 400,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 400,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactivated chakra nature",
                            "value": 400,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy water chakra nature",
                            "value": 400,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "health",
                            "action": "recover",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incinerate state with 120% rate",
                            "action": "apply",
                            "impact": "enemys fire chakra nature",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "physical penetrating damage with",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "enemy earth chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove debuffs",
                            "action": "apply",
                            "impact": "ally lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "seal state",
                            "action": "apply",
                            "impact": "enemy earth chakra nature",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "strategy penetrating damage with",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "upwind state",
                            "action": "apply",
                            "impact": "ally lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "upwind state",
                            "action": "apply",
                            "impact": "enemy earth chakra nature",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "wind bond state",
                            "action": "apply",
                            "impact": "enemy fire chakra nature",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "nombre": "PsychicHellhound",
                    "type": "SKILL",
                    "skillText": "Attack all enemis with 330% growth rate,30% chance to make self enter super dodge state for 2 round,50% chance to make ally Supports enter super dodge for 3 round.Increase all allies damage by 50%,and increase all allies immune damage rate for 3 round.Decrease all enemies damage rate by 50%,and immune damage rate for 3 round.Disperse all enemies buff and make them can be added any buff state for 3 round.",
                    "attributes": [
                        {
                            "attributeName": "avoid injury rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 50,
                            "condition": "ninja attack",
                            "time": "for 3 rounds"
                        },
                        {
                            "attributeName": "avoid injury rate",
                            "action": "increase",
                            "impact": "all allies",
                            "value": 50,
                            "condition": "ninja attack",
                            "time": "for 3 rounds"
                        },
                        {
                            "attributeName": "damage rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 50,
                            "condition": "ninja attack",
                            "time": "for 3 rounds"
                        },
                        {
                            "attributeName": "damage rate",
                            "action": "increase",
                            "impact": "all allies",
                            "value": 50,
                            "condition": "ninja attack",
                            "time": "for 3 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 330,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "super dodge state",
                            "action": "apply",
                            "impact": "ally Supports",
                            "value": 50,
                            "condition": "ninja attack",
                            "time": "for 3 rounds"
                        },
                        {
                            "attributeName": "super dodge state",
                            "action": "apply",
                            "impact": "self",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 3 rounds"
                        }
                    ]
                },
                {
                    "nombre": "Summoning Rinnegan",
                    "type": "TALENT",
                    "skillText": "Increases massive chakra, power,and health by percentage.Percentage increase 86% speed,65% damage rate and 65% immune damage rate.When this ninja in the formation,,increase all allies speed by 112% ,health by 30% and attack by 30%.Increase ally ray chakra ninja'swreck rate by 40%(Can be break),control rate by 30%,and finnal damage increase rate by 30%.Increase ally water chakra ninja's defense by 60%,finnal damage decrease rate by 25% and immune damage reate by 40%.Decrease all enemies attack by 30%.Natural ignore enemies 10% attack,55% control rate and 150% reflect damage rate,immune chaos,charm and death seed.",
                    "attributes": [
                        {
                            "attributeName": "attack",
                            "action": "increase",
                            "impact": "all allies",
                            "value": 30,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "reduce",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "avoid injury rate",
                            "action": "increase",
                            "impact": "ally water chakra nature",
                            "value": 40,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "avoid injury rate",
                            "action": "increase",
                            "impact": "self",
                            "value": 65,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "cc resistance",
                            "action": "increase",
                            "impact": "self",
                            "value": 55,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "cc succes rate",
                            "action": "increase",
                            "impact": "ally lightning chakra nature",
                            "value": 30,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "damage rate",
                            "action": "increase",
                            "impact": "self",
                            "value": 65,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally water chakra nature",
                            "value": 60,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "final damage decrease rate",
                            "action": "increase",
                            "impact": "ally water chakra nature",
                            "value": 25,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "final damage increase rate",
                            "action": "increase",
                            "impact": "ally lightning chakra nature",
                            "value": 30,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "HP",
                            "action": "increase",
                            "impact": "all allies",
                            "value": 30,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "ignores enemy attack",
                            "action": "increase",
                            "impact": "self",
                            "value": 10,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "immune to chaos",
                            "action": "obtain",
                            "impact": "self",
                            "value": 1,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "immune to charm",
                            "action": "obtain",
                            "impact": "self",
                            "value": 1,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "immune to death seed",
                            "action": "obtain",
                            "impact": "self",
                            "value": 1,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "massive chakra, power,and health by percentage",
                            "action": "increase",
                            "impact": "self",
                            "value": 1,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "reduce reflect damage",
                            "action": "increase",
                            "impact": "self",
                            "value": 150,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "s.attack(can break the limit)",
                            "action": "increase",
                            "impact": "ally lightning chakra nature",
                            "value": 40,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "all allies",
                            "value": 112,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "self",
                            "value": 86,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        }
                    ]
                }
            ],
            "awakenings": [
                {
                    "name": "PsychicPanda",
                    "type": "TALENT",
                    "level": "1ri",
                    "skillText": "Increase Block rate by 30%(Can break upper limit)",
                    "stats": [
                        {
                            "name": "PsychicPanda",
                            "ninja": "Animal Path",
                            "level": "1ri",
                            "attributeName": "block(can surpass limit)",
                            "type": "TALENT",
                            "action": "increase",
                            "impact": "self",
                            "value": 30,
                            "condition": "ninja is alive",
                            "time": "battle ends"
                        }
                    ]
                }
            ],
            "formation": "VANGUARD"
        };
      return Object.assign(new Ninja("",ChakraNature.Earth, NinjaType.Taijutsu,Sex.Female,[],[],[],Formation.Vanguard), url);
    }
}