// src/data/docs.ts
export type DocPage = {
  title: string;
  href: string;
  children?: DocPage[];
};

export const docs: DocPage[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Fondamenti",
    href: "/fondamenti",
    children: [
      { title: "Machine Learning", href: "/fondamenti/machine-learning" },
      { title: "Reti Neurali", href: "/fondamenti/reti-neurali" },
      { title: "Progetto MNIST", href: "/fondamenti/progetto-mnist" },
      { title: "Tipi AI", href: "/fondamenti/tipi-ai" },
    ],
  },
  {
    title: "Etica",
    href: "/etica",
    children: [
      { title: "Dilemmi Etici", href: "/etica/dilemmi-etici" },
      { title: "Atrofia del Pensiero", href: "/etica/atrofia-pensiero" },
      { title: "Problemi Futuri", href: "/etica/problemi-futuri" },
      { title: "Linee Guida", href: "/etica/linee-guida" },
    ],
  },
];