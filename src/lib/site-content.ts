// Conteúdo editável do site ARC.
// ATENÇÃO: contatos, números e depoimentos abaixo são PROVISÓRIOS — substitua pelos dados reais.
import hero from "@/assets/hero.jpg";
import tecnico from "@/assets/tecnico.jpg";
import salaTecnica from "@/assets/sala-tecnica.jpg";
import refrigeracao from "@/assets/refrigeracao.jpg";

export const images = { hero, tecnico, salaTecnica, refrigeracao };

// PLACEHOLDER — substituir pelos contatos reais
export const contact = {
  whatsappNumber: "5511999990000",
  whatsappLabel: "(11) 99999-0000",
  phone: "(11) 3333-0000",
  email: "contato@arcclimatizacao.com.br",
  instagram: "@arcclimatizacao",
  city: "São Paulo – SP",
};

export const whatsappMessage =
  "Olá! Gostaria de solicitar um orçamento para um serviço de climatização, refrigeração ou automação.";
export const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

// PROVISÓRIO — editar números
export const stats = [
  { prefix: "+", value: 100, label: "Atendimentos realizados" },
  { prefix: "+", value: 50, label: "Projetos executados" },
  { text: "24/7", label: "Suporte e atendimento" },
  { text: "SP", label: "Área de atuação" },
];

export type Category = "Climatização" | "Refrigeração" | "Automação" | "Manutenção";

// Portfólio — troque `image` pelas fotos reais da ARC
export const projects: {
  title: string;
  category: Category;
  location: string;
  description: string;
  image: string;
}[] = [
  { title: "Projeto de Climatização Comercial", category: "Climatização", location: "São Paulo – SP", description: "Instalação e adequação do sistema de climatização.", image: hero },
  { title: "Central de Água Gelada", category: "Automação", location: "São Paulo – SP", description: "Sala técnica com chillers, bombeamento e painel de automação.", image: salaTecnica },
  { title: "Câmara Fria Comercial", category: "Refrigeração", location: "São Paulo – SP", description: "Instalação de câmara fria com evaporadoras e condensadoras.", image: refrigeracao },
  { title: "Manutenção Preventiva de Condensadoras", category: "Manutenção", location: "São Paulo – SP", description: "Verificação de pressões, limpeza e diagnóstico técnico.", image: tecnico },
  { title: "Sistema VRF em Edifício Comercial", category: "Climatização", location: "São Paulo – SP", description: "Implantação de unidades VRF e rede frigorígena.", image: refrigeracao },
  { title: "Painel de Controle Industrial", category: "Automação", location: "São Paulo – SP", description: "Automação e supervisão de sistemas de climatização.", image: salaTecnica },
];

// PROVISÓRIO — substituir por depoimentos reais
export const testimonials = [
  { quote: "Atendimento rápido e muito profissional. O problema do nosso sistema foi identificado e resolvido com eficiência.", author: "Cliente comercial" },
  { quote: "Precisávamos de manutenção recorrente e encontramos uma solução que atende bem nossa operação.", author: "Cliente industrial" },
  { quote: "Equipe técnica e serviço muito bem executado.", author: "Cliente comercial" },
];

export const faqs = [
  { q: "A ARC atende quais tipos de empresas?", a: "Atendemos principalmente empresas comerciais e industriais em São Paulo." },
  { q: "A ARC trabalha com manutenção preventiva?", a: "Sim. Trabalhamos com manutenção preventiva e corretiva de sistemas de climatização e refrigeração." },
  { q: "Vocês fazem instalação de ar-condicionado?", a: "Sim, incluindo instalação e adequação de sistemas conforme a necessidade do ambiente." },
  { q: "A ARC trabalha com automação?", a: "Sim. Desenvolvemos soluções de automação relacionadas à infraestrutura e sistemas de climatização." },
  // EDITAR: confirmar área de atendimento
  { q: "Vocês atendem fora de São Paulo?", a: "Consulte nossa equipe pelo WhatsApp para verificar a disponibilidade de atendimento na sua região." },
  { q: "Como posso solicitar um orçamento?", a: "Entre em contato pelo WhatsApp para explicar sua necessidade e solicitar uma avaliação." },
];
