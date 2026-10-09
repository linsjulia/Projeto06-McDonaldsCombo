
// Lanches
abstract class Lanche { public abstract String getNome(); }

class BigMac extends Lanche { public String getNome() { return "BigMac"; } }
class Quarteirao extends Lanche { public String getNome() { return "Quarteirão"; } }
class McFish extends Lanche { public String getNome() { return "McFish"; } }

// Bebidas
abstract class Bebida { public abstract String getDetalhes(); }

class Refrigerante extends Bebida {
    private int ml;
    public Refrigerante(int ml) { this.ml = ml; }
    public String getDetalhes() { return "Refrigerante " + ml + "ml"; }
}

class Suco extends Bebida {
    private int ml;
    public Suco(int ml) { this.ml = ml; }
    public String getDetalhes() { return "Suco " + ml + "ml"; }
}

// Batatas
abstract class Batata { public abstract String getTamanho(); }
class BatataMedia extends Batata { public String getTamanho() { return "Batata Média"; } }


// ==========================================
// 2. O ADAPTER (Padroniza os 3 para o Combo)
// ==========================================

interface ItemDoCombo {
    String getDescricao();
}

class LancheAdapter implements ItemDoCombo {
    private Lanche lanche;
    public LancheAdapter(Lanche lanche) { this.lanche = lanche; }
    public String getDescricao() { return lanche.getNome(); }
}

class BebidaAdapter implements ItemDoCombo {
    private Bebida bebida;
    public BebidaAdapter(Bebida bebida) { this.bebida = bebida; }
    public String getDescricao() { return bebida.getDetalhes(); }
}

class BatataAdapter implements ItemDoCombo {
    private Batata batata;
    public BatataAdapter(Batata batata) { this.batata = batata; }
    public String getDescricao() { return batata.getTamanho(); }
}


// ==========================================
// 3. O COMBO (Conecta os 3 itens)
// ==========================================

class Combo {
    private ItemDoCombo lanche;
    private ItemDoCombo bebida;
    private ItemDoCombo batata;

    public Combo(ItemDoCombo lanche, ItemDoCombo bebida, ItemDoCombo batata) {
        this.lanche = lanche;
        this.bebida = bebida;
        this.batata = batata;
    }

    public void mostrarCombo() {
        System.out.println("=== SEU COMBO ===");
        System.out.println("🍔 " + lanche.getDescricao());
        System.out.println("🥤 " + bebida.getDescricao());
        System.out.println("🍟 " + batata.getDescricao());
    }
}


// ==========================================
// 4. TESTANDO NO MAIN
// ==========================================

public class Main {
    public static void main(String[] args) {
        // 1. Cria os produtos reais
        Lanche meuLanche = new BigMac();
        Bebida minhaBebida = new Refrigerante(500);
        Batata minhaBatata = new BatataMedia();

        // 2. Adapta para a interface padrão do combo
        ItemDoCombo lancheAdaptado = new LancheAdapter(meuLanche);
        ItemDoCombo bebidaAdaptada = new BebidaAdapter(minhaBebida);
        ItemDoCombo batataAdaptada = new BatataAdapter(minhaBatata);

        // 3. Conecta tudo no Combo
        Combo meuCombo = new Combo(lancheAdaptado, bebidaAdaptada, batataAdaptada);
        meuCombo.mostrarCombo();
    }
}