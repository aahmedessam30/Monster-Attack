function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      battleLogs: [],
    };
  },
  methods: {
    attackMonster() {
      const damage = getRandomInt(12, 5);
      this.monsterHealth -= damage;
      this.attackPlayer();
      this.currentRound++;
      this.addLogMessage("Player", "attack", damage);
    },
    attackPlayer() {
      const damage = getRandomInt(15, 8);
      this.playerHealth -= damage;
      this.addLogMessage("Monster", "attack", damage);
    },
    specialAttackMonster() {
      const damage = getRandomInt(10, 25);
      this.monsterHealth -= damage;
      this.attackPlayer();
      this.currentRound++;
      this.addLogMessage("Player", "specialAttack", damage);
    },
    healPlayer() {
      const heal = getRandomInt(8, 20);
      this.playerHealth + heal > 100
        ? (this.playerHealth = 100)
        : (this.playerHealth += heal);
      this.attackPlayer();
      this.addLogMessage("Player", "heal", heal);
    },
    resetGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.battleLogs = [];
    },
    surrender() {
        this.winner = "monster";
        this.addLogMessage("Player", "surrender");
    },
    addLogMessage(who, what, message) {
      this.battleLogs.unshift({
        actionBy: who,
        actionType: what,
        actionMessage: message,
      });
    },
  },
  computed: {
    monsterHealthBar() {
      return this.monsterHealth < 0
        ? { width: "0%" }
        : { width: this.monsterHealth + "%" };
    },
    playerHealthBar() {
      return this.playerHealth < 0
        ? { width: "0%" }
        : { width: this.playerHealth + "%" };
    },
    specialAttackButtonDisabled() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
}).mount("#game");
