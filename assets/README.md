# Recursos visuais de ysh

- `ysh-banner-animated.gif`: banner original de 1280 × 360, 120 quadros em loop.
- `ysh-banner-poster.svg`: alternativa estática para movimento reduzido.
- `typing-light.svg` e `typing-dark.svg`: digitação em SVG, com versões para os temas do GitHub e alternativa sem movimento.
- `tech/`: 12 ícones locais em uma grade de três linhas e quatro colunas, com tamanho uniforme no README.
- `buttons/`: botões SVG locais para navegação, código, demonstrações, documentação e contato. Cada imagem é envolvida por um link no README.

## Regenerar o banner

Os geradores ficam em `scripts/` e usam Node.js com [Sharp](https://sharp.pixelplumbing.com/) e Python com [Pillow](https://pillow.readthedocs.io/).

```sh
node scripts/render-banner.mjs
python3 scripts/encode-banner.py
```

Os quadros temporários ficam em `.frames/`, fora do versionamento. A geração foi validada com Sharp 0.35.5 e Pillow 13.0.0. Nenhum serviço externo é consultado durante a exibição dos recursos visuais.

## Regenerar os botões

```sh
python3 scripts/render-buttons.py
```

Os botões usam apenas SVG, sem scripts nem serviços externos. O tamanho de 132 × 44 mantém as áreas de clique uniformes. Os selos de testes dos projetos vêm dos próprios workflows públicos do GitHub Actions.

## Créditos dos ícones

As formas dos ícones são do [Simple Icons](https://github.com/simple-icons/simple-icons), distribuído sob [CC0 1.0](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md). Os cartões e a composição visual foram adaptados para este perfil. As marcas identificam as tecnologias utilizadas e permanecem de seus respectivos titulares.

