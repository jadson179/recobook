
![](https://img.shields.io/badge/Status-InDevelopment-gree)
# Recobook

Sistema universal de recomendação de Locais 

Um website gratuito para os usuários compartilharem a sua experiência com determinado local do mundo, de forma que outras pessoas consigam saber que você viveu essa experência e quer que outras pessoas tenha essa mesma sensação em suas vidas 🥰. O nosso objetivo é simples, em defender que bons momentos devem ser compartilhados de uma forma simples.

## Requisitos

A seguir iremos documentar alguns requisitos importantes para a plataforma de forma que fique fácil entender 


Considerando esta demanda específica universal de centralizar as experiências vividas, relaciona-se abaixo os requisitos essenciais para que seja desenvolvido um sistema para compartilhamentos de elos. Considera-se na lista de requisitos funcionais, que para toda a indicação de manter tal funcionalidade", o sistema estará apto a realizar as operações de Create, Read, Update e Delete, representados pela sigla CRUD, que significam em português as operações básicas de criação, consulta, atualização e exclusão de dados nas respectivas tabelas de armazenamento destes dados.

## Contextualização

Um `elo` nada mais que a experiência vivida por alguem em algum lugar do mundo.

Os `usuários` serão as fontes responsáveis por popular a aplicação com os elos.

### Funcionais

- `RF-1:` Manter elos - CRUD
- `RF-2:` Manter usuarios - CRUD
- `RF-3:` Manter paises - CRUD
- `RF-4:` Manter estados - CRUD
- `RF-5:` Manter comentários - CRUD
- `RF-6:` Interface de compartilhamentos
### Não funcionais

- `RNF-1`: O sistema deve ter uma versão para uso em navegador / web browser
- `RNF-2`: O sistema deve ter seu backend construído em java
- `RNF-3`: O sistema deve ter seu frontend construído em nextjs
- `RNF-3`: O sistema deve ser construido para rodar em docker

### Regras de negócio

- `RN-1`: Uma vez que o elo for curtido ou comentado, não poderá ser excluído pelo criador

## Autor

|<img src="https://avatars3.githubusercontent.com/u/42282908?s=60&v=4" width="60">|
|:-:|
|@jadson179|