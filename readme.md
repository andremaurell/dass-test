# **Employee Manager**

---

## **Clone**
Clone o repositório do projeto para o seu ambiente local:
```bash
git clone https://github.com/andremaurell/dass-test.git
```

## **Backend**
1. Entre na pasta do backend:
```bash
cd api
```
2. Builde o backend:
```bash
npm install
```

3. Configure um banco de dados PostgreSQL e anote as informações de conexão (host, porta, usuário, senha, nome do banco).
4. No diretório `/api`, crie um arquivo `.env` e insira as seguintes informações:
   ```env
   DB_HOST=<seu_host>
   DB_PORT=<sua_porta>
   DB_USER=<seu_usuario>
   DB_PASSWORD=<sua_senha>
   DB_NAME=<seu_nome_do_banco>

5. Rode o backend:
```bash
npm run dev
```

## **Frontend**
1. Entre na pasta do backend:
```bash
cd dass-test-front
```

2. Builde o frontend:
```bash
npm install
```

3. Rode o frontend:
```bash
npm run dev
```

### **Usabilidade**
1. Use a barra de navegação para escolher a função de adicionar um novo funcionário.
2. adicione um funcionário de acordo com o formulário pedido.
3. Possui-se 3 parâmetros de busca, o primeiro é por texto, onde temos busca de CPF, Nome e Email. Logo após possui-se um select que filtra os tamanhos de camisa, e após um campo númerico que filtra por tamanho de calçado.
