export interface LibftFunction {
  name: string;
  category: "string" | "char" | "memory" | "conversion" | "output" | "list" | "bonus";
  description: string;
  prototype: string;
  params: string;
  returns: string;
  hint: string;
  example?: string;
}

export const LIBFT_FUNCTIONS: LibftFunction[] = [
  {
    name: "ft_isalpha",
    category: "char",
    description: "Verifica se o caractere é uma letra (a-z ou A-Z)",
    prototype: "int ft_isalpha(int c)",
    params: "c: caractere a verificar",
    returns: "Valor não-zero se alfabético, 0 caso contrário",
    hint: "Usa intervalos ASCII: 65-90 (A-Z) e 97-122 (a-z)",
    example: "ft_isalpha('A') → 1\nft_isalpha('3') → 0",
  },
  {
    name: "ft_isdigit",
    category: "char",
    description: "Verifica se o caractere é um dígito numérico (0-9)",
    prototype: "int ft_isdigit(int c)",
    params: "c: caractere a verificar",
    returns: "Valor não-zero se dígito, 0 caso contrário",
    hint: "ASCII dos dígitos: '0' = 48, '9' = 57",
    example: "ft_isdigit('5') → 1\nft_isdigit('a') → 0",
  },
  {
    name: "ft_isalnum",
    category: "char",
    description: "Verifica se o caractere é alfanumérico (letra ou dígito)",
    prototype: "int ft_isalnum(int c)",
    params: "c: caractere a verificar",
    returns: "Valor não-zero se alfanumérico, 0 caso contrário",
    hint: "Combina ft_isalpha e ft_isdigit",
    example: "ft_isalnum('a') → 1\nft_isalnum('@') → 0",
  },
  {
    name: "ft_isascii",
    category: "char",
    description: "Verifica se o valor está na tabela ASCII (0-127)",
    prototype: "int ft_isascii(int c)",
    params: "c: valor a verificar",
    returns: "1 se for ASCII válido, 0 caso contrário",
    hint: "ASCII vai de 0 a 127 (7 bits)",
    example: "ft_isascii(65) → 1\nft_isascii(200) → 0",
  },
  {
    name: "ft_isprint",
    category: "char",
    description: "Verifica se o caractere é imprimível (inclui espaço)",
    prototype: "int ft_isprint(int c)",
    params: "c: caractere a verificar",
    returns: "Valor não-zero se imprimível, 0 caso contrário",
    hint: "Caracteres imprimíveis são de ASCII 32 (espaço) a 126 (~)",
    example: "ft_isprint(' ') → 1\nft_isprint('\\n') → 0",
  },
  {
    name: "ft_toupper",
    category: "char",
    description: "Converte letra minúscula para maiúscula",
    prototype: "int ft_toupper(int c)",
    params: "c: caractere a converter",
    returns: "Letra maiúscula correspondente, ou o próprio c",
    hint: "Diferença entre maiúscula e minúscula no ASCII é 32",
    example: "ft_toupper('a') → 'A'\nft_toupper('A') → 'A'",
  },
  {
    name: "ft_tolower",
    category: "char",
    description: "Converte letra maiúscula para minúscula",
    prototype: "int ft_tolower(int c)",
    params: "c: caractere a converter",
    returns: "Letra minúscula correspondente, ou o próprio c",
    hint: "Diferença entre maiúscula e minúscula no ASCII é 32",
    example: "ft_tolower('A') → 'a'\nft_tolower('5') → '5'",
  },
  {
    name: "ft_strlen",
    category: "string",
    description: "Calcula o comprimento de uma string (sem contar o '\\0')",
    prototype: "size_t ft_strlen(const char *s)",
    params: "s: string de entrada",
    returns: "Número de caracteres antes do terminador nulo",
    hint: "Percorre a string até encontrar '\\0'",
    example: "ft_strlen(\"hello\") → 5\nft_strlen(\"\") → 0",
  },
  {
    name: "ft_strlcpy",
    category: "string",
    description: "Copia string com tamanho seguro",
    prototype: "size_t ft_strlcpy(char *dst, const char *src, size_t dstsize)",
    params: "dst: destino, src: origem, dstsize: tamanho do buffer",
    returns: "Comprimento total da string src",
    hint: "Copia no máximo dstsize-1 bytes e sempre termina com '\\0'",
    example: "ft_strlcpy(dst, \"hello\", 10) → 5",
  },
  {
    name: "ft_strlcat",
    category: "string",
    description: "Concatena strings com tamanho seguro",
    prototype: "size_t ft_strlcat(char *dst, const char *src, size_t dstsize)",
    params: "dst: destino, src: origem, dstsize: tamanho total do buffer",
    returns: "Comprimento total que teria se dstsize fosse suficientemente grande",
    hint: "Nunca escreve além de dstsize bytes no total",
    example: "Se dst=\"ab\", src=\"cd\", size=10: retorna 4",
  },
  {
    name: "ft_strchr",
    category: "string",
    description: "Localiza primeira ocorrência de um caractere na string",
    prototype: "char *ft_strchr(const char *s, int c)",
    params: "s: string, c: caractere a buscar",
    returns: "Ponteiro para a primeira ocorrência, ou NULL",
    hint: "O terminador '\\0' também pode ser buscado",
    example: "ft_strchr(\"libft\", 'b') → ponteiro para 'b'",
  },
  {
    name: "ft_strrchr",
    category: "string",
    description: "Localiza ÚLTIMA ocorrência de um caractere na string",
    prototype: "char *ft_strrchr(const char *s, int c)",
    params: "s: string, c: caractere a buscar",
    returns: "Ponteiro para a última ocorrência, ou NULL",
    hint: "O 'r' em strrchr vem de 'reverse' (reverso)",
    example: "ft_strrchr(\"libft\", 't') → ponteiro para 't' final",
  },
  {
    name: "ft_strncmp",
    category: "string",
    description: "Compara dois primeiros n bytes de duas strings",
    prototype: "int ft_strncmp(const char *s1, const char *s2, size_t n)",
    params: "s1, s2: strings a comparar, n: número de bytes",
    returns: "0 se iguais, <0 se s1<s2, >0 se s1>s2",
    hint: "Para quando encontra diferença ou após n bytes",
    example: "ft_strncmp(\"abc\", \"abd\", 2) → 0\nft_strncmp(\"abc\", \"abd\", 3) → negativo",
  },
  {
    name: "ft_strnstr",
    category: "string",
    description: "Encontra substring dentro de string, buscando nos primeiros n bytes",
    prototype: "char *ft_strnstr(const char *hay, const char *needle, size_t len)",
    params: "hay: string onde buscar, needle: substring, len: limite",
    returns: "Ponteiro para o início de needle em hay, ou NULL",
    hint: "Se needle for vazia string, retorna hay",
    example: "ft_strnstr(\"42 school\", \"school\", 9) → ponteiro para 'school'",
  },
  {
    name: "ft_strdup",
    category: "string",
    description: "Duplica uma string alocando memória nova com malloc",
    prototype: "char *ft_strdup(const char *s1)",
    params: "s1: string a duplicar",
    returns: "Ponteiro para a nova string duplicada",
    hint: "Aloca strlen(s1)+1 bytes para incluir o '\\0'",
    example: "ft_strdup(\"42\") → nova cópia de \"42\"",
  },
  {
    name: "ft_memset",
    category: "memory",
    description: "Preenche os primeiros n bytes de memória com valor c",
    prototype: "void *ft_memset(void *b, int c, size_t len)",
    params: "b: área de memória, c: valor de preenchimento, len: quantidade",
    returns: "Ponteiro para b",
    hint: "Frequentemente usado para inicializar arrays com 0",
    example: "ft_memset(arr, 0, 10) → preenche 10 bytes com zeros",
  },
  {
    name: "ft_bzero",
    category: "memory",
    description: "Preenche os primeiros n bytes com zero (\\0)",
    prototype: "void ft_bzero(void *s, size_t n)",
    params: "s: área de memória, n: quantidade de bytes",
    returns: "Nada (void)",
    hint: "Equivale a ft_memset(s, 0, n)",
    example: "ft_bzero(buffer, 100) → zera 100 bytes",
  },
  {
    name: "ft_memcpy",
    category: "memory",
    description: "Copia n bytes de src para dst (sem overlap)",
    prototype: "void *ft_memcpy(void *dst, const void *src, size_t n)",
    params: "dst: destino, src: origem, n: bytes a copiar",
    returns: "Ponteiro para dst",
    hint: "Comportamento indefinido se src e dst se sobrepõem!",
    example: "ft_memcpy(dst, src, 5) → copia 5 bytes",
  },
  {
    name: "ft_memmove",
    category: "memory",
    description: "Copia n bytes de src para dst (suporta overlap)",
    prototype: "void *ft_memmove(void *dst, const void *src, size_t len)",
    params: "dst: destino, src: origem, len: bytes a copiar",
    returns: "Ponteiro para dst",
    hint: "Ao contrário de memcpy, funciona mesmo com memória sobreposta",
    example: "Seguro para usar quando dst e src se sobrepõem",
  },
  {
    name: "ft_memchr",
    category: "memory",
    description: "Busca valor c nos primeiros n bytes de memória",
    prototype: "void *ft_memchr(const void *s, int c, size_t n)",
    params: "s: área de memória, c: valor a buscar, n: limite",
    returns: "Ponteiro para a primeira ocorrência, ou NULL",
    hint: "Funciona em bytes brutos, não apenas strings",
    example: "ft_memchr(str, '\\0', 100) → encontra o terminador nulo",
  },
  {
    name: "ft_memcmp",
    category: "memory",
    description: "Compara n bytes de duas áreas de memória",
    prototype: "int ft_memcmp(const void *s1, const void *s2, size_t n)",
    params: "s1, s2: áreas de memória, n: bytes a comparar",
    returns: "0 se iguais, diferença do primeiro byte diferente",
    hint: "Compara como unsigned char, byte a byte",
    example: "ft_memcmp(\"abc\", \"abc\", 3) → 0",
  },
  {
    name: "ft_atoi",
    category: "conversion",
    description: "Converte string para inteiro",
    prototype: "int ft_atoi(const char *str)",
    params: "str: string representando um número",
    returns: "Valor inteiro correspondente",
    hint: "Ignora espaços iniciais, aceita sinal + ou -",
    example: "ft_atoi(\"  -42\") → -42\nft_atoi(\"123abc\") → 123",
  },
  {
    name: "ft_itoa",
    category: "conversion",
    description: "Converte inteiro para string (aloca com malloc)",
    prototype: "char *ft_itoa(int n)",
    params: "n: inteiro a converter",
    returns: "Nova string representando n",
    hint: "Deve tratar INT_MIN corretamente",
    example: "ft_itoa(42) → \"42\"\nft_itoa(-1) → \"-1\"",
  },
  {
    name: "ft_calloc",
    category: "conversion",
    description: "Aloca e zera memória para nmemb elementos de size bytes",
    prototype: "void *ft_calloc(size_t nmemb, size_t size)",
    params: "nmemb: número de elementos, size: tamanho de cada elemento",
    returns: "Ponteiro para memória alocada e zerada, ou NULL",
    hint: "Equivale a malloc + bzero. Protege contra overflow de tamanho",
    example: "ft_calloc(10, sizeof(int)) → array de 10 ints zerados",
  },
  {
    name: "ft_substr",
    category: "bonus",
    description: "Cria substring de s a partir do índice start com comprimento len",
    prototype: "char *ft_substr(char const *s, unsigned int start, size_t len)",
    params: "s: string, start: índice inicial, len: comprimento máximo",
    returns: "Nova string alocada com malloc, ou NULL",
    hint: "Se start >= strlen(s), retorna string vazia \"\"",
    example: "ft_substr(\"libft\", 1, 3) → \"ibf\"",
  },
  {
    name: "ft_strjoin",
    category: "bonus",
    description: "Cria nova string juntando s1 e s2",
    prototype: "char *ft_strjoin(char const *s1, char const *s2)",
    params: "s1: primeira string, s2: segunda string",
    returns: "Nova string concatenada, alocada com malloc",
    hint: "O tamanho final é strlen(s1) + strlen(s2) + 1",
    example: "ft_strjoin(\"42 \", \"school\") → \"42 school\"",
  },
  {
    name: "ft_strtrim",
    category: "bonus",
    description: "Remove caracteres do conjunto 'set' do início e fim de s1",
    prototype: "char *ft_strtrim(char const *s1, char const *set)",
    params: "s1: string, set: conjunto de chars a remover",
    returns: "Nova string sem os chars do set no início/fim",
    hint: "Remove todos os chars do set, não só espaços",
    example: "ft_strtrim(\"  hello  \", \" \") → \"hello\"",
  },
  {
    name: "ft_split",
    category: "bonus",
    description: "Divide string em array de substrings usando c como delimitador",
    prototype: "char **ft_split(char const *s, char c)",
    params: "s: string a dividir, c: delimitador",
    returns: "Array de strings terminado por NULL",
    hint: "O resultado deve ser liberado com free() para cada string",
    example: "ft_split(\"a,b,c\", ',') → [\"a\", \"b\", \"c\", NULL]",
  },
  {
    name: "ft_strmapi",
    category: "bonus",
    description: "Aplica função f em cada char da string, retorna nova string",
    prototype: "char *ft_strmapi(char const *s, char (*f)(unsigned int, char))",
    params: "s: string, f: função recebendo índice e char",
    returns: "Nova string resultante da aplicação de f",
    hint: "Similar a map() de linguagens funcionais",
    example: "ft_strmapi(\"hello\", &ft_toupper_indexed) → \"HELLO\"",
  },
  {
    name: "ft_striteri",
    category: "bonus",
    description: "Aplica função f em cada char da string modificando in-place",
    prototype: "void ft_striteri(char *s, void (*f)(unsigned int, char*))",
    params: "s: string (mutável), f: função recebendo índice e ponteiro para char",
    returns: "Nada (void)",
    hint: "Diferente de strmapi: modifica a string original, não cria nova",
    example: "ft_striteri(str, &capitalize_first)",
  },
  {
    name: "ft_putchar_fd",
    category: "output",
    description: "Escreve caractere c no file descriptor fd",
    prototype: "void ft_putchar_fd(char c, int fd)",
    params: "c: caractere a escrever, fd: file descriptor",
    returns: "Nada (void)",
    hint: "fd=1 é stdout, fd=2 é stderr",
    example: "ft_putchar_fd('A', 1) → escreve 'A' na saída padrão",
  },
  {
    name: "ft_putstr_fd",
    category: "output",
    description: "Escreve string s no file descriptor fd",
    prototype: "void ft_putstr_fd(char *s, int fd)",
    params: "s: string a escrever, fd: file descriptor",
    returns: "Nada (void)",
    hint: "Usa ft_putchar_fd internamente para cada char",
    example: "ft_putstr_fd(\"hello\", 1) → escreve na stdout",
  },
  {
    name: "ft_putendl_fd",
    category: "output",
    description: "Escreve string s seguida de newline no file descriptor fd",
    prototype: "void ft_putendl_fd(char *s, int fd)",
    params: "s: string a escrever, fd: file descriptor",
    returns: "Nada (void)",
    hint: "Equivale a ft_putstr_fd + escrever '\\n'",
    example: "ft_putendl_fd(\"hello\", 1) → escreve \"hello\\n\" na stdout",
  },
  {
    name: "ft_putnbr_fd",
    category: "output",
    description: "Escreve número inteiro n no file descriptor fd",
    prototype: "void ft_putnbr_fd(int n, int fd)",
    params: "n: inteiro a escrever, fd: file descriptor",
    returns: "Nada (void)",
    hint: "Deve tratar números negativos e INT_MIN",
    example: "ft_putnbr_fd(-42, 1) → escreve \"-42\" na stdout",
  },
];

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  functionName: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    functionName: "ft_strlen",
    question: "O que ft_strlen(\"42 school\") retorna?",
    options: ["9", "8", "10", "0"],
    correct: 0,
    explanation: "ft_strlen conta os bytes antes do '\\0'. \"42 school\" tem 9 caracteres (4, 2, espaço, s, c, h, o, o, l).",
  },
  {
    functionName: "ft_atoi",
    question: "O que ft_atoi(\"  -42abc\") retorna?",
    options: ["-42", "42", "0", "Erro"],
    correct: 0,
    explanation: "ft_atoi ignora espaços iniciais, processa o sinal '-' e lê dígitos até encontrar 'a', retornando -42.",
  },
  {
    functionName: "ft_strchr",
    question: "ft_strchr(\"libft\", 'f') retorna...",
    options: [
      "Ponteiro para 'f' em \"libft\"",
      "O índice 3",
      "NULL",
      "O caractere 'f'",
    ],
    correct: 0,
    explanation: "ft_strchr retorna um ponteiro (char*) para a primeira ocorrência do caractere na string, não um índice.",
  },
  {
    functionName: "ft_memset",
    question: "Qual a diferença entre ft_memset e ft_bzero?",
    options: [
      "bzero apenas preenche com zeros, memset aceita qualquer valor",
      "São idênticos",
      "memset é para strings, bzero é para memória",
      "bzero retorna ponteiro, memset retorna void",
    ],
    correct: 0,
    explanation: "ft_bzero(s, n) é equivalente a ft_memset(s, 0, n). bzero só preenche com zeros, enquanto memset aceita qualquer byte como valor.",
  },
  {
    functionName: "ft_strncmp",
    question: "ft_strncmp(\"abc\", \"abz\", 2) retorna...",
    options: ["0", "Valor positivo", "Valor negativo", "-23"],
    correct: 0,
    explanation: "Os primeiros 2 caracteres ('ab' == 'ab') são iguais. Como n=2, a comparação para antes de chegar em 'c' vs 'z', retornando 0.",
  },
  {
    functionName: "ft_substr",
    question: "ft_substr(\"libft42\", 3, 2) retorna...",
    options: ["\"ft\"", "\"bf\"", "\"lib\"", "\"42\""],
    correct: 0,
    explanation: "Começa no índice 3 ('f') e pega no máximo 2 caracteres: 'f' e 't', resultando em \"ft\".",
  },
  {
    functionName: "ft_itoa",
    question: "ft_itoa(-2147483648) (INT_MIN) deve...",
    options: [
      "Retornar \"-2147483648\" corretamente",
      "Causar comportamento indefinido",
      "Retornar NULL",
      "Retornar \"2147483648\"",
    ],
    correct: 0,
    explanation: "ft_itoa deve tratar INT_MIN corretamente. Como -INT_MIN causa overflow em int, usa-se long ou técnica especial para converter -2147483648.",
  },
  {
    functionName: "ft_split",
    question: "ft_split(\"a,,b\", ',') resulta em...",
    options: [
      "[\"a\", \"b\", NULL]",
      "[\"a\", \"\", \"b\", NULL]",
      "[\"a\", \",\", \"b\", NULL]",
      "NULL",
    ],
    correct: 0,
    explanation: "ft_split trata delimitadores múltiplos consecutivos como um só. Strings vazias entre delimitadores não são incluídas no resultado.",
  },
  {
    functionName: "ft_memcpy",
    question: "Por que usar ft_memmove em vez de ft_memcpy quando as regiões se sobrepõem?",
    options: [
      "ft_memcpy tem comportamento indefinido com overlap",
      "ft_memmove é mais rápido",
      "ft_memcpy não copia bytes nulos",
      "Não há diferença",
    ],
    correct: 0,
    explanation: "ft_memcpy não garante comportamento correto quando src e dst se sobrepõem. ft_memmove usa um buffer intermediário ou copia na direção correta para lidar com overlaps.",
  },
  {
    functionName: "ft_calloc",
    question: "Qual é a vantagem de ft_calloc sobre malloc seguido de ft_memset?",
    options: [
      "ft_calloc verifica overflow na multiplicação nmemb * size",
      "ft_calloc é mais rápido",
      "ft_calloc não precisa de free()",
      "ft_calloc aloca na stack",
    ],
    correct: 0,
    explanation: "ft_calloc deve verificar se nmemb * size não causa overflow antes de alocar. Isso evita alocar menos memória do que o esperado.",
  },
  {
    functionName: "ft_strtrim",
    question: "ft_strtrim(\"xxhelloxx\", \"x\") retorna...",
    options: ["\"hello\"", "\"xxhello\"", "\"helloxx\"", "\" hello \""],
    correct: 0,
    explanation: "ft_strtrim remove os caracteres do conjunto 'set' (aqui 'x') de AMBOS os lados. Todos os 'x' do início e fim são removidos, deixando \"hello\".",
  },
  {
    functionName: "ft_strlcpy",
    question: "ft_strlcpy(dst, \"hello\", 3) copia quantos caracteres para dst?",
    options: ["2 chars + '\\0'", "5 chars", "3 chars", "0 chars"],
    correct: 0,
    explanation: "strlcpy copia no máximo dstsize-1 = 2 caracteres ('h','e') e sempre adiciona '\\0'. dst fica como \"he\\0\". Mas retorna 5 (tamanho de src).",
  },
  {
    functionName: "ft_isascii",
    question: "ft_isascii(127) retorna...",
    options: ["1 (verdadeiro)", "0 (falso)", "-1", "127"],
    correct: 0,
    explanation: "O código ASCII vai de 0 a 127 (inclusive). O valor 127 é o caractere DEL (delete), que ainda é ASCII válido.",
  },
  {
    functionName: "ft_strjoin",
    question: "ft_strjoin(\"Hello\", \" World\") retorna...",
    options: [
      "Nova string \"Hello World\" alocada com malloc",
      "Modifica a primeira string",
      "\"Hello\" concatenado in-place",
      "NULL sempre",
    ],
    correct: 0,
    explanation: "ft_strjoin aloca NOVA memória com malloc e retorna uma cópia da concatenação. As strings originais não são modificadas.",
  },
  {
    functionName: "ft_toupper",
    question: "ft_toupper('5') retorna...",
    options: ["'5' (sem mudança)", "'%'", "0", "Erro"],
    correct: 0,
    explanation: "ft_toupper só converte letras minúsculas para maiúsculas. Se o caractere não for uma letra minúscula, retorna o próprio caractere sem alteração.",
  },
];

export interface MatchPair {
  function: string;
  description: string;
}

export const MATCH_PAIRS: MatchPair[] = [
  { function: "ft_strlen", description: "Conta caracteres antes do '\\0'" },
  { function: "ft_strdup", description: "Duplica string com malloc" },
  { function: "ft_strchr", description: "Acha 1ª ocorrência de char" },
  { function: "ft_strrchr", description: "Acha ÚLTIMA ocorrência de char" },
  { function: "ft_atoi", description: "String → Inteiro" },
  { function: "ft_itoa", description: "Inteiro → String (malloc)" },
  { function: "ft_memset", description: "Preenche memória com valor" },
  { function: "ft_bzero", description: "Zera bytes de memória" },
  { function: "ft_memcpy", description: "Copia memória (sem overlap)" },
  { function: "ft_memmove", description: "Copia memória (com overlap)" },
  { function: "ft_calloc", description: "Aloca e zera memória" },
  { function: "ft_split", description: "Divide string por delimitador" },
  { function: "ft_strjoin", description: "Concatena duas strings (malloc)" },
  { function: "ft_strtrim", description: "Remove chars do início e fim" },
  { function: "ft_substr", description: "Extrai substring (malloc)" },
  { function: "ft_isalpha", description: "É letra alfabética?" },
  { function: "ft_isdigit", description: "É dígito 0-9?" },
  { function: "ft_isalnum", description: "É letra OU dígito?" },
  { function: "ft_toupper", description: "Minúscula → Maiúscula" },
  { function: "ft_tolower", description: "Maiúscula → Minúscula" },
];

export interface CodeFillQuestion {
  title: string;
  functionName: string;
  description: string;
  codeTemplate: string;
  blanks: { placeholder: string; answer: string; hint: string }[];
  explanation: string;
}

export const CODE_FILL_QUESTIONS: CodeFillQuestion[] = [
  {
    title: "ft_strlen",
    functionName: "ft_strlen",
    description: "Complete a implementação do ft_strlen",
    codeTemplate: `size_t ft_strlen(char *s)
{
    int count;

    count = [BLANK_1];
    while ([BLANK_2])
        count++;
    return ([BLANK_3]);
}`,
    blanks: [
      { placeholder: "[BLANK_1]", answer: "0", hint: "Inicia o contador" },
      { placeholder: "[BLANK_2]", answer: "s[count]", hint: "Condição de loop (enquanto não é '\\0')" },
      { placeholder: "[BLANK_3]", answer: "count", hint: "O que retornar?" },
    ],
    explanation: "ft_strlen percorre a string incrementando um contador até encontrar o caractere nulo '\\0', então retorna o contador.",
  },
  {
    title: "ft_isalpha",
    functionName: "ft_isalpha",
    description: "Complete a implementação do ft_isalpha",
    codeTemplate: `int ft_isalpha(int c)
{
    return ((c >= [BLANK_1] && c <= [BLANK_2])
        || (c >= [BLANK_3] && c <= [BLANK_4]));
}`,
    blanks: [
      { placeholder: "[BLANK_1]", answer: "65", hint: "ASCII de 'A' maiúsculo" },
      { placeholder: "[BLANK_2]", answer: "90", hint: "ASCII de 'Z' maiúsculo" },
      { placeholder: "[BLANK_3]", answer: "97", hint: "ASCII de 'a' minúsculo" },
      { placeholder: "[BLANK_4]", answer: "122", hint: "ASCII de 'z' minúsculo" },
    ],
    explanation: "Verifica se c está nos intervalos ASCII das letras: 65-90 (A-Z) ou 97-122 (a-z).",
  },
  {
    title: "ft_atoi",
    functionName: "ft_atoi",
    description: "Complete a lógica de sinal do ft_atoi",
    codeTemplate: `int ft_atoi(const char *str)
{
    int res;
    int s;

    res = 0;
    s = [BLANK_1];
    while ((*str >= '\t' && *str <= '\r') || *str == ' ')
        str++;
    if (*str == '-' || *str == '+')
        if ([BLANK_2])
            s *= -1;
    while (ft_isdigit(*str))
        res = (res * [BLANK_3]) + (*str++ - '0');
    return (res * [BLANK_4]);
}`,
    blanks: [
      { placeholder: "[BLANK_1]", answer: "1", hint: "Sinal começa positivo" },
      { placeholder: "[BLANK_2]", answer: "*str++ == '-'", hint: "Verifica se é '-' e avança o ponteiro" },
      { placeholder: "[BLANK_3]", answer: "10", hint: "Base decimal" },
      { placeholder: "[BLANK_4]", answer: "s", hint: "Aplica o sinal ao resultado" },
    ],
    explanation: "ft_atoi: pula espaços, detecta sinal, converte dígito por dígito multiplicando por 10 (base decimal).",
  },
  {
    title: "ft_bzero",
    functionName: "ft_bzero",
    description: "Complete a implementação do ft_bzero",
    codeTemplate: `void ft_bzero(void *s, size_t n)
{
    unsigned char *ptr;

    ptr = [BLANK_1];
    while (n--)
        *ptr++ = [BLANK_2];
}`,
    blanks: [
      { placeholder: "[BLANK_1]", answer: "(unsigned char *)s", hint: "Cast para trabalhar byte a byte" },
      { placeholder: "[BLANK_2]", answer: "0", hint: "Valor com que preencher" },
    ],
    explanation: "ft_bzero: faz cast para unsigned char* para acessar byte a byte, e zera cada byte até n.",
  },
  {
    title: "ft_strdup",
    functionName: "ft_strdup",
    description: "Complete a implementação do ft_strdup",
    codeTemplate: `char *ft_strdup(const char *s1)
{
    char *dup;
    size_t len;

    len = [BLANK_1];
    dup = (char *)malloc([BLANK_2]);
    if (!dup)
        return ([BLANK_3]);
    ft_strlcpy(dup, s1, len + 1);
    return (dup);
}`,
    blanks: [
      { placeholder: "[BLANK_1]", answer: "ft_strlen(s1)", hint: "Precisa saber o tamanho para alocar" },
      { placeholder: "[BLANK_2]", answer: "len + 1", hint: "+1 para o '\\0' terminador" },
      { placeholder: "[BLANK_3]", answer: "NULL", hint: "O que retornar se malloc falhar?" },
    ],
    explanation: "ft_strdup: calcula tamanho, aloca len+1 bytes (para incluir '\\0'), copia a string e retorna.",
  },
];

export const WORD_SEARCH_FUNCTIONS = [
  "STRLEN", "STRCHR", "STRDUP", "ATOI", "ITOA",
  "MEMSET", "BZERO", "MEMCPY", "MEMMOVE", "CALLOC",
  "SUBSTR", "STRJOIN", "SPLIT", "STRTRIM", "ISALPHA",
  "ISDIGIT", "TOUPPER", "TOLOWER",
];

export const CATEGORY_COLORS: Record<string, string> = {
  string: "text-green-400 border-green-500/30 bg-green-500/10",
  char: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  memory: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  conversion: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
  output: "text-orange-400 border-orange-500/30 bg-orange-500/10",
  list: "text-pink-400 border-pink-500/30 bg-pink-500/10",
  bonus: "text-blue-400 border-blue-500/30 bg-blue-500/10",
};

export const CATEGORY_LABELS: Record<string, string> = {
  string: "Strings",
  char: "Caracteres",
  memory: "Memória",
  conversion: "Conversão",
  output: "Saída (fd)",
  list: "Listas",
  bonus: "Bônus",
};
