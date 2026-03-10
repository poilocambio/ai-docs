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
    "Costruire una rete neurale per il riconoscimento di cifre scritte a mano con Python e PyTorch.",
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
            title="Riconoscere cifre scritte a mano"
            subtitle="MNIST è il 'Hello World' del deep learning — semplice abbastanza da capire, complesso abbastanza da insegnare tutto il necessario."
          >
            <p>
              Il dataset MNIST contiene 70.000 immagini in scala di grigi
              di cifre scritte a mano (0–9), ciascuna di 28×28 pixel.
              60.000 sono usate per il training, 10.000 per il test.
              È il punto di partenza classico per chiunque voglia capire
              concretamente come funziona una rete neurale.
            </p>
            <p>
              In questo progetto costruiamo una rete neurale feed-forward
              da zero con PyTorch, la addestriamo su MNIST e analizziamo
              i risultati. Ogni passo del codice corrisponde a un concetto
              teorico — l'obiettivo non è solo far funzionare il modello,
              ma capire perché funziona.
            </p>
          </ArticleSection>

          {/* ── SETUP ─────────────────────────────────────────────────── */}
          <ArticleSection
            tag="Setup"
            title="Dipendenze e importazioni"
            subtitle="Tutto quello che serve per iniziare."
          >
            <p>
              Il progetto usa PyTorch come framework principale e
              torchvision per scaricare e preprocessare MNIST automaticamente.
              Matplotlib serve solo per visualizzare qualche esempio durante
              l'analisi — non è necessario per il training.
            </p>
          </ArticleSection>

          <CodeBlock
            language="bash"
            filename="terminale"
            caption="Installa le dipendenze nel tuo ambiente virtuale."
            code={`pip install torch torchvision matplotlib`}
          />

          <CodeBlock
            language="python"
            filename="mnist.py"
            caption="Importazioni necessarie. torch.nn contiene i layer, torch.optim gli ottimizzatori."
            code={`import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import matplotlib.pyplot as plt`}
          />

          {/* ── DATASET ───────────────────────────────────────────────── */}
          <ArticleSection
            tag="Dati"
            title="Caricare e preprocessare MNIST"
            subtitle="Prima di costruire il modello, bisogna capire i dati."
          >
            <p>
              Ogni immagine MNIST è una matrice 28×28 di valori tra 0 e 255.
              Prima di passarla alla rete la normalizziamo: sottraiamo la
              media del dataset (0.1307) e dividiamo per la deviazione standard
              (0.3081). Questo porta i valori in un range centrato intorno a 0,
              che rende il training più stabile numericamente.
            </p>
            <p>
              Il <strong>DataLoader</strong> gestisce il batching automaticamente:
              invece di passare tutte le 60.000 immagini insieme (impossibile
              in memoria), le raggruppa in mini-batch da 64 e le mescola ad
              ogni epoca per evitare che l'ordine influenzi il training.
            </p>
          </ArticleSection>

          <CodeBlock
            language="python"
            filename="mnist.py"
            caption="transform.Compose applica le trasformazioni in sequenza: prima converte in tensore, poi normalizza."
            code={`# Trasformazione: pixel [0,255] → tensore normalizzato
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

# Download automatico nella cartella ./data
train_dataset = datasets.MNIST(
    root='./data',
    train=True,
    download=True,
    transform=transform
)

test_dataset = datasets.MNIST(
    root='./data',
    train=False,
    download=True,
    transform=transform
)

# DataLoader: batch da 64, shuffle solo nel training
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader  = DataLoader(test_dataset,  batch_size=64, shuffle=False)

print(f"Training samples: {len(train_dataset)}")  # 60000
print(f"Test samples:     {len(test_dataset)}")   # 10000
print(f"Input shape:      {train_dataset[0][0].shape}")  # [1, 28, 28]`}
          />

          <CodeBlock
            language="python"
            filename="mnist.py"
            caption="Visualizza qualche esempio per capire il dataset prima di addestrare."
            code={`# Visualizza i primi 10 esempi
fig, axes = plt.subplots(1, 10, figsize=(15, 2))

for i in range(10):
    image, label = train_dataset[i]
    axes[i].imshow(image.squeeze(), cmap='gray')
    axes[i].set_title(str(label))
    axes[i].axis('off')

plt.tight_layout()
plt.show()`}
          />

          {/* ── ARCHITETTURA ──────────────────────────────────────────── */}
          <ArticleSection
            tag="Architettura"
            title="La rete neurale"
            subtitle="Una rete feed-forward con due layer nascosti — semplice ma efficace."
          >
            <p>
              L'architettura che usiamo è una rete fully connected (dense):
              ogni neurone di un layer è connesso a ogni neurone del layer
              successivo. L'immagine 28×28 viene prima "appiattita" in un
              vettore di 784 valori, che poi attraversa due hidden layer
              prima di arrivare all'output.
            </p>
            <p>
              Ogni hidden layer usa <strong>ReLU</strong> come funzione di
              attivazione. ReLU (Rectified Linear Unit) è semplicissima:
              restituisce il valore se positivo, 0 altrimenti. La sua
              semplicità la rende computazionalmente efficiente e aiuta
              a evitare il problema del vanishing gradient nelle reti profonde.
            </p>
            <p>
              L'output layer ha 10 neuroni — uno per cifra (0–9).
              Non applichiamo softmax qui perché la funzione di loss
              <code> CrossEntropyLoss</code> di PyTorch la include
              internamente, il che è numericamente più stabile.
            </p>
          </ArticleSection>

          <CodeBlock
            language="python"
            filename="mnist.py"
            caption="nn.Sequential costruisce la rete come una pipeline lineare di layer. view(-1, 784) appiattisce il tensore 28×28 in un vettore 1D."
            code={`class MNISTNet(nn.Module):
    def __init__(self):
        super(MNISTNet, self).__init__()
        self.network = nn.Sequential(
            nn.Flatten(),           # [batch, 1, 28, 28] → [batch, 784]
            nn.Linear(784, 256),    # primo hidden layer: 784 → 256 neuroni
            nn.ReLU(),
            nn.Dropout(0.2),        # disattiva casualmente il 20% dei neuroni
            nn.Linear(256, 128),    # secondo hidden layer: 256 → 128 neuroni
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(128, 10),     # output layer: 10 classi (cifre 0-9)
        )

    def forward(self, x):
        return self.network(x)


# Usa GPU se disponibile, altrimenti CPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model  = MNISTNet().to(device)

# Conta i parametri totali
total_params = sum(p.numel() for p in model.parameters())
print(f"Parametri totali: {total_params:,}")  # ~235,146`}
          />

          <DefinitionBlock
            title="Componenti dell'architettura"
            definitions={[
              {
                term: "nn.Flatten()",
                definition:
                  "Trasforma il tensore di input da [batch, 1, 28, 28] a [batch, 784]. Necessario perché i layer Linear lavorano su vettori 1D, non matrici.",
              },
              {
                term: "nn.Linear(in, out)",
                definition:
                  "Layer fully connected. Apprende una matrice di pesi (in × out) e un vettore di bias (out). È la moltiplicazione matriciale al cuore di ogni rete dense.",
              },
              {
                term: "nn.ReLU()",
                definition:
                  "Funzione di attivazione: f(x) = max(0, x). Introduce non-linearità senza parametri aggiuntivi. Senza di essa, l'intera rete collasserebbe in una singola trasformazione lineare.",
              },
              {
                term: "nn.Dropout(p)",
                definition:
                  "Durante il training, disattiva casualmente una frazione p dei neuroni ad ogni forward pass. Riduce l'overfitting forzando la rete a non dipendere da singoli neuroni.",
                also: "regularizzazione",
              },
            ]}
          />

          {/* ── TRAINING ──────────────────────────────────────────────── */}
          <ArticleSection
            tag="Training"
            title="Addestrare il modello"
            subtitle="Il ciclo training — forward pass, calcolo della loss, backward pass, aggiornamento pesi."
          >
            <p>
              Il training avviene in <strong>epoche</strong>: un'epoca è un
              passaggio completo su tutto il dataset di training. Ad ogni
              batch eseguiamo quattro operazioni fondamentali:
            </p>
            <p>
              1. <strong>Forward pass</strong> — i dati attraversano la rete
              e producono predizioni. 2. <strong>Loss</strong> — misuriamo
              quanto le predizioni si discostano dalle etichette reali.
              3. <strong>Backward pass</strong> — calcoliamo il gradiente
              della loss rispetto a ogni peso (backpropagation).
              4. <strong>Optimizer step</strong> — aggiorniamo i pesi nella
              direzione che riduce la loss.
            </p>
          </ArticleSection>

          <CodeBlock
            language="python"
            filename="mnist.py"
            caption="Adam è un ottimizzatore adattivo che aggiusta automaticamente il learning rate per ogni parametro. CrossEntropyLoss combina log-softmax e negative log-likelihood in un'unica operazione numericamente stabile."
            code={`criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

def train_epoch(model, loader, criterion, optimizer, device):
    model.train()  # attiva dropout e batch norm
    total_loss    = 0
    correct       = 0
    total_samples = 0

    for images, labels in loader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()        # azzera i gradienti precedenti
        outputs = model(images)      # forward pass
        loss    = criterion(outputs, labels)  # calcola la loss
        loss.backward()              # backward pass (calcola gradienti)
        optimizer.step()             # aggiorna i pesi

        total_loss    += loss.item()
        predicted      = outputs.argmax(dim=1)
        correct       += (predicted == labels).sum().item()
        total_samples += labels.size(0)

    avg_loss = total_loss / len(loader)
    accuracy = correct / total_samples * 100
    return avg_loss, accuracy`}
          />

          <CodeBlock
            language="python"
            filename="mnist.py"
            caption="model.eval() disattiva dropout e batch norm durante la valutazione. torch.no_grad() evita di calcolare gradienti, riducendo uso di memoria e velocizzando l'inferenza."
            code={`def evaluate(model, loader, criterion, device):
    model.eval()
    total_loss    = 0
    correct       = 0
    total_samples = 0

    with torch.no_grad():
        for images, labels in loader:
            images, labels = images.to(device), labels.to(device)
            outputs   = model(images)
            loss      = criterion(outputs, labels)
            total_loss    += loss.item()
            predicted      = outputs.argmax(dim=1)
            correct       += (predicted == labels).sum().item()
            total_samples += labels.size(0)

    return total_loss / len(loader), correct / total_samples * 100


# Loop di training principale
NUM_EPOCHS = 10

for epoch in range(1, NUM_EPOCHS + 1):
    train_loss, train_acc = train_epoch(model, train_loader, criterion, optimizer, device)
    test_loss,  test_acc  = evaluate(model, test_loader, criterion, device)

    print(
        f"Epoch {epoch:2d}/{NUM_EPOCHS} | "
        f"Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.2f}% | "
        f"Test Loss: {test_loss:.4f}  | Test Acc: {test_acc:.2f}%"
    )`}
          />

          {/* ── RISULTATI ─────────────────────────────────────────────── */}
          <ArticleSection
            tag="Risultati"
            title="Output atteso"
            subtitle="Con questa architettura dovresti raggiungere circa 97–98% di accuratezza sul test set in poche epoche."
          >
            <p>
              Il training su CPU richiede 2–5 minuti per 10 epoche.
              Su GPU (anche una consumer come una RTX 3060) scende sotto
              il minuto. L'accuratezza migliora rapidamente nelle prime
              3–4 epoche, poi rallenta.
            </p>
          </ArticleSection>

          <CodeBlock
            language="python"
            filename="output.txt"
            caption="Output tipico su CPU. I valori possono variare leggermente per via dell'inizializzazione casuale dei pesi."
            code={`Epoch  1/10 | Train Loss: 0.2941 | Train Acc: 91.23% | Test Loss: 0.1312  | Test Acc: 95.87%
Epoch  2/10 | Train Loss: 0.1298 | Train Acc: 96.11% | Test Loss: 0.0981  | Test Acc: 96.94%
Epoch  3/10 | Train Loss: 0.0961 | Train Acc: 97.08% | Test Loss: 0.0842  | Test Acc: 97.41%
Epoch  4/10 | Train Loss: 0.0789 | Train Acc: 97.58% | Test Loss: 0.0751  | Test Acc: 97.68%
Epoch  5/10 | Train Loss: 0.0672 | Train Acc: 97.94% | Test Loss: 0.0734  | Test Acc: 97.72%
Epoch  6/10 | Train Loss: 0.0581 | Train Acc: 98.18% | Test Loss: 0.0701  | Test Acc: 97.89%
Epoch  7/10 | Train Loss: 0.0511 | Train Acc: 98.38% | Test Loss: 0.0698  | Test Acc: 97.93%
Epoch  8/10 | Train Loss: 0.0453 | Train Acc: 98.57% | Test Loss: 0.0712  | Test Acc: 97.97%
Epoch  9/10 | Train Loss: 0.0401 | Train Acc: 98.71% | Test Loss: 0.0723  | Test Acc: 98.01%
Epoch 10/10 | Train Loss: 0.0364 | Train Acc: 98.82% | Test Loss: 0.0741  | Test Acc: 98.05%`}
          />

          <CompareTable
            title="Confronto architetture su MNIST"
            caption="Accuratezza sul test set. I tempi si riferiscono a training completo su CPU moderna."
            columns={["Rete Dense (questa)", "CNN semplice", "CNN profonda"]}
            rows={[
              {
                aspect: "Accuratezza",
                values: ["~98%", "~99.2%", "~99.7%"],
              },
              {
                aspect: "Parametri",
                values: ["~235K", "~93K", "~1.2M"],
              },
              {
                aspect: "Tempo training",
                values: ["~3 min (CPU)", "~8 min (CPU)", "~25 min (CPU)"],
              },
              {
                aspect: "Complessità",
                values: ["Bassa — ottima per imparare", "Media", "Alta"],
              },
              {
                aspect: "Usa la struttura spaziale?",
                values: ["No — appiattisce tutto", "Sì — convoluzioni locali", "Sì — con pooling e residual"],
              },
            ]}
          />

          {/* ── SALVATAGGIO ───────────────────────────────────────────── */}
          <ArticleSection
            tag="Deploy"
            title="Salvare e usare il modello"
            subtitle="Un modello addestrato è inutile se non puoi riutilizzarlo."
          >
            <p>
              PyTorch permette di salvare sia i soli pesi (approccio
              consigliato) che l'intero modello serializzato. Salvare solo
              i pesi è più robusto perché non dipende dalla struttura
              delle classi Python al momento del caricamento.
            </p>
          </ArticleSection>

          <CodeBlock
            language="python"
            filename="mnist.py"
            caption="state_dict() contiene solo i tensori dei pesi, non la struttura del modello. Per ricaricarli, devi prima istanziare la classe MNISTNet."
            code={`# Salva i pesi
torch.save(model.state_dict(), "mnist_model.pth")

# Carica in seguito
loaded_model = MNISTNet().to(device)
loaded_model.load_state_dict(torch.load("mnist_model.pth", map_location=device))
loaded_model.eval()

# Inferenza su una singola immagine
image, true_label = test_dataset[0]
image = image.unsqueeze(0).to(device)  # aggiunge dimensione batch: [1, 1, 28, 28]

with torch.no_grad():
    output     = loaded_model(image)
    predicted  = output.argmax(dim=1).item()
    confidence = torch.softmax(output, dim=1).max().item()

print(f"Predetto: {predicted} | Reale: {true_label} | Confidenza: {confidence:.1%}")`}
          />

          {/* ── CONCLUSIONE ───────────────────────────────────────────── */}
          <ArticleSection
            tag="Conclusione"
            title="Cosa hai imparato costruendo questo"
          >
            <p>
              MNIST sembra un problema semplice, e lo è — ma costruirlo
              da zero ti ha esposto a tutti i concetti fondamentali del
              deep learning: preprocessing dei dati, definizione
              dell'architettura, scelta della loss, ciclo di training
              con backpropagation, valutazione, salvataggio.
            </p>
            <p>
              Il passo successivo naturale è sostituire la rete dense
              con una <strong>CNN</strong> (Convolutional Neural Network),
              che sfrutta la struttura spaziale delle immagini e raggiunge
              accuratezze vicine al 99.7% con meno parametri.
              La struttura del codice — dataset, dataloader, modello,
              training loop — rimane identica. Cambia solo l'architettura.
            </p>
          </ArticleSection>

        </div>
      }
    />
  );
}