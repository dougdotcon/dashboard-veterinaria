# Bovine Cattle Dashboard

## Visão Geral

O **Bovine Cattle Dashboard** é uma aplicação web desenvolvida para auxiliar veterinários e gestores na monitoração e análise de dados relacionados ao manejo de bovinos. Com uma interface intuitiva, permite filtrar informações por regiões, visualizar estatísticas essenciais e analisar gráficos detalhados sobre a saúde e produção do rebanho.

## Funcionalidades

- **Filtros por Região:** Selecione diferentes regiões para visualizar dados específicos de cada área.
- **Estatísticas em Tempo Real:**
  - **Total de Bovinos:** Visualize a quantidade total de bovinos gerenciados.
  - **Produção de Leite:** Acompanhe a produção diária, semanal ou mensal de leite.
  - **Casos de Doenças:** Monitore os casos de doenças identificadas no rebanho.
  - **Taxa de Mortalidade:** Avalie a taxa de mortalidade percentual dos bovinos.
- **Gráficos Interativos:** Utilize gráficos dinâmicos para uma análise mais aprofundada dos dados.
- **Design Responsivo:** Acesse o dashboard de qualquer dispositivo, seja desktop, tablet ou smartphone.

## Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **Chart.js** para a criação de gráficos interativos

## Estrutura do Projeto


bovine_cattle_dashboard/
├── index.html           # Página principal do dashboard
├── styles.css           # Estilos CSS personalizados
├── scripts.js           # Scripts JavaScript para funcionalidades
├── img/                 # Imagens utilizadas no projeto
├── README.md            # Documentação do projeto
└── assets/              # Recursos adicionais (fonts, icons, etc.)


## Instalação

1. **Clone o Repositório**

   bash
   git clone https://github.com/dougdotcon/dashboard-veterinaria.git
   

2. **Navegue até o Diretório do Projeto**

   bash
   cd bovine_cattle_dashboard
   

3. **Abra o Arquivo `index.html` no Navegador**

   Você pode abrir o arquivo diretamente no seu navegador preferido clicando duas vezes sobre ele ou utilizando um servidor local.

   **Usando um Servidor Local com Python:**

   bash
   # Para Python 3.x
   python -m http.server 8000

   # Acesse http://localhost:8000 no seu navegador
   

## Uso

1. **Página Principal (`index.html`)**

   - Visualize as estatísticas principais sobre o rebanho de bovinos.
   - Utilize o filtro de região para segmentar os dados conforme necessário.
   - Analise os gráficos interativos para obter insights detalhados sobre a saúde e produção dos bovinos.

2. **Interação com os Gráficos**

   - Passe o cursor sobre os gráficos para visualizar informações específicas.
   - Ajuste os filtros para ver como os dados se comportam em diferentes regiões.

## Contribuição

Contribuições são bem-vindas! Se você deseja melhorar este projeto, siga os passos abaixo:

1. **Fork este Repositório**
2. **Crie uma Branch para sua Feature**

   bash
   git checkout -b feature/nova-feature
   

3. **Commit suas Alterações**

   bash
   git commit -m "Adiciona nova funcionalidade"
   

4. **Push para a Branch**

   bash
   git push origin feature/nova-feature
   

5. **Abra um Pull Request**
