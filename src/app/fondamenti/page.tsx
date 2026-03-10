import React from "react";
import type { Metadata } from "next";
import DefaultPage from "@/components/DefaultPage";
import ArticleSection from "@/components/ArticleSection";
import CardGrid from "@/components/CardGrid";
import DefinitionBlock from "@/components/DefinitionBlock";
import CompareTable from "@/components/CompareTable";

export const metadata: Metadata = {
  title: "Fondamenti dell'IA",
  description:
    "Cos'è l'intelligenza artificiale, la differenza tra AI, ML e Deep Learning, la storia e i tipi di AI.",
};

export default function FondamentiPage() {
  return (
    <DefaultPage
      title="Fondamenti dell'IA"
      content={
        <div className="space-y-20">

          {/* ── 1. COS'È L'IA ── */}
          <ArticleSection
            tag="Introduzione"
            title="Cos'è l'Intelligenza Artificiale"
            subtitle="Una definizione che si è evoluta nel tempo insieme alla tecnologia."
          >
            <p>
              L'intelligenza artificiale è la disciplina informatica che studia
              come creare sistemi capaci di svolgere compiti che, se eseguiti da
              un essere umano, richiederebbero intelligenza. Ragionare, imparare,
              riconoscere immagini, tradurre lingue, prendere decisioni: queste
              sono tutte attività un tempo considerate esclusivamente umane.
            </p>
            <p>
              Il termine fu coniato nel 1956 da John McCarthy durante la
              conferenza di Dartmouth, considerata la nascita ufficiale della
              disciplina. Da allora la definizione si è allargata: oggi l'AI non
              è solo un campo accademico, ma un insieme di tecnologie che
              permeano ogni settore, dalla medicina alla finanza, dall'arte alla
              logistica.
            </p>
            <p>
              Una distinzione importante è tra <strong>AI forte</strong> (strong
              AI) — un sistema con capacità cognitive generalizzate paragonabili
              a quelle umane — e <strong>AI debole</strong> (weak AI) — sistemi
              specializzati in un singolo compito. Tutto ciò che esiste oggi
              rientra nella seconda categoria.
            </p>
          </ArticleSection>

          {/* ── 2. AI vs ML vs DL ── */}
          <ArticleSection
            tag="Concetti chiave"
            title="AI, Machine Learning e Deep Learning"
            subtitle="Tre termini spesso confusi, che in realtà descrivono livelli diversi della stessa disciplina."
          >
            <p>
              Questi tre concetti sono spesso usati in modo intercambiabile, ma
              non sono sinonimi. Hanno una relazione gerarchica: ogni livello è
              un sottoinsieme del precedente.
            </p>
          </ArticleSection>

          <CardGrid
            columns={3}
            cards={[
              {
                title: "Intelligenza Artificiale",
                description:
                  "Il campo più ampio. Comprende qualsiasi tecnica che permetta a una macchina di simulare comportamenti intelligenti, incluse regole scritte a mano, logica formale e apprendimento automatico.",
                tag: "Livello 1",
              },
              {
                title: "Machine Learning",
                description:
                  "Un sottoinsieme dell'AI. Invece di programmare regole esplicite, il sistema impara dai dati. Il programmatore definisce il modello, i dati ne determinano il comportamento.",
                tag: "Livello 2",
              },
              {
                title: "Deep Learning",
                description:
                  "Un sottoinsieme del ML che usa reti neurali profonde con molti strati. È il motore dei sistemi più potenti oggi: GPT, DALL·E, AlphaFold, sistemi di riconoscimento vocale.",
                tag: "Livello 3",
              },
            ]}
          />

          <DefinitionBlock
            title="Glossario rapido"
            definitions={[
              {
                term: "Algoritmo",
                definition:
                  "Una sequenza finita di istruzioni per risolvere un problema. In ML, l'algoritmo definisce come il modello impara dai dati.",
              },
              {
                term: "Modello",
                definition:
                  "La struttura matematica che un sistema ML apprende dai dati. Dopo il training, il modello può fare previsioni su nuovi dati.",
              },
              {
                term: "Dataset",
                definition:
                  "L'insieme di dati usato per addestrare, validare e testare un modello. La qualità del dataset determina in larga misura la qualità del modello.",
              },
              {
                term: "Feature",
                definition:
                  "Una variabile di input usata dal modello per fare previsioni. Esempio: in un modello che prevede prezzi immobiliari, le feature possono essere superficie, zona, numero di stanze.",
              },
              {
                term: "Label",
                definition:
                  "Il valore di output corretto associato a un esempio di training. Esempio: in un classificatore di immagini, la label è il nome dell'oggetto nella foto.",
                also: "target, output atteso",
              },
            ]}
          />

          {/* ── 3. STORIA ── */}
          <ArticleSection
            tag="Storia"
            title="Breve storia dell'IA"
            subtitle="Tre grandi ere, ognuna con una filosofia diversa su cosa significhi 'far ragionare una macchina'."
          >
            <p>
              La storia dell'intelligenza artificiale non è lineare. È costellata
              di grandi aspettative, delusioni profonde (i cosiddetti{" "}
              <strong>AI winter</strong>) e rivoluzioni improvvise. Tre grandi
              paradigmi si sono succeduti nel tempo.
            </p>
          </ArticleSection>

          <CompareTable
            title="Le tre ere dell'IA"
            caption="Ogni era non ha sostituito la precedente: elementi simbolici e statistici coesistono ancora oggi in molti sistemi ibridi."
            columns={["AI Simbolica", "AI Statistica", "Deep Learning"]}
            rows={[
              {
                aspect: "Periodo",
                values: ["1950–1980", "1980–2010", "2010–oggi"],
              },
              {
                aspect: "Idea centrale",
                values: [
                  "L'intelligenza è manipolazione di simboli e regole logiche",
                  "L'intelligenza emerge da pattern statistici nei dati",
                  "L'intelligenza emerge da reti neurali profonde addestrate su enormi dataset",
                ],
              },
              {
                aspect: "Tecniche tipiche",
                values: [
                  "Sistemi esperti, logica del primo ordine, alberi di ricerca",
                  "SVM, alberi decisionali, regressione, reti bayesiane",
                  "CNN, RNN, Transformer, reti generative",
                ],
              },
              {
                aspect: "Punto di forza",
                values: [
                  "Trasparente, spiegabile, non richiede dati",
                  "Funziona bene con dati strutturati, più flessibile",
                  "Prestazioni stato dell'arte su immagini, testo, audio",
                ],
              },
              {
                aspect: "Limite principale",
                values: [
                  "Fragile fuori dal dominio di progettazione",
                  "Richiede feature engineering manuale",
                  "Opaco, richiede enormi quantità di dati e compute",
                ],
              },
              {
                aspect: "Esempio storico",
                values: [
                  "Deep Blue (scacchi, 1997)",
                  "Filtri antispam, motori di ricerca",
                  "GPT-4, AlphaFold, Stable Diffusion",
                ],
              },
            ]}
          />

          {/* ── 4. TIPI DI AI ── */}
          <ArticleSection
            tag="Classificazione"
            title="Tipi di AI: Narrow, General, Superintelligenza"
            subtitle="Una distinzione che riguarda non le tecniche, ma l'ampiezza delle capacità di un sistema."
          >
            <p>
              Indipendentemente da come un sistema AI è costruito, possiamo
              classificarlo in base a quanto generalizzate sono le sue capacità.
              Questa distinzione è fondamentale non solo tecnicamente, ma anche
              per ragionare sui rischi e sulle implicazioni etiche.
            </p>
          </ArticleSection>

          <CompareTable
            title="Narrow AI · AGI · ASI"
            caption="* AGI e ASI restano categorie teoriche. Nessun sistema esistente si avvicina a una vera AGI."
            columns={["Narrow AI", "AGI *", "ASI *"]}
            rows={[
              {
                aspect: "Nome completo",
                values: [
                  "Artificial Narrow Intelligence",
                  "Artificial General Intelligence",
                  "Artificial Superintelligence",
                ],
              },
              {
                aspect: "Definizione",
                values: [
                  "Sistema ottimizzato per un singolo dominio o compito specifico",
                  "Sistema con capacità cognitive flessibili e generalizzate pari a quelle umane",
                  "Sistema che supera le capacità cognitive umane in ogni dominio",
                ],
              },
              {
                aspect: "Stato attuale",
                values: [
                  "Esistente e ampiamente diffusa",
                  "Oggetto di ricerca attiva, non ancora raggiunta",
                  "Puramente teorica",
                ],
              },
              {
                aspect: "Esempi",
                values: [
                  "GPT-4, AlphaGo, sistemi di raccomandazione, riconoscimento facciale",
                  "Nessuno",
                  "Nessuno",
                ],
              },
              {
                aspect: "Rischi principali",
                values: [
                  "Bias, discriminazione, sostituzione lavori specifici, privacy",
                  "Allineamento con valori umani, controllo, impatto sociale sistemico",
                  "Esistenziali — perdita di controllo umano sull'intelligenza artificiale",
                ],
              },
            ]}
          />

          <ArticleSection
            tag="Riflessione"
            title="Dove siamo oggi"
          >
            <p>
              I sistemi attuali più avanzati — come i grandi modelli linguistici
              — sembrano a volte ragionare in modo generale, ma sono ancora
              sistemi Narrow AI molto sofisticati. Sono stati addestrati su
              enormi quantità di testo e mostrano capacità emergenti
              sorprendenti, ma non hanno comprensione, consapevolezza né
              obiettivi propri.
            </p>
            <p>
              La domanda se l'AGI sia raggiungibile — e quando — divide
              profondamente la comunità scientifica. Alcuni ricercatori la
              ritengono questione di anni, altri di decenni, altri ancora la
              considerano un obiettivo mal definito o irraggiungibile con i
              paradigmi attuali.
            </p>
            <p>
              Ciò che è certo è che anche la Narrow AI di oggi pone sfide etiche
              e sociali reali e urgenti — indipendentemente da cosa il futuro
              porterà.
            </p>
          </ArticleSection>

        </div>
      }
    />
  );
}