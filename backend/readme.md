# Backend da Aplicação

Este é o servidor backend para a aplicação [Nome da Aplicação], responsável pela autenticação de usuários, gerenciamento de [histórico, etc.] e fornecimento de dados para o frontend.

O servidor é construído em **Node.js** com **Express** e se conecta a um banco de dados **MongoDB**.

## 🛠️ Tecnologias Principais

* **Node.js**
* **Express.js**
* **MongoDB**
* **bcrypt**: Para hashing de senhas.
* **CORS**: Para permitir requisições do frontend.
* **HTTPS (mkcert)**: Para rodar em um ambiente seguro localmente.

---

## 🚀 Começando

Para rodar este projeto localmente, você precisará ter o Node.js, MongoDB (local ou Atlas) e o `mkcert` instalados.

### 1. Pré-requisitos

* [Node.js (LTS)](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/try/download/community) (ou uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas/database))
* [mkcert](https://mkcert.dev/) (para gerar certificados SSL locais)

### 2. Instalação

1.  Clone este repositório:
    ```sh
    git clone https://github.com/HeitorPF/Web-FullStack.git
    ```
2.  Navegue até a pasta do projeto:
    ```sh
    cd backend
    ```
3.  Instale as dependências:
    ```sh
    npm install
    ```

### 3. Configuração

O servidor precisa dos certificados SSL Para funcionar.

#### A. Certificado SSL (HTTPS Local)

Este servidor é configurado para rodar em `https` e requer certificados SSL válidos para `localhost`.

1.  **Instale o `mkcert`** 
    ```sh
        choco install mkcert
    ```

2.  Abra um terminal **como Administrador** e rode (apenas uma vez):
    ```sh
    mkcert -install
    ```
    Isso instala a autoridade de certificação local (CA) no seu sistema/navegador.

3.  No terminal, navegue até a pasta `src` do projeto:
    ```sh
    cd src
    ```

4.  Gere os certificados para `localhost`:
    ```sh
    mkcert localhost
    ```
    Isso criará os arquivos `localhost-key.pem` e `localhost.pem` dentro da pasta `src`, que são lidos automaticamente pelo `server.js`.

    *(Estes arquivos já estão incluídos no `.gitignore` e não devem ser enviados ao repositório.)*

---

## 👟 Rodando a Aplicação

Depois de instalar as dependências e configurar o SSL, você pode iniciar o servidor.

```sh
node app.js
```

O servidor estará rodando em: **`https://localhost:8000`**

## 🌐 Endpoints da API

### Autenticação (`/user`)

* `POST /user/register`
    * Registra um novo usuário.
    * Body: `{ "email": "...", "senha": "..." }`
* `POST /user/login`
    * Autentica um usuário e retorna um token.
    * Body: `{ "email": "...", "senha": "..." }`

### Histórico (`/hist`)

* `GET /hist/adicionar`
    * Adiciona uma música no histórico
* `GET /hist/busca`
    * Busca as músicas no histórico
* `GET /hist/deletar`
    * Deleta uma música no histórico
