import type { Metadata } from "next";
import DefaultPage from "@/components/DefaultPage";
import ArticleSection from "@/components/ArticleSection";

export const metadata: Metadata = {
  title: "Bias, Giustizia e Responsabilità",
  description:
    "Quando un algoritmo discrimina, chi è responsabile? Dal bias tecnico alla responsabilità morale nelle decisioni automatizzate.",
};

export default function BiasResponsabilitaPage() {
  return (
    <DefaultPage
      title="Bias, Giustizia e Responsabilità"
      content={
        <div className="space-y-20">

          {/* ── INTRO ─────────────────────────────────────────────────── */}
          <ArticleSection
            tag="Introduzione"
            title="Più che un problema tecnico, è un problema morale"
            subtitle="Un algoritmo non ha intenzioni. Ma i danni che causa sono reali."
          >
            <p>
              Quando un sistema di riconoscimento facciale fallisce
              sistematicamente a identificare le persone di pelle scura,
              non sta &quot;sbagliando&quot; nel senso in cui sbaglia un umano.
              Non ha pregiudizi consci, non ha ostilità, non ha intenzioni.
              Riproduce pattern matematici estratti da dati storici.
              Eppure il danno che causa — arresti sbagliati, diagnosi mancate,
              crediti negati — è del tutto reale e ricade su persone reali.
            </p>
            <p>
              Questo è il paradosso centrale del bias algoritmico: un sistema
              senza intenzionalità può produrre effetti che, se prodotti da
              un essere umano, chiameremmo discriminazione. La domanda che ne
              segue è inevitabile: se l&apos;intenzionalità non c&apos;è, c&apos;è ancora
              responsabilità? E se sì, di chi?
            </p>
          </ArticleSection>

          {/* ── MECCANISMI TECNICI ─────────────────────────────────────── */}
          <ArticleSection
            tag="Tecnica"
            title="Come nasce il bias"
            subtitle="I dati non sono mai neutri. Riflettono sempre il mondo che li ha prodotti."
          >
            <p>
              Un modello di machine learning apprende associazioni statistiche
              dai dati. Se i dati sono distorti — perché riflettono
              disuguaglianze storiche, perché certi gruppi sono
              sottorappresentati, perché le etichette stesse sono state
              assegnate con criteri diseguali — il modello impara quelle
              distorsioni e le codifica in parametri numerici.
            </p>
            <p>
              Il caso COMPAS è emblematico. COMPAS è un software usato
              in alcuni stati americani per stimare il rischio di recidiva
              dei condannati. Un&apos;analisi di ProPublica del 2016 ha rilevato
              che il sistema classificava i detenuti neri come ad alto rischio
              quasi il doppio delle volte rispetto ai detenuti bianchi, anche
              a parità di reati. Il sistema non usava la razza come variabile
              diretta — ma usava variabili correlate alla razza (quartiere,
              storia familiare, tipo di scuola frequentata) che producevano
              lo stesso effetto discriminatorio.
            </p>
            <p>
              Questo fenomeno — in cui un modello apprende proxy di variabili
              protette — è una delle forme più insidiose di bias, perché
              non è rilevabile guardando solo le variabili di input.
              Richiede un&apos;analisi degli output disaggregata per gruppi.
            </p>
          </ArticleSection>

          {/* ── RESPONSABILITÀ ────────────────────────────────────────── */}
          <ArticleSection
            tag="Responsabilità morale"
            title="Chi è responsabile quando un algoritmo causa un danno?"
            subtitle="La catena di responsabilità nel machine learning è frammentata come non lo è mai stata in nessuna tecnologia precedente."
          >
            <p>
              Nel diritto tradizionale, la responsabilità segue l&apos;agente
              intenzionale. Chi ha fatto qualcosa — o chi doveva impedirlo
              e non l&apos;ha fatto — è responsabile delle conseguenze. Ma
              nei sistemi di machine learning, la catena causale è radicalmente
              distribuita.
            </p>
            <p>
              Chi ha raccolto i dati di training? Chi li ha etichettati?
              Chi ha scelto l&apos;architettura del modello? Chi ha definito
              la funzione di loss? Chi ha approvato il deployment? Chi ha
              deciso in quale contesto usarlo? Chi stava guardando le
              metriche di performance dopo il lancio? In ognuno di questi
              passaggi ci sono scelte, e in ognuno di questi passaggi
              c&apos;è un pezzo di responsabilità — che si diluisce man mano
              che il sistema si allontana dalle mani dei suoi creatori.
            </p>
            <p>
              Nessuno fa qualcosa di sbagliato nel proprio dominio ristretto,
              ma il risultato collettivo è sbagliato. Questa struttura
              rende difficile applicare i concetti tradizionali di
              colpa e responsabilità.
            </p>
            <p>
              Una risposta è spostare l&apos;attenzione dalla responsabilità
              individuale alla <strong>responsabilità strutturale</strong>:
              chi ha il potere di progettare il sistema, di modificarlo,
              di ritirarlo, ha la responsabilità di farlo bene —
              indipendentemente dalle intenzioni di ciascun singolo
              attore nella catena.
            </p>
          </ArticleSection>

          {/* ── CONCLUSIONE ───────────────────────────────────────────── */}
          <ArticleSection
            tag="Conclusione"
            title="Non esiste neutralità tecnica"
          >
            <p>
              La riflessione sul bias algoritmico non porta a risposte semplici.
              Ci dice che i sistemi AI non sono strumenti neutri: incorporano
              le scelte di chi li ha costruiti, i dati con cui sono stati
              addestrati, e i valori di chi li ha deployati. Quando un algoritmo
              sbaglia, la responsabilità è distribuita lungo tutta questa catena
              — e capire dove si trova è il primo passo per costruire sistemi
              più giusti.
            </p>
          </ArticleSection>

        </div>
      }
    />
  );
}
