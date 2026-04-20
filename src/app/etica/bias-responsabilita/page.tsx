import type { Metadata } from "next";
import DefaultPage from "@/components/DefaultPage";
import ArticleSection from "@/components/ArticleSection";
import DefinitionBlock from "@/components/DefinitionBlock";
import CompareTable from "@/components/CompareTable";

export const metadata: Metadata = {
  title: "Bias, Giustizia e Responsabilità",
  description:
    "Quando un algoritmo discrimina, chi è responsabile? Dal bias tecnico alla filosofia della giustizia, fino alla responsabilità morale nelle decisioni automatizzate.",
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

          <DefinitionBlock
            title="Metriche di equità"
            definitions={[
              {
                term: "Parità demografica",
                definition:
                  "Il modello produce outcome positivi con la stessa frequenza in tutti i gruppi. Es: la stessa percentuale di donne e uomini ottiene un prestito approvato. Non tiene conto delle differenze reali tra gruppi.",
                also: "demographic parity, statistical parity",
              },
              {
                term: "Equalized odds",
                definition:
                  "Il modello ha la stessa percentuale di falsi positivi e falsi negativi in tutti i gruppi. Un sistema di diagnosi dovrebbe mancare il cancro con la stessa frequenza in pazienti di diversa etnia.",
              },
              {
                term: "Calibrazione",
                definition:
                  "Quando il modello assegna una probabilità del 70%, quel 70% deve essere accurato nello stesso modo per tutti i gruppi. Un modello calibrato su un gruppo può essere sistematicamente sbagliato su un altro.",
              },
              {
                term: "Impossibilità di Chouldechova",
                definition:
                  "Teorema matematico che dimostra che parità demografica, equalized odds e calibrazione non possono essere soddisfatte simultaneamente se i tassi base di outcome differiscono tra i gruppi. Non è possibile essere \"equi\" rispetto a tutte le metriche insieme.",
              },
            ]}
          />

          {/* ── FILOSOFIA DELLA GIUSTIZIA ─────────────────────────────── */}
          <ArticleSection
            tag="Filosofia"
            title="Cos'è la giustizia, esattamente?"
            subtitle="Le teorie filosofiche della giustizia non sono d'accordo tra loro. E i sistemi algoritmici ci obbligano a scegliere."
          >
            <p>
              La teoria della giustizia di John Rawls propone un esperimento
              mentale radicale: immagina di dover progettare le regole di una
              società senza sapere quale posizione occuperai al suo interno —
              senza sapere se sarai ricco o povero, uomo o donna, di
              maggioranza o minoranza. Rawls chiama questa situazione il
              <em> velo di ignoranza</em>. Dietro questo velo, sostiene,
              sceglieremmo un sistema che massimizza le condizioni del membro
              più svantaggiato della società.
            </p>
            <p>
              Applicato ai sistemi algoritmici: un sistema equo secondo Rawls
              sarebbe quello che, se non sapessi in quale gruppo demografico
              ti troveresti, saresti disposto ad accettare. Questa è una
              versione dell&apos;equalized odds: il sistema dovrebbe sbagliarsi
              nella stessa misura indipendentemente da chi sei.
            </p>
            <p>
              Aristotele aveva un&apos;intuizione diversa, ma complementare:
              la giustizia richiede di trattare casi uguali in modo uguale
              e casi diversi in modo proporzionalmente diverso.
              Il problema è che &quot;uguale&quot; è già una scelta normativa.
              Se due persone hanno la stessa probabilità di recidiva, devono
              ricevere la stessa sentenza. Ma &quot;probabilità di recidiva&quot;
              è già un concetto carico di presupposti su cosa conta come
              evidenza rilevante.
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
              Il filosofo del diritto Philip Pettit chiama questo
              il <em>problema della mano sporca distribuita</em>: nessuno
              fa qualcosa di sbagliato nel proprio dominio ristretto,
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

          {/* ── CONFRONTO APPROCCI ────────────────────────────────────── */}
          <CompareTable
            title="Teorie della giustizia applicate all'AI"
            caption="Ogni teoria filosofica porta a requisiti diversi per i sistemi algoritmici."
            columns={["Approccio liberale (Rawls)", "Approccio meritocratico", "Approccio egualitario"]}
            rows={[
              {
                aspect: "Principio",
                values: [
                  "Massimizza le condizioni dei più svantaggiati",
                  "Premia chi ha le competenze più rilevanti",
                  "Trattamento identico per tutti i gruppi",
                ],
              },
              {
                aspect: "Metrica preferita",
                values: [
                  "Equalized odds — stesso tasso d'errore per tutti",
                  "Calibrazione — accuratezza stabile tra gruppi",
                  "Parità demografica — stesso tasso di outcome",
                ],
              },
              {
                aspect: "Applicato al credito",
                values: [
                  "I criteri non devono svantaggiare chi è già povero",
                  "Chi ha più probabilità di restituire riceve credito",
                  "La stessa percentuale di approvazioni in ogni gruppo",
                ],
              },
              {
                aspect: "Limite principale",
                values: [
                  "Può richiedere trattamenti differenziali espliciti",
                  "Il merito è spesso già influenzato da disuguaglianze",
                  "Ignora differenze reali tra popolazioni",
                ],
              },
            ]}
          />

          {/* ── INGIUSTIZIA EPISTEMICA ────────────────────────────────── */}
          <ArticleSection
            tag="Filosofia della conoscenza"
            title="L'ingiustizia invisibile: chi sa viene creduto?"
            subtitle="I sistemi algoritmici non solo distribuiscono risorse — distribuiscono credibilità."
          >
            <p>
              C&apos;è una forma di danno che i sistemi algoritmici possono
              causare e che è difficile da quantificare: il danno epistemico.
              Miranda Fricker distingue tra <em>ingiustizia testimoniale</em>
              — quando qualcuno non viene creduto per via della sua identità —
              e <em>ingiustizia ermeneutica</em> — quando mancano i concetti
              per comprendere e comunicare la propria esperienza.
            </p>
            <p>
              I sistemi di machine learning possono perpetrare entrambe.
              Un sistema di assunzione che ignora i titoli di studio
              stranieri non attribuisce credibilità alle competenze
              di certi candidati. Un sistema di diagnosi addestrato
              su letteratura medica che storicamente ignorava le donne
              non ha nemmeno i concetti per riconoscere certi pattern
              sintomatologici femminili.
            </p>
            <p>
              Questo tipo di ingiustizia è particolarmente insidioso
              perché non emerge dalle statistiche aggregate. Un sistema
              può avere un&apos;accuratezza uguale su tutti i gruppi demografici
              e causare comunque ingiustizia epistemica — se i tipi
              di errore che commette sono qualitativamente diversi,
              se squalifica sistematicamente certi tipi di evidenza,
              se non ha vocabolario per certi tipi di esperienza.
            </p>
          </ArticleSection>

          {/* ── NOTA FINALE ───────────────────────────────────────────── */}
          <ArticleSection
            tag="Conclusione"
            title="Non esiste equità senza scelte di valore"
          >
            <p>
              Il teorema di impossibilità di Chouldechova non è solo
              un risultato matematico. È una verità normativa: non esiste
              una nozione tecnica di &quot;equità&quot; che sia neutrale rispetto
              ai valori. Ogni scelta di metrica è già una scelta morale.
              Chi costruisce sistemi algoritmici che influenzano vite umane
              sta già facendo filosofia morale — che lo riconosca o meno.
            </p>
            <p>
              La risposta non è evitare le scelte, ma farle esplicitamente,
              documentarle, sottoporle al dibattito democratico. Un sistema
              di giustizia penale che usa algoritmi predittivi non sta
              semplicemente &quot;automatizzando&quot; la giustizia — sta
              codificando in software una teoria della pena, dell&apos;equità
              e della responsabilità. Quella teoria merita lo stesso
              scrutinio che riserviamo alle leggi.
            </p>
          </ArticleSection>

        </div>
      }
    />
  );
}
