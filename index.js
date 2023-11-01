import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

const inputDir = './input';
const outputDir = './output';
const maxWidth = 1080;

// Função para processar uma imagem
async function processImage(inputPath, outputPath) {
    try {
        const image = sharp(inputPath);
        const imageInfo = await image.metadata();

        let resizedImage = image;
        if (true) {
            resizedImage = image.resize({ width: maxWidth, withoutEnlargement: true });
        }

        const buffer = await resizedImage.toBuffer();

        // Comprime a imagem
        const compressedBuffer = await imagemin.buffer(buffer, {
            plugins: [imageminWebp({ quality: 75 })],
        });

        // Salva a imagem processada no diretório de saída
        fs.writeFileSync(outputPath, compressedBuffer);

        console.log(`Imagem processada: ${outputPath}`);
    } catch (error) {
        console.error(`Erro ao processar a imagem ${inputPath}: ${error}`);
    }
}

// Função para processar todas as imagens na pasta de entrada
async function processImages() {
    try {
        const files = fs.readdirSync(inputDir);

        for (const file of files) {
            const extname = path.extname(file).toLowerCase();
            if (extname === '.jpg' || extname === '.jpeg' || extname === '.png') {
                const inputPath = path.join(inputDir, file);
                const outputPath = path.join(outputDir, path.basename(file, extname) + '.webp');
                await processImage(inputPath, outputPath);
            }
        }
    } catch (error) {
        console.error(`Erro ao listar arquivos na pasta ${inputDir}: ${error}`);
    }
}

// Verifica se o diretório de saída existe, se não, cria-o
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Executa o processamento das imagens
processImages();