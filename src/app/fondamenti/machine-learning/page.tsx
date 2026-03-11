import React from "react";
import DefaultPage from "@/components/DefaultPage";
import ArticleSection from "@/components/ArticleSection";
import DefinitionBlock from "@/components/DefinitionBlock";
import CompareTable from "@/components/CompareTable";
import CardGrid from "@/components/CardGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Machine Learning",
  description:
    "Cos'è il machine learning, come funziona, i tre paradigmi di apprendimento e gli algoritmi principali.",
};

export default function MachineLearning() {
  return (
    <DefaultPage
      title="Machine Learning"
      content={
        <div className="space-y-20">

          {/* ── INTRO ─────────────────────────────────────────────────── */}
          <ArticleSection
            tag="Introduzione"
            title="Imparare dai dati"
            subtitle="Il machine learning è il passaggio da 'programmare regole' a 'far emergere regole dai dati'."
          >
            <p>
              Nella programmazione tradizionale, uno sviluppatore scrive
              esplicitamente ogni regola che il sistema deve seguire.
              Vuoi che un programma riconosca lo spam? Scrivi regole:
              se contiene "clicca qui" e "offerta esclusiva", è spam.
              Funziona per problemi semplici — ma si rompe appena il
              problema diventa complesso o i dati cambiano.
            </p>
            <p>
              Il machine learning inverte questo processo. Invece di
              scrivere regole, fornisci <strong>esempi</strong> al sistema
              — migliaia di email etichettate come spam o non spam —
              e lasci che sia il modello a trovare autonomamente i pattern.
              Le regole non vengono scritte: <em>emergono</em> dai dati.
            </p>
            <p>
              Questo approccio funziona perché molti problemi reali sono
              troppo complessi per essere descritti con regole esplicite.
              Come spieghi a una macchina cosa rende un volto riconoscibile?
              O perché una traduzione suona naturale? Il ML aggira il problema:
              mostra abbastanza esempi e lascia che il modello costruisca
              la propria rappresentazione interna.
            </p>
          </ArticleSection>

          {/* ── TRE PARADIGMI ─────────────────────────────────────────── */}
          <ArticleSection
            tag="Paradigmi"
            title="I tre tipi di apprendimento"
            subtitle="Non esiste un solo modo di 'imparare dai dati' — dipende da quante informazioni hai a disposizione."
          >
            <p>
              La distinzione fondamentale riguarda la natura dei dati
              di training: sono etichettati, non etichettati, o arrivano
              sotto forma di feedback da un ambiente? Questo determina
              quale paradigma di apprendimento è appropriato.
            </p>
          </ArticleSection>

          <CardGrid
            columns={3}
            cards={[
              {
                title: "Supervisionato",
                tag: "Labeled data",
                description:
                  "Il modello impara da esempi etichettati: input + output corretto. Obiettivo: apprendere una funzione che mappa input in output. Usato per classificazione e regressione.",
              },
              {
                title: "Non supervisionato",
                tag: "Unlabeled data",
                description:
                  "Il modello riceve solo input senza etichette. Deve trovare strutture nascoste: cluster, pattern, anomalie, rappresentazioni compresse. Usato per clustering e riduzione dimensionale.",
              },
              {
                title: "Per rinforzo",
                tag: "Reward signal",
                description:
                  "Un agente interagisce con un ambiente e riceve ricompense o penalità. Impara a massimizzare la ricompensa cumulativa nel tempo. Alla base di AlphaGo e dei sistemi di controllo robotico.",
              },
            ]}
          />

          <CompareTable
            title="Confronto tra paradigmi"
            caption="La scelta del paradigma dipende dai dati disponibili e dall'obiettivo — spesso in pratica si combinano più approcci."
            columns={["Supervisionato", "Non Supervisionato", "Per Rinforzo"]}
            rows={[
              {
                aspect: "Dati richiesti",
                values: [
                  "Input + label corretta per ogni esempio",
                  "Solo input, nessuna etichetta",
                  "Sequenze di azioni e ricompense dall'ambiente",
                ],
              },
              {
                aspect: "Costo dei dati",
                values: [
                  "Alto — l'etichettatura manuale è costosa",
                  "Basso — i dati non etichettati sono abbondanti",
                  "Variabile — richiede simulazione o ambiente reale",
                ],
              },
              {
                aspect: "Esempi di algoritmi",
                values: [
                  "Regressione lineare, SVM, reti neurali, Random Forest",
                  "K-means, PCA, autoencoder, DBSCAN",
                  "Q-learning, PPO, Actor-Critic",
                ],
              },
              {
                aspect: "Applicazioni tipiche",
                values: [
                  "Classificazione email, diagnosi medica, riconoscimento vocale",
                  "Segmentazione clienti, rilevamento anomalie, topic modeling",
                  "Giochi, robotica, ottimizzazione di sistemi complessi",
                ],
              },
            ]}
          />

          {/* ── COME FUNZIONA ─────────────────────────────────────────── */}
          <ArticleSection
            tag="Funzionamento"
            title="Come un modello impara"
            subtitle="Tutti i modelli di ML seguono lo stesso principio: misura l'errore, aggiustati, ripeti."
          >
            <p>
              Indipendentemente dall'algoritmo, ogni modello di ML ha
              dei <strong>parametri</strong> — numeri interni che determinano
              il suo comportamento. All'inizio questi parametri sono casuali
              o arbitrari. Il training è il processo che li porta ai valori
              giusti.
            </p>
            <p>
              Il meccanismo è semplice in linea di principio: il modello
              fa una predizione, si confronta con la risposta corretta,
              e si misura l'errore con una <strong>funzione di loss</strong>.
              L'ottimizzatore aggiusta i parametri per ridurre quell'errore.
              Ripetuto su migliaia di esempi per molte iterazioni, questo
              processo converge verso un modello che generalizza bene.
            </p>
            <p>
              La sfida non è far sì che il modello memorizzi i dati di
              training — questo è facile. La sfida è fare in modo che
              <strong> generalizzi</strong>: che funzioni bene su dati
              nuovi che non ha mai visto. Un modello che si comporta
              perfettamente sul training set ma male sul test set si dice
              in <strong>overfitting</strong> — ha imparato i dati a
              memoria invece di capire i pattern.
            </p>
          </ArticleSection>

          <DefinitionBlock
            title="Concetti fondamentali"
            definitions={[
              {
                term: "Parametri",
                definition:
                  "I valori interni del modello che vengono modificati durante il training. In una regressione lineare sono il coefficiente e l'intercetta. In una rete neurale sono miliardi di pesi e bias.",
                also: "pesi, weights",
              },
              {
                term: "Funzione di loss",
                definition:
                  "Misura quanto le predizioni del modello si discostano dalla realtà. Il training minimizza questa funzione. Esempi: Mean Squared Error per la regressione, Cross-Entropy per la classificazione.",
                also: "loss function, funzione costo",
              },
              {
                term: "Gradient descent",
                definition:
                  "Algoritmo di ottimizzazione che aggiorna i parametri nella direzione che riduce la loss. Il gradiente indica la direzione di salita — si va nella direzione opposta per scendere verso il minimo.",
                also: "discesa del gradiente",
              },
              {
                term: "Overfitting",
                definition:
                  "Il modello ha memorizzato i dati di training invece di apprendere pattern generalizzabili. Ottima performance sul training set, scarsa sul test set. Si combatte con più dati, regolarizzazione o modelli più semplici.",
              },
              {
                term: "Underfitting",
                definition:
                  "Il modello è troppo semplice per catturare i pattern nei dati. Scarsa performance sia sul training che sul test set. Si risolve con un modello più complesso o più feature.",
              },
              {
                term: "Iperparametri",
                definition:
                  "Configurazioni del modello che non vengono apprese durante il training ma devono essere scelte prima: learning rate, numero di layer, dimensione del batch, numero di epoche.",
              },
            ]}
          />

          {/* ── ALGORITMI ─────────────────────────────────────────────── */}
          <ArticleSection
            tag="Algoritmi"
            title="Algoritmi principali"
            subtitle="Prima delle reti neurali, questi algoritmi dominavano il machine learning — e per molti problemi lo fanno ancora."
          >
            <p>
              Non tutto il ML è deep learning. Per dati strutturati
              (tabelle, CSV, database), algoritmi classici come Random
              Forest o Gradient Boosting spesso battono le reti neurali
              con una frazione dei dati e del tempo di training.
              La scelta dell'algoritmo dipende sempre dal problema,
              dalla quantità di dati e dai requisiti di interpretabilità.
            </p>
          </ArticleSection>

          <CompareTable
            title="Algoritmi supervisionati a confronto"
            caption="Non esiste un algoritmo universalmente migliore. La scelta dipende dalla struttura dei dati, dalla quantità di esempi e dal trade-off tra performance e interpretabilità."
            columns={["Regressione Lineare", "Random Forest", "Gradient Boosting"]}
            rows={[
              {
                aspect: "Idea base",
                values: [
                  "Relazione lineare tra feature e output",
                  "Ensemble di alberi decisionali indipendenti (bagging)",
                  "Alberi costruiti sequenzialmente, ognuno corregge il precedente",
                ],
              },
              {
                aspect: "Punti di forza",
                values: [
                  "Interpretabile, veloce, stabile con pochi dati",
                  "Robusto all'overfitting, gestisce feature mancanti",
                  "Spesso le migliori performance su dati tabulari",
                ],
              },
              {
                aspect: "Limiti",
                values: [
                  "Non cattura relazioni non lineari",
                  "Lento su dataset molto grandi",
                  "Richiede tuning attento degli iperparametri",
                ],
              },
              {
                aspect: "Quando usarlo",
                values: [
                  "Baseline, dati lineari, massima interpretabilità",
                  "Classificazione/regressione generale, buon default",
                  "Competizioni Kaggle, quando servono le migliori performance",
                ],
              },
              {
                aspect: "Esempi",
                values: [
                  "Previsione prezzi, analisi di regressione",
                  "Diagnosi medica, rilevamento frodi",
                  "XGBoost, LightGBM, CatBoost",
                ],
              },
            ]}
          />

          {/* ── NOTA FINALE ───────────────────────────────────────────── */}
          <ArticleSection
            tag="Prossimo"
            title="Da ML a Deep Learning"
            subtitle="Quando i dati diventano immagini, testo o audio, le reti neurali prendono il sopravvento."
          >
            <p>
              Gli algoritmi classici funzionano bene su dati strutturati
              con feature ingegnerizzate manualmente. Ma per dati ad alta
              dimensionalità come immagini, testo e audio, richiedono un
              lavoro manuale enorme: estrarre le feature giuste è già
              un problema difficile di per sé.
            </p>
            <p>
              Le reti neurali profonde eliminano questa necessità:
              imparano automaticamente quali feature estrarre dai dati
              grezzi. È questo che le ha rese dominanti nell'ultimo decennio,
              e che ha portato a sistemi capaci di riconoscere immagini,
              tradurre lingue e generare testo con qualità impensabile
              fino a pochi anni fa.
            </p>
          </ArticleSection>

        </div>
      }
    />
  );
}
