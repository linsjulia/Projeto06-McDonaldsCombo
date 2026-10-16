
// 1. PRODUTOS

class Lanche {
  getDescricao() {
    throw new Error("Método getDescricao() deve ser implementado.");
  }
}

class BigMac extends Lanche {
  getDescricao() { return "Big Mac"; }
}

class Quarteirao extends Lanche {
  getDescricao() { return "Quarteirão"; }
}

class McFish extends Lanche {
  getDescricao() { return "McFish"; }
}

class Bebida {
  getDescricao() {
    throw new Error("Método getDescricao() deve ser implementado.");
  }
}

class Refrigerante extends Bebida {
  constructor(ml) {
    super();
    if (![300, 500, 700].includes(ml)) {
      throw new Error("Tamanho de bebida inválido. Use 300, 500 ou 700 ml.");
    }
    this.ml = ml;
  }

  getDescricao() { return `Refrigerante ${this.ml} ml`; }
}

class Suco extends Bebida {
  constructor(ml) {
    super();
    if (![300, 500, 700].includes(ml)) {
      throw new Error("Tamanho de bebida inválido. Use 300, 500 ou 700 ml.");
    }
    this.ml = ml;
  }

  getDescricao() { return `Suco ${this.ml} ml`; }
}

class Batata {
  getDescricao() {
    throw new Error("Método getDescricao() deve ser implementado.");
  }
}

class BatataPequena extends Batata {
  getDescricao() { return "Batata pequena"; }
}

class BatataMedia extends Batata {
  getDescricao() { return "Batata média"; }
}

class BatataGrande extends Batata {
  getDescricao() { return "Batata grande"; }
}

// 2. ADAPTER

class SistemaLegadoBebidas {
  constructor() {
    this.bebidasPorCodigo = {
      101: "Refrigerante 300 ml",
      102: "Refrigerante 500 ml",
      103: "Refrigerante 700 ml",
      201: "Suco 300 ml",
      202: "Suco 500 ml",
      203: "Suco 700 ml",
    };
  }

  buscarBebida(codigo) {
    const descricao = this.bebidasPorCodigo[codigo];

    if (!descricao) {
      throw new Error(`Código de bebida legado inválido: ${codigo}`);
    }

    return { codigo, descricao };
  }
}

class BebidaLegadaAdapter extends Bebida {
  constructor(sistemaLegado, codigo) {
    super();
    this.sistemaLegado = sistemaLegado;
    this.codigo = codigo;
    this.bebidaLegada = this.sistemaLegado.buscarBebida(codigo);
  }

  getDescricao() {
    return this.bebidaLegada.descricao;
  }
}


// 3. BRIDGE


class Combo {
  constructor(nome, lanche, bebida, batata) {
    this.nome = nome;
    this.lanche = lanche;
    this.bebida = bebida;
    this.batata = batata;
  }

  trocarBebida(novaBebida) {
    if (!(novaBebida instanceof Bebida)) {
      throw new TypeError("A bebida precisa implementar a classe Bebida.");
    }
    this.bebida = novaBebida;
  }

  trocarBatata(novaBatata) {
    if (!(novaBatata instanceof Batata)) {
      throw new TypeError("A batata precisa ser uma instância de Batata.");
    }
    this.batata = novaBatata;
  }

  mostrarCombo() {
    console.log(`\n${this.nome}`);
    console.log(`  Lanche:  ${this.lanche.getDescricao()}`);
    console.log(`  Bebida:  ${this.bebida.getDescricao()}`);
    console.log(`  Batata:  ${this.batata.getDescricao()}`);
  }
}


// 4. DEMONSTRAÇÃO NO TERMINAL


const combos = [
  new Combo("Combo 1", new BigMac(), new Refrigerante(300), new BatataPequena()),
  new Combo("Combo 2", new Quarteirao(), new Suco(500), new BatataMedia()),
  new Combo("Combo 3", new McFish(), new Refrigerante(700), new BatataGrande()),
  new Combo("Combo 4", new BigMac(), new Suco(300), new BatataGrande()),
  new Combo("Combo 5", new Quarteirao(), new Refrigerante(500), new BatataPequena()),
];

console.log("CINCO COMBOS INICIAIS");
combos.forEach((combo) => combo.mostrarCombo());

console.log("\nALTERANDO ITENS");
console.log("Combo 1: bebida alterada de Refrigerante 300 ml para Suco 700 ml.");
combos[0].trocarBebida(new Suco(700));


console.log("Combo 2: batata alterada de média para grande.");
combos[1].trocarBatata(new BatataGrande());

combos[0].mostrarCombo();
combos[1].mostrarCombo();

console.log("\nCOMBO COM BEBIDA DO SISTEMA LEGADO");
const sistemaLegado = new SistemaLegadoBebidas();
const bebidaLegadaAdaptada = new BebidaLegadaAdapter(sistemaLegado, 202);

const comboLegado = new Combo("Combo 6 (bebida do sistema legado)", new McFish(), bebidaLegadaAdaptada, new BatataMedia());

comboLegado.mostrarCombo();