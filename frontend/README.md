Sistema de Login e Registro com React.js, Node.js e MongoDB

O back-end da aplicação foi desenvolvido com Node.js, seguindo o padrão de arquitetura MVC (Model-View-Controller). Nesta camada, são implementadas as funcionalidades de registro de usuários, login, atualização de perfil e coleta de dados dos usuários. Durante o registro de um usuário, é criado um token que permite ao usuário permanecer logado no site.

O front-end foi construído utilizando React.js e Vite, uma ferramenta que agiliza o carregamento da aplicação.

Quanto ao banco de dados, optei pelo MongoDB, por considerá-lo a melhor opção para este projeto.

Ao acessar o site, é solicitado ao usuário que faça login. Caso não possua uma conta, é possível registrar-se fornecendo nome, e-mail e senha. Uma vez criada a conta, o usuário dispõe de três opções: a primeira é um botão que direciona o usuário para a página de atualização de perfil, onde é possível alterar o nome e o e-mail. Retornando à página inicial e selecionando a segunda opção, o usuário pode visualizar todos os outros usuários cadastrados. A última opção disponível é o botão para se desconectar do site.