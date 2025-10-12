#!/bin/bash
# Script de build para o Vercel
echo "Iniciando build do Paulo Veículos..."

# Verificar se todos os arquivos essenciais existem
if [ ! -f "index.html" ]; then
    echo "ERRO: index.html não encontrado!"
    exit 1
fi

if [ ! -f "manifest.json" ]; then
    echo "ERRO: manifest.json não encontrado!"
    exit 1
fi

if [ ! -f "sw.js" ]; then
    echo "ERRO: sw.js não encontrado!"
    exit 1
fi

# Verificar se as pastas de assets existem
if [ ! -d "assets" ]; then
    echo "ERRO: Pasta assets não encontrada!"
    exit 1
fi

if [ ! -d "Imagens" ]; then
    echo "ERRO: Pasta Imagens não encontrada!"
    exit 1
fi

echo "✅ Todos os arquivos essenciais encontrados!"
echo "✅ Build concluído com sucesso!"
