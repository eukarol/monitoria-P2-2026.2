(function() {
  'use strict';

  // ============================================================
  // DADOS DOS EXERCÍCIOS (Java)
  // ============================================================
  const exercicios = [
    {
      id: 1,
      titulo: 'Exercício 1: Jogo de Cartas',
      dificuldade: 'Médio',
      tags: ['#Collections', '#Enum', '#Métodos', '#Loops'],
      enunciado: `
        <p><strong>Objetivo:</strong> Criar um jogo em Java onde o jogador adivinha se a próxima carta será <strong>MAIOR</strong> ou <strong>MENOR</strong> que a atual.</p>
        <p><strong>Regras:</strong></p>
        <ul>
          <li>Baralho com 4 naipes: <code>HEARTS</code>, <code>DIAMONDS</code>, <code>CLUBS</code>, <code>SPADES</code>.</li>
          <li>Cada naipe tem ranks de <code>2</code> a <code>Ace</code> (valores 2 a 13, Ace = 1).</li>
          <li>Jogador começa com <strong>50 pontos</strong>.</li>
          <li>A cada rodada o jogador digita <code>h</code> (higher/maior) ou <code>l</code> (lower/menor).</li>
          <li>Acerto: <strong>+20 pontos</strong>. Erro: <strong>−15 pontos</strong>.</li>
          <li>Cada partida tem <strong>8 tentativas</strong>.</li>
          <li>Cartas usadas não voltam ao baralho durante o jogo.</li>
          <li>Ao final, pergunte se deseja jogar novamente (<code>y</code>/<code>n</code>). O placar <strong>não é reiniciado</strong>.</li>
        </ul>
        <p><strong>Estrutura sugerida:</strong> crie uma classe <code>Carta</code> com <code>rank</code>, <code>naipe</code> e <code>valor</code>; use <code>ArrayList&lt;Carta&gt;</code> como baralho e <code>Collections.shuffle()</code> para embaralhar.</p>
      `,
      exemplo: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class JogoDeCartas {

    static final String[] NAIPES = {"Hearts", "Diamonds", "Clubs", "Spades"};
    static final String[] RANKS = {"2", "3", "4", "5", "6", "7", "8",
                                   "9", "10", "Jack", "Queen", "King", "Ace"};
    static final int NCARDS = 8;

    static class Carta {
        String rank;
        String naipe;
        int valor;

        Carta(String rank, String naipe, int valor) {
            this.rank = rank;
            this.naipe = naipe;
            this.valor = valor;
        }

        @Override
        public String toString() {
            return rank + " of " + naipe;
        }
    }

    static ArrayList<Carta> montarBaralho() {
        ArrayList<Carta> baralho = new ArrayList<>();
        for (String naipe : NAIPES) {
            for (int i = 0; i < RANKS.length; i++) {
                int valor = (RANKS[i].equals("Ace")) ? 1 : i + 2;
                baralho.add(new Carta(RANKS[i], naipe, valor));
            }
        }
        return baralho;
    }

    static ArrayList<Carta> embaralhar(ArrayList<Carta> original) {
        ArrayList<Carta> copia = new ArrayList<>(original);
        Collections.shuffle(copia);
        return copia;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<Carta> baralhoBase = montarBaralho();
        int pontuacao = 50;

        System.out.println("Bem-vindo ao jogo de cartas!");

        while (true) {
            ArrayList<Carta> baralho = embaralhar(baralhoBase);
            Carta atual = baralho.remove(baralho.size() - 1);
            System.out.println("\\nCarta inicial: " + atual);

            for (int i = 0; i < NCARDS; i++) {
                System.out.print("Maior (h) ou Menor (l)? ");
                String resposta = sc.nextLine().toLowerCase();
                if (!resposta.equals("h") && !resposta.equals("l")) {
                    System.out.println("Entrada inválida, assumindo h.");
                    resposta = "h";
                }

                Carta proxima = baralho.remove(baralho.size() - 1);
                System.out.println("Próxima carta: " + proxima);

                if (proxima.valor == atual.valor) {
                    System.out.println("Empate! Sem pontos.");
                } else if ((resposta.equals("h") && proxima.valor > atual.valor)
                        || (resposta.equals("l") && proxima.valor < atual.valor)) {
                    pontuacao += 20;
                    System.out.println("Acertou! +20 → Pontos: " + pontuacao);
                } else {
                    pontuacao -= 15;
                    System.out.println("Errou! -15 → Pontos: " + pontuacao);
                }

                atual = proxima;
            }

            System.out.print("\\nJogar novamente? (y/n): ");
            if (!sc.nextLine().equalsIgnoreCase("y")) {
                System.out.println("Pontuação final: " + pontuacao);
                break;
            }
        }

        sc.close();
    }
}`
    },
    {
      id: 2,
      titulo: 'Exercício 2.1: Banco (sem métodos)',
      dificuldade: 'Fácil',
      tags: ['#Scanner', '#while', '#condicionais'],
      enunciado: `
        <p><strong>Objetivo:</strong> Aplicação bancária simples escrita <strong>sem métodos auxiliares</strong> — tudo no <code>main</code>.</p>
        <p><strong>Conta inicial:</strong> nome <code>"João"</code>, saldo <code>100.0</code>, senha <code>"money"</code>.</p>
        <p><strong>Menu em loop:</strong></p>
        <ul>
          <li><code>1</code> — Check balance</li>
          <li><code>2</code> — Deposit money</li>
          <li><code>3</code> — Withdraw money</li>
          <li><code>4</code> — Exit</li>
        </ul>
        <p><strong>Regras:</strong> senha errada → <code>"Incorrect password!"</code>. Depósito ≤ 0 → <code>"Deposit amount must be greater than zero!"</code>. Saque sem saldo → <code>"Insufficient funds!"</code>. Saque ≤ 0 também é inválido.</p>
      `,
      exemplo: `import java.util.Scanner;

public class BancoSimples {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String nome = "João";
        double saldo = 100.0;
        String senha = "money";

        System.out.println("Bem-vindo, " + nome + "!");

        while (true) {
            System.out.println("\\n1 - Check balance");
            System.out.println("2 - Deposit money");
            System.out.println("3 - Withdraw money");
            System.out.println("4 - Exit");
            System.out.print("Escolha: ");
            String opcao = sc.nextLine();

            if (opcao.equals("1")) {
                System.out.print("Senha: ");
                String pwd = sc.nextLine();
                if (pwd.equals(senha)) {
                    System.out.printf("Saldo: R$ %.2f%n", saldo);
                } else {
                    System.out.println("Incorrect password!");
                }

            } else if (opcao.equals("2")) {
                System.out.print("Senha: ");
                String pwd = sc.nextLine();
                if (!pwd.equals(senha)) {
                    System.out.println("Incorrect password!");
                    continue;
                }
                System.out.print("Valor do depósito: ");
                double valor = Double.parseDouble(sc.nextLine());
                if (valor <= 0) {
                    System.out.println("Deposit amount must be greater than zero!");
                } else {
                    saldo += valor;
                    System.out.printf("Novo saldo: R$ %.2f%n", saldo);
                }

            } else if (opcao.equals("3")) {
                System.out.print("Senha: ");
                String pwd = sc.nextLine();
                if (!pwd.equals(senha)) {
                    System.out.println("Incorrect password!");
                    continue;
                }
                System.out.print("Valor do saque: ");
                double valor = Double.parseDouble(sc.nextLine());
                if (valor <= 0) {
                    System.out.println("Withdraw amount must be greater than zero!");
                } else if (valor > saldo) {
                    System.out.println("Insufficient funds!");
                } else {
                    saldo -= valor;
                    System.out.printf("Novo saldo: R$ %.2f%n", saldo);
                }

            } else if (opcao.equals("4")) {
                System.out.println("Goodbye!");
                break;

            } else {
                System.out.println("Opção inválida!");
            }
        }

        sc.close();
    }
}`
    },
    {
      id: 3,
      titulo: 'Exercício 2.2: Banco (com métodos)',
      dificuldade: 'Médio',
      tags: ['#métodos', '#static', '#return'],
      enunciado: `
        <p><strong>Objetivo:</strong> Refatorar o Exercício 2.1 usando <strong>métodos estáticos</strong>. Ainda há uma única conta (variáveis de classe).</p>
        <p><strong>Métodos obrigatórios:</strong></p>
        <ul>
          <li><code>newAccount(String name, double balance, String password)</code> — inicializa a conta.</li>
          <li><code>checkBalance(String userPassword)</code> — retorna o saldo (<code>Double</code>) ou <code>null</code> com mensagem de erro.</li>
          <li><code>depositMoney(double amount, String userPassword)</code> — valida e retorna o novo saldo ou <code>null</code>.</li>
          <li><code>withdrawMoney(double amount, String userPassword)</code> — valida e retorna o novo saldo ou <code>null</code>.</li>
        </ul>
        <p>Use atributos <code>static</code> para armazenar <code>userName</code>, <code>userBalance</code> e <code>userPassword</code>.</p>
      `,
      exemplo: `import java.util.Scanner;

public class BancoComMetodos {

    static String userName;
    static double userBalance;
    static String userPassword;

    static void newAccount(String name, double balance, String password) {
        userName = name;
        userBalance = balance;
        userPassword = password;
    }

    static Double checkBalance(String pwd) {
        if (!pwd.equals(userPassword)) {
            System.out.println("Incorrect password!");
            return null;
        }
        return userBalance;
    }

    static Double depositMoney(double amount, String pwd) {
        if (!pwd.equals(userPassword)) {
            System.out.println("Incorrect password!");
            return null;
        }
        if (amount <= 0) {
            System.out.println("Deposit amount must be greater than zero!");
            return null;
        }
        userBalance += amount;
        return userBalance;
    }

    static Double withdrawMoney(double amount, String pwd) {
        if (!pwd.equals(userPassword)) {
            System.out.println("Incorrect password!");
            return null;
        }
        if (amount <= 0) {
            System.out.println("Withdraw amount must be greater than zero!");
            return null;
        }
        if (amount > userBalance) {
            System.out.println("Insufficient funds!");
            return null;
        }
        userBalance -= amount;
        return userBalance;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        newAccount("João", 100.0, "money");
        System.out.println("Bem-vindo, " + userName + "!");

        while (true) {
            System.out.println("\\n1-Check  2-Deposit  3-Withdraw  4-Exit");
            System.out.print("Opção: ");
            String opt = sc.nextLine();

            if (opt.equals("1")) {
                System.out.print("Senha: ");
                Double saldo = checkBalance(sc.nextLine());
                if (saldo != null) System.out.printf("Saldo: R$ %.2f%n", saldo);

            } else if (opt.equals("2")) {
                System.out.print("Senha: ");
                String pwd = sc.nextLine();
                System.out.print("Valor: ");
                double val = Double.parseDouble(sc.nextLine());
                Double novo = depositMoney(val, pwd);
                if (novo != null) System.out.printf("Novo saldo: R$ %.2f%n", novo);

            } else if (opt.equals("3")) {
                System.out.print("Senha: ");
                String pwd = sc.nextLine();
                System.out.print("Valor: ");
                double val = Double.parseDouble(sc.nextLine());
                Double novo = withdrawMoney(val, pwd);
                if (novo != null) System.out.printf("Novo saldo: R$ %.2f%n", novo);

            } else if (opt.equals("4")) {
                System.out.println("Goodbye!");
                break;

            } else {
                System.out.println("Opção inválida!");
            }
        }

        sc.close();
    }
}`
    },
    {
      id: 4,
      titulo: 'Exercício 2.3: Banco (múltiplas contas)',
      dificuldade: 'Difícil',
      tags: ['#ArrayList', '#POO', '#CRUD'],
      enunciado: `
        <p><strong>Objetivo:</strong> Suportar <strong>múltiplas contas</strong> em um <code>ArrayList&lt;Conta&gt;</code>, onde cada conta é um objeto com <code>name</code>, <code>balance</code> e <code>password</code>.</p>
        <p><strong>Métodos:</strong> <code>newAccount(...)</code> (adiciona à lista), <code>checkBalance(accountNumber, password)</code>, <code>depositMoney(accountNumber, amount, password)</code>, <code>withdrawMoney(accountNumber, amount, password)</code>.</p>
        <p>Valide o índice com <code>0 &lt;= accountNumber &lt; accountList.size()</code> — caso contrário, imprima <code>"Invalid account number!"</code>.</p>
        <p>Adicione uma opção no menu para <strong>criar nova conta</strong>.</p>
      `,
      exemplo: `import java.util.ArrayList;
import java.util.Scanner;

public class BancoMultiplasContas {

    static class Conta {
        String name;
        double balance;
        String password;

        Conta(String name, double balance, String password) {
            this.name = name;
            this.balance = balance;
            this.password = password;
        }
    }

    static ArrayList<Conta> accountList = new ArrayList<>();

    static int newAccount(String name, double balance, String password) {
        accountList.add(new Conta(name, balance, password));
        return accountList.size() - 1;
    }

    static boolean contaValida(int idx) {
        if (idx < 0 || idx >= accountList.size()) {
            System.out.println("Invalid account number!");
            return false;
        }
        return true;
    }

    static Double checkBalance(int idx, String pwd) {
        if (!contaValida(idx)) return null;
        Conta c = accountList.get(idx);
        if (!pwd.equals(c.password)) {
            System.out.println("Incorrect password!");
            return null;
        }
        return c.balance;
    }

    static Double depositMoney(int idx, double amount, String pwd) {
        if (!contaValida(idx)) return null;
        Conta c = accountList.get(idx);
        if (!pwd.equals(c.password)) {
            System.out.println("Incorrect password!");
            return null;
        }
        if (amount <= 0) {
            System.out.println("Deposit amount must be greater than zero!");
            return null;
        }
        c.balance += amount;
        return c.balance;
    }

    static Double withdrawMoney(int idx, double amount, String pwd) {
        if (!contaValida(idx)) return null;
        Conta c = accountList.get(idx);
        if (!pwd.equals(c.password)) {
            System.out.println("Incorrect password!");
            return null;
        }
        if (amount <= 0) {
            System.out.println("Withdraw amount must be greater than zero!");
            return null;
        }
        if (amount > c.balance) {
            System.out.println("Insufficient funds!");
            return null;
        }
        c.balance -= amount;
        return c.balance;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        newAccount("João", 100.0, "money");

        while (true) {
            System.out.println("\\n1-Check  2-Deposit  3-Withdraw  4-Nova conta  5-Exit");
            System.out.print("Opção: ");
            String opt = sc.nextLine();

            if (opt.equals("4")) {
                System.out.print("Nome: ");
                String nome = sc.nextLine();
                System.out.print("Saldo inicial: ");
                double saldo = Double.parseDouble(sc.nextLine());
                System.out.print("Senha: ");
                String pwd = sc.nextLine();
                int idx = newAccount(nome, saldo, pwd);
                System.out.println("Conta criada com número " + idx);

            } else if (opt.equals("1") || opt.equals("2") || opt.equals("3")) {
                System.out.print("Número da conta: ");
                int idx = Integer.parseInt(sc.nextLine());
                System.out.print("Senha: ");
                String pwd = sc.nextLine();

                if (opt.equals("1")) {
                    Double s = checkBalance(idx, pwd);
                    if (s != null) System.out.printf("Saldo: R$ %.2f%n", s);
                } else {
                    System.out.print("Valor: ");
                    double val = Double.parseDouble(sc.nextLine());
                    Double novo = opt.equals("2")
                            ? depositMoney(idx, val, pwd)
                            : withdrawMoney(idx, val, pwd);
                    if (novo != null) System.out.printf("Novo saldo: R$ %.2f%n", novo);
                }

            } else if (opt.equals("5")) {
                System.out.println("Goodbye!");
                break;

            } else {
                System.out.println("Opção inválida!");
            }
        }

        sc.close();
    }
}`

    {
      id: 5,
      titulo: 'Exercício 3: Rádio com Estações',
      dificuldade: 'Difícil',
      tags: ['#Encapsulamento', '#Composição', '#Arrays', '#POO'],
      enunciado: `
        <p><strong>Objetivo:</strong> Praticar <strong>encapsulamento</strong> e <strong>composição de classes</strong> criando um sistema que simula um rádio com múltiplas estações, cada uma com sua playlist.</p>
        <p><strong>⚠️ Atenção:</strong> o foco central é o <strong>uso rigoroso dos modificadores de acesso</strong> (<code>public</code>, <code>private</code>) conforme especificado.</p>

        <p><strong>Classe <code>Musica</code></strong></p>
        <ul>
          <li><code>titulo</code> → <code>public String</code></li>
          <li><code>artista</code> → <code>public String</code></li>
          <li><code>genero</code> → <code>public String</code></li>
          <li><code>duracaoSegundos</code> → <code>private int</code></li>
          <li>Construtor com todos os atributos.</li>
          <li><code>getDuracaoFormatada()</code> → retorna <code>"mm:ss"</code> usando <code>/</code> e <code>%</code> (ex: 195s → <code>"03:15"</code>).</li>
        </ul>

        <p><strong>Classe <code>Estacao</code></strong></p>
        <ul>
          <li><code>frequencia</code> → <code>public String</code> (ex: <code>"89.1 FM"</code>)</li>
          <li><code>genero</code> → <code>public String</code></li>
          <li><code>playlist</code> → <code>public Musica[]</code></li>
          <li>Construtor com os três atributos.</li>
        </ul>

        <p><strong>Classe <code>Radio</code></strong> — todos os atributos <strong>privados</strong>:</p>
        <ul>
          <li><code>estacoes</code> → <code>Estacao[]</code></li>
          <li><code>estacaoAtual</code> → <code>int</code></li>
          <li><code>musicaAtual</code> → <code>int</code></li>
          <li><code>volume</code> → <code>int</code> (0 a 100)</li>
          <li><code>ligado</code> → <code>boolean</code></li>
          <li><code>tocando</code> → <code>boolean</code></li>
        </ul>
        <p>Construtor: rádio <strong>desligado</strong>, volume <strong>50</strong>, estação <strong>0</strong>, música <strong>0</strong>.</p>

        <p><strong>Métodos de negócio:</strong> <code>ligar()</code>, <code>desligar()</code>, <code>tocar()</code>, <code>pausar()</code>, <code>aumentarVolume(int)</code> (limite 100 via <code>Math.min</code>), <code>diminuirVolume(int)</code> (limite 0 via <code>Math.max</code>), <code>trocarEstacao(int)</code>, <code>proximaMusica()</code> (avanço circular com <code>%</code>), <code>getStatus()</code> (usar <code>StringBuilder</code>), <code>isLigado()</code>, <code>isTocando()</code>.</p>

        <p><strong>Classe <code>RadioApp</code> (main):</strong> menu com <code>Scanner</code> em loop:</p>
        <ul>
          <li>1 - Ligar / Desligar rádio</li>
          <li>2 - Tocar / Pausar</li>
          <li>3 - Aumentar volume</li>
          <li>4 - Diminuir volume</li>
          <li>5 - Trocar estação (exibir lista antes)</li>
          <li>6 - Próxima música</li>
          <li>7 - Ver status</li>
          <li>8 - Sair</li>
        </ul>
        <p><strong>Massa de dados:</strong> pelo menos 3 estações, cada uma com 2+ músicas.</p>
      `,
      exemplo: `import java.util.Scanner;

// ============================================================
// CLASSE Musica
// ============================================================
class Musica {
    public String titulo;
    public String artista;
    public String genero;
    private int duracaoSegundos;

    public Musica(String titulo, String artista, String genero, int duracaoSegundos) {
        this.titulo = titulo;
        this.artista = artista;
        this.genero = genero;
        this.duracaoSegundos = duracaoSegundos;
    }

    public String getDuracaoFormatada() {
        int minutos = duracaoSegundos / 60;
        int segundos = duracaoSegundos % 60;
        return String.format("%02d:%02d", minutos, segundos);
    }

    public int getDuracaoSegundos() {
        return duracaoSegundos;
    }
}

// ============================================================
// CLASSE Estacao
// ============================================================
class Estacao {
    public String frequencia;
    public String genero;
    public Musica[] playlist;

    public Estacao(String frequencia, String genero, Musica[] playlist) {
        this.frequencia = frequencia;
        this.genero = genero;
        this.playlist = playlist;
    }
}

// ============================================================
// CLASSE Radio
// ============================================================
class Radio {
    private Estacao[] estacoes;
    private int estacaoAtual;
    private int musicaAtual;
    private int volume;
    private boolean ligado;
    private boolean tocando;

    public Radio(Estacao[] estacoes) {
        this.estacoes = estacoes;
        this.estacaoAtual = 0;
        this.musicaAtual = 0;
        this.volume = 50;
        this.ligado = false;
        this.tocando = false;
    }

    public void ligar() {
        if (ligado) {
            System.out.println("O rádio já está ligado.");
        } else {
            ligado = true;
            System.out.println("Rádio ligado.");
        }
    }

    public void desligar() {
        if (!ligado) {
            System.out.println("O rádio já está desligado.");
            return;
        }
        ligado = false;
        tocando = false;
        System.out.println("Rádio desligado.");
    }

    public void tocar() {
        if (!ligado) {
            System.out.println("É necessário ligar o rádio primeiro.");
            return;
        }
        tocando = true;
        Musica m = musicaAtual();
        System.out.println("Tocando: " + m.titulo + " — " + m.artista
                + " (" + m.getDuracaoFormatada() + ")");
    }

    public void pausar() {
        if (!ligado) {
            System.out.println("É necessário ligar o rádio primeiro.");
            return;
        }
        if (!tocando) {
            System.out.println("A música já está pausada.");
            return;
        }
        tocando = false;
        System.out.println("Música pausada.");
    }

    public void aumentarVolume(int incremento) {
        if (incremento <= 0) {
            System.out.println("O incremento deve ser positivo.");
            return;
        }
        volume = Math.min(100, volume + incremento);
        System.out.println("Volume: " + volume);
    }

    public void diminuirVolume(int incremento) {
        if (incremento <= 0) {
            System.out.println("O incremento deve ser positivo.");
            return;
        }
        volume = Math.max(0, volume - incremento);
        System.out.println("Volume: " + volume);
    }

    public void trocarEstacao(int numeroEstacao) {
        if (numeroEstacao < 0 || numeroEstacao >= estacoes.length) {
            System.out.println("Estação inválida!");
            return;
        }
        estacaoAtual = numeroEstacao;
        musicaAtual = 0;
        System.out.println("Sintonizado em " + estacoes[estacaoAtual].frequencia
                + " — " + estacoes[estacaoAtual].genero);
        if (tocando) {
            tocar();
        }
    }

    public void proximaMusica() {
        if (!ligado) {
            System.out.println("É necessário ligar o rádio primeiro.");
            return;
        }
        Musica[] playlist = estacoes[estacaoAtual].playlist;
        musicaAtual = (musicaAtual + 1) % playlist.length;
        if (tocando) {
            tocar();
        } else {
            System.out.println("Próxima faixa: " + musicaAtual().titulo);
        }
    }

    private Musica musicaAtual() {
        return estacoes[estacaoAtual].playlist[musicaAtual];
    }

    public String getStatus() {
        StringBuilder sb = new StringBuilder();
        sb.append("=== STATUS DO RÁDIO ===\\n");
        sb.append("Energia: ").append(ligado ? "LIGADO" : "DESLIGADO").append("\\n");
        if (ligado) {
            Estacao e = estacoes[estacaoAtual];
            sb.append("Estação: ").append(e.frequencia)
              .append(" (").append(e.genero).append(")\\n");
            Musica m = musicaAtual();
            sb.append("Faixa: ").append(m.titulo)
              .append(" — ").append(m.artista)
              .append(" [").append(m.getDuracaoFormatada()).append("]");
            sb.append(tocando ? " ▶ tocando\\n" : " ⏸ pausada\\n");
        }
        sb.append("Volume: ").append(volume);
        return sb.toString();
    }

    public boolean isLigado()  { return ligado; }
    public boolean isTocando() { return tocando; }
}

// ============================================================
// CLASSE PRINCIPAL
// ============================================================
public class RadioApp {

    public static void main(String[] args) {
        // Massa de dados: 3 estações, 2 músicas cada
        Musica[] pop = {
            new Musica("Blinding Lights", "The Weeknd", "Pop", 200),
            new Musica("Levitating", "Dua Lipa", "Pop", 203)
        };
        Musica[] rock = {
            new Musica("Bohemian Rhapsody", "Queen", "Rock", 355),
            new Musica("Smells Like Teen Spirit", "Nirvana", "Rock", 301)
        };
        Musica[] mpb = {
            new Musica("Aquarela", "Toquinho", "MPB", 235),
            new Musica("Construção", "Chico Buarque", "MPB", 195)
        };

        Estacao[] estacoes = {
            new Estacao("89.1 FM", "Pop", pop),
            new Estacao("94.7 FM", "Rock", rock),
            new Estacao("102.3 FM", "MPB", mpb)
        };

        Radio radio = new Radio(estacoes);
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("\\n=== MENU ===");
            System.out.println("1 - Ligar / Desligar rádio");
            System.out.println("2 - Tocar / Pausar");
            System.out.println("3 - Aumentar volume");
            System.out.println("4 - Diminuir volume");
            System.out.println("5 - Trocar estação");
            System.out.println("6 - Próxima música");
            System.out.println("7 - Ver status");
            System.out.println("8 - Sair");
            System.out.print("Opção: ");
            String opt = sc.nextLine();

            switch (opt) {
                case "1":
                    if (radio.isLigado()) radio.desligar();
                    else radio.ligar();
                    break;

                case "2":
                    if (radio.isTocando()) radio.pausar();
                    else radio.tocar();
                    break;

                case "3":
                    System.out.print("Incremento: ");
                    radio.aumentarVolume(Integer.parseInt(sc.nextLine()));
                    break;

                case "4":
                    System.out.print("Decremento: ");
                    radio.diminuirVolume(Integer.parseInt(sc.nextLine()));
                    break;

                case "5":
                    System.out.println("Estações disponíveis:");
                    for (int i = 0; i < estacoes.length; i++) {
                        System.out.println("  [" + i + "] " + estacoes[i].frequencia
                                + " — " + estacoes[i].genero);
                    }
                    System.out.print("Escolha o índice: ");
                    radio.trocarEstacao(Integer.parseInt(sc.nextLine()));
                    break;

                case "6":
                    radio.proximaMusica();
                    break;

                case "7":
                    System.out.println(radio.getStatus());
                    break;

                case "8":
                    System.out.println("Encerrando...");
                    sc.close();
                    return;

                default:
                    System.out.println("Opção inválida!");
            }
        }
    }
}`
    },
    }
  ];

  // ============================================================
  // REFERÊNCIAS DO DOM
  // ============================================================
  const listaContainer = document.getElementById('exerciciosList');
  const detalheContainer = document.getElementById('detalheExercicio');

  // ============================================================
  // RENDERIZAÇÃO DA LISTA LATERAL
  // ============================================================
  function renderListaExercicios() {
    listaContainer.innerHTML = '';
    exercicios.forEach((ex, index) => {
      const div = document.createElement('div');
      div.className = `exercicio-item${index === 0 ? ' active' : ''}`;
      div.dataset.id = ex.id;
      div.innerHTML = `<span class="titulo">${ex.titulo}</span>`;
      div.addEventListener('click', () => selecionarExercicio(ex.id));
      listaContainer.appendChild(div);
    });
  }

  // ============================================================
  // EXIBE OS DETALHES DO EXERCÍCIO
  // ============================================================
  function renderDetalheExercicio(exercicio) {
    const dificuldadeClass =
      exercicio.dificuldade.toLowerCase() === 'fácil' ? 'facil' :
      exercicio.dificuldade.toLowerCase() === 'médio' ? 'medio' : 'dificil';

    const tagsHtml = exercicio.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join(' ');

    const codigoEscapado = exercicio.exemplo
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    detalheContainer.innerHTML = `
      <h2>${exercicio.titulo}</h2>
      <div class="meta-badges">
        <span class="badge ${dificuldadeClass}">${exercicio.dificuldade}</span>
        ${tagsHtml}
      </div>
      <div class="enunciado">
        ${exercicio.enunciado}
      </div>
      <h3 style="font-size:1.1rem; margin-bottom:0.5rem; color:#1e1e1e;">💡 Exemplo de solução</h3>
      <div class="code-block">${codigoEscapado}</div>
    `;
  }

  function selecionarExercicio(id) {
    document.querySelectorAll('.exercicio-item').forEach(item => {
      item.classList.remove('active');
      if (Number(item.dataset.id) === id) item.classList.add('active');
    });
    const ex = exercicios.find(e => e.id === id);
    if (ex) renderDetalheExercicio(ex);
  }

  // ============================================================
  // NAVEGAÇÃO ENTRE ABAS (agora só 3)
  // ============================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = {
    atividades: document.getElementById('panel-atividades'),
    guia: document.getElementById('panel-guia'),
    conceitos: document.getElementById('panel-conceitos')
  };

  function ativarAba(tabId) {
    tabButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.tab === tabId) btn.classList.add('active');
    });
    Object.entries(panels).forEach(([key, panel]) => {
      panel.classList.remove('active');
      if (key === tabId) panel.classList.add('active');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => ativarAba(btn.dataset.tab));
  });

  // ============================================================
  // INICIALIZAÇÃO
  // ============================================================
  function init() {
    renderListaExercicios();
    const primeiroEx = exercicios[0];
    if (primeiroEx) renderDetalheExercicio(primeiroEx);
  }

  init();
})();
