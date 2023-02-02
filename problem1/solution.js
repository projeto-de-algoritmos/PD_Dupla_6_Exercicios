const example1 = [
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [0, 1, 1, 1]
];

const resultExample1 = 15;

const example2 = [
  [1, 1, 1, 1],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
];

const resultExample2 = 6;

// Nesta solução é criado um clone da matriz de entrada para ser aplicado o memoization.
// Já que para ser uma sub matriz quadrada válida é necessário que o quadrado tenha no mínimo
// tamanho 1 com valor de células 1, o memoization[i][j] já vai ter o valor computado inicialmente
// nas células que possuem valor 1.
// Partindo para o loop vamos visitar todas as células da matriz, sendo que para as células de coordenadas
// diferentes de 0 e com valor diferente de 0 vai ser aplicado uma verificação para ver se não é possível
// forma uma sub matriz com tamanho + 1, fazendo o min entre o valor de memoization das células imediatamente
// acima, diagonal superior esquerda e a esquerda. É feito o min para garantir a maior sub matriz quadrada
// com valores iguais a 1. O resultado do min é somado a 1, já que uma célula com valor diferente de 0 já
// forma uma sub matriz. Cada vez que visitada uma célula é acrescentado a contagem de sub matrizes o valor
// do memoization naquela célula.

function countSquare (matrix) {
  // cria memoization com clone da matriz
  const memoization = [...matrix];

  const numRows = matrix.length;
  const numColumns = matrix[0].length;

  let countSquare = 0;

  // percorre todas as linhas
  for (let i = 0; i < numRows; i++) {
    // percorre todas as colunas
    for (let j = 0; j < numColumns; j++) {
      // primeira e segunda verificação existe para não tentar calcular o valor de uma sub matriz inexistente.
      // a terceira verificação serve para computar memoization apenas de células com valor diferente de 0, já
      // uma célula com valor 0 não vai acrescentar na soma.
      if (i != 0 && j != 0 && matrix[i][j] > 0) {
        // calcula o memoization atráves do mínimo entre um quadrado formado com os vizinhos imediatamente acima,
        // na diagonal superior esquerda, e na esquerda.
        // soma mais 1 já que a própria célula é um quadrado (sub matriz) válido.
        memoization[i][j] = Math.min(memoization[i][j-1], memoization[i-1][j-1], memoization[i-1][j]) + 1;
      }
      // atualiza a soma de quadrados.
      countSquare += memoization[i][j];
    }
  }

  return countSquare;
}

console.log(`-> Exemplo 1:\nEntrada: `);
console.table(example1);
console.log(`Saída esperada: ${resultExample1} \nResultado obtido: ${countSquare(example1)} \n`);

console.log(`-> Exemplo 2:\nEntrada: `);
console.table(example2);
console.log(`Saída esperada: ${resultExample2} \nResultado obtido: ${countSquare(example2)} \n`);
