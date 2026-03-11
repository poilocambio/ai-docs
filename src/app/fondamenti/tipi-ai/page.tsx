import React from "react";
import DefaultPage from "@/components/DefaultPage";
import ArticleSection from "@/components/ArticleSection";
import DefinitionBlock from "@/components/DefinitionBlock";
import CompareTable from "@/components/CompareTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tipi di AI",
  description:
    "Narrow AI, AGI e superintelligenza: le differenze tra i tipi di intelligenza artificiale e cosa esiste davvero oggi.",
};

export default function TipiAI() {
  return (
    <DefaultPage
      title="Tipi di AI"
      content={
        <div className="space-y-20">

          {/* ── INTRO ─────────────────────────────────────────────────── */}
          <ArticleSection
            tag="Classificazione"
            title="Non tutta l'AI è uguale"
            subtitle="Una distinzione che riguarda non le tecniche, ma l'ampiezza delle capacità di un sistema."
          >
            <p>
              Quando parliamo di intelligenza artificiale, tendiamo a usare
              il termine come se indicasse una cosa sola. In realtà, l'AI
              è una categoria vastissima che comprende sistemi con capacità
              radicalmente diverse — da un filtro antispam a un sistema
              che gioca a scacchi meglio di qualsiasi essere umano, fino
              a sistemi ipotetici che supererebbero l'intelligenza umana
              in ogni dominio.
            </p>
            <p>
              La classificazione più diffusa divide l'AI in tre livelli
              in base all'ampiezza delle sue capacità. Questa distinzione
              è importante non solo tecnicamente, ma anche per ragionare
              in modo corretto sui rischi e sulle implicazioni etiche
              di ciò che stiamo costruendo.
            </p>
          </ArticleSection>

          {/* ── NARROW AI ─────────────────────────────────────────────── */}
          <ArticleSection
            tag="Narrow AI"
            title="L'AI che esiste oggi"
            subtitle="Potente, specializzata, e fondamentalmente diversa dall'intelligenza umana."
          >
            <p>
              Tutta l'AI che esiste oggi è <strong>Narrow AI</strong>
              — sistemi progettati e addestrati per eccellere in un singolo
              dominio o compito specifico. GPT-4 è straordinario nella
              comprensione e generazione del linguaggio, ma non sa guidare
              un'auto. AlphaGo batte qualsiasi umano a Go, ma non può
              risolvere un'equazione differenziale. Un sistema di
              raccomandazione Netflix suggerisce film con precisione
              impressionante, ma non capisce cosa stia consigliando.
            </p>
            <p>
              Questa specializzazione non è un limite temporaneo da
              superare: è intrinseca al modo in cui questi sistemi vengono
              costruiti. Vengono addestrati su dataset specifici per
              obiettivi specifici. La loro "intelligenza" è pattern
              matching statistico ad altissima risoluzione in un dominio
              delimitato — non comprensione generale.
            </p>
            <p>
              Eppure, anche la Narrow AI pone sfide reali e urgenti oggi:
              bias algoritmico, sostituzione di lavori, privacy, uso
              improprio. Non bisogna aspettare l'AGI per preoccuparsi
              dell'impatto dell'intelligenza artificiale sulla società.
            </p>
          </ArticleSection>

          <DefinitionBlock
            title="Esempi di Narrow AI per dominio"
            definitions={[
              {
                term: "Linguaggio",
                definition:
                  "GPT-4, Claude, Gemini — modelli linguistici di grandi dimensioni. Eccellenti nella comprensione e generazione testuale, nella traduzione, nel riassunto e nel ragionamento linguistico.",
                also: "LLM",
              },
              {
                term: "Visione",
                definition:
                  "DALL·E, Stable Diffusion, sistemi di riconoscimento facciale. Addestrati su miliardi di immagini per generare, classificare o analizzare contenuti visivi.",
              },
              {
                term: "Giochi",
                definition:
                  "AlphaGo, AlphaZero, OpenAI Five. Sistemi che hanno superato il livello umano in Go, scacchi e Dota 2 — ma sono inutili fuori dal loro gioco specifico.",
              },
              {
                term: "Raccomandazione",
                definition:
                  "I motori di raccomandazione di Netflix, Spotify, YouTube. Ottimizzati per massimizzare l'engagement, non per capire i gusti dell'utente in senso profondo.",
              },
              {
                term: "Diagnosi medica",
                definition:
                  "Sistemi addestrati su milioni di immagini radiologiche per rilevare tumori o anomalie. In alcuni benchmark superano i radiologi umani — ma solo per quella specifica patologia.",
              },
            ]}
          />

          {/* ── AGI ───────────────────────────────────────────────────── */}
          <ArticleSection
            tag="AGI"
            title="Intelligenza Generale Artificiale"
            subtitle="L'obiettivo dichiarato di molti laboratori di ricerca — e ancora un problema aperto."
          >
            <p>
              L'<strong>AGI</strong> (Artificial General Intelligence) è
              un sistema con capacità cognitive flessibili e generalizzate,
              paragonabili — e potenzialmente superiori — a quelle umane
              in qualsiasi dominio intellettuale. Non un esperto di un
              singolo campo, ma un sistema capace di imparare qualsiasi
              cosa, trasferire conoscenze tra domini diversi e adattarsi
              a situazioni nuove senza essere ri-addestrato.
            </p>
            <p>
              L'AGI non esiste. Nessun sistema attuale si avvicina a
              questa definizione, nonostante alcune capacità emergenti
              dei grandi modelli linguistici possano sembrarlo superficialmente.
              La comunità scientifica è profondamente divisa su quando
              — e se — sarà raggiungibile: alcuni ricercatori la prevedono
              entro un decennio, altri la considerano un obiettivo
              mal definito o irraggiungibile con i paradigmi attuali.
            </p>
            <p>
              Il problema centrale dell'AGI non è la potenza computazionale,
              ma l'<strong>allineamento</strong>: come assicurarsi che un
              sistema con capacità generalizzate agisca in modo conforme
              ai valori e agli interessi umani? Questa è la domanda
              che tiene svegli la notte i ricercatori più seri del settore.
            </p>
          </ArticleSection>

          {/* ── ASI ───────────────────────────────────────────────────── */}
          <ArticleSection
            tag="ASI"
            title="Superintelligenza"
            subtitle="Una categoria puramente teorica — ma con implicazioni che vale la pena comprendere."
          >
            <p>
              La <strong>superintelligenza artificiale</strong> (ASI) è
              un sistema ipotetico che supera le capacità cognitive umane
              non solo in alcuni domini, ma in tutti — inclusa la capacità
              di progettare sistemi AI ancora più intelligenti di sé stessa.
              Quest'ultima proprietà, chiamata <em>ricorsione intelligente</em>,
              è ciò che rende la superintelligenza concettualmente diversa
              dall'AGI: potrebbe migliorarsi a velocità esponenziale,
              al di là di qualsiasi possibilità di controllo umano.
            </p>
            <p>
              La ASI è oggetto principalmente di filosofia e teoria,
              non di ingegneria. Ma il fatto che sia lontana non significa
              che non valga la pena pensarci: le decisioni che prendiamo
              oggi sullo sviluppo dell'AI — su trasparenza, governance,
              allineamento — pongono le fondamenta su cui tutto il resto
              verrà costruito.
            </p>
          </ArticleSection>

          {/* ── CONFRONTO ─────────────────────────────────────────────── */}
          <CompareTable
            title="Narrow AI · AGI · ASI a confronto"
            caption="* AGI e ASI restano categorie teoriche. Nessun sistema esistente si avvicina a una vera AGI."
            columns={["Narrow AI", "AGI *", "ASI *"]}
            rows={[
              {
                aspect: "Stato attuale",
                values: [
                  "Esistente e ampiamente diffusa",
                  "Oggetto di ricerca attiva, non ancora raggiunta",
                  "Puramente teorica",
                ],
              },
              {
                aspect: "Capacità",
                values: [
                  "Un singolo dominio o compito specifico",
                  "Qualsiasi dominio intellettuale, trasferimento tra contesti",
                  "Supera l'umanità in ogni dimensione cognitiva",
                ],
              },
              {
                aspect: "Esempi reali",
                values: [
                  "GPT-4, AlphaGo, sistemi di raccomandazione",
                  "Nessuno",
                  "Nessuno",
                ],
              },
              {
                aspect: "Rischi principali",
                values: [
                  "Bias, discriminazione, automazione del lavoro, privacy",
                  "Allineamento con valori umani, perdita di controllo",
                  "Esistenziali — scenario di perdita irreversibile del controllo",
                ],
              },
              {
                aspect: "Orizzonte temporale",
                values: [
                  "Presente",
                  "Dibattuto — da pochi anni a mai",
                  "Sconosciuto — condizionato al raggiungimento dell'AGI",
                ],
              },
            ]}
          />

          {/* ── RIFLESSIONE FINALE ────────────────────────────────────── */}
          <ArticleSection
            tag="Riflessione"
            title="Dove siamo davvero"
          >
            <p>
              I sistemi più avanzati di oggi — come i grandi modelli
              linguistici — mostrano capacità sorprendenti che a volte
              sembrano avvicinarsi all'intelligenza generale. Sanno
              ragionare, scrivere codice, spiegare concetti complessi,
              passare da un dominio all'altro con disinvoltura.
            </p>
            <p>
              Ma questa impressione è ingannevole. Questi sistemi non
              hanno comprensione nel senso profondo del termine — non hanno
              modelli del mondo, non hanno obiettivi propri, non imparano
              dall'esperienza al di fuori del training. Sono straordinari
              interpolatori statistici addestrati su quantità di testo
              inimmaginabili.
            </p>
            <p>
              La distinzione tra Narrow AI e AGI non è solo accademica.
              È il confine tra sistemi che possiamo costruire, testare,
              correggere e in qualche misura controllare — e sistemi
              di cui non sappiamo ancora come garantire la sicurezza.
              Capire dove siamo oggi è il prerequisito per ragionare
              responsabilmente su dove vogliamo andare.
            </p>
          </ArticleSection>

        </div>
      }
    />
  );
}