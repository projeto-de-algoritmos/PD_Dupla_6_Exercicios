const example1 = [[2,1,3],[6,5,4],[7,8,9]];
const resultExample1 = 13;

const example2 = [[-19,57],[-40,-5]];
const resultExample2 = -59;

// Para a solução do problema foi pensado no algoritmo de maior subsequência,
// que para cada número na posição j é guardado a maior subsequência que termina
// em j. Mas neste caso não foi preciso criar uma estrutura para memoization,
// podê-se usar a própria matriz de entrada, além de que o objetivo era o caminho
// com menor soma.
// Sendo assim, o algoritmo visita todas as células a partir da segunda linha,
// fazendo o seguinte:
//  1 - analisa qual seria o menor caminho acumulado até chegar na célula em questão
//  2 - atualiza o valor da célula somand seu valor mais o menor caminho encontrado
// Após visitar todas as células e fazer a computação, é necessário visitar a última
// linha para encontrar o menor valor acumulado, sendo essa a soma mínima ótima.

function minFallingPathSum(matrix) {
  const mLength = matrix.length;

  for (let i = 1; i < mLength; i++) {
      // visita todas as células
      for (let j = 0; j < mLength; j++) {
          let menor = 100001;
          // compara o menor caminho acumulado com as células vizinhas
          // mais próximas da linha acima
          for (let k = j-1; k <= j+1; k++) {
              if (k >= 0 && k < mLength && matrix[i-1][k] < menor) {
                  menor = matrix[i-1][k];
              }
          }
          // atualiza valor da célula com menor caminho até a mesma
          matrix[i][j] += menor;
      }
  }

  let menor = 100001;
  // percorre a última linha para encontrar a menor soma de caminho
  // encontrada
  for (let j = 0; j < mLength; j++) {
      if (matrix[mLength-1][j] < menor) {
          menor = matrix[mLength-1][j];
      }
  }

  return menor;
}

console.log(`-> Exemplo 1:\nEntrada: `);
console.table(example1);
console.log(`Saída esperada: ${resultExample1} \nResultado obtido: ${minFallingPathSum(example1)} \n`);

console.log(`-> Exemplo 2:\nEntrada: `);
console.table(example2);
console.log(`Saída esperada: ${resultExample2} \nResultado obtido: ${minFallingPathSum(example2)} \n`);
