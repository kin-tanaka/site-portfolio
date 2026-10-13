# Portfólio — Kin Tanaka

Protótipo estático de um portfólio acadêmico e profissional. O site apresenta minha trajetória, um projeto inicial e espaços para trabalhos futuros em uma composição minimalista de preto, branco e azul escuro.

## Ver o site

[Acessar o portfólio](LINK DO SITE). A versão hospedada está restrita aos usuários autorizados.

## Executar localmente

Não há instalação nem processo de build. Mantenha os arquivos da pasta `dist/` juntos e abra `dist/index.html` no navegador.

Se preferir usar um servidor local, execute na raiz do repositório:

```bash
python -m http.server 8000 --directory dist
```

Depois, acesse `http://localhost:8000`.

## Estrutura do projeto

| Arquivo | Função |
| --- | --- |
| `dist/index.html` | Conteúdo e estrutura das seções Início, Projetos, Sobre e Contato. |
| `dist/styles.css` | Paleta, tipografia, layout e estados visuais dos elementos. |
| `dist/script.js` | Navegação entre seções, rolagem animada e destaque da seção ativa. |

O projeto usa somente HTML, CSS e JavaScript, sem frameworks ou dependências externas.

## Personalizar

- **Textos e links:** edite as seções correspondentes em `dist/index.html`. O link de e-mail usa `mailto:` para abrir a composição no aplicativo de e-mail configurado pelo visitante.
- **Projetos:** substitua os dois cartões de exemplo dentro de `.project-grid` pelos seus próximos trabalhos.
- **Cores e fontes:** ajuste as variáveis no início de `dist/styles.css`. O restante do arquivo está dividido pelas áreas do site.
- **Navegação:** altere `scrollDuration` em `dist/script.js` para ajustar a duração da passagem entre as seções.

## Escopo atual

Esta é uma apresentação estática pensada para desktop. Os cartões de projetos futuros são espaços reservados e ainda não abrem páginas de detalhes. O site não usa servidor de aplicação ou banco de dados.
