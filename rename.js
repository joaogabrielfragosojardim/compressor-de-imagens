import fs from "fs"
import path from "path"

// Diretório onde estão os arquivos
const diretorio = '../unilever/public/assets/product-01'; // Substitua pelo caminho correto

// Lê a lista de arquivos no diretório
fs.readdir(diretorio, (err, files) => {
  if (err) {
    console.error('Erro ao ler diretório:', err);
    return;
  }

  // Filtra apenas os arquivos com extensão .webp
  const webpFiles = files.filter(file => path.extname(file) === '.webp');

  // Ordena os arquivos em ordem numérica crescente
  webpFiles.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0]);
    const numB = parseInt(b.match(/\d+/)[0]);
    return numA - numB;
  });

  // Renomeia os arquivos na ordem desejada
  webpFiles.forEach((file, index) => {
    const novoNome = `02.RGB_color.${index.toString().padStart(4, '0')}.webp`;
    const caminhoAntigo = path.join(diretorio, file);
    const caminhoNovo = path.join(diretorio, novoNome);

    fs.rename(caminhoAntigo, caminhoNovo, err => {
      if (err) {
        console.error(`Erro ao renomear ${file}:`, err);
      } else {
        console.log(`Renomeado ${file} para ${novoNome}`);
      }
    });
  });
});
