export type JerseyCategory = "Clube" | "Seleção";

export type JerseyModel = "Torcedor" | "Jogador" | "Retro";

export type JerseySize = "P" | "M" | "G" | "GG";

export type JerseyFit = "Masculina" | "Feminina";

export type Jersey = {
  id: string;
  name: string;
  team: string;
  category: JerseyCategory;
  model: JerseyModel;
  price: number;
  sizes: JerseySize[];
  badge: string;
  shortDescription: string;
  fullDescription: string;
  images: Record<JerseyFit, string[]>;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
};

export type CartItem = {
  product: Jersey;
  size: JerseySize;
  fit: JerseyFit;
  quantity: number;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const catalog: Jersey[] = [
  {
    id: "brasil-2026-torcedor",
    name: "Camisa Brasil 2026 Home",
    team: "Brasil",
    category: "Seleção",
    model: "Torcedor",
    price: 149.90,
    sizes: ["P", "M", "G", "GG"],
    badge: "",
    shortDescription:
      "Modelagem premium com tecido respirável e escudo aplicado em relevo.",
    fullDescription:
      "Versão inspirada no uniforme principal da Seleção, com acabamento premium, recortes anatomicos e tecido leve para uso casual ou em dia de jogo.",
    images: {
      Masculina: [
        "/img/brasil/torcedor/home/brasil01.webp",
        "/img/brasil/torcedor/home/brasil02.webp",
        "/img/brasil/torcedor/home/brasil03.webp",
        "/img/brasil/torcedor/home/brasil04.webp",
      ],
      Feminina: [],
    },
    colors: {
      primary: "#14532d",
      secondary: "#facc15",
      accent: "#2563eb",
    },
  },
  {
    id: "brasil-2026-torcedor-away",
    name: "Camisa Brasil 2026 Away",
    team: "Brasil",
    category: "Seleção",
    model: "Torcedor",
    price: 149.90,
    sizes: ["M", "G", "GG"],
    badge: "",
    shortDescription:
      "Visual elegante em azul escuro com detalhes metálicos e caimento confortável.",
    fullDescription:
      "Camisa away com tecido macio, gola reforçada e acabamento pensado para destacar o visual da torcida com muito conforto no uso diário.",
      images: {
        Masculina: [
          "/img/brasil/torcedor/away/brasil01.webp",
          "/img/brasil/torcedor/away/brasil02.webp",
          "/img/brasil/torcedor/away/brasil03.webp",
          "/img/brasil/torcedor/away/brasil04.webp",
          "/img/brasil/torcedor/away/brasil05.webp",
        ],
        Feminina: [],
      },
    colors: {
      primary: "#0f172a",
      secondary: "#38bdf8",
      accent: "#e2e8f0",
    },
  },
  {
    id: "brasil-2026-jogador-away",
    name: "Camisa Brasil 2026 Away",
    team: "Brasil",
    category: "Seleção",
    model: "Jogador",
    price: 179.90,
    sizes: ["M", "G", "GG"],
    badge: "",
    shortDescription:
      "Visual elegante em azul escuro com detalhes metálicos e caimento confortável.",
    fullDescription:
      "Camisa away com tecido macio, gola reforçada e acabamento pensado para destacar o visual da torcida com muito conforto no uso diário.",
      images: {
        Masculina: [
          "/img/brasil/jogador/away/01.webp",
          "/img/brasil/jogador/away/02.webp",
          "/img/brasil/jogador/away/03.webp",
          "/img/brasil/jogador/away/04.webp",
        ],
        Feminina: [],
      },
    colors: {
      primary: "#0f172a",
      secondary: "#38bdf8",
      accent: "#e2e8f0",
    },
  },
  {
    id: "brasil-2026-jogador-home",
    name: "Camisa Brasil 2026 Home",
    team: "Brasil",
    category: "Seleção",
    model: "Jogador",
    price: 179.9,
    sizes: ["P", "M", "G"],
    badge: "",
    shortDescription:
      "Tradicional com linhas marcantes e excelente presença visual.",
    fullDescription:
      "Modelo retrô com toque macio, cores vibrantes e composição leve para quem quer vestir o manto no estádio ou no dia a dia.",
      images: {
        Masculina: [
          "/img/brasil/jogador/home/brasil01.webp",
          "/img/brasil/jogador/home/brasil02.webp",
          "/img/brasil/jogador/home/brasil03.webp",
          "/img/brasil/jogador/home/brasil04.webp",
        ],
        Feminina: [],
      },
    colors: {
      primary: "#14532d",
      secondary: "#facc15",
      accent: "#2563eb",
    },
  },
  {
    id: "brasil-2026-retro",
    name: "Camisa Brasil Corteiz Home",
    team: "Brasil",
    category: "Seleção",
    model: "Retro",
    price: 199.9,
    sizes: ["P", "M", "G"],
    badge: "",
    shortDescription:
      "Tradicional com linhas marcantes e excelente presença visual.",
    fullDescription:
      "Modelo retrô com toque macio, cores vibrantes e composição leve para quem quer vestir o manto no estádio ou no dia a dia.",
      images: {
        Masculina: [
          "/img/brasil/retro/retrohome/brasil01.webp",
          "/img/brasil/retro/retrohome/brasil02.webp",
          "/img/brasil/retro/retrohome/brasil03.webp",
          "/img/brasil/retro/retrohome/brasil04.webp",
        ],
        Feminina: [],
      },
    colors: {
      primary: "#14532d",
      secondary: "#facc15",
      accent: "#2563eb",
    },
  },
  {
    id: "brasil-2026-retro94",
    name: "Camisa Brasil - Retrô 94",
    team: "Brasil",
    category: "Seleção",
    model: "Retro",
    price: 199.9,
    sizes: ["P", "M", "G", "GG"],
    badge: "",
    shortDescription:
      "Modelagem premium com tecido respirável e escudo aplicado em relevo.",
    fullDescription:
      "Versão inspirada no uniforme principal da Seleção, com acabamento premium, recortes anatomicos e tecido leve para uso casual ou em dia de jogo.",
    images: {
      Masculina: [
        "/img/brasil/retro/retro94/brasil01.webp",
        "/img/brasil/retro/retro94/brasil02.webp",
        "/img/brasil/retro/retro94/03.webp",
        "/img/brasil/retro/retro94/04.webp",
      ],
      Feminina: [],
    },
    colors: {
      primary: "#14532d",
      secondary: "#facc15",
      accent: "#2563eb",
    },
  },
  {
    id: "brasil-2026-retro-azul",
    name: "Camisa Brasil Corteiz Away",
    team: "Brasil",
    category: "Seleção",
    model: "Retro",
    price: 199.9,
    sizes: ["P", "M", "G", "GG"],
    badge: "",
    shortDescription:
      "Modelagem premium com tecido respirável e escudo aplicado em relevo.",
    fullDescription:
      "Versão inspirada no uniforme principal da Seleção, com acabamento premium, recortes anatomicos e tecido leve para uso casual ou em dia de jogo.",
    images: {
      Masculina: [
        "/img/brasil/retro/retroaway/brasil01.webp",
        "/img/brasil/retro/retroaway/brasil02.webp",
        "/img/brasil/retro/retroaway/brasil03.webp",
        "/img/brasil/retro/retroaway/brasil04.webp",
      ],
      Feminina: [],
    },
    colors: {
      primary: "#14532d",
      secondary: "#facc15",
      accent: "#2563eb",
    },
  },
];

export const catalogFilters = {
  categories: ["Todas", "Clube", "Seleção"] as const,
  sizes: ["Todos", "P", "M", "G", "GG"] as const,
  models: ["Todos", "Torcedor", "Jogador", "Retro"] as const,
};

export const regionalContacts = [
  {
    id: "regiao-dos-lagos",
    title: "Região: São Pedro da Aldeia, Araruama, Cabo Frio, Iguaba e Arraial",
    phone: "5522992742063",
  },
  {
    id: "regiao-macae",
    title: "Região: Macaé e Rio das Ostras",
    phone: "5522981805018",
  },
] as const;

function buildOrderMessage(lines: string[]) {
  return lines.join("\n");
}

export function getWhatsAppOrderLink(product: Jersey) {
  const message = [
    "Ola! Tenho interesse nesta camisa:",
    "",
    `Produto: ${product.name}`,
    `Time: ${product.team}`,
    `Modelo: ${product.model}`,
    `Preco: ${currencyFormatter.format(product.price)}`,
    `Descricao: ${product.fullDescription}`,
  ];

  return `https://wa.me/?text=${encodeURIComponent(buildOrderMessage(message))}`;
}

export function getImagesForFit(
  images: Record<JerseyFit, string[]>,
  fit: JerseyFit
) {
  return images[fit].length > 0 ? images[fit] : images.Masculina;
}

export function getCartTotal(items: CartItem[]) {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}

export function getCartCount(items: CartItem[]) {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function getRegionalContactLink(phone: string, items: CartItem[]) {
  const messageLines = [
    "Ola! Quero finalizar minha compra.",
    "",
    ...items.flatMap((item, index) => [
      `${index + 1}. ${item.product.name}`,
      `Quantidade: ${item.quantity}`,
      `Tamanho: ${item.size}`,
      `Modelagem: ${item.fit}`,
      `Modelo: ${item.product.model}`,
      `Time: ${item.product.team}`,
      `Subtotal: ${currencyFormatter.format(item.product.price * item.quantity)}`,
      "",
    ]),
    `Total do pedido: ${currencyFormatter.format(getCartTotal(items))}`,
  ];

  return `https://wa.me/${phone}?text=${encodeURIComponent(
    buildOrderMessage(messageLines)
  )}`;
}
