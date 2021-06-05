
![](https://img.shields.io/badge/Status-InDevelopment-gree)


![](images/Banner1512x720.svg)


Sistema universal de recomendação de Locais 

Um website gratuito para os usuários compartilharem a sua experiência com determinado local do mundo, de forma que outras pessoas consigam saber que você viveu essa experência e quer que outras pessoas tenha essa mesma sensação em suas vidas 🥰. O nosso objetivo é simples, em defender que bons momentos devem ser compartilhados de uma forma simples.

[acesse aqui](https://recobook.com.br) 


## Problema 🤦

As pessoas perdem muito do seu tempo pesquisando informações sobre os locais que desejam conhecer e acabam batendo cabeça até achar o local que queira conhecer ou viajar para aquele local, há uma grande perda tempo nesse processo 🐌.

## Solução 💡

O sistema vai trazer facilidade em encontrar mais informações sobres os locais que querem conhecer, de uma forma centralizada, tornando ágil esse processo, e não apenas conhecer, mas aproveitar de uma rede de compartilhamento entre as pessoas. Para alcançar esse objetivo inicial, o sistema iniciará na web por conta da flexibilidade em alcançar  muitos públicos, pois a maioria dos sistemas operacionais linux, mac, windows, android e ios  dispõem de navegadores para acesso à plataforma recobook. 


## Público alvo 🎯

Pessoas que estão querendo conhecer novos locais. 


## Contextualização 🗣

Um `elo` nada mais que a experiência vivida por alguem em algum lugar do mundo.

Os `usuários` serão as fontes responsáveis por popular a aplicação com os elos.


## Requisitos 📜

A seguir iremos documentar alguns requisitos importantes para a plataforma de forma que fique fácil entender 


Considerando esta demanda específica universal de centralizar as experiências vividas, relaciona-se abaixo os requisitos essenciais para que seja desenvolvido um sistema para compartilhamentos de elos. Considera-se na lista de requisitos funcionais, que para toda a indicação de manter tal funcionalidade", o sistema estará apto a realizar as operações de Create, Read, Update e Delete, representados pela sigla CRUD, que significam em português as operações básicas de criação, consulta, atualização e exclusão de dados nas respectivas tabelas de armazenamento destes dados.


### Funcionais ⚙️

- `RF-01:` Manter elos - CRUD
- `RF-02:` Manter usuarios - CRUD
- `RF-03:` Manter comentários - CRUD
- `RF-04:` Manter curtidas - CRUD
 

### Não funcionais ♻️

- `RNF-01`: O sistema deve ter uma versão para uso em navegador / web browser ([brave >= 1.24.85](https://brave.com/pt/),[google chrome >= 90.0.4430.212](https://www.google.com/intl/pt-BR/chrome/),[firefox >= 88.0.1](https://www.mozilla.org/pt-BR/firefox/new/))
- `RNF-02`: O sistema deve ter seu backend construído em java
- `RNF-03`: O sistema deve ter seu frontend construído em nextjs
- `RNF-03`: O sistema deve ser construido para rodar em docker
- `RNF-04`: O sistema deve ser compativel com mysql==8.0.23


### Regras de negócio ❗️

- `RN-1`: Uma vez que o elo for curtido ou comentado, não poderá ser excluído pelo criador


### Caso de Uso 🤸

[![](images/usecases.svg)](https://raw.githubusercontent.com/jadson179/recobook/main/images/usecases.svg)

### Wireframes 🖼

[![](images/PaginaPrincipal.svg)](https://www.figma.com/file/I9X2Xs0EJeO7Zp2ejWcGFr/Untitled?node-id=15%3A32)

[Vá para o figma :)](https://www.figma.com/file/I9X2Xs0EJeO7Zp2ejWcGFr/Untitled?node-id=15%3A32)


### Diagramas 📈

- [Diagrama Entidade Relacionamento](https://raw.githubusercontent.com/recobook/recobook/main/images/database_recobook.svg)
- [Diagrama de Classe](https://raw.githubusercontent.com/recobook/recobook/main/images/diagrama-classe.png)


### Captação de leads 📊


#### Google Trends

- [Viagens](https://trends.google.com.br/trends/explore?q=Viagens&geo=BR)
- [Melhores locais brasil](https://trends.google.com.br/trends/explore?geo=BR&q=Melhores%20locais%20brasil)
- [Viajar](https://trends.google.com.br/trends/explore?geo=BR&q=Viajar)
- [Locais brasil](https://trends.google.com.br/trends/explore?geo=BR&q=locais%20brasil)
- [Como pesquisar locais](https://trends.google.com.br/trends/explore?geo=BR&q=Como%20pesquisar%20locais)
- [Florianópolis locais](https://trends.google.com.br/trends/explore?geo=BR&q=Florian%C3%B3polis%20locais)

#### Google Forms

- [Recobook Pergunta](https://forms.gle/SHFm5WdXsYLddQq66)

## Road Map 🤑

- Divulgação de anuncios dos parceiros da plataforma.

## Documentos 

- [TCC](https://docs.google.com/document/d/166EtTHYkeVfU6L0Agrr7-cebdI2YYe8iCPV3qY_vwV4/edit?usp=sharing) 
- [Apresentação](https://docs.google.com/presentation/d/15w9DELX1OTOT2ldyaGt0KcycmSaDiDuIjB8BsrtXqaY/edit?usp=sharing)

## Autor

|<img src="https://avatars3.githubusercontent.com/u/42282908?s=60&v=4" width="60">|
|:-:|
|[@jadson179](https://github.com/jadson179)|
