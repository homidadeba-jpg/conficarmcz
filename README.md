# Conficar Centro Automotivo

Site da Conficar, oficina no Tabuleiro do Martins, em Maceió. React + Vite, animações GSAP e ScrollTrigger, fontes Anton e Montserrat servidas localmente.

## Desenvolvimento

```sh
npm ci
npm run dev
```

## Produção

```sh
npm run build
npm run preview
```

A Vercel usa o preset Vite e publica a pasta `dist`. O endereço previsto é https://conficarmcz.vercel.app.

## Abertura com rolagem

O vídeo enviado pelo cliente foi convertido em quadros WebP. O ScrollTrigger prende o hero e controla uma sequência em canvas nos dois sentidos. No final, a imagem ganha mais espaço para acomodar o conteúdo, seguido de uma pausa de leitura antes da liberação da rolagem. Não há interceptação de gestos nem rolagem artificial.

Os quadros iniciais e finais têm prioridade; o restante é carregado por quatro tarefas concorrentes. O consumo de memória da sequência é limitado pela resolução e pela quantidade de quadros. Redução de movimento e economia de dados exibem a composição final estática.

## Fotos e conteúdo

Cada fotografia da oficina é usada em uma única seção. A galeria permite ampliação, navegação pelas setas e fechamento com Escape. Os botões de serviço abrem o WhatsApp com mensagens específicas. Informações e avaliações têm fontes documentadas em [docs/fontes.md](docs/fontes.md).

Os anexos originais não são versionados. `scripts/prepare-media.mjs` documenta a conversão das mídias; o site publicado usa os arquivos já preparados em `public/`.

O projeto aproveita os padrões do site Feijão Verde: composição do hero, recursos servidos localmente, animações GSAP, galeria acessível, navegação para celular e documentação das fontes. O conteúdo e o desenho foram adaptados à Conficar.
