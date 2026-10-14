import type { Certificate } from "../types/certificate";

export const eagBuildathon = {
  certificateId: "00000000-0000-4000-8000-000000000011",
  credentialId: "EAGCALI26-C449RLBS",
  title: "EAG Global Buildathon 2026",
  subtitle: "Builder Certificate · X-Mate",
  imageUrl: "/images/Certificados/eag-buildathon-2026.png",
  projectUrl: "https://github.com/EmanuelDesarrollo/ethereum-app-transaction",
  blockchain: "Ethereum Mainnet · Token #29",
  dates: {
    es: "19 y 20 de septiembre de 2026 · Ethereum Builders Tour, capítulo Colombia",
    en: "September 19–20, 2026 · Ethereum Builders Tour, Colombia chapter",
  },
  description: {
    es: "Construí y entregué X-Mate, una app de cobros con stablecoins y un agente de IA, durante la EAG Global Buildathon 2026. El certificado está emitido como NFT en Ethereum Mainnet.",
    en: "I built and shipped X-Mate, a stablecoin payments app with an AI agent, at the EAG Global Buildathon 2026. The certificate is issued as an NFT on Ethereum Mainnet.",
  },
};

export function isEagCertificate(certificate: Certificate) {
  return (
    certificate.id === eagBuildathon.certificateId ||
    certificate.credential_id === eagBuildathon.credentialId
  );
}
