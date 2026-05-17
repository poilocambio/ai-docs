import type { Metadata } from "next";
import DefaultPage from "@/components/DefaultPage";
import ArticleSection from "@/components/ArticleSection";
import CardGrid from "@/components/CardGrid";

export const metadata: Metadata = {
  title: "Etica dell'IA",
  description:
    "Bias algoritmico, responsabilità, impatto cognitivo e governance: i dilemmi etici dell'intelligenza artificiale.",
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
              Per la maggior parte della storia dell&apos;informatica, i programmi
              eseguivano esattamente quello che un programmatore aveva scritto.
              La responsabilità era chiara: se qualcosa andava storto, c&apos;era
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
              L&apos;etica dell&apos;IA non è un freno allo sviluppo tecnologico.
              È il tentativo di capire quali valori stiamo incorporando nei
              sistemi che costruiamo, e di farlo intenzionalmente invece che
              per inerzia.
            </p>
          </ArticleSection>

          {/* ── LE DUE AREE ───────────────────────────────────────────── */}
          <section>
            <p className="text-xs tracking-widest uppercase text-neutral-400 text-center mb-6 sm:mb-8">
              Approfondimenti
            </p>
            <CardGrid
              columns={2}
              cards={[
                {
                  title: "Bias, Giustizia e Responsabilità",
                  tag: "Equità",
                  description:
                    "I modelli imparano dai dati storici. Se quei dati riflettono disuguaglianze, il modello le riproduce. Ma chi è responsabile quando un algoritmo discrimina?",
                  href: "/etica/bias-responsabilita",
                },
                {
                  title: "Il Problema dell'Allineamento",
                  tag: "Filosofia",
                  description:
                    "Come si costruisce un'AI che vuole davvero ciò che noi vogliamo? E siamo in grado di specificare, con precisione, cosa vogliamo?",
                  href: "/etica/allineamento",
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
              Il bias algoritmico può manifestarsi in modi diversi. A volte
              certi gruppi sono sottorappresentati nei dati di training. A volte
              le variabili usate come proxy di un concetto — come il
              &quot;merito&quot; — sono esse stesse già distorte. A volte un modello
              addestrato su una popolazione generalizza male su sottogruppi
              specifici. Il risultato è sempre lo stesso: il sistema amplifica
              disuguaglianze invece di ridurle.
            </p>
            <p>
              La difficoltà è che spesso questi bias non sono visibili prima
              del deployment. Appaiono quando il sistema incontra casi reali
              — nelle decisioni di credito, nelle sentenze predittive, nei
              sistemi di riconoscimento facciale — e a quel punto hanno già
              causato danni concreti a persone reali.
            </p>
          </ArticleSection>

          {/* ── ATROFIA E DIPENDENZA ──────────────────────────────────── */}
          <ArticleSection
            tag="Impatto cognitivo"
            title="L'atrofia del pensiero critico"
            subtitle="Delegare le decisioni alle macchine ha un costo che non compare in nessuna metrica."
          >
            <p>
              C&apos;è un effetto sottile e difficile da misurare che emerge
              dall&apos;uso prolungato di sistemi decisionali automatizzati:
              l&apos;erosione della capacità di giudizio autonomo.
              Quando un sistema di navigazione GPS è sempre disponibile,
              le persone smettono di costruire mappe mentali delle città.
              Quando un correttore automatico è sempre attivo, l&apos;attenzione
              ortografica si atrofizza.
            </p>
            <p>
              Lo stesso principio si applica a scale molto più significative.
              Un medico che si affida sistematicamente a un sistema di
              diagnosi AI perde gradualmente la capacità di ragionare
              clinicamente in assenza di supporto. Un analista finanziario
              che delega le previsioni a modelli statistici perde
              progressivamente l&apos;intuizione di mercato. Non perché siano
              meno intelligenti — ma perché l&apos;intelligenza, come i muscoli,
              si atrofizza se non viene esercitata.
            </p>
            <p>
              Questo non è un argomento contro l&apos;AI. È un argomento per
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
              Nel 2023 l&apos;Unione Europea ha approvato l&apos;AI Act, il primo
              framework regolatorio completo sull&apos;intelligenza artificiale.
              Classifica i sistemi AI per livello di rischio — da
              &quot;inaccettabile&quot; (manipolazione subliminale, social scoring) ad
              &quot;alto rischio&quot; (infrastrutture critiche, selezione del personale,
              giustizia) fino a &quot;basso rischio&quot; — e impone obblighi diversi
              per ciascuna categoria.
            </p>
            <p>
              Negli Stati Uniti l&apos;approccio è stato più frammentato:
              linee guida volontarie del NIST, executive order presidenziali,
              e una regolamentazione settoriale emergente. La Cina ha adottato
              un modello diverso ancora — regolamentazione stringente
              sull&apos;AI generativa e sui sistemi di raccomandazione,
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

        </div>
      }
    />
  );
}
