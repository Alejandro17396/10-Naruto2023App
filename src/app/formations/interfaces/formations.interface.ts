import { Attribute, ICreateUserNinja, Ninja, NinjaFilter, NinjaUserFormationDTO } from "src/app/ninjas/interfaces/Ninja.interfaces";

export interface FormationResponsePaginated {
    numFormations: number;
    formations:    FormationElement[];
}

export interface ActionToDo{

    save:boolean;
    update:boolean;
    exit:boolean;
}

export interface DeleteUserFormationDTO {
    code:       number;
    message:   string;
}

export interface ICreateFormation {
    name:   string;
    ninjas: ICreateUserNinja[];
}

export interface UserFormationDTO {
    id:     number;
    name:   string;
    user:   string;
    ninjas: NinjaUserFormationDTO[];
    supports?:NinjaUserFormationDTO[];
    assaulters?:NinjaUserFormationDTO[];
    vanguards?:NinjaUserFormationDTO[];
    mergedTalentAttributes?: Attribute[];
    finalSkillsAttributes?:  FinalSkillsAttribute[];
}

export interface FinalSkillsAttribute {
    ninjaFormation:    string;
    ninjasAttackOrder: string[];
    attributes:        Attribute[];
}

export interface CompareFormations{
    formationLeft:FormationElement|undefined;
    formationRight:FormationElement|undefined;
}

export interface SearchFormationFilter{
    filter:NinjaFilter,
    sorted:boolean,
    filtred:boolean,
    awakening:boolean,
    or:boolean
}

export class FormationElement {
    formationNinjas:        string;
    supports:               Ninja[];
    assaulters:             Ninja[];
    vanguards:              Ninja[];
    mergedTalentAttributes: Attribute[];
    finalSkillsAttributes:  FinalSkillsAttribute[];
    
    constructor(){
        this.formationNinjas ="";
        this.supports = [];
        this.assaulters = [];
        this.vanguards = [];
        this.mergedTalentAttributes = [];
        this.finalSkillsAttributes = [];
    }

    static createFormation(){
        let url ={
            "formationNinjas": "Kurotsuchi,Hidan,Hotaru,Jiongu Kakuzu",
            "supports": [
                {
                    "name": "Kurotsuchi",
                    "chakraNature": "WATER",
                    "type": "GENJUTSU",
                    "sex": "FEMALE",
                    "stats": [
                        {
                            "level": "120",
                            "statsAttributes": [
                                {
                                    "attribute_name": "agility",
                                    "value": 38000
                                },
                                {
                                    "attribute_name": "agility growth rate",
                                    "value": 38
                                },
                                {
                                    "attribute_name": "chakra",
                                    "value": 40000
                                },
                                {
                                    "attribute_name": "chakra growth rate",
                                    "value": 40
                                },
                                {
                                    "attribute_name": "force",
                                    "value": 22000
                                },
                                {
                                    "attribute_name": "force growth rate",
                                    "value": 22
                                },
                                {
                                    "attribute_name": "power",
                                    "value": 450000
                                },
                                {
                                    "attribute_name": "power growth rate",
                                    "value": 45
                                }
                            ]
                        }
                    ],
                    "skills": [
                        {
                            "nombre": "Earth Release Ultra-Added-Weight Rock",
                            "type": "SKILL",
                            "skillText": "attack all enemies with growth rate 250%, has 90% chance to make enemies enter control state for 2 rounds (appear one of imprision and freeze, one of petrification and collapse) make enemy support enter weak state for 2 rounds, decrease enemies attack and punch rate by 30% for 2 rounds, increase allies support 200% defence for 2 rounds, dispel all enemies buff, recover 68 fury for self and 30 for others",
                            "attributes": [
                                {
                                    "attributeName": "growth rate",
                                    "action": "attack",
                                    "impact": "all enemies",
                                    "value": 250,
                                    "condition": "ninja attack",
                                    "time": "meanwhile attack"
                                },
                                {
                                    "attributeName": "petrification",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 90,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "defense",
                                    "action": "increase",
                                    "impact": "ally Supports",
                                    "value": 200,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "attack",
                                    "action": "decrease",
                                    "impact": "all enemies",
                                    "value": 30,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
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
                                    "attributeName": "fury",
                                    "action": "increase",
                                    "impact": "all allies (except self)",
                                    "value": 30,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "freze",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 90,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "fury",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 68,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "weak state",
                                    "action": "apply",
                                    "impact": "enemy supports",
                                    "value": 1,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "collapse",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 90,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "punch rate",
                                    "action": "decrease",
                                    "impact": "all enemies",
                                    "value": 30,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "imprision",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 90,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                }
                            ]
                        },
                        {
                            "nombre": "Lava Release",
                            "type": "TALENT",
                            "skillText": "Increase massive agility, spirit, and health by percentage, born with 92% speed, 60% damage rate and 70% immune damage rate. When this ninja is in battle, increase all allies speed by 116%. hp by 30% immune damage rate by 40% and defence , increase allies assaulters and supports immune penetrate rate by 30%, decrease enemies support control rate by 20%, after be attacked recover all allies hp rate by 40% and has 30% chance to make self and vanguard enter immune control state for 2 rounds. Natural immune enemies ignore defence rate by 40%, Immune chaos, charm and death seed",
                            "attributes": [
                                {
                                    "attributeName": "cc succes rate",
                                    "action": "decrease",
                                    "impact": "enemy Support",
                                    "value": 20,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "damage rate",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 60,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "immune imprision",
                                    "action": "apply",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "massive agility, spirit, and health by percentage",
                                    "action": "increase",
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
                                    "attributeName": "speed %",
                                    "action": "increase",
                                    "impact": "all allies",
                                    "value": 116,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "inmune penetrate",
                                    "action": "increase",
                                    "impact": "ally Supports",
                                    "value": 30,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "hp rate",
                                    "action": "recover",
                                    "impact": "all allies",
                                    "value": 40,
                                    "condition": "when attacked",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "remove debuffs",
                                    "action": "apply",
                                    "impact": "self",
                                    "value": 50,
                                    "condition": "when attacked",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "avoid injury rate",
                                    "action": "increase",
                                    "impact": "all allies",
                                    "value": 40,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "defense",
                                    "action": "increase",
                                    "impact": "all allies",
                                    "value": 40,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "inmune penetrate",
                                    "action": "increase",
                                    "impact": "ally Assaulters",
                                    "value": 30,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "resistance",
                                    "action": "obtain",
                                    "impact": "self",
                                    "value": 40,
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
                                    "attributeName": "immune to death seed",
                                    "action": "obtain",
                                    "impact": "self",
                                    "value": 1,
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
                                    "attributeName": "immune control state",
                                    "action": "apply",
                                    "impact": "ally Vanguard",
                                    "value": 1,
                                    "condition": "when attacked",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "immune control state",
                                    "action": "apply",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "when attacked",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "speed %",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 92,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "avoid injury rate",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 70,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                }
                            ]
                        }
                    ],
                    "awakenings": [
                        {
                            "name": "Earth Style Wall",
                            "type": "TALENT",
                            "level": "1ri",
                            "skillText": "after be attacked has 50% chance to dispel self debuff, immune imprision",
                            "stats": [
                                {
                                    "name": "Earth Style Wall",
                                    "ninja": "Kurotsuchi",
                                    "level": "1ri",
                                    "attributeName": "immune imprision",
                                    "type": "TALENT",
                                    "action": "apply",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "name": "Earth Style Wall",
                                    "ninja": "Kurotsuchi",
                                    "level": "1ri",
                                    "attributeName": "remove debuffs",
                                    "type": "TALENT",
                                    "action": "apply",
                                    "impact": "self",
                                    "value": 50,
                                    "condition": "when attacked",
                                    "time": "attack ends"
                                }
                            ]
                        }
                    ],
                    "formation": "SUPPORT"
                },
                {
                    "name": "Hidan",
                    "chakraNature": "WATER",
                    "type": "GENJUTSU",
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
                                    "value": 36000
                                },
                                {
                                    "attribute_name": "chakra growth rate",
                                    "value": 36
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
                                    "value": 440000
                                },
                                {
                                    "attribute_name": "power growth rate",
                                    "value": 44
                                }
                            ]
                        }
                    ],
                    "skills": [
                        {
                            "nombre": "Immortality",
                            "type": "TALENT",
                            "skillText": "Increases massive agility, chakra, and health by percentage, naturally has 92% speed, 65% damage rate, and 65% avoid-injury rate. When this ninja is alive in battle, \nincreases all allies speed by 116%, health by 40%, attack by 25%, final damage reduction by 15%, ally vanguard and assaulters block rate by 35% (can break limit), \ndecreases enemy damage rate (vanguard/assaulter/support) by 25%/50%/30%. After death, will revive with 80% health, activates once per battle. Naturally immune to 30% penetration damage and increases self health by 30%.\n Immune to seal, blind, and death seed",
                            "attributes": [
                                {
                                    "attributeName": "damage rate",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 65,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "immune to blind",
                                    "action": "obtain",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "cc resistance",
                                    "action": "increase",
                                    "impact": "ally fire chakra nature",
                                    "value": 25,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "block rate (can break the limit)",
                                    "action": "increase",
                                    "impact": "ally Vanguard",
                                    "value": 35,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "HP",
                                    "action": "increase",
                                    "impact": "all allies",
                                    "value": 40,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "speed %",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 92,
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
                                    "attributeName": "final damage reduction",
                                    "action": "increase",
                                    "impact": "all allies",
                                    "value": 15,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "block rate (can break the limit)",
                                    "action": "increase",
                                    "impact": "ally Assaulters",
                                    "value": 35,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "damage rate",
                                    "action": "decrease",
                                    "impact": "enemy Assaulters",
                                    "value": 50,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "receive penetration damage",
                                    "action": "decrease",
                                    "impact": "self",
                                    "value": 30,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "revive with 80% hp",
                                    "action": "apply",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "after death",
                                    "time": "once per battle"
                                },
                                {
                                    "attributeName": "immune to seal",
                                    "action": "obtain",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "cc resistance",
                                    "action": "increase",
                                    "impact": "ally earth chakra nature",
                                    "value": 25,
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
                                    "attributeName": "speed %",
                                    "action": "increase",
                                    "impact": "all allies",
                                    "value": 116,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "damage rate",
                                    "action": "decrease",
                                    "impact": "enemy Vanguard",
                                    "value": 25,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "HP",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 30,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "damage rate",
                                    "action": "decrease",
                                    "impact": "enemy Supports",
                                    "value": 30,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "attack",
                                    "action": "increase",
                                    "impact": "all allies",
                                    "value": 25,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "massive agility, chakra, and health by percentage",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                }
                            ]
                        },
                        {
                            "nombre": "Jujutsu: Shiji Hyketsu",
                            "type": "SKILL",
                            "skillText": " Attacks all enemies with growth rate of 350%, makes all enemies enter bleed (DOT) status with 120% growth rate, 90% chance to make enemies enter chaos, \nhas 100% chance to make enemies enter disable status for 2 rounds, enemy assaulters unable to gain buffs for 2 rounds, increase ally vanguard speed by 40% for 2 rounds. Recovers self fury by 68, \nrecovers all allies fury (expect self) by 30",
                            "attributes": [
                                {
                                    "attributeName": "fury",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 68,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "growth rate",
                                    "action": "attack",
                                    "impact": "all enemies",
                                    "value": 350,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "disable state",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 100,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "speed %",
                                    "action": "increase",
                                    "impact": "ally Vanguard",
                                    "value": 40,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "chaos",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 90,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "unable gain buffs state",
                                    "action": "apply",
                                    "impact": "enemy Assaulters",
                                    "value": 1,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "DOT status",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 120,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "fury",
                                    "action": "increase",
                                    "impact": "all allies (except self)",
                                    "value": 30,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                }
                            ]
                        }
                    ],
                    "awakenings": [
                        {
                            "name": "Awaken Immortality",
                            "type": "TALENT",
                            "level": "1ri",
                            "skillText": "increase ally fire chakra and earth chakra ninjas CC resistance rate by 25%",
                            "stats": [
                                {
                                    "name": "Awaken Immortality",
                                    "ninja": "Hidan",
                                    "level": "1ri",
                                    "attributeName": "cc resistance",
                                    "type": "TALENT",
                                    "action": "increase",
                                    "impact": "ally earth chakra nature",
                                    "value": 25,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "name": "Awaken Immortality",
                                    "ninja": "Hidan",
                                    "level": "1ri",
                                    "attributeName": "cc resistance",
                                    "type": "TALENT",
                                    "action": "increase",
                                    "impact": "ally fire chakra nature",
                                    "value": 25,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                }
                            ]
                        }
                    ],
                    "formation": "SUPPORT"
                }
            ],
            "assaulters": [
                {
                    "name": "Hotaru",
                    "chakraNature": "WATER",
                    "type": "TAIJUTSU",
                    "sex": "FEMALE",
                    "stats": [
                        {
                            "level": "120",
                            "statsAttributes": [
                                {
                                    "attribute_name": "agility",
                                    "value": 38000
                                },
                                {
                                    "attribute_name": "agility growth rate",
                                    "value": 38
                                },
                                {
                                    "attribute_name": "chakra",
                                    "value": 25000
                                },
                                {
                                    "attribute_name": "chakra growth rate",
                                    "value": 258
                                },
                                {
                                    "attribute_name": "force",
                                    "value": 40000
                                },
                                {
                                    "attribute_name": "force growth rate",
                                    "value": 40
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
                            "nombre": "Halloween: Call of Dracula",
                            "type": "NORMAL_ATTACK",
                            "skillText": "attacks 3 random enemies with 450% growth rate, removes all enemies buffs, will cause 1 random enemy that was attacked to enter charm for 2 rounds, \n35% chance to make another target enter charm for 2 rounds. Makes all enemies enter safeguard with 120% growth rate for 2 rounds, decreases all enemies S. attack rate by 30% for 2 rounds.\n(Charm: increase 160% of fury shield and damage rate, chaos effect, cannot be dispelled)",
                            "attributes": [
                                {
                                    "attributeName": "remove buffs",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 1,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "safeguard state(DOT)",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 120,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "growth rate",
                                    "action": "attack",
                                    "impact": "3 random enemies",
                                    "value": 450,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "s.attack rate",
                                    "action": "decrease",
                                    "impact": "all enemies",
                                    "value": 30,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "charm state",
                                    "action": "apply",
                                    "impact": "1 random enemy",
                                    "value": 35,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "charm state",
                                    "action": "apply",
                                    "impact": "1 random enemy ",
                                    "value": 1,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                }
                            ]
                        },
                        {
                            "nombre": "Treat or wack",
                            "type": "SKILL",
                            "skillText": "attacks all enemies with 300% growth rate, makes all enemies enter incarnate for 120% growth rate and unable to gain buffs for 2 rounds, \nrecovers all allies health by 100% growth rate, increases 3 random allies defense by 500% for 2 rounds, decreases enemies attack by 30% for 2 rounds , recovers all allies (except self) fury by 100",
                            "attributes": [
                                {
                                    "attributeName": "incarnate state(DOT)",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 120,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "defense",
                                    "action": "increase",
                                    "impact": "3 random allies",
                                    "value": 500,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "health by",
                                    "action": "recover",
                                    "impact": "all allies",
                                    "value": 100,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "growth rate",
                                    "action": "attack",
                                    "impact": "all enemies",
                                    "value": 300,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "unable gain buffs state",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 1,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "fury",
                                    "action": "increase",
                                    "impact": "all allies (except self)",
                                    "value": 100,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "attack",
                                    "action": "decrease",
                                    "impact": "all enemies",
                                    "value": 30,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                }
                            ]
                        },
                        {
                            "nombre": "Wild Water Wave",
                            "type": "TALENT",
                            "skillText": "Increases massive agility, health and force by percentage. Increase 86% speed, 70% damage rate and 60% immune damage rate by percentage. \nWhen this ninja is in battle increase all allies speed by 112%, and damage rate by 25%, also increases all allies health by (vanguard/assaulter/support) 30%/30%/40%, all allies defense by \n(vanguard/assaulter/support) 35%/35%/50%,decrease all enemies attack by 30%. Natural ignores enemies 10% attack, 55% control rate and 150% reflect damage,inmune to chaos, immune to charm and death seed.",
                            "attributes": [
                                {
                                    "attributeName": "immune to death seed",
                                    "action": "obtain",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "super flash",
                                    "action": "apply",
                                    "impact": "ally Supports",
                                    "value": 30,
                                    "condition": "ninja is alive",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "attack",
                                    "action": "decrease",
                                    "impact": "all enemies",
                                    "value": 30,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "massive agility, health and force by percentage",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "inmune to chaos",
                                    "action": "obtain",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "damage rate",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 60,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "heal rate",
                                    "action": "increase",
                                    "impact": "all allies",
                                    "value": 40,
                                    "condition": "ninja is alive",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "ignore enemy attack",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 10,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "HP",
                                    "action": "increase",
                                    "impact": "ally Assaulters",
                                    "value": 30,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "HP",
                                    "action": "increase",
                                    "impact": "ally Supports",
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
                                },
                                {
                                    "attributeName": "reduce damage reflect",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 150,
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
                                    "attributeName": "defense",
                                    "action": "increase",
                                    "impact": "ally Vanguard",
                                    "value": 35,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "avoid injury rate",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 70,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "defense",
                                    "action": "increase",
                                    "impact": "ally Assaulters",
                                    "value": 35,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "defense",
                                    "action": "increase",
                                    "impact": "ally Supports",
                                    "value": 50,
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
                                    "attributeName": "HP",
                                    "action": "increase",
                                    "impact": "ally Vanguard",
                                    "value": 30,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "damage rate",
                                    "action": "increase",
                                    "impact": "all allies",
                                    "value": 25,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                }
                            ]
                        }
                    ],
                    "awakenings": [
                        {
                            "name": "Awaken Trick or Treat",
                            "type": "TALENT",
                            "level": "1ri",
                            "skillText": "When attacked. has 30% chance to make ally Supports enter super flash for 2 rounds, increase all allies heal rate by 40%",
                            "stats": [
                                {
                                    "name": "Awaken Trick or Treat",
                                    "ninja": "Hotaru",
                                    "level": "1ri",
                                    "attributeName": "heal rate",
                                    "type": "TALENT",
                                    "action": "increase",
                                    "impact": "all allies",
                                    "value": 40,
                                    "condition": "ninja is alive",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "name": "Awaken Trick or Treat",
                                    "ninja": "Hotaru",
                                    "level": "1ri",
                                    "attributeName": "super flash",
                                    "type": "TALENT",
                                    "action": "apply",
                                    "impact": "ally Supports",
                                    "value": 30,
                                    "condition": "ninja is alive",
                                    "time": "for 2 rounds"
                                }
                            ]
                        }
                    ],
                    "formation": "ASSAULTER"
                }
            ],
            "vanguards": [
                {
                    "name": "Jiongu Kakuzu",
                    "chakraNature": "EARTH",
                    "type": "TAIJUTSU",
                    "sex": "MALE",
                    "stats": [
                        {
                            "level": "120",
                            "statsAttributes": [
                                {
                                    "attribute_name": "agility",
                                    "value": 36000
                                },
                                {
                                    "attribute_name": "agility growth rate",
                                    "value": 36
                                },
                                {
                                    "attribute_name": "chakra",
                                    "value": 27000
                                },
                                {
                                    "attribute_name": "chakra growth rate",
                                    "value": 27
                                },
                                {
                                    "attribute_name": "force",
                                    "value": 39000
                                },
                                {
                                    "attribute_name": "force growth rate",
                                    "value": 39
                                },
                                {
                                    "attribute_name": "power",
                                    "value": 430000
                                },
                                {
                                    "attribute_name": "power growth rate",
                                    "value": 43
                                }
                            ]
                        }
                    ],
                    "skills": [
                        {
                            "nombre": "Five Natures",
                            "type": "TALENT",
                            "skillText": "Increases massive agility, health, and force by percentage, increases speed by 86%, damage rate by 70%, and avoid-injury rate by 65%. \nWhen this ninja is in battle, increase all allies speed by 112% and health by 30%, increase all ally earth chakra and wind chakra ninjas avoid-injury rate by 35% and health by 20%, \nincrease all ally lightning and fire chakra ninjas damage rate by 40% and punch rate by 20%, increase all ally water chakra ninjas defence by 35% and attack by 35%. \nEvery 10% health lost increases all allies (expect self) attack by 5% and defence by 10%. After death, will revive with 80% health, activates once per battle. \nAfter being attacked, has 50% chance to make attacker enter poisonous wind status for 2 rounds, and has 50% chance to make self enter breaking wind status for 2 rounds. \nIgnores enemies control rate by 60% and reflective damage by 150%. Immune to seal, fury reduction, and death seed\nPoisonous Wind: Unable to attack for 1 round, reduces 30% of current health, cannot be dispelled ",
                            "attributes": [
                                {
                                    "attributeName": "damage rate",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 70,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "crit rate",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 30,
                                    "condition": "alive in battle",
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
                                    "attributeName": "defense",
                                    "action": "increase",
                                    "impact": "all allies (excep self)",
                                    "value": 10,
                                    "condition": "Every 10% loss in health",
                                    "time": "health is still losed"
                                },
                                {
                                    "attributeName": "punch rate",
                                    "action": "increase",
                                    "impact": "ally lightning chakra nature",
                                    "value": 20,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "massive agility, health, and force by percentage",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "punch rate",
                                    "action": "increase",
                                    "impact": "ally fire chakra nature",
                                    "value": 20,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "HP",
                                    "action": "increase",
                                    "impact": "ally wind chakra nature",
                                    "value": 20,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "block rate",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 30,
                                    "condition": "alive in battle",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "avoid injury rate",
                                    "action": "increase",
                                    "impact": "ally wind chakra nature",
                                    "value": 35,
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
                                },
                                {
                                    "attributeName": "immune to seal state",
                                    "action": "obtain",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "cc resistance",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 60,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "damage rate",
                                    "action": "increase",
                                    "impact": "ally lightning chakra nature",
                                    "value": 40,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "damage rate",
                                    "action": "increase",
                                    "impact": "ally fire chakra nature",
                                    "value": 40,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "avoid injury rate",
                                    "action": "increase",
                                    "impact": "ally earth chakra nature",
                                    "value": 35,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "attack",
                                    "action": "increase",
                                    "impact": "ally water chakra nature",
                                    "value": 35,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "immune to fury reduction",
                                    "action": "obtain",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "defense",
                                    "action": "increase",
                                    "impact": "ally water chakra nature",
                                    "value": 35,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "reduce damage reflect",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 150,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "breaking wind status",
                                    "action": "apply",
                                    "impact": "self",
                                    "value": 50,
                                    "condition": "when attacked",
                                    "time": "for 2 rounds"
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
                                    "attributeName": "speed %",
                                    "action": "increase",
                                    "impact": "all allies",
                                    "value": 112,
                                    "condition": "ninja is alive",
                                    "time": "battle ends"
                                },
                                {
                                    "attributeName": "revive with 80% hp",
                                    "action": "apply",
                                    "impact": "self",
                                    "value": 1,
                                    "condition": "after death",
                                    "time": "once per battle"
                                },
                                {
                                    "attributeName": "poisonous state",
                                    "action": "apply",
                                    "impact": "attacker",
                                    "value": 50,
                                    "condition": "when attacked",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "attack",
                                    "action": "increase",
                                    "impact": "all allies (excep self)",
                                    "value": 5,
                                    "condition": "Every 10% loss in health",
                                    "time": "health is still losed"
                                },
                                {
                                    "attributeName": "HP",
                                    "action": "increase",
                                    "impact": "ally earth chakra nature",
                                    "value": 20,
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
                                }
                            ]
                        },
                        {
                            "nombre": "Jiongu Kimen no Bakuen",
                            "type": "SKILL",
                            "skillText": "Attack all enemies wind/earth/fire/lightning/water chakra ninjas by 450%/450%/300%/300%/400% growth rates, \nattacks unactivated chakra nature ninjas by 500% growth rate. Make enemies enter split, incarnate, and burst state for 2 rounds with growth rate of 120%,\nmakes enemy lightning and wind chakra ninjas enter weakened state for 2 rounds, dispell all enemies buffs, increase all ally assaulter and support defence by 80% for 2 rounds. \nRecovers self fury by 68, recovers all allies (expect self) fury by 30.",
                            "attributes": [
                                {
                                    "attributeName": "defense",
                                    "action": "increase",
                                    "impact": "ally Supports",
                                    "value": 80,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "growth rate",
                                    "action": "attack",
                                    "impact": "enemy unactived chakra nature",
                                    "value": 500,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "growth rate",
                                    "action": "attack",
                                    "impact": "enemy wind chakra nature",
                                    "value": 450,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "incarnate state(DOT)",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 120,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
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
                                    "attributeName": "growth rate",
                                    "action": "attack",
                                    "impact": "enemy fire chakra nature",
                                    "value": 300,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "fury",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 68,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "split state(DOT)",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 120,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "defense",
                                    "action": "increase",
                                    "impact": "ally Assaulters",
                                    "value": 80,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "weakened state",
                                    "action": "apply",
                                    "impact": "enemy lightning chakra nature",
                                    "value": 1,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "fury",
                                    "action": "increase",
                                    "impact": "all allies (except self)",
                                    "value": 30,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "burst state(DOT)",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 120,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "weakened state",
                                    "action": "apply",
                                    "impact": "enemy wind chakra nature",
                                    "value": 1,
                                    "condition": "ninja attack",
                                    "time": "for 2 rounds"
                                },
                                {
                                    "attributeName": "growth rate",
                                    "action": "attack",
                                    "impact": "enemy lightning chakra nature",
                                    "value": 300,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "growth rate",
                                    "action": "attack",
                                    "impact": "enemy earth chakra nature",
                                    "value": 450,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                },
                                {
                                    "attributeName": "remove buffs",
                                    "action": "apply",
                                    "impact": "all enemies",
                                    "value": 1,
                                    "condition": "ninja attack",
                                    "time": "attack ends"
                                }
                            ]
                        }
                    ],
                    "awakenings": [
                        {
                            "name": "Awaken Immortal Fighter",
                            "type": "TALENT",
                            "level": "1ri",
                            "skillText": "Naturally has 30% block rate and 30% crit rate",
                            "stats": [
                                {
                                    "name": "Awaken Immortal Fighter",
                                    "ninja": "Jiongu Kakuzu",
                                    "level": "1ri",
                                    "attributeName": "block rate",
                                    "type": "TALENT",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 30,
                                    "condition": "alive in battle",
                                    "time": "battle ends"
                                },
                                {
                                    "name": "Awaken Immortal Fighter",
                                    "ninja": "Jiongu Kakuzu",
                                    "level": "1ri",
                                    "attributeName": "crit rate",
                                    "type": "TALENT",
                                    "action": "increase",
                                    "impact": "self",
                                    "value": 30,
                                    "condition": "alive in battle",
                                    "time": "battle ends"
                                }
                            ]
                        }
                    ],
                    "formation": "VANGUARD"
                }
            ],
            "mergedTalentAttributes": [
                {
                    "attributeName": "cc succes rate",
                    "action": "decrease",
                    "impact": "enemy Support",
                    "value": 20,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "speed %",
                    "action": "increase",
                    "impact": "all allies",
                    "value": 456,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "inmune penetrate",
                    "action": "increase",
                    "impact": "ally Supports",
                    "value": 30,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "hp rate",
                    "action": "recover",
                    "impact": "all allies",
                    "value": 40,
                    "condition": "when attacked",
                    "time": "attack ends"
                },
                {
                    "attributeName": "avoid injury rate",
                    "action": "increase",
                    "impact": "all allies",
                    "value": 40,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "defense",
                    "action": "increase",
                    "impact": "all allies",
                    "value": 40,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "inmune penetrate",
                    "action": "increase",
                    "impact": "ally Assaulters",
                    "value": 30,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "HP",
                    "action": "increase",
                    "impact": "all allies",
                    "value": 100,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "immune control state",
                    "action": "apply",
                    "impact": "ally Vanguard",
                    "value": 1,
                    "condition": "when attacked",
                    "time": "for 2 rounds"
                },
                {
                    "attributeName": "cc resistance",
                    "action": "increase",
                    "impact": "ally fire chakra nature",
                    "value": 25,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "block rate (can break the limit)",
                    "action": "increase",
                    "impact": "ally Vanguard",
                    "value": 35,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "final damage reduction",
                    "action": "increase",
                    "impact": "all allies",
                    "value": 15,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "block rate (can break the limit)",
                    "action": "increase",
                    "impact": "ally Assaulters",
                    "value": 35,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "damage rate",
                    "action": "decrease",
                    "impact": "enemy Assaulters",
                    "value": 50,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "cc resistance",
                    "action": "increase",
                    "impact": "ally earth chakra nature",
                    "value": 25,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "damage rate",
                    "action": "decrease",
                    "impact": "enemy Vanguard",
                    "value": 25,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "damage rate",
                    "action": "decrease",
                    "impact": "enemy Supports",
                    "value": 30,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "attack",
                    "action": "increase",
                    "impact": "all allies",
                    "value": 25,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "super flash",
                    "action": "apply",
                    "impact": "ally Supports",
                    "value": 30,
                    "condition": "ninja is alive",
                    "time": "for 2 rounds"
                },
                {
                    "attributeName": "attack",
                    "action": "decrease",
                    "impact": "all enemies",
                    "value": 30,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "heal rate",
                    "action": "increase",
                    "impact": "all allies",
                    "value": 40,
                    "condition": "ninja is alive",
                    "time": "for 2 rounds"
                },
                {
                    "attributeName": "HP",
                    "action": "increase",
                    "impact": "ally Assaulters",
                    "value": 130,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "HP",
                    "action": "increase",
                    "impact": "ally Supports",
                    "value": 140,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "defense",
                    "action": "increase",
                    "impact": "ally Vanguard",
                    "value": 75,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "defense",
                    "action": "increase",
                    "impact": "ally Assaulters",
                    "value": 75,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "defense",
                    "action": "increase",
                    "impact": "ally Supports",
                    "value": 90,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "HP",
                    "action": "increase",
                    "impact": "ally Vanguard",
                    "value": 130,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "damage rate",
                    "action": "increase",
                    "impact": "all allies",
                    "value": 25,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "defense",
                    "action": "increase",
                    "impact": "all allies (excep self)",
                    "value": 10,
                    "condition": "Every 10% loss in health",
                    "time": "health is still losed"
                },
                {
                    "attributeName": "punch rate",
                    "action": "increase",
                    "impact": "ally lightning chakra nature",
                    "value": 20,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "punch rate",
                    "action": "increase",
                    "impact": "ally fire chakra nature",
                    "value": 20,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "HP",
                    "action": "increase",
                    "impact": "ally wind chakra nature",
                    "value": 120,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "avoid injury rate",
                    "action": "increase",
                    "impact": "ally wind chakra nature",
                    "value": 75,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "damage rate",
                    "action": "increase",
                    "impact": "ally lightning chakra nature",
                    "value": 65,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "damage rate",
                    "action": "increase",
                    "impact": "ally fire chakra nature",
                    "value": 65,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "avoid injury rate",
                    "action": "increase",
                    "impact": "ally earth chakra nature",
                    "value": 75,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "attack",
                    "action": "increase",
                    "impact": "ally water chakra nature",
                    "value": 60,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "defense",
                    "action": "increase",
                    "impact": "ally water chakra nature",
                    "value": 75,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "poisonous state",
                    "action": "apply",
                    "impact": "attacker",
                    "value": 50,
                    "condition": "when attacked",
                    "time": "for 2 rounds"
                },
                {
                    "attributeName": "attack",
                    "action": "increase",
                    "impact": "all allies (excep self)",
                    "value": 5,
                    "condition": "Every 10% loss in health",
                    "time": "health is still losed"
                },
                {
                    "attributeName": "HP",
                    "action": "increase",
                    "impact": "ally earth chakra nature",
                    "value": 120,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                },
                {
                    "attributeName": "damage rate",
                    "action": "decrease",
                    "impact": "all enemies",
                    "value": 25,
                    "condition": "ninja is alive",
                    "time": "battle ends"
                }
            ],
            "finalSkillsAttributes": [
                {
                    "ninjaFormation": "Kurotsuchi,Hidan,Hotaru,Jiongu Kakuzu",
                    "ninjasAttackOrder": [
                        "Kurotsuchi",
                        "Hidan",
                        "Hotaru",
                        "Jiongu Kakuzu"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Kurotsuchi,Hidan,Jiongu Kakuzu,Hotaru",
                    "ninjasAttackOrder": [
                        "Kurotsuchi",
                        "Hidan",
                        "Jiongu Kakuzu",
                        "Hotaru"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Kurotsuchi,Hotaru,Hidan,Jiongu Kakuzu",
                    "ninjasAttackOrder": [
                        "Kurotsuchi",
                        "Hotaru",
                        "Hidan",
                        "Jiongu Kakuzu"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 350,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Kurotsuchi,Hotaru,Jiongu Kakuzu,Hidan",
                    "ninjasAttackOrder": [
                        "Kurotsuchi",
                        "Hotaru",
                        "Jiongu Kakuzu",
                        "Hidan"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 350,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Kurotsuchi,Jiongu Kakuzu,Hidan,Hotaru",
                    "ninjasAttackOrder": [
                        "Kurotsuchi",
                        "Jiongu Kakuzu",
                        "Hidan",
                        "Hotaru"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Kurotsuchi,Jiongu Kakuzu,Hotaru,Hidan",
                    "ninjasAttackOrder": [
                        "Kurotsuchi",
                        "Jiongu Kakuzu",
                        "Hotaru",
                        "Hidan"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 350,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Hidan,Kurotsuchi,Hotaru,Jiongu Kakuzu",
                    "ninjasAttackOrder": [
                        "Hidan",
                        "Kurotsuchi",
                        "Hotaru",
                        "Jiongu Kakuzu"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Hidan,Kurotsuchi,Jiongu Kakuzu,Hotaru",
                    "ninjasAttackOrder": [
                        "Hidan",
                        "Kurotsuchi",
                        "Jiongu Kakuzu",
                        "Hotaru"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Hidan,Hotaru,Kurotsuchi,Jiongu Kakuzu",
                    "ninjasAttackOrder": [
                        "Hidan",
                        "Hotaru",
                        "Kurotsuchi",
                        "Jiongu Kakuzu"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 250,
                            "condition": "ninja attack",
                            "time": "meanwhile attack"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Hidan,Hotaru,Jiongu Kakuzu,Kurotsuchi",
                    "ninjasAttackOrder": [
                        "Hidan",
                        "Hotaru",
                        "Jiongu Kakuzu",
                        "Kurotsuchi"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 250,
                            "condition": "ninja attack",
                            "time": "meanwhile attack"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
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
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 200,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Hidan,Jiongu Kakuzu,Kurotsuchi,Hotaru",
                    "ninjasAttackOrder": [
                        "Hidan",
                        "Jiongu Kakuzu",
                        "Kurotsuchi",
                        "Hotaru"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 100,
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
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 200,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Hidan,Jiongu Kakuzu,Hotaru,Kurotsuchi",
                    "ninjasAttackOrder": [
                        "Hidan",
                        "Jiongu Kakuzu",
                        "Hotaru",
                        "Kurotsuchi"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 250,
                            "condition": "ninja attack",
                            "time": "meanwhile attack"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
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
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 200,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Hotaru,Kurotsuchi,Hidan,Jiongu Kakuzu",
                    "ninjasAttackOrder": [
                        "Hotaru",
                        "Kurotsuchi",
                        "Hidan",
                        "Jiongu Kakuzu"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 350,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Hotaru,Kurotsuchi,Jiongu Kakuzu,Hidan",
                    "ninjasAttackOrder": [
                        "Hotaru",
                        "Kurotsuchi",
                        "Jiongu Kakuzu",
                        "Hidan"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 350,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Hotaru,Hidan,Kurotsuchi,Jiongu Kakuzu",
                    "ninjasAttackOrder": [
                        "Hotaru",
                        "Hidan",
                        "Kurotsuchi",
                        "Jiongu Kakuzu"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 250,
                            "condition": "ninja attack",
                            "time": "meanwhile attack"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "remove buffs",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Hotaru,Hidan,Jiongu Kakuzu,Kurotsuchi",
                    "ninjasAttackOrder": [
                        "Hotaru",
                        "Hidan",
                        "Jiongu Kakuzu",
                        "Kurotsuchi"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 250,
                            "condition": "ninja attack",
                            "time": "meanwhile attack"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
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
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 200,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Hotaru,Jiongu Kakuzu,Kurotsuchi,Hidan",
                    "ninjasAttackOrder": [
                        "Hotaru",
                        "Jiongu Kakuzu",
                        "Kurotsuchi",
                        "Hidan"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 350,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
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
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 200,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Hotaru,Jiongu Kakuzu,Hidan,Kurotsuchi",
                    "ninjasAttackOrder": [
                        "Hotaru",
                        "Jiongu Kakuzu",
                        "Hidan",
                        "Kurotsuchi"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 250,
                            "condition": "ninja attack",
                            "time": "meanwhile attack"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
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
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 200,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Jiongu Kakuzu,Kurotsuchi,Hidan,Hotaru",
                    "ninjasAttackOrder": [
                        "Jiongu Kakuzu",
                        "Kurotsuchi",
                        "Hidan",
                        "Hotaru"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 100,
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
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 200,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Jiongu Kakuzu,Kurotsuchi,Hotaru,Hidan",
                    "ninjasAttackOrder": [
                        "Jiongu Kakuzu",
                        "Kurotsuchi",
                        "Hotaru",
                        "Hidan"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 350,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
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
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 200,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Jiongu Kakuzu,Hidan,Kurotsuchi,Hotaru",
                    "ninjasAttackOrder": [
                        "Jiongu Kakuzu",
                        "Hidan",
                        "Kurotsuchi",
                        "Hotaru"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 100,
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
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 200,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Jiongu Kakuzu,Hidan,Hotaru,Kurotsuchi",
                    "ninjasAttackOrder": [
                        "Jiongu Kakuzu",
                        "Hidan",
                        "Hotaru",
                        "Kurotsuchi"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 250,
                            "condition": "ninja attack",
                            "time": "meanwhile attack"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
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
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 200,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Jiongu Kakuzu,Hotaru,Kurotsuchi,Hidan",
                    "ninjasAttackOrder": [
                        "Jiongu Kakuzu",
                        "Hotaru",
                        "Kurotsuchi",
                        "Hidan"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 350,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
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
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 200,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                },
                {
                    "ninjaFormation": "Jiongu Kakuzu,Hotaru,Hidan,Kurotsuchi",
                    "ninjasAttackOrder": [
                        "Jiongu Kakuzu",
                        "Hotaru",
                        "Hidan",
                        "Kurotsuchi"
                    ],
                    "attributes": [
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "all enemies",
                            "value": 250,
                            "condition": "ninja attack",
                            "time": "meanwhile attack"
                        },
                        {
                            "attributeName": "attack",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "self",
                            "value": 68,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "split state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "3 random allies",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "disable state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy wind chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Assaulters",
                            "value": 80,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "speed %",
                            "action": "increase",
                            "impact": "ally Vanguard",
                            "value": 40,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy wind chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "fury",
                            "action": "increase",
                            "impact": "all allies (except self)",
                            "value": 30,
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
                            "attributeName": "collapse",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "imprision",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
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
                            "attributeName": "chaos",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy earth chakra nature",
                            "value": 450,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "petrification",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy lightning chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "burst state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weak state",
                            "action": "apply",
                            "impact": "enemy supports",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "punch rate",
                            "action": "decrease",
                            "impact": "all enemies",
                            "value": 30,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "enemy Assaulters",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "freze",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 90,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "DOT status",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "unable gain buffs state",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "weakened state",
                            "action": "apply",
                            "impact": "enemy lightning chakra nature",
                            "value": 1,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "defense",
                            "action": "increase",
                            "impact": "ally Supports",
                            "value": 200,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "health by",
                            "action": "recover",
                            "impact": "all allies",
                            "value": 100,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy fire chakra nature",
                            "value": 300,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "growth rate",
                            "action": "attack",
                            "impact": "enemy unactived chakra nature",
                            "value": 500,
                            "condition": "ninja attack",
                            "time": "attack ends"
                        },
                        {
                            "attributeName": "incarnate state(DOT)",
                            "action": "apply",
                            "impact": "all enemies",
                            "value": 120,
                            "condition": "ninja attack",
                            "time": "for 2 rounds"
                        }
                    ]
                }
            ]
        };
        return Object.assign(new FormationElement(),url)
    }
}

