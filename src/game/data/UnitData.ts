declare namespace UnitData {
  export interface Statistics {
    hitPoints: number;
    armor: number;
    sight: number;
    speed: number;
  }

  export interface Production {
    gold: number;
    food: number;
    place: string;
    buildTime: number;
  }

  export interface Damage {
    min: number;
    max: number;
  }

  export interface Combat {
    damage: Damage;
    range: number;
  }

  export interface Icon {
    x: number;
    y: number;
  }

  export interface Images {
    class: string;
    icon: Icon;
    sprites: string;
  }

  export interface Size {
    width: number;
    height: number;
  }

  export interface Walk {
    up: number[];
    down: number[];
    right: number[];
    upRight: number[];
    downRight: number[];
  }

  export interface Animations {
    walk: Walk;
  }

  export interface Sprite {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }

  export interface Unit {
    name: string;
    race: string;
    faction: string;
    statistics: Statistics;
    production: Production;
    combat: Combat;
    images: Images;
    size: Size;
    commands: string[];
    builder: string[];
    animations: Animations;
    sprites: Sprite[];
  }
}

export default UnitData;
