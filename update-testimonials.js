// Script para atualizar os depoimentos com linguagem mais humanizada
const humanizedTestimonials = [
  {
    name: "Maria Silva",
    text: "Nossa, que experiência incrível! Estava com medo de comprar carro usado, mas o Paulo me tranquilizou desde o primeiro contato. Meu Honda City está perfeito, nem parece que tem 4 anos. Minha filha adora andar nele!"
  },
  {
    name: "João Santos", 
    text: "Cara, não acreditei quando o financiamento foi aprovado em 2 dias! Outros lugares demoravam semanas. O Paulo me ajudou com toda a papelada e ainda conseguiu um desconto na entrada. Valeu demais!"
  },
  {
    name: "Ana Costa",
    text: "Estava procurando carro há meses e sempre desconfiada. Quando cheguei aqui, o Paulo me mostrou tudo certinho, até o histórico do carro. Meu marido ficou impressionado com a transparência. Recomendo!"
  },
  {
    name: "Carlos Oliveira",
    text: "Meu Fox tá rodando que é uma beleza! Comprei há 2 anos e nunca deu problema. O Paulo é gente boa demais, sempre que passo na rua ele me cumprimenta. Isso que é atendimento!"
  },
  {
    name: "Fernanda Lima",
    text: "Primeira vez comprando carro e estava super nervosa. O Paulo foi muito paciente, explicou tudo direitinho e ainda me deu dicas de como cuidar do carro. Meu Clio tá lindo!"
  },
  {
    name: "Roberto Alves",
    text: "Meu Voyage é meu xodó! Estava precisando de um carro econômico e confiável. O Paulo me mostrou várias opções e eu escolhi o melhor. Minha esposa também aprovou!"
  },
  {
    name: "Patricia Mendes",
    text: "Que alívio encontrar um lugar confiável! Estava com medo de ser enganada, mas o Paulo é muito honesto. Meu carro veio com tudo certinho e ainda ganhei um kit de limpeza. Adorei!"
  },
  {
    name: "Marcos Ferreira",
    text: "Já trouxe 3 amigos aqui e todos compraram! O Paulo é o cara mesmo. Sempre tem carros bons e os preços são justos. Meu pai também comprou um carro aqui ano passado."
  },
  {
    name: "Luciana Rocha",
    text: "Meu Siena é perfeito para a família! Espaçoso, econômico e confiável. O Paulo me ajudou a escolher o carro ideal para mim e meus filhos. Estou muito feliz com a compra!"
  },
  {
    name: "Diego Martins",
    text: "Sempre quis um Honda Civic e finalmente consegui! O Paulo me deu um preço ótimo e ainda conseguiu financiamento com juros baixos. Meu sonho realizado!"
  },
  {
    name: "Camila Santos",
    text: "Estava com pressa para comprar um carro e o Paulo resolveu tudo rapidinho! Meu carro veio com tudo certinho, nem precisei me preocupar com nada. Muito obrigada!"
  },
  {
    name: "Rafael Silva",
    text: "Cara, que atendimento top! O Paulo me tratou como se fosse da família. Meu carro tá rodando perfeitamente e ainda ganhei uma revisão grátis. Valeu demais!"
  },
  {
    name: "Juliana Costa",
    text: "Primeira vez comprando carro e estava super perdida. O Paulo me guiou em tudo, desde a escolha até o financiamento. Meu carro tá lindo e eu estou amando!"
  },
  {
    name: "André Oliveira",
    text: "Meu Fox tá rodando que é uma beleza! Comprei há uns meses e nunca deu problema. O Paulo é gente boa demais, sempre que preciso ele me ajuda. Recomendo!"
  },
  {
    name: "Bruna Lima",
    text: "Nossa, que experiência incrível! O Paulo me mostrou vários carros e me ajudou a escolher o melhor para mim. Financiamento aprovado na hora, nem acreditei!"
  },
  {
    name: "Thiago Alves",
    text: "Meu Voyage é perfeito! Estava precisando de um carro econômico e confiável. O Paulo me deu várias opções e eu escolhi a melhor. Minha família adorou!"
  },
  {
    name: "Vanessa Mendes",
    text: "Que alívio encontrar um lugar confiável! Estava com medo de ser enganada, mas o Paulo é muito honesto. Meu carro veio com tudo certinho. Adorei!"
  },
  {
    name: "Gustavo Ferreira",
    text: "Compra super tranquila! O Paulo me explicou tudo direitinho e o carro veio perfeito. Minha esposa também aprovou o atendimento. Valeu!"
  },
  {
    name: "Larissa Santos",
    text: "Meu Clio tá lindo! O Paulo me ajudou a escolher o carro ideal para mim e meus filhos. Espaçoso, econômico e confiável. Estou muito feliz!"
  },
  {
    name: "Felipe Costa",
    text: "Melhor lugar para comprar carro! O Paulo é muito confiável e os preços são justos. Meu carro tá rodando perfeitamente e eu estou super satisfeito!"
  },
  {
    name: "Renata Oliveira",
    text: "Meu Honda City é perfeito! O Paulo me ajudou a escolher o carro ideal e ainda conseguiu um financiamento ótimo. Minha família toda aprovou!"
  },
  {
    name: "Leonardo Silva",
    text: "Cara, que experiência incrível! O Paulo é muito atencioso e me ajudou com tudo. Meu carro tá rodando perfeitamente e eu estou super feliz!"
  },
  {
    name: "Priscila Lima",
    text: "Nossa, que alívio encontrar um lugar confiável! O Paulo é muito honesto e me ajudou com tudo. Meu carro veio perfeito e eu estou amando!"
  },
  {
    name: "Rodrigo Alves",
    text: "Meu carro tá rodando que é uma beleza! O Paulo é gente boa demais e sempre me ajuda quando preciso. Recomendo para todo mundo!"
  },
  {
    name: "Tatiana Mendes",
    text: "Primeira vez comprando carro e estava super nervosa. O Paulo foi muito paciente e me explicou tudo direitinho. Meu carro tá lindo!"
  },
  {
    name: "Bruno Ferreira",
    text: "Cara, que atendimento top! O Paulo me tratou super bem e meu carro veio perfeito. Minha esposa também aprovou o atendimento!"
  },
  {
    name: "Carla Santos",
    text: "Nossa, que experiência incrível! O Paulo me mostrou vários carros e me ajudou a escolher o melhor. Financiamento aprovado rapidinho!"
  },
  {
    name: "Marcelo Costa",
    text: "Meu carro é perfeito! O Paulo me ajudou a escolher o ideal e ainda conseguiu um preço ótimo. Minha família toda aprovou!"
  },
  {
    name: "Daniela Oliveira",
    text: "Que alívio encontrar um lugar confiável! O Paulo é muito honesto e meu carro veio com tudo certinho. Adorei o atendimento!"
  },
  {
    name: "Vinicius Silva",
    text: "Cara, que atendimento top! O Paulo me tratou super bem e meu carro tá rodando perfeitamente. Valeu demais!"
  },
  {
    name: "Amanda Lima",
    text: "Primeira vez comprando carro e estava super perdida. O Paulo me guiou em tudo e meu carro tá lindo. Estou amando!"
  },
  {
    name: "Ricardo Alves",
    text: "Meu carro tá rodando que é uma beleza! O Paulo é gente boa demais e sempre me ajuda. Recomendo para todo mundo!"
  },
  {
    name: "Isabela Mendes",
    text: "Nossa, que experiência incrível! O Paulo me mostrou vários carros e me ajudou a escolher o melhor. Financiamento aprovado na hora!"
  },
  {
    name: "Gabriel Ferreira",
    text: "Cara, que atendimento top! O Paulo me tratou super bem e meu carro veio perfeito. Minha esposa também aprovou!"
  },
  {
    name: "Natalia Santos",
    text: "Que alívio encontrar um lugar confiável! O Paulo é muito honesto e meu carro veio com tudo certinho. Adorei!"
  },
  {
    name: "Henrique Costa",
    text: "Meu carro é perfeito! O Paulo me ajudou a escolher o ideal e ainda conseguiu um preço ótimo. Estou super satisfeito!"
  },
  {
    name: "Bianca Oliveira",
    text: "Primeira vez comprando carro e estava super nervosa. O Paulo foi muito paciente e meu carro tá lindo. Estou amando!"
  },
  {
    name: "Mateus Silva",
    text: "Cara, que atendimento top! O Paulo me tratou super bem e meu carro tá rodando perfeitamente. Valeu demais!"
  },
  {
    name: "Leticia Lima",
    text: "Nossa, que experiência incrível! O Paulo me mostrou vários carros e me ajudou a escolher o melhor. Financiamento aprovado rapidinho!"
  },
  {
    name: "Alexandre Alves",
    text: "Meu carro tá rodando que é uma beleza! O Paulo é gente boa demais e sempre me ajuda. Recomendo para todo mundo!"
  },
  {
    name: "Cristina Mendes",
    text: "Que alívio encontrar um lugar confiável! O Paulo é muito honesto e meu carro veio com tudo certinho. Adorei!"
  },
  {
    name: "Fabio Ferreira",
    text: "Cara, que atendimento top! O Paulo me tratou super bem e meu carro veio perfeito. Minha esposa também aprovou!"
  },
  {
    name: "Monica Santos",
    text: "Primeira vez comprando carro e estava super perdida. O Paulo me guiou em tudo e meu carro tá lindo. Estou amando!"
  },
  {
    name: "Eduardo Costa",
    text: "Meu carro é perfeito! O Paulo me ajudou a escolher o ideal e ainda conseguiu um preço ótimo. Estou super satisfeito!"
  },
  {
    name: "Fernanda Oliveira",
    text: "Nossa, que experiência incrível! O Paulo me mostrou vários carros e me ajudou a escolher o melhor. Financiamento aprovado na hora!"
  },
  {
    name: "Lucas Silva",
    text: "Cara, que atendimento top! O Paulo me tratou super bem e meu carro tá rodando perfeitamente. Valeu demais!"
  },
  {
    name: "Adriana Lima",
    text: "Que alívio encontrar um lugar confiável! O Paulo é muito honesto e meu carro veio com tudo certinho. Adorei!"
  },
  {
    name: "Renato Alves",
    text: "Meu carro tá rodando que é uma beleza! O Paulo é gente boa demais e sempre me ajuda. Recomendo para todo mundo!"
  },
  {
    name: "Simone Mendes",
    text: "Primeira vez comprando carro e estava super nervosa. O Paulo foi muito paciente e meu carro tá lindo. Estou amando!"
  },
  {
    name: "Claudio Ferreira",
    text: "Cara, que atendimento top! O Paulo me tratou super bem e meu carro veio perfeito. Minha esposa também aprovou!"
  },
  {
    name: "Viviane Santos",
    text: "Nossa, que experiência incrível! O Paulo me mostrou vários carros e me ajudou a escolher o melhor. Financiamento aprovado rapidinho!"
  },
  {
    name: "Sergio Costa",
    text: "Meu carro é perfeito! O Paulo me ajudou a escolher o ideal e ainda conseguiu um preço ótimo. Estou super satisfeito!"
  },
  {
    name: "Eliane Oliveira",
    text: "Que alívio encontrar um lugar confiável! O Paulo é muito honesto e meu carro veio com tudo certinho. Adorei!"
  },
  {
    name: "Wagner Silva",
    text: "Cara, que atendimento top! O Paulo me tratou super bem e meu carro tá rodando perfeitamente. Valeu demais!"
  },
  {
    name: "Rosana Lima",
    text: "Primeira vez comprando carro e estava super perdida. O Paulo me guiou em tudo e meu carro tá lindo. Estou amando!"
  },
  {
    name: "Marcio Alves",
    text: "Meu carro tá rodando que é uma beleza! O Paulo é gente boa demais e sempre me ajuda. Recomendo para todo mundo!"
  },
  {
    name: "Claudia Mendes",
    text: "Nossa, que experiência incrível! O Paulo me mostrou vários carros e me ajudou a escolher o melhor. Financiamento aprovado na hora!"
  },
  {
    name: "Roberto Ferreira",
    text: "Cara, que atendimento top! O Paulo me tratou super bem e meu carro veio perfeito. Minha esposa também aprovou!"
  }
];

console.log('Depoimentos humanizados criados:', humanizedTestimonials.length);
