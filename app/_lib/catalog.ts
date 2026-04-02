export type JerseyCategory = "Clube" | "Selecao";

export type JerseyModel = "Torcedor" | "Jogador" | "Retro";

export type JerseySize = "P" | "M" | "G" | "GG";

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
  images: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const catalog: Jersey[] = [
  {
    id: "brasil-2026-home",
    name: "Camisa Brasil 2026 Home",
    team: "Brasil",
    category: "Selecao",
    model: "Jogador",
    price: 329.9,
    sizes: ["P", "M", "G", "GG"],
    badge: "",
    shortDescription:
      "Modelagem premium com tecido respiravel e escudo aplicado em relevo.",
    fullDescription:
      "Versao inspirada no uniforme principal da Selecao, com acabamento premium, recortes anatomicos e tecido leve para uso casual ou em dia de jogo.",
    images: [
      "/img/brasil/img1.png", 
      "/img/brasil/img2.png", 
      "/img/brasil/img3.png"
    ],
    colors: {
      primary: "#14532d",
      secondary: "#facc15",
      accent: "#2563eb",
    },
  },
  {
    id: "alemanha-away",
    name: "Camisa Alemanha Away",
    team: "Alemanha",
    category: "Selecao",
    model: "Torcedor",
    price: 279.9,
    sizes: ["M", "G", "GG"],
    badge: "",
    shortDescription:
      "Visual elegante em azul escuro com detalhes metalicos e caimento confortavel.",
    fullDescription:
      "Camisa away com tecido macio, gola reforcada e acabamento pensado para destacar o visual da torcida com muito conforto no uso diario.",
      images: [
        "/img/alemanha/img1.png", 
        "/img/alemanha/img2.png", 
        "/img/alemanha/img3.png"
      ],
    colors: {
      primary: "#0f172a",
      secondary: "#38bdf8",
      accent: "#e2e8f0",
    },
  },
  {
    id: "japao-home",
    name: "Camisa Japão Home",
    team: "Japão",
    category: "Selecao",
    model: "Torcedor",
    price: 249.9,
    sizes: ["P", "M", "G"],
    badge: "oferta relampago",
    shortDescription:
      "Tradicional com linhas marcantes e excelente presenca visual.",
    fullDescription:
      "Modelo para torcedor com toque macio, cores vibrantes e composicao leve para quem quer vestir o manto no estadio ou no dia a dia.",
      images: [
        "/img/japao/img1.png", 
        "/img/japao/img2.png", 
        "/img/japao/img3.png"
      ],
    colors: {
      primary: "#111827",
      secondary: "#dc2626",
      accent: "#f59e0b",
    },
  },
];

export const catalogFilters = {
  categories: ["Todas", "Clube", "Selecao"] as const,
  sizes: ["Todos", "P", "M", "G", "GG"] as const,
  models: ["Todos", "Torcedor", "Jogador", "Retro"] as const,
};

export function getWhatsAppOrderLink(product: Jersey) {
  const message = [
    "Ola! Tenho interesse nesta camisa:",
    "",
    `Produto: ${product.name}`,
    `Time: ${product.team}`,
    `Modelo: ${product.model}`,
    `Preco: ${currencyFormatter.format(product.price)}`,
    `Descricao: ${product.fullDescription}`,
  ].join("\n");

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
