# libft_games

Plataforma de jogos educativos para aprender as funções do projeto **libft** da [42 School](https://www.42.fr/). Cada jogo foi projetado para reforçar um aspecto diferente do aprendizado: memorização, compreensão de comportamento, leitura de código e implementação.

## Jogos

| Jogo | Descrição | Dificuldade |
|---|---|---|
| **Quiz de Funções** | 10 perguntas aleatórias sobre comportamentos, retornos e casos especiais de funções `ft_*` | Médio |
| **Jogo da Memória** | Conecte cada função à sua descrição correta contra o relógio | Fácil |
| **Adivinhe a Saída** | Dado um trecho de código C com funções libft, qual será o output? | Difícil |
| **Complete o Código** | Preencha as lacunas nas implementações reais das funções | Difícil |
| **Caça-Palavras** | Encontre os nomes das funções libft escondidos numa grade 15×15 | Fácil |
| **Referência Rápida** | Consulte protótipos, parâmetros, retornos e exemplos de todas as funções | Consulta |

## Funções cobertas

**Caracteres:** `ft_isalpha` `ft_isdigit` `ft_isalnum` `ft_isascii` `ft_isprint` `ft_toupper` `ft_tolower`

**Strings:** `ft_strlen` `ft_strlcpy` `ft_strlcat` `ft_strchr` `ft_strrchr` `ft_strncmp` `ft_strnstr` `ft_strdup`

**Memória:** `ft_memset` `ft_bzero` `ft_memcpy` `ft_memmove` `ft_memchr` `ft_memcmp`

**Conversão:** `ft_atoi` `ft_itoa` `ft_calloc`

**Bônus:** `ft_substr` `ft_strjoin` `ft_strtrim` `ft_split` `ft_strmapi` `ft_striteri`

**Saída (fd):** `ft_putchar_fd` `ft_putstr_fd` `ft_putendl_fd` `ft_putnbr_fd`

## Como rodar localmente

**Pré-requisitos:** Node.js 18+ e npm

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/libft-games.git
cd libft-games

# 2. Instale as dependências
npm install

# 3. Rode em modo de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173**

### Build para produção

```bash
npm run build    # gera a pasta dist/
npm run preview  # serve o build localmente
```

## Stack

| Tecnologia | Uso |
|---|---|
| [Vite](https://vitejs.dev/) | Bundler e dev server |
| [React 19](https://react.dev/) | Interface |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilização |
| [shadcn/ui](https://ui.shadcn.com/) | Componentes de UI |
| [wouter](https://github.com/molefrog/wouter) | Roteamento |
| [@tanstack/react-query](https://tanstack.com/query) | Gerenciamento de estado assíncrono |

## Estrutura do projeto

```
libft-games/
├── src/
│   ├── data/
│   │   └── libftData.ts      # Dados de todas as funções, quizzes e questões
│   ├── pages/
│   │   ├── Home.tsx           # Menu principal
│   │   ├── QuizGame.tsx       # Jogo de quiz
│   │   ├── MatchGame.tsx      # Jogo da memória
│   │   ├── OutputGame.tsx     # Adivinhe a saída
│   │   ├── CodeFill.tsx       # Complete o código
│   │   ├── WordSearch.tsx     # Caça-palavras
│   │   └── FunctionRef.tsx    # Referência rápida
│   ├── components/ui/         # Componentes shadcn/ui
│   ├── App.tsx                # Roteamento principal
│   ├── main.tsx               # Entry point
│   └── index.css              # Tema terminal (verde/cyan)
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Funcionalidades

- **Aleatoriedade real** — perguntas e opções embaralhadas com Fisher-Yates a cada partida
- **5 funções aleatórias** no cabeçalho da home, diferentes a cada acesso
- **Tema terminal** — visual inspirado em terminal Unix com efeitos de glow e scanlines
- **100% frontend** — nenhum backend necessário, tudo roda no browser
- **Responsivo** — funciona em desktop e mobile

## Referência

O conteúdo dos jogos foi baseado no repositório [MTSmalow/libft](https://github.com/MTSmalow/libft), uma implementação do projeto libft da 42 São Paulo.

## Licença

MIT
