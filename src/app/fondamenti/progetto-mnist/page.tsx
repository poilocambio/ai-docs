import React from "react";
import type { Metadata } from "next";
import DefaultPage from "@/components/DefaultPage";
import ArticleSection from "@/components/ArticleSection";
import CodeBlock from "@/components/CodeBlock";
import DefinitionBlock from "@/components/DefinitionBlock";
import CompareTable from "@/components/CompareTable";

export const metadata: Metadata = {
  title: "Progetto MNIST",
  description:
    "Un riconoscitore di cifre scritte a mano costruito con scikit-learn e un'interfaccia grafica Tkinter — dal training del modello al disegno in tempo reale.",
};

export default function ProgettoMNIST() {
  return (
    <DefaultPage
      title="Progetto MNIST"
      content={
        <div className="space-y-20">

          {/* ── INTRO ─────────────────────────────────────────────────── */}
          <ArticleSection
            tag="Panoramica"
            title="Disegnare e riconoscere cifre in tempo reale"
            subtitle="Un progetto completo: training del modello, salvataggio su disco e interfaccia grafica per testarlo a mano."
          >
            <p>
              Il progetto è un'applicazione desktop Python che combina
              due cose: un modello di machine learning addestrato sul
              dataset MNIST, e un'interfaccia grafica che permette di
              disegnare cifre con il mouse e vederle classificate in
              tempo reale.
            </p>
            <p>
              È costruito con <strong>scikit-learn</strong> per il modello
              (un MLP — Multi-Layer Perceptron), <strong>Tkinter</strong>
              per la GUI e <strong>Pillow</strong> per gestire
              il canvas di disegno. Il modello viene addestrato una sola
              volta e salvato su disco: i run successivi lo caricano
              direttamente, senza re-addestrare.
            </p>
          </ArticleSection>

          {/* ── SETUP ─────────────────────────────────────────────────── */}
          <ArticleSection
            tag="Setup"
            title="Dipendenze"
            subtitle="Tutto gira sulla standard library di Python più quattro pacchetti."
          >
            <p>
              A differenza di un approccio con PyTorch o TensorFlow,
              questo progetto usa scikit-learn — più semplice da installare
              e sufficiente per un MLP su MNIST. Tkinter è inclusa
              nella maggior parte delle distribuzioni Python standard.
            </p>
          </ArticleSection>

          <CodeBlock
            language="bash"
            filename="terminale"
            caption="Installa le dipendenze. tkinter è già inclusa in Python — se manca, installa il pacchetto python3-tk dal tuo package manager."
            code={`pip install scikit-learn numpy pillow joblib`}
          />

          <CodeBlock
            language="python"
            filename="mnist.py"
            caption="Le importazioni. os e joblib gestiscono il salvataggio del modello su disco; tkinter e PIL costruiscono l'interfaccia grafica."
            code={`import os
import numpy as np
import joblib
import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageDraw
from sklearn.datasets import fetch_openml
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.neural_network import MLPClassifier`}
          />

          {/* ── CARICAMENTO / TRAINING ────────────────────────────────── */}
          <ArticleSection
            tag="Modello"
            title="Training e persistenza"
            subtitle="Il modello si addestra una volta sola — poi viene salvato e ricaricato automaticamente."
          >
            <p>
              La funzione <code>load_or_train_model()</code> implementa
              un pattern semplice ma efficace: controlla se esiste già
              un file <code>.pkl</code> nella cartella <code>dataset/</code>.
              Se sì, lo carica con joblib in pochi millisecondi.
              Se no, scarica MNIST, addestra il modello e lo salva —
              includendo l'accuratezza nel nome del file per tenere traccia
              delle versioni.
            </p>
            <p>
              Il dataset viene scaricato automaticamente da OpenML
              tramite scikit-learn: 70.000 immagini 28×28 in scala di
              grigi, normalizzate dividendo i pixel per 255
              per portarli nell'intervallo [0, 1].
            </p>
          </ArticleSection>

          <CodeBlock
            language="python"
            filename="mnist.py"
            caption="Se il modello esiste già su disco viene caricato, altrimenti viene addestrato da zero. Il nome del file salvato include l'accuratezza media della cross-validation."
            code={`DATASET_DIR = "dataset"
os.makedirs(DATASET_DIR, exist_ok=True)

MODEL_FILENAME = os.path.join(DATASET_DIR, "mlp_mnist_model_numpy_0.2.pkl")

def load_or_train_model():
    if os.path.exists(MODEL_FILENAME):
        print(f"Caricamento modello da {MODEL_FILENAME}...")
        return joblib.load(MODEL_FILENAME)

    print("Caricamento dataset MNIST...")
    mnist = fetch_openml('mnist_784', version=1)
    X, y = mnist.data / 255.0, mnist.target.astype(int)

    # fetch_openml restituisce DataFrame — convertiamo in NumPy
    X = X.values if hasattr(X, 'values') else X
    y = y.values if hasattr(y, 'values') else y

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    mlp = MLPClassifier(
        hidden_layer_sizes=(256, 128),
        activation="relu",
        solver="adam",
        max_iter=500,
        learning_rate="adaptive",
        early_stopping=True,
        alpha=0.0001,
        random_state=42,
        tol=1e-5
    )

    print("Addestramento modello...")
    mlp.fit(X_train, y_train)

    # Cross-validation su 5 fold per una stima robusta dell'accuratezza
    scores = cross_val_score(mlp, X, y, cv=5)
    mean_accuracy = scores.mean()
    print(f"Accuratezza media: {mean_accuracy:.4f}")

    # Nome file con accuratezza incorporata — utile per confrontare versioni
    model_filename = os.path.join(DATASET_DIR, f"mlp_mnist_acc_{mean_accuracy:.4f}.pkl")
    joblib.dump(mlp, model_filename)
    print(f"Modello salvato in {model_filename}")

    return mlp`}
          />

          <DefinitionBlock
            title="Parametri del MLPClassifier"
            definitions={[
              {
                term: "hidden_layer_sizes",
                definition:
                  "(256, 128) — due hidden layer con 256 e 128 neuroni rispettivamente. L'input è 784 (28×28 pixel appiattiti), l'output 10 classi (cifre 0–9).",
              },
              {
                term: "activation",
                definition:
                  "ReLU (Rectified Linear Unit): f(x) = max(0, x). Introduce non-linearità senza parametri aggiuntivi. Standard per reti dense moderne.",
              },
              {
                term: "solver",
                definition:
                  "Adam — ottimizzatore adattivo che aggiusta automaticamente il learning rate per ogni parametro. Converge più velocemente di SGD classico su dataset come MNIST.",
              },
              {
                term: "early_stopping",
                definition:
                  "Ferma il training se la loss sul validation set smette di migliorare. Previene l'overfitting senza dover fissare manualmente il numero di epoche.",
                also: "arresto anticipato",
              },
              {
                term: "alpha",
                definition:
                  "Termine di regolarizzazione L2 (weight decay). Penalizza pesi troppo grandi, riducendo l'overfitting. 0.0001 è un valore conservativo.",
              },
              {
                term: "cross_val_score",
                definition:
                  "Divide il dataset in 5 parti (fold), addestra su 4 e valuta sulla quinta, ripetendo il processo 5 volte. La media dei 5 score è una stima più robusta dell'accuratezza reale rispetto a un singolo train/test split.",
              },
            ]}
          />

          {/* ── GUI ───────────────────────────────────────────────────── */}
          <ArticleSection
            tag="Interfaccia"
            title="La GUI Tkinter"
            subtitle="Un canvas su cui disegnare con il mouse — la predizione avviene al click di un bottone."
          >
            <p>
              L'interfaccia è costruita con Tkinter, il toolkit GUI
              incluso nella standard library di Python. Il canvas è
              doppio: uno visivo (il <code>tk.Canvas</code> che l'utente
              vede) e uno invisibile (un'immagine Pillow in memoria
              <code> Image</code>) che viene usato per il preprocessing.
            </p>
            <p>
              Quando l'utente disegna, ogni movimento del mouse
              crea un cerchio bianco di raggio 12 su entrambi i canvas
              in sincronia. Al click su <em>Predict</em>, l'immagine
              Pillow viene ridimensionata a 28×28, normalizzata e
              passata al modello.
            </p>
          </ArticleSection>

          <CodeBlock
            language="python"
            filename="mnist.py"
            caption="La classe estende tk.Tk direttamente — l'istanza è sia il modello che la finestra. Il canvas Pillow in memoria è la chiave per il preprocessing corretto."
            code={`class DigitRecognizerApp(tk.Tk):
    def __init__(self, model):
        super().__init__()
        self.title("Digit Recognizer")
        self.geometry("350x400")
        self.configure(bg="#2e2e2e")
        self.model = model

        self.canvas_size = 280
        self.canvas = tk.Canvas(
            self, width=self.canvas_size, height=self.canvas_size, bg="black"
        )
        self.canvas.pack(pady=10)

        # Canvas Pillow in memoria — usato per l'inferenza
        self.image = Image.new("L", (self.canvas_size, self.canvas_size), 0)
        self.draw  = ImageDraw.Draw(self.image)

        self.canvas.bind("<B1-Motion>", self.paint)

        btn_frame = tk.Frame(self, bg="#2e2e2e")
        btn_frame.pack()

        self.predict_btn = ttk.Button(btn_frame, text="Predict", command=self.predict_digit)
        self.predict_btn.grid(row=0, column=0, padx=10)

        self.clear_btn = ttk.Button(btn_frame, text="Clear", command=self.clear_canvas)
        self.clear_btn.grid(row=0, column=1, padx=10)

        self.label = tk.Label(
            self, text="Disegna un numero",
            fg="white", bg="#2e2e2e", font=("Arial", 14)
        )
        self.label.pack(pady=10)`}
          />

          <CodeBlock
            language="python"
            filename="mnist.py"
            caption="paint() scrive simultaneamente sul canvas visivo e su quello Pillow. predict_digit() fa il preprocessing e interroga il modello."
            code={`    def paint(self, event):
        x, y = event.x, event.y
        r = 12  # raggio del pennello
        # Disegna sul canvas visivo
        self.canvas.create_oval(x-r, y-r, x+r, y+r, fill="white", outline="white")
        # Disegna sul canvas Pillow (usato per l'inferenza)
        self.draw.ellipse([x-r, y-r, x+r, y+r], fill="white")

    def clear_canvas(self):
        self.canvas.delete("all")
        self.image = Image.new("L", (self.canvas_size, self.canvas_size), 0)
        self.draw  = ImageDraw.Draw(self.image)

    def predict_digit(self):
        # Ridimensiona a 28x28, normalizza in [0,1], appiattisce in vettore 1D
        img = np.array(self.image.resize((28, 28)).convert("L")) / 255.0
        img = img.flatten().reshape(1, -1)
        prediction = self.model.predict(img)[0]
        self.label.config(text=f"Predizione: {prediction}")


if __name__ == "__main__":
    model = load_or_train_model()
    app   = DigitRecognizerApp(model)
    app.mainloop()`}
          />

          {/* ── PREPROCESSING ─────────────────────────────────────────── */}
          <ArticleSection
            tag="Preprocessing"
            title="Dal canvas al modello"
            subtitle="Il gap tra come l'utente disegna e come MNIST è stato costruito."
          >
            <p>
              C'è un aspetto critico da capire in questo progetto: il
              modello è stato addestrato su immagini MNIST scritte a mano
              su carta, scansionate e centrate. Il canvas dell'app invece
              produce tratti spessi su sfondo nero in un'area 280×280.
            </p>
            <p>
              Il passaggio <code>.resize((28, 28))</code> di Pillow
              comprime l'immagine usando interpolazione bilineare, che
              produce sfumature di grigio ai bordi dei tratti — simili
              all'anti-aliasing delle cifre MNIST originali. Il raggio
              del pennello (12px su un canvas 280px) è stato scelto
              appositamente per avere proporzioni simili a quelle
              del dataset dopo il ridimensionamento.
            </p>
            <p>
              Se i risultati sono inaccurati, spesso il motivo è che
              la cifra è disegnata troppo piccola, troppo in un angolo,
              o con un tratto troppo sottile rispetto a come MNIST
              è stato costruito.
            </p>
          </ArticleSection>

          {/* ── CONFRONTO ─────────────────────────────────────────────── */}
          <CompareTable
            title="scikit-learn MLPClassifier vs PyTorch su MNIST"
            caption="Per un progetto didattico standalone con GUI, scikit-learn è la scelta giusta. PyTorch diventa necessario quando servono architetture più complesse o GPU."
            columns={["scikit-learn MLP", "PyTorch NN"]}
            rows={[
              {
                aspect: "Installazione",
                values: [
                  "pip install scikit-learn — nessuna dipendenza CUDA",
                  "Più pesante, versione CUDA separata per GPU",
                ],
              },
              {
                aspect: "Accuratezza su MNIST",
                values: ["~97–98% con (256,128)", "~98–99.7% con CNN"],
              },
              {
                aspect: "Flessibilità architettura",
                values: [
                  "Solo layer densi (fully connected)",
                  "Qualsiasi architettura: CNN, RNN, Transformer",
                ],
              },
              {
                aspect: "Salvataggio modello",
                values: [
                  "joblib.dump() — un file .pkl",
                  "torch.save(state_dict()) — file .pth",
                ],
              },
              {
                aspect: "Integrazione con GUI Python",
                values: [
                  "Ottima — libreria Python pura, nessun conflitto",
                  "Buona, ma import più pesanti",
                ],
              },
              {
                aspect: "Quando usarlo",
                values: [
                  "Prototipazione rapida, progetti standalone, didattica",
                  "Ricerca, produzione, architetture profonde",
                ],
              },
            ]}
          />

          {/* ── CONCLUSIONE ───────────────────────────────────────────── */}
          <ArticleSection
            tag="Conclusione"
            title="Cosa dimostra questo progetto"
          >
            <p>
              Questo progetto tocca tutti gli elementi fondamentali
              di un sistema ML reale: acquisizione e normalizzazione
              dei dati, definizione e addestramento del modello,
              valutazione con cross-validation, persistenza su disco
              e deployment in un'applicazione interattiva.
            </p>
            <p>
              La scelta di scikit-learn invece di PyTorch non è una
              scorciatoia — è una decisione di design. Per un MLP
              su MNIST con GUI desktop, scikit-learn è lo strumento
              giusto: meno complessità, stessa comprensione dei concetti.
              La complessità di PyTorch ha senso quando serve
              — non prima.
            </p>
            <p>
              Il codice sorgente completo è disponibile su{" "}
              <a
                href="https://github.com/poilocambio/giochino_mnist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-medium underline underline-offset-2 hover:text-neutral-500 transition-colors"
              >
                github.com/poilocambio/giochino_mnist
              </a>
              .
            </p>
          </ArticleSection>

        </div>
      }
    />
  );
}