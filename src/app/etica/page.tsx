import React from "react";
import type { Metadata } from "next";
import DefaultPage from "@/components/DefaultPage";
import ArticleSection from "@/components/ArticleSection";
import CardGrid from "@/components/CardGrid";
import DefinitionBlock from "@/components/DefinitionBlock";
import CompareTable from "@/components/CompareTable";

export const metadata: Metadata = {
  title: "Etica dell'IA",
  description:
    "Bias algoritmico, trasparenza, privacy, impatto sul lavoro e governance: i dilemmi etici dell'intelligenza artificiale.",
};

export default function EticaPage() {
  return (
    <DefaultPage
      title="Etica dell'IA"
      content={
        <div className="space-y-20">

          {/* ── INTRO ─────────────────────────────────────────────────── */}
          <ArticleSection
            tag="Introduzione"
            title="Perché l'etica dell'IA esiste"
            subtitle="Quando un sistema decide, chi è responsabile?"
          >
            <p>
              Per la maggior parte della storia dell'informatica, i programmi
              eseguivano esattamente quello che un programmatore aveva scritto.
              La responsabilità era chiara: se qualcosa andava storto, c'era
              una riga di codice da cui ricominciare.
            </p>
            <p>
              I sistemi di machine learning rompono questa catena causale.
              Un modello addestrato su miliardi di esempi produce output che
              nessun ingegnere ha scritto esplicitamente. Le decisioni emergono
              da pattern statistici che spesso nemmeno i loro creatori sanno
              spiegare completamente. Questo crea problemi nuovi — di
              responsabilità, trasparenza, equità e controllo — che non hanno
              precedenti nella storia della tecnologia.
            </p>
            <p>
              L'etica dell'IA non è un freno allo sviluppo tecnologico.
              È il tentativo di capire quali valori stiamo incorporando nei
              sistemi che costruiamo, e di farlo intenzionalmente invece che
              per inerzia.
            </p>
          </ArticleSection>

          {/* ── LE QUATTRO AREE ───────────────────────────────────────── */}
          <section>
            <p className="text-xs tracking-widest uppercase text-neutral-400 text-center mb-6 sm:mb-8">
              Le aree principali
            </p>
            <CardGrid
              columns={2}
              cards={[
                {
                  title: "Bias e Discriminazione",
                  tag: "Equità",
                  description:
                    "I modelli imparano dai dati storici. Se quei dati riflettono disuguaglianze passate, il modello le riproduce — e spesso le amplifica.",
                  href: "/etica/bias-discriminazione",
                },
                {
                  title: "Trasparenza e Spiegabilità",
                  tag: "XAI",
                  description:
                    "Quando un modello nega un prestito o una diagnosi, ha l'obbligo di spiegare perché? E siamo in grado di capirlo?",
                  href: "/etica/trasparenza",
                },
                {
                  title: "Privacy e Dati",
                  tag: "Diritti",
                  description:
                    "I modelli moderni sono addestrati su enormi quantità di dati personali. Chi possiede quei dati? Chi ha acconsentito al loro uso?",
                  href: "/etica/privacy",
                },
                {
                  title: "Governance e Regolamentazione",
                  tag: "Politica",
                  description:
                    "Chi decide come si sviluppa l'AI? Governi, aziende, ricercatori o la società civile? E con quali strumenti?",
                  href: "/etica/governance",
                },
              ]}
            />
          </section>

          {/* ── BIAS ──────────────────────────────────────────────────── */}
          <ArticleSection
            tag="Bias"
            title="Il problema del bias algoritmico"
            subtitle="Un modello non è mai neutrale — riflette sempre le scelte di chi lo ha costruito e i dati con cui è stato addestrato."
          >
            <p>
              Nel 2018 Amazon ha dismesso un sistema interno di selezione CV
              perché penalizzava sistematicamente i candidati di sesso femminile.
              Il modello aveva imparato da dieci anni di curriculum aziendali —
              in un settore storicamente dominato da uomini. Nessun ingegnere
              aveva programmato questa discriminazione: era emersa dai dati.
            </p>
            <p>
              Il bias algoritmico può manifestarsi in modi diversi. Il
              <strong> bias di rappresentazione</strong> si verifica quando
              certi gruppi sono sottorappresentati nei dati di training.
              Il <strong>bias di misurazione</strong> emerge quando le
              variabili usate come proxy di un concetto (es. "merito") sono
              esse stesse distorte. Il <strong>bias di aggregazione</strong>
              si produce quando un modello addestrato su una popolazione
              generalizza male su sottogruppi specifici.
            </p>
            <p>
              La difficoltà è che spesso questi bias non sono visibili prima
              del deployment. Appaiono quando il sistema incontra casi reali
              — nelle decisioni di credito, nelle sentenze predittive, nei
              sistemi di riconoscimento facciale — e a quel punto hanno già
              causato danni concreti a persone reali.
            </p>
          </ArticleSection>

          <DefinitionBlock
            title="Tipi di bias"
            definitions={[
              {
                term: "Bias storico",
                definition:
                  "Discriminazioni preesistenti nella società che vengono incorporate nei dati di training e quindi nei modelli. È il tipo più difficile da rimuovere perché riflette strutture sociali reali.",
              },
              {
                term: "Bias di selezione",
                definition:
                  "I dati raccolti non sono rappresentativi della popolazione reale. Es: dataset di immagini facciali composti prevalentemente da soggetti caucasici maschi.",
                also: "sampling bias",
              },
              {
                term: "Bias di conferma",
                definition:
                  "Il modello viene valutato su metriche che non catturano le disparità tra gruppi. Un'accuratezza globale del 95% può nascondere un'accuratezza del 60% su una minoranza.",
              },
              {
                term: "Bias di automazione",
                definition:
                  "La tendenza degli esseri umani a fidarsi eccessivamente delle decisioni automatizzate, anche quando sbagliate. Un giudice che segue acriticamente una raccomandazione algoritmica.",
                also: "automation bias",
              },
              {
                term: "Feedback loop",
                definition:
                  "Quando le decisioni di un modello influenzano i dati futuri su cui verrà ri-addestrato, amplificando i bias iniziali. Es: polizia predittiva che pattugliera di più certi quartieri, aumentando gli arresti lì, confermando il modello.",
              },
            ]}
          />

          {/* ── TRASPARENZA ───────────────────────────────────────────── */}
          <ArticleSection
            tag="XAI"
            title="La black box e il problema della spiegabilità"
            subtitle="Possiamo fidarci di un sistema che non sappiamo spiegare?"
          >
            <p>
              Una rete neurale profonda con miliardi di parametri è, in senso
              tecnico, completamente deterministica: dati gli stessi input,
              produce sempre gli stessi output. Ma questo non significa che
              sia <em>comprensibile</em>. Il percorso dall'input all'output
              attraversa milioni di operazioni matriciali che non corrispondono
              a nessun ragionamento umano leggibile.
            </p>
            <p>
              Questo crea un problema legale e morale significativo. Il
              GDPR europeo stabilisce un "diritto alla spiegazione" per le
              decisioni automatizzate che incidono su individui. Ma come si
              spiega una decisione presa da un transformer con 175 miliardi
              di parametri? Le tecniche di Explainable AI (XAI) — come LIME,
              SHAP e i metodi di attention visualization — offrono
              approssimazioni locali, ma non una vera comprensione causale.
            </p>
            <p>
              C'è un trade-off reale tra performance e interpretabilità.
              I modelli più semplici e leggibili (alberi decisionali,
              regressione logistica) sono generalmente meno accurati di quelli
              profondi. Scegliere un modello meno performante perché è
              spiegabile è una decisione etica — e spesso quella giusta,
              soprattutto in contesti ad alto rischio come medicina e giustizia.
            </p>
          </ArticleSection>

          {/* ── CONFRONTO CONTESTI ────────────────────────────────────── */}
          <CompareTable
            title="Requisiti etici per contesto"
            caption="La priorità delle proprietà etiche cambia radicalmente in base al dominio applicativo."
            columns={["Medicina", "Giustizia penale", "Raccomandazione contenuti"]}
            rows={[
              {
                aspect: "Priorità principale",
                values: [
                  "Accuratezza e sicurezza",
                  "Equità e non discriminazione",
                  "Trasparenza verso l'utente",
                ],
              },
              {
                aspect: "Spiegabilità",
                values: [
                  "Critica — il medico deve capire il suggerimento",
                  "Obbligatoria — diritto alla difesa",
                  "Desiderabile ma non critica",
                ],
              },
              {
                aspect: "Errore peggiore",
                values: [
                  "Falso negativo (mancata diagnosi)",
                  "Falso positivo (condanna ingiusta)",
                  "Filter bubble e radicalizzazione",
                ],
              },
              {
                aspect: "Regolamentazione",
                values: [
                  "Molto alta (FDA, CE marking)",
                  "In sviluppo (EU AI Act)",
                  "Bassa — principalmente autoregolamentazione",
                ],
              },
              {
                aspect: "Chi decide in ultima istanza",
                values: [
                  "Il medico",
                  "Il giudice",
                  "L'algoritmo (spesso senza override umano)",
                ],
              },
            ]}
          />

          {/* ── ATROFIA E DIPENDENZA ──────────────────────────────────── */}
          <ArticleSection
            tag="Impatto cognitivo"
            title="L'atrofia del pensiero critico"
            subtitle="Delegare le decisioni alle macchine ha un costo che non compare in nessuna metrica."
          >
            <p>
              C'è un effetto sottile e difficile da misurare che emerge
              dall'uso prolungato di sistemi decisionali automatizzati:
              l'erosione della capacità di giudizio autonomo.
              Quando un sistema di navigazione GPS è sempre disponibile,
              le persone smettono di costruire mappe mentali delle città.
              Quando un correttore automatico è sempre attivo, l'attenzione
              ortografica si atrofizza.
            </p>
            <p>
              Lo stesso principio si applica a scale molto più significative.
              Un medico che si affida sistematicamente a un sistema di
              diagnosi AI perde gradualmente la capacità di ragionare
              clinicamente in assenza di supporto. Un analista finanziario
              che delega le previsioni a modelli statistici perde
              progressivamente l'intuizione di mercato. Non perché siano
              meno intelligenti — ma perché l'intelligenza, come i muscoli,
              si atrofizza se non viene esercitata.
            </p>
            <p>
              Questo non è un argomento contro l'AI. È un argomento per
              progettare sistemi AI che <strong>aumentino</strong> le capacità
              umane invece di sostituirle — e per essere consapevoli di quando
              stiamo attraversando quel confine.
            </p>
          </ArticleSection>

          {/* ── GOVERNANCE ────────────────────────────────────────────── */}
          <ArticleSection
            tag="Governance"
            title="Chi controlla l'AI?"
            subtitle="La risposta a questa domanda è una delle più importanti scelte politiche del nostro tempo."
          >
            <p>
              Nel 2023 l'Unione Europea ha approvato l'AI Act, il primo
              framework regolatorio completo sull'intelligenza artificiale.
              Classifica i sistemi AI per livello di rischio — da
              "inaccettabile" (manipolazione subliminale, social scoring) ad
              "alto rischio" (infrastrutture critiche, selezione del personale,
              giustizia) fino a "basso rischio" — e impone obblighi diversi
              per ciascuna categoria.
            </p>
            <p>
              Negli Stati Uniti l'approccio è stato più frammentato:
              linee guida volontarie del NIST, executive order presidenziali,
              e una regolamentazione settoriale emergente. La Cina ha adottato
              un modello diverso ancora — regolamentazione stringente
              sull'AI generativa e sui sistemi di raccomandazione,
              con forti requisiti di sicurezza ideologica.
            </p>
            <p>
              La tensione centrale è tra innovazione e protezione. Regole
              troppo restrittive rischiano di rallentare sviluppi che potrebbero
              salvare vite. Regole troppo permissive lasciano spazio a sistemi
              che causano danni reali prima che qualcuno intervenga. Non esiste
              una risposta tecnica a questo dilemma — è una scelta di valori,
              e come tale appartiene alla politica, non agli ingegneri.
            </p>
          </ArticleSection>

          {/* ── NOTA FINALE ───────────────────────────────────────────── */}
          <ArticleSection
            tag="Conclusione"
            title="L'etica non è opzionale"
          >
            <p>
              Ogni sistema AI incorpora scelte di valore: nella selezione
              dei dati, nella definizione della funzione di loss, nel
              modo in cui viene deployato, in chi ha accesso ai suoi output
              e chi no. Queste scelte vengono fatte che ne siamo consapevoli
              o meno. La differenza tra un'AI etica e una non etica non è
              che una ha valori e l'altra no — è che una li ha scelti
              intenzionalmente e l'altra li ha ereditati per inerzia.
            </p>
            <p>
              Le sezioni successive approfondiscono ciascuno di questi temi
              con più dettaglio: dai meccanismi tecnici del bias alla
              filosofia del problema dell'allineamento, dai dilemmi pratici
              della privacy ai possibili futuri della governance globale dell'AI.
            </p>
          </ArticleSection>

        </div>
      }
    />
  );
}