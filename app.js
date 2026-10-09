

// Lanches
class Lanche {
  getNome() { throw new Error("Método abstrato!"); }
}

class BigMac extends Lanche {
  getNome() { return "BigMac"; }
}

class Quarteirao extends Lanche {
  getNome() { return "Quarteirão"; }
}

class McFish extends Lanche {
  getNome() { return "McFish"; }
}


// Bebidas
class Bebida {
  getDetalhes() { throw new Error("Método abstrato!"); }
}

class Refrigerante extends Bebida {
  constructor(ml) {
    super();
    this.ml = ml;
  }
  getDetalhes() { return `Refrigerante ${this.ml}ml`; }
}

class Suco extends Bebida {
  constructor(ml) {
    super();
    this.ml = ml;
  }
  getDetalhes() { return `Suco ${this.ml}ml`; }
}

// Batatas
class Batata {
  getTamanho() { throw new Error("Método abstrato!"); }
}

class BatataPequena extends Batata {
  getTamanho() { return "Batata Pequena"; }
}

class BatataMedia extends Batata {
  getTamanho() { return "Batata Média"; }
}

class BatataGrande extends Batata {
  getTamanho() { return "Batata Grande"; }
}


// 2. OS ADAPTERS (Padronizam para getDescricao)


class LancheAdapter {
  constructor(lanche) {
    this.lanche = lanche;
  }
  getDescricao() {
    return this.lanche.getNome();
  }
}

class BebidaAdapter {
  constructor(bebida) {
    this.bebida = bebida;
  }
  getDescricao() {
    return this.bebida.getDetalhes();
  }
}

class BatataAdapter {
  constructor(batata) {
    this.batata = batata;
  }
  getDescricao() {
    return this.batata.getTamanho();
  }
}



// 3. O COMBO (Conecta os 3 itens)

class Combo {
  constructor(lanche, bebida, batata) {
    this.lanche = lanche;
    this.bebida = bebida;
    this.batata = batata;
  }

  mostrarCombo() {
    console.log("=== SEU COMBO ===");
    console.log(`🍔 ${this.lanche.getDescricao()}`);
    console.log(`🥤 ${this.bebida.getDescricao()}`);
    console.log(`🍟 ${this.batata.getDescricao()}`);
  }
}



// 1. Cria os produtos
const meuLanche = new BigMac();
const minhaBebida = new Refrigerante(500);
const minhaBatata = new BatataMedia();

// 2. Adapta cada produto para ter a mesma função .getDescricao()
const lancheAdaptado = new LancheAdapter(meuLanche);
const bebidaAdaptada = new BebidaAdapter(minhaBebida);
const batataAdaptada = new BatataAdapter(minhaBatata);

// 3. Conecta tudo no Combo
const meuCombo = new Combo(lancheAdaptado, bebidaAdaptada, batataAdaptada);
meuCombo.mostrarCombo();