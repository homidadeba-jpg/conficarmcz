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

A Vercel usa o preset Vite e publica a pasta `dist`. Site publicado em https://conficarmcz-rho.vercel.app.

O endereço solicitado `conficarmcz.vercel.app` já estava em uso e não aparece entre os aliases da conta `jonas-jr`. A publicação foi feita diretamente pelo CLI. A conexão automática do repositório com a Vercel não foi aceita; para atualizar a produção, execute `npx vercel deploy --prod` na pasta do projeto.

## Abertura com rolagem

O vídeo enviado pelo cliente foi convertido em quadros WebP. O início mostra apenas a fachada com uma indicação discreta para rolar. O ScrollTrigger prende o hero por uma distância equivalente a 95% da altura da seção e controla a sequência em canvas nos dois sentidos, com resposta curta de 0,14 segundo. Os textos, serviços e botões aparecem perto do final do vídeo. A composição final tem uma breve pausa antes da liberação da rolagem. Não há interceptação de gestos nem rolagem artificial.

Os quadros iniciais e finais têm prioridade. Seis tarefas carregam primeiro amostras distribuídas pelo vídeo e depois os quadros intermediários, favorecendo gestos rápidos. O consumo de memória da sequência é limitado pela resolução e pela quantidade de quadros. Redução de movimento e economia de dados exibem a composição final estática.

## Fotos e conteúdo

Cada fotografia da oficina é usada em uma única seção. A galeria permite ampliação, navegação pelas setas e fechamento com Escape. Os botões de serviço abrem o WhatsApp com mensagens específicas. Informações e avaliações têm fontes documentadas em [docs/fontes.md](docs/fontes.md).

Os anexos originais não são versionados. `scripts/prepare-media.mjs` documenta a conversão das mídias; o site publicado usa os arquivos já preparados em `public/`.

O projeto aproveita os padrões do site Feijão Verde: composição do hero, recursos servidos localmente, animações GSAP, galeria acessível, navegação para celular e documentação das fontes. O conteúdo e o desenho foram adaptados à Conficar.
