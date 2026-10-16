# Padrões Estruturais GoF — Bridge e Adapter

Projeto em JavaScript (Node.js, sem dependências) que demonstra os padrões **Bridge** e **Adapter** em um sistema de combos de fast-food.

Cada combo possui:
- **Lanche:** Big Mac, Quarteirão ou McFish.
- **Bebida:** refrigerante ou suco de 300, 500 ou 700 ml.
- **Batata:** pequena, média ou grande.

## Como executar

```bash
node app_adaptado.js
```

O programa imprime cinco combos, alterações em dois deles e um combo com bebida do sistema legado.

## Padrões utilizados

**Bridge:** `Combo` recebe `Lanche`, `Bebida` e `Batata` por composição, permitindo montar qualquer combinação em tempo de execução, sem uma classe para cada combo. As classes concretas (`BigMac`, `Quarteirao`, `McFish`, `Refrigerante`, `Suco`, `BatataPequena`, `BatataMedia`, `BatataGrande`) implementam os contratos de cada tipo de item.

**Adapter:** o sistema legado (`SistemaLegadoBebidas`) identifica bebidas por código numérico (`101`–`103` refrigerantes; `201`–`203` sucos, em 300, 500 e 700 ml). `BebidaLegadaAdapter` herda de `Bebida` e expõe `getDescricao()`, então pode ser usado no `Combo` sem alterar o sistema legado.

## Estrutura das classes

```text
Lanche  → BigMac, Quarteirao, McFish
Bebida  → Refrigerante, Suco, BebidaLegadaAdapter (usa SistemaLegadoBebidas)
Batata  → BatataPequena, BatataMedia, BatataGrande
Combo   → recebe um Lanche, uma Bebida e uma Batata
```

## Exemplo de uso

```javascript
const sistemaLegado = new SistemaLegadoBebidas();
const bebidaAdaptada = new BebidaLegadaAdapter(sistemaLegado, 202);

const combo = new Combo(
  "Combo com bebida legada",
  new McFish(),
  bebidaAdaptada,
  new BatataMedia()
);

combo.mostrarCombo();
```

Saída esperada:

```text
Combo com bebida legada
  Lanche:  McFish
  Bebida:  Suco 500 ml
  Batata:  Batata média
```
