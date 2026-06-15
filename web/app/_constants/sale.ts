export const PaymentMethod = {
  OTHER: "OTHER",
  CREDIT_CARD: "CREDIT_CARD",
  DEBIT_CARD: "DEBIT_CARD",
  BANK_TRANSFER: "BANK_TRANSFER",
  BANK_SLIP: "BANK_SLIP",
  CASH: "CASH",
  PIX: "PIX",
};

export type PaymentMethod =
  | "OTHER"
  | "CREDIT_CARD"
  | "DEBIT_CARD"
  | "BANK_TRANSFER"
  | "BANK_SLIP"
  | "CASH"
  | "PIX";

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  BANK_TRANSFER: "Transferência Bancária",
  BANK_SLIP: "Boleto Bancário",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  OTHER: "Outros",
  PIX: "Pix",
};

export const PAYMENT_METHOD_OPTIONS = [
  {
    value: PaymentMethod.BANK_TRANSFER,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.BANK_TRANSFER],
  },
  {
    value: PaymentMethod.BANK_SLIP,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.BANK_SLIP],
  },
  {
    value: PaymentMethod.CASH,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.CASH],
  },
  {
    value: PaymentMethod.CREDIT_CARD,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.CREDIT_CARD],
  },
  {
    value: PaymentMethod.DEBIT_CARD,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.DEBIT_CARD],
  },
  {
    value: PaymentMethod.PIX,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.PIX],
  },
  {
    value: PaymentMethod.OTHER,
    label: PAYMENT_METHOD_LABELS[PaymentMethod.OTHER],
  },
];
